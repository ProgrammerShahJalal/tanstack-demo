import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  type SortingState,
  type ColumnFiltersState,
  type VisibilityState,
  type RowSelectionState,
  type ColumnDef,
} from '@tanstack/react-table'
import axios from 'axios'

interface User {
  id: number
  name: string
  username: string
  email: string
  phone: string
  website: string
  address: {
    street: string
    city: string
    zipcode: string
  }
  company: {
    name: string
    catchPhrase: string
  }
}

const fetchUsers = async (): Promise<User[]> => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/users')
  return response.data
}

const TableDemo: React.FC = () => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [globalFilter, setGlobalFilter] = useState('')

  const { data: users, isLoading, isError } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  })

  const columns: ColumnDef<User>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <input
          type="checkbox"
          checked={table.getIsAllPageRowsSelected()}
          onChange={table.getToggleAllPageRowsSelectedHandler()}
          className="rounded"
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
          className="rounded"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'id',
      header: 'ID',
      cell: ({ row }) => (
        <div className="w-12">{row.getValue('id')}</div>
      ),
    },
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <button
          className="flex items-center space-x-2 hover:bg-gray-100 px-2 py-1 rounded"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          <span>Name</span>
          <span>
            {column.getIsSorted() === 'asc' ? '🔼' : column.getIsSorted() === 'desc' ? '🔽' : '↕️'}
          </span>
        </button>
      ),
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue('name')}</div>
      ),
    },
    {
      accessorKey: 'username',
      header: 'Username',
      cell: ({ row }) => (
        <div className="text-gray-600">@{row.getValue('username')}</div>
      ),
    },
    {
      accessorKey: 'email',
      header: ({ column }) => (
        <button
          className="flex items-center space-x-2 hover:bg-gray-100 px-2 py-1 rounded"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          <span>Email</span>
          <span>
            {column.getIsSorted() === 'asc' ? '🔼' : column.getIsSorted() === 'desc' ? '🔽' : '↕️'}
          </span>
        </button>
      ),
      cell: ({ row }) => (
        <div className="text-blue-600 hover:text-blue-800">
          <a href={`mailto:${row.getValue('email')}`}>{row.getValue('email')}</a>
        </div>
      ),
    },
    {
      accessorKey: 'phone',
      header: 'Phone',
      cell: ({ row }) => (
        <div className="text-gray-600">{row.getValue('phone')}</div>
      ),
    },
    {
      accessorKey: 'website',
      header: 'Website',
      cell: ({ row }) => (
        <div className="text-blue-600 hover:text-blue-800">
          <a 
            href={`http://${row.getValue('website')}`} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            {row.getValue('website')}
          </a>
        </div>
      ),
    },
    {
      accessorKey: 'address.city',
      header: 'City',
      cell: ({ row }) => (
        <div>{row.original.address.city}</div>
      ),
    },
    {
      accessorKey: 'company.name',
      header: 'Company',
      cell: ({ row }) => (
        <div className="max-w-48">
          <div className="font-medium truncate">{row.original.company.name}</div>
          <div className="text-sm text-gray-500 truncate">{row.original.company.catchPhrase}</div>
        </div>
      ),
    },
  ]

  const table = useReactTable({
    data: users || [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  })

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <div className="text-red-800">Error loading users</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">TanStack Table Demo</h1>
        <p className="mt-2 text-gray-600">
          Advanced table features including sorting, filtering, pagination, and row selection
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white p-6 rounded-lg shadow border space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Global Search */}
          <div className="flex-1">
            <label htmlFor="global-search" className="block text-sm font-medium text-gray-700 mb-1">
              Global Search
            </label>
            <input
              id="global-search"
              value={globalFilter ?? ''}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Search all columns..."
            />
          </div>

          {/* Column Filters */}
          <div className="flex-1">
            <label htmlFor="name-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Name
            </label>
            <input
              id="name-filter"
              value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
              onChange={(e) => table.getColumn('name')?.setFilterValue(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Filter names..."
            />
          </div>

          <div className="flex-1">
            <label htmlFor="email-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Email
            </label>
            <input
              id="email-filter"
              value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
              onChange={(e) => table.getColumn('email')?.setFilterValue(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Filter emails..."
            />
          </div>
        </div>

        {/* Column Visibility */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Column Visibility</label>
          <div className="flex flex-wrap gap-4">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <label key={column.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={column.getIsVisible()}
                    onChange={column.getToggleVisibilityHandler()}
                    className="rounded"
                  />
                  <span className="text-sm text-gray-700 capitalize">
                    {column.id}
                  </span>
                </label>
              ))}
          </div>
        </div>

        {/* Selection Info */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div>
            {table.getFilteredSelectedRowModel().rows.length} of{' '}
            {table.getFilteredRowModel().rows.length} row(s) selected
          </div>
          <div>
            Showing {table.getRowModel().rows.length} of {table.getFilteredRowModel().rows.length} results
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className={row.getIsSelected() ? 'bg-blue-50' : 'hover:bg-gray-50'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div className="flex items-center space-x-4">
              <p className="text-sm text-gray-700">
                Page <span className="font-medium">{table.getState().pagination.pageIndex + 1}</span> of{' '}
                <span className="font-medium">{table.getPageCount()}</span>
              </p>
              <select
                value={table.getState().pagination.pageSize}
                onChange={(e) => {
                  table.setPageSize(Number(e.target.value))
                }}
                className="rounded-md border-gray-300 text-sm"
              >
                {[5, 10, 20, 30].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  First
                </button>
                <button
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
                <button
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Last
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Rows Info */}
      {Object.keys(rowSelection).length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
          <h3 className="text-lg font-medium text-blue-900 mb-2">Selected Users</h3>
          <div className="space-y-1">
            {table.getSelectedRowModel().rows.map((row) => (
              <div key={row.id} className="text-sm text-blue-800">
                {row.original.name} ({row.original.email})
              </div>
            ))}
          </div>
          <button
            onClick={() => setRowSelection({})}
            className="mt-3 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
          >
            Clear Selection
          </button>
        </div>
      )}
    </div>
  )
}

export default TableDemo
