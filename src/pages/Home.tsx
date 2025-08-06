import React from 'react'
import { Link } from '@tanstack/react-router'

const Home: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to TanStack Demo
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          A comprehensive demonstration of TanStack libraries: Query, Table, Form, and Router
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">🔄</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">TanStack Query</h3>
            <p className="text-gray-600 mb-4">Data fetching, caching, and synchronization</p>
            <Link
              to="/query-demo"
              className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              View Demo
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">TanStack Table</h3>
            <p className="text-gray-600 mb-4">Powerful data tables with sorting, filtering</p>
            <Link
              to="/table-demo"
              className="inline-block bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
            >
              View Demo
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">📝</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">TanStack Form</h3>
            <p className="text-gray-600 mb-4">Type-safe forms with validation</p>
            <Link
              to="/form-demo"
              className="inline-block bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition-colors"
            >
              View Demo
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">🧭</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">TanStack Router</h3>
            <p className="text-gray-600 mb-4">Type-safe routing and navigation</p>
            <Link
              to="/users"
              className="inline-block bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors"
            >
              View Demo
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Features Demonstrated</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">TanStack Query</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Data fetching with useQuery</li>
              <li>Mutations with useMutation</li>
              <li>Cache management</li>
              <li>Background refetching</li>
              <li>Error handling</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">TanStack Table</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Column sorting</li>
              <li>Global filtering</li>
              <li>Column filtering</li>
              <li>Pagination</li>
              <li>Row selection</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">TanStack Form</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Type-safe forms</li>
              <li>Field validation</li>
              <li>Async validation</li>
              <li>Form state management</li>
              <li>Error handling</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">TanStack Router</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Type-safe routing</li>
              <li>URL params and search</li>
              <li>Route guards</li>
              <li>Nested layouts</li>
              <li>Code splitting</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
