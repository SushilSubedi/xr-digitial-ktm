import ProductApi from 'apis/Product';
import { PRODUCT_TABLE_HEADER } from 'constants/tableHeader';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useTable } from 'react-table';
import { useSortBy } from 'react-table/dist/react-table.development';
import AddProductModal from './Modal/AddProductModal';
import DeleteProductModal from './Modal/DeleteProductModal';
import EditProductModal from './Modal/EditProductModal';
import Table from './Table/Table';
import TableBody from './Table/TableBody';
import TableHeader from './Table/TableHeader';

const MODAL_TYPE = {
  DELETE: 'delete',
  ADD: 'add',
  EDIT: 'edit',
};

const ProductTable = () => {
  const initialSelectedProduct = {
    id: null,
    name: '',
  };
  const [tableData, setTableData] = useState([]);
  const [initialData, setInitialData] = useState([]);
  const [showActiveModal, setActiveModal] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(
    initialSelectedProduct
  );

  const rowData = (cell) => {
    if (cell.column.id == 'createdAt') {
      return new Date(cell.value).toISOString().split('T')[0];
    }

    return cell.render('Cell');
  };

  const selectProductHandler = (product, modalType) => {
    setSelectedProduct(product);
    setActiveModal(modalType);
  };

  const updateTableData = (data) => {
    return data.map(
      ({
        id,
        product_name: productName,
        category_name: categoryName,
        description,
        created_at: createdAt,
        status,
      }) => {
        return {
          id,
          productName,
          categoryName,
          description,
          createdAt: new Date(createdAt),
          status,
          edit: (
            <button
              className="btn btn-success p-2 h-auto"
              onClick={() =>
                selectProductHandler({ id, name: productName }, MODAL_TYPE.EDIT)
              }
            >
              Edit
            </button>
          ),
          delete: (
            <button
              className="btn btn-danger p-2 h-auto"
              onClick={() =>
                selectProductHandler(
                  { id, name: productName },
                  MODAL_TYPE.DELETE
                )
              }
            >
              Delete
            </button>
          ),
        };
      }
    );
  };

  const handleCancel = () => {
    setSelectedProduct(initialSelectedProduct);
    setActiveModal(null);
  };

  const deleteProductHandler = async () => {
    try {
      await ProductApi.deleteProduct(selectedProduct.id);

      setTableData((previous) =>
        previous.filter(({ id }) => id !== selectedProduct.id)
      );
      setActiveModal(null);
      setInitialData((previous) =>
        previous.filter(({ id }) => id !== selectedProduct.id)
      );
    } catch (error) {
      alert(`Failed to delete ${selectedProduct.name}`);
    }
  };

  const fetchTableData = async () => {
    try {
      const response = await ProductApi.fetchProducts();

      setTableData(updateTableData(response.data));
      setInitialData(response.data);
    } catch (error) {
      alert('Please start your JSON server');
    }
  };

  const AddProductHandler = async (product) => {
    try {
      const {
        data: {
          id,
          product_name: productName,
          category_name: categoryName,
          description,
          created_at: createdAt,
          status,
          ...rest
        },
      } = await ProductApi.addProduct(product);

      setTableData((previous) => {
        return [
          ...previous,
          {
            id,
            productName,
            categoryName,
            description,
            createdAt: new Date(createdAt),
            status,
            edit: (
              <button
                className="btn btn-success p-2 h-auto"
                onClick={() =>
                  selectProductHandler(
                    { id, name: productName },
                    MODAL_TYPE.EDIT
                  )
                }
              >
                Edit
              </button>
            ),
            delete: (
              <button
                className="btn btn-danger p-2 h-auto"
                onClick={() =>
                  selectProductHandler(
                    { id, name: productName },
                    MODAL_TYPE.DELETE
                  )
                }
              >
                Delete
              </button>
            ),
          },
        ];
      });
      handleCancel();
      setInitialData((previous) => [
        ...previous,
        {
          id,
          product_name: productName,
          category_name: categoryName,
          description,
          created_at: createdAt,
          status,
          ...rest,
        },
      ]);
    } catch (error) {
      alert(`Failed to add ${product.product_name}`);
    }
  };

  const updateProductHandler = async (product) => {
    try {
      const {
        data: {
          id,
          product_name: productName,
          category_name: categoryName,
          description,
          created_at: createdAt,
          status,
          ...rest
        },
      } = await ProductApi.updateProduct(selectedProduct.id, product);
      const tableIndex = tableData.findIndex(({ id }) => id === product.id);
      const dataIndex = initialData.findIndex(({ id }) => id === product.id);

      setTableData((previous) => {
        const copiedData = [...previous];
        copiedData[tableIndex] = {
          id,
          productName,
          categoryName,
          description,
          createdAt: new Date(createdAt),
          status,
          edit: (
            <button
              className="btn btn-success p-2 h-auto"
              onClick={() =>
                selectProductHandler({ id, name: productName }, MODAL_TYPE.EDIT)
              }
            >
              Edit
            </button>
          ),
          delete: (
            <button
              className="btn btn-danger p-2 h-auto"
              onClick={() =>
                selectProductHandler(
                  { id, name: productName },
                  MODAL_TYPE.DELETE
                )
              }
            >
              Delete
            </button>
          ),
        };

        return copiedData;
      });

      setInitialData((previous) => {
        const copiedData = [...previous];
        copiedData[dataIndex] = {
          id,
          product_name: productName,
          category_name: categoryName,
          description,
          created_at: createdAt,
          status,
          ...rest,
        };

        return copiedData;
      });
      handleCancel();
    } catch (error) {
      alert(`Failed to update ${selectedProduct.name}`);
    }
  };

  useEffect(() => {
    fetchTableData();
  }, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns: PRODUCT_TABLE_HEADER, data: tableData }, useSortBy);

  return (
    <article className="container">
      <div className="table-header my-3 h-auto">
        <button
          className="btn btn-primary h-auto"
          onClick={() => setActiveModal(MODAL_TYPE.ADD)}
        >
          Add New Product
        </button>
      </div>
      <Table getTableProps={getTableProps}>
        <TableHeader headerGroups={headerGroups} />
        <TableBody
          getTableBodyProps={getTableBodyProps}
          rows={rows}
          prepareRow={prepareRow}
          rowData={rowData}
        />
      </Table>
      <DeleteProductModal
        isVisible={showActiveModal === MODAL_TYPE.DELETE}
        productName={selectedProduct.name}
        handleConfirm={deleteProductHandler}
        handleCancel={handleCancel}
      />
      <AddProductModal
        isVisible={showActiveModal === MODAL_TYPE.ADD}
        handleConfirm={AddProductHandler}
        handleCancel={handleCancel}
      />
      <EditProductModal
        isVisible={showActiveModal === MODAL_TYPE.EDIT}
        handleConfirm={updateProductHandler}
        handleCancel={handleCancel}
        initialValues={initialData.find(
          (item) => item.id === selectedProduct.id
        )}
      />
    </article>
  );
};

export default ProductTable;
