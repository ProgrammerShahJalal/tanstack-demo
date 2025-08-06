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
              className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
            >
              TanStack Demo
            </Link>
            <div className="flex space-x-1">
              <Link
                to="/"
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive('/') 
                    ? 'bg-primary text-white shadow-md transform scale-105' 
                    : 'text-text-secondary hover:text-primary hover:bg-surface hover:scale-105'
                }`}
              >
                Home
              </Link>
              <Link
                to="/users"
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive('/users') 
                    ? 'bg-primary text-white shadow-md transform scale-105' 
                    : 'text-text-secondary hover:text-primary hover:bg-surface hover:scale-105'
                }`}
              >
                Users
              </Link>
              <Link
                to="/users/create"
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive('/users/create') 
                    ? 'bg-primary text-white shadow-md transform scale-105' 
                    : 'text-text-secondary hover:text-primary hover:bg-surface hover:scale-105'
                }`}
              >
                Create User
              </Link>
              <Link
                to="/query-demo"
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive('/query-demo') 
                    ? 'bg-primary text-white shadow-md transform scale-105' 
                    : 'text-text-secondary hover:text-primary hover:bg-surface hover:scale-105'
                }`}
              >
                Query Demo
              </Link>
              <Link
                to="/table-demo"
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive('/table-demo') 
                    ? 'bg-primary text-white shadow-md transform scale-105' 
                    : 'text-text-secondary hover:text-primary hover:bg-surface hover:scale-105'
                }`}
              >
                Table Demo
              </Link>
              <Link
                to="/form-demo"
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive('/form-demo') 
                    ? 'bg-primary text-white shadow-md transform scale-105' 
                    : 'text-text-secondary hover:text-primary hover:bg-surface hover:scale-105'
                }`}
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
