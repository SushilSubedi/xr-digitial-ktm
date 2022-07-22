export const PRODUCT_TABLE_HEADER = [
  {
    Header: 'Name',
    accessor: 'productName',
    sortType: 'basic',
  },
  {
    Header: 'Category',
    accessor: 'categoryName',
    sortType: 'basic',
  },
  {
    Header: 'Description',
    accessor: 'description',
    disableSortBy: true,
  },
  {
    Header: 'Created At',
    accessor: 'createdAt',
    sortType: 'datetime',
    sortDescFirst: true,
  },
  {
    Header: 'Status',
    accessor: 'status',
    sortType: 'basic',
  },
  {
    Header: '',
    accessor: 'edit',
    disableSortBy: true,
  },
  {
    Header: '',
    accessor: 'delete',
    disableSortBy: true,
  },
];
