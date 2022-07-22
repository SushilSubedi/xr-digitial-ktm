import ProductApi from 'apis/Product';
import { PRODUCT_TABLE_HEADER } from 'constants/tableHeader';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import EmptyContent from './Empty/EmptyContent';
import NoSearchContent from './Empty/NoSearchContent';

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
  const [searchText, setSearchText] = useState('');

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

  useEffect(() => {
    setPageSize(5);
  }, []);

  useEffect(() => {
    if (searchText == '') {
      return setTableData(updateTableData(initialData));
    }

    const updatedTableData = [];
    for (let i = 0; i < tableData.length; i++) {
      const name = tableData[i].productName.toLowerCase();
      if (
        name.includes(searchText.toLowerCase()) &&
        name.charAt(0) == searchText.charAt(0)
      ) {
        updatedTableData.push(tableData[i]);
      }
    }

    setTableData(updatedTableData);
  }, [searchText]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    pageOptions,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    setPageSize,
    pageSize,
    state: { pageIndex },
  } = useTable(
    {
      columns: PRODUCT_TABLE_HEADER,
      data: tableData,
      initialState: { pageIndex: 0 },
    },
    useSortBy,
    usePagination
  );

  return (
    <article className="container pt-4">
      <h4>Task 2: CRUD Operation</h4>
      <div className="table-header my-3 h-auto d-flex justify-content-between">
        <button
          className="btn btn-primary h-auto"
          onClick={() => setActiveModal(MODAL_TYPE.ADD)}
        >
          Add New Product
        </button>
        <input
          type="text"
          aria-describedby="searchBar"
          className="search-bar p-2"
          placeholder="Search by product name"
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <Table getTableProps={getTableProps}>
        <TableHeader headerGroups={headerGroups} />
        <TableBody
          getTableBodyProps={getTableBodyProps}
          rows={page}
          prepareRow={prepareRow}
          rowData={rowData}
        />
      </Table>
      <EmptyContent show={!searchText && tableData.length == 0} />
      <NoSearchContent show={searchText && tableData.length == 0} />
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

      <div className="pagination d-flex align-items-center">
        <button
          className="btn btn-outline-secondary px-3"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          {'<'}
        </button>
        <button
          className="btn btn-outline-secondary px-3 mx-3"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          {'>'}
        </button>
        <span className="text-center me-3">
          Page
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[5, 10, 15, 20, 25].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </article>
  );
};

export default ProductTable;
