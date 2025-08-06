import React from 'react'
import { Link, useLocation } from '@tanstack/react-router'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <nav className="p-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <Link 
              to="/" 
              className={`text-xl font-bold transition-all duration-200 ${
                isActive('/') 
                  ? 'text-green-700 transform scale-105' 
                  : 'bg-gradient-to-tr from-primary to-purple-600 bg-clip-text text-transparent'
              }`}
              style={{ textDecoration: 'none' }}
            >
              TanStack Demo
            </Link>
            <div className="flex space-x-1">
              <Link
                to="/"
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive('/') 
                    ? 'text-green-700 transform scale-105' 
                    : 'text-text-secondary hover:text-primary hover:bg-surface hover:scale-105'
                }`}
                style={{ textDecoration: 'none' }}
              >
                Home
              </Link>
              <Link
                to="/users"
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive('/users') 
                    ? 'text-green-700 transform scale-105' 
                    : 'text-text-secondary hover:text-primary hover:bg-surface hover:scale-105'
                }`}
                style={{ textDecoration: 'none' }}
              >
                Users
              </Link>
              <Link
                to="/users/create"
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive('/users/create') 
                    ? 'text-green-700 transform scale-105' 
                    : 'text-text-secondary hover:text-primary hover:bg-surface hover:scale-105'
                }`}
                style={{ textDecoration: 'none' }}
              >
                Create User
              </Link>
              <Link
                to="/query-demo"
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive('/query-demo') 
                    ? 'text-green-700 transform scale-105' 
                    : 'text-text-secondary hover:text-primary hover:bg-surface hover:scale-105'
                }`}
                style={{ textDecoration: 'none' }}
              >
                Query Demo
              </Link>
              <Link
                to="/table-demo"
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive('/table-demo') 
                    ? 'text-green-700 transform scale-105' 
                    : 'text-text-secondary hover:text-primary hover:bg-surface hover:scale-105'
                }`}
                style={{ textDecoration: 'none' }}
              >
                Table Demo
              </Link>
              <Link
                to="/form-demo"
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive('/form-demo') 
                    ? 'text-green-700 transform scale-105' 
                    : 'text-text-secondary hover:text-primary hover:bg-surface hover:scale-105'
                }`}
                style={{ textDecoration: 'none' }}
              >
                Form Demo
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-6">
        <div className="animate-fadeIn">
          {children}
        </div>
      </main>
    </div>
  )
}

export default Layout
