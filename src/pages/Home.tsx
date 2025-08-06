import React from 'react'
import { Link } from '@tanstack/react-router'

const Home: React.FC = () => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center animate-fadeIn">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-primary via-purple-600 to-cyan-500 bg-clip-text text-transparent mb-6">
          Welcome to TanStack Demo
        </h1>
        <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
          A comprehensive demonstration of TanStack libraries: Query, Table, Form, and Router. 
          Explore modern React patterns and best practices with type-safe, performant solutions.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="card card-gradient group">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <span className="text-3xl">🔄</span>
            </div>
            <h3 className="text-xl font-bold text-text-primary mb-3">TanStack Query</h3>
            <p className="text-text-secondary mb-6 leading-relaxed">
              Powerful data fetching, caching, synchronization, and background updates
            </p>
            <Link
              to="/query-demo"
              className="btn-primary w-full group-hover:shadow-lg transition-all duration-300"
            >
              Explore Query →
            </Link>
          </div>
        </div>

        <div className="card card-gradient group">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <span className="text-3xl">📊</span>
            </div>
            <h3 className="text-xl font-bold text-text-primary mb-3">TanStack Table</h3>
            <p className="text-text-secondary mb-6 leading-relaxed">
              Advanced data tables with sorting, filtering, pagination, and more
            </p>
            <Link
              to="/table-demo"
              className="btn-success w-full group-hover:shadow-lg transition-all duration-300"
            >
              Explore Table →
            </Link>
          </div>
        </div>

        <div className="card card-gradient group">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <span className="text-3xl">📝</span>
            </div>
            <h3 className="text-xl font-bold text-text-primary mb-3">TanStack Form</h3>
            <p className="text-text-secondary mb-6 leading-relaxed">
              Type-safe forms with validation, field arrays, and async validation
            </p>
            <Link
              to="/form-demo"
              className="btn-warning w-full group-hover:shadow-lg transition-all duration-300"
            >
              Explore Form →
            </Link>
          </div>
        </div>

        <div className="card card-gradient group">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <span className="text-3xl">🧭</span>
            </div>
            <h3 className="text-xl font-bold text-text-primary mb-3">TanStack Router</h3>
            <p className="text-text-secondary mb-6 leading-relaxed">
              Type-safe routing, navigation, and URL state management
            </p>
            <Link
              to="/users"
              className="btn-danger w-full group-hover:shadow-lg transition-all duration-300"
            >
              Explore Router →
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="card">
        <h2 className="text-3xl font-bold text-text-primary mb-8 text-center">
          Features Demonstrated
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-xs font-bold">Q</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">TanStack Query</h3>
                <ul className="space-y-2 text-text-secondary">
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                    <span>Data fetching with useQuery</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                    <span>Mutations with useMutation</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                    <span>Cache management and invalidation</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                    <span>Background refetching</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                    <span>Error handling and retry logic</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-xs font-bold">T</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">TanStack Table</h3>
                <ul className="space-y-2 text-text-secondary">
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                    <span>Column sorting and filtering</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                    <span>Global search functionality</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                    <span>Pagination and virtual scrolling</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                    <span>Row selection and actions</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                    <span>Column resizing and reordering</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-violet-600 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-xs font-bold">F</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">TanStack Form</h3>
                <ul className="space-y-2 text-text-secondary">
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                    <span>Type-safe form validation</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                    <span>Async validation support</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                    <span>Field arrays and dynamic forms</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                    <span>Form state management</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                    <span>Error handling and display</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-xs font-bold">R</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">TanStack Router</h3>
                <ul className="space-y-2 text-text-secondary">
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                    <span>Type-safe routing and navigation</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                    <span>URL params and search state</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                    <span>Route guards and protection</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                    <span>Nested layouts and routes</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                    <span>Code splitting and lazy loading</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Start Section */}
      <div className="card bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-text-primary mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
            Explore each demo to see these powerful libraries in action. Each section includes 
            interactive examples and explanations of key concepts.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/users" className="btn-primary">
              View Users Demo
            </Link>
            <Link to="/query-demo" className="btn-outline">
              Try Query Features
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
