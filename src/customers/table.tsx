import{ useEffect, useState } from 'react';
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
import { Customer } from '../types/type';
// import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "../components/ui/dropdown-menu"
// import { useStore } from '../store/store';
// import toast from 'react-hot-toast';
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "../components/ui/alert-dialog"




const columnHelper = createColumnHelper<Customer>();

const columns = [
  columnHelper.accessor('userId', {
    header: () => 'userId',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('name', {
    header: () => 'Name',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('email', {
    header: () => 'Email',
    cell: (info) =>
      info.getValue() ? info.getValue() : <span>No description</span>,
  }),
  // columnHelper.accessor('image', {
  //   header: 'Images',
  //   cell: (info) => {
  //     const imageUrl = info.getValue(); // Get the image URL
  //     return (
  //       <img
  //         src={imageUrl}
  //         alt="Product"
  //         style={{
  //           width: '50px',
  //           height: '50px',
  //           objectFit: 'cover',
  //           borderRadius: '4px',
  //         }}
  //         onError={(e) => {
  //           (e.target as HTMLImageElement).src = 'fallback-image-url.jpg'; // Fallback for invalid URLs
  //         }}
  //       />
  //     );
  //   },
  // }),
];

const CustomersTable = ({ customers }: { customers: Customer[] }) => {
  const [data, setData] = useState<Customer[]>([]);
  useEffect(() => {
    setData(customers);
  }, [customers]);

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
      <Table>
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
                
                {/* <DropdownMenu >
                   <DropdownMenuTrigger className='flex items-center my-[2rem]'><EllipsisHorizontalIcon className='w-[1.5rem] h-[1.5rem] text-gray-500'/></DropdownMenuTrigger>
                  <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => editCollection(row.original, true)}>Edit</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setOpenCollectionDeleteDialog(true)}>Delete</DropdownMenuItem>
                  <DropdownMenuItem>Team</DropdownMenuItem>
                  <DropdownMenuItem>Subscription</DropdownMenuItem>
                  </DropdownMenuContent>
                  </DropdownMenu> */}

                  {/* <AlertDialog open={openCollectionDeleteDialog} onOpenChange={setOpenCollectionDeleteDialog}>
                   <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                     <AlertDialogDescription>
                     This action cannot be undone. This will permanently delete your account
                     and remove your data from our servers.
                  </AlertDialogDescription>
                  </AlertDialogHeader>
                   <AlertDialogFooter>
                 <AlertDialogCancel onClick={() => setOpenCollectionDeleteDialog(false)}>Cancel</AlertDialogCancel>
                 <AlertDialogAction onClick={() => deleteCollection(row.original._id)}>Continue</AlertDialogAction>
               </AlertDialogFooter>
               </AlertDialogContent>
            </AlertDialog> */}




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

export default CustomersTable;
