import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import axios from 'axios'

interface User {
  id: number
  name: string
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
  }
}

const fetchUsers = async (): Promise<User[]> => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/users')
  return response.data
}

const UsersPage: React.FC = () => {
  const { data: users, isLoading, isError, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
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
        <div className="flex">
          <div className="text-red-400">
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error loading users</h3>
            <div className="mt-2 text-sm text-red-700">
              {error instanceof Error ? error.message : 'An unexpected error occurred'}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Users</h1>
        <Link
          to="/users/create"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Create User
        </Link>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {users?.map((user) => (
            <li key={user.id}>
              <Link
                to="/users/$userId"
                params={{ userId: user.id.toString() }}
                className="block hover:bg-gray-50 px-4 py-4 sm:px-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-700">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      </div>
                      <div className="flex items-center">
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-sm text-gray-500">
                      {user.company.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {user.address.city}
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default UsersPage
