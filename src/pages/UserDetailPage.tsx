import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams, Link } from '@tanstack/react-router'
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
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}

const fetchUser = async (userId: string): Promise<User> => {
  const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`)
  return response.data
}

const UserDetailPage: React.FC = () => {
  const { userId } = useParams({ strict: false })
  
  const { data: user, isLoading, isError, error } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId!),
    enabled: !!userId,
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
            <h3 className="text-sm font-medium text-red-800">Error loading user</h3>
            <div className="mt-2 text-sm text-red-700">
              {error instanceof Error ? error.message : 'An unexpected error occurred'}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900">User not found</h3>
        <div className="mt-2 text-sm text-gray-500">
          The user you're looking for doesn't exist.
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Link
          to="/users"
          className="text-blue-500 hover:text-blue-600 flex items-center"
        >
          <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Users
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">User Information</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and information.</p>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Full name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.name}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Username</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.username}</dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Email address</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <a href={`mailto:${user.email}`} className="text-blue-500 hover:text-blue-600">
                  {user.email}
                </a>
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Phone number</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <a href={`tel:${user.phone}`} className="text-blue-500 hover:text-blue-600">
                  {user.phone}
                </a>
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Website</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <a 
                  href={`http://${user.website}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-600"
                >
                  {user.website}
                </a>
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Address</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {user.address.street}, {user.address.suite}<br />
                {user.address.city}, {user.address.zipcode}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Company</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <div className="font-medium">{user.company.name}</div>
                <div className="text-gray-600">{user.company.catchPhrase}</div>
                <div className="text-sm text-gray-500">{user.company.bs}</div>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}

export default UserDetailPage
