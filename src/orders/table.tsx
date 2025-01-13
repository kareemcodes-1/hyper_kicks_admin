import { useEffect, useState } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Order } from '../types/type';




const columnHelper = createColumnHelper<Order>();

const columns = [
  columnHelper.accessor((row) => row._id, {
    id: '_id',
    header: 'Id',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor((row) => row.userId.name, {
    id: 'name',
    header: 'Name',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor((row) => row.userId.email, {
    id: 'email',
    header: 'Email',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor((row) => row.products, {
    id: 'products',
    header: 'Products',
    cell: (info) => (
      <ul>
        {info.getValue().map((product, index) => (
          <li key={index}>
            {product.productId.name} (x{product.quantity})
          </li>
        ))}
      </ul>
    ),
  }),
  columnHelper.accessor('totalAmount', {
    header: 'Total Amount',
    cell: (info) => `$${info.getValue().toFixed(2)}`,
  }),
  columnHelper.accessor('paymentInfo', {
    header: 'Gateway',
    cell: (info) => info.getValue().gateway,
  }),
  columnHelper.accessor('paymentInfo', {
    header: 'stripeId',
    cell: (info) => info.getValue().id,
  }),
  columnHelper.accessor('paymentInfo', {
    header: 'Status',
    cell: (info) => info.getValue().status,
  }),

  columnHelper.accessor('createdAt', {
    header: 'Order Date',
    cell: (info) => new Date(info.getValue()).toLocaleDateString(),
  }),
];


const OrdersTable = ({ orders }: { orders: Order[] }) => {
  const [data, setData] = useState<Order[]>([]);
  useEffect(() => {
    setData(orders);
  }, [orders]);

  // Table instance with pagination support
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 10, // Default rows per page
      },
    },
  });


  return (
    <div className="rounded-md border">
  {/* Scrollable Container */}
  <div className="overflow-x-auto">
    <Table className="min-w-full">
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  </div>

  {/* Pagination Controls */}
  <div className="pagination-controls mt-4 flex justify-between items-center p-[1rem] border-t">
    <button
      className="yena-btn"
      onClick={() => table.previousPage()}
      disabled={!table.getCanPreviousPage()}
    >
      Previous
    </button>
    <span>
      Page <strong>{table.getState().pagination.pageIndex + 1}</strong> of{' '}
      <strong>{table.getPageCount()}</strong>
    </span>
    <button
      className="yena-btn"
      onClick={() => table.nextPage()}
      disabled={!table.getCanNextPage()}
    >
      Next
    </button>
  </div>
</div>

  );
};

export default OrdersTable;
