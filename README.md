# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# TanStack Demo Project

A comprehensive demonstration of TanStack libraries including Query, Table, Form, and Router built with React, TypeScript, and Vite.

## 🚀 Features

### TanStack Query
- **Data Fetching**: Demonstrates `useQuery` for fetching data from APIs
- **Mutations**: Shows `useMutation` for creating, updating, and deleting data
- **Cache Management**: Implements cache invalidation and optimistic updates
- **Background Refetching**: Automatic data synchronization
- **Error Handling**: Proper error states and retry logic
- **DevTools**: React Query DevTools integration for debugging

### TanStack Table
- **Column Sorting**: Multi-column sorting with visual indicators
- **Global Filtering**: Search across all table data
- **Column Filtering**: Individual column filters
- **Pagination**: Configurable page sizes and navigation
- **Row Selection**: Single and multi-row selection
- **Column Visibility**: Show/hide columns dynamically
- **Responsive Design**: Mobile-friendly table layout

### TanStack Form
- **Type-Safe Forms**: Fully typed form state and validation
- **Field Validation**: Synchronous validation with error messages
- **Async Validation**: Email availability checking simulation
- **Complex Field Types**: Text, select, checkbox, textarea, number inputs
- **Nested Objects**: Address and company information handling
- **Form State Management**: Real-time form state monitoring
- **Submission Handling**: Form submission with loading states

### TanStack Router
- **Type-Safe Routing**: Fully typed routes and parameters
- **Nested Layouts**: Shared layout components
- **Route Parameters**: Dynamic route segments
- **Navigation**: Programmatic navigation and Link components
- **DevTools**: Router DevTools for debugging routes
- **Code Organization**: Modular route definitions

## 🛠️ Technology Stack

- **React 19** - Latest React features
- **TypeScript** - Type safety throughout
- **Vite** - Fast build tool and dev server
- **TanStack Query** - Data fetching and caching
- **TanStack Table** - Powerful table functionality
- **TanStack Form** - Type-safe form management
- **TanStack Router** - Type-safe routing
- **Axios** - HTTP client for API calls
- **Tailwind CSS** - Utility-first CSS framework

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   └── Layout.tsx      # Main layout with navigation
├── pages/              # Route components
│   ├── Home.tsx        # Landing page
│   ├── UsersPage.tsx   # User list page
│   ├── UserDetailPage.tsx # Individual user details
│   ├── CreateUserPage.tsx # User creation form
│   ├── QueryDemo.tsx   # TanStack Query examples
│   ├── TableDemo.tsx   # TanStack Table examples
│   └── FormDemo.tsx    # TanStack Form examples
├── App.tsx             # Root component
├── router.tsx          # Route definitions
├── main.tsx           # Application entry point
└── index.css          # Global styles
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd tanstack-demo
```

2. Install dependencies:
```bash
npm install
```

3. Install Tailwind CSS:
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

4. Configure Tailwind CSS in `tailwind.config.js`:
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

5. Start the development server:
```bash
npm run dev
```

## 📚 Learning Objectives

This project demonstrates:

1. **Data Management**: How to handle server state with TanStack Query
2. **Table Functionality**: Advanced table features with TanStack Table
3. **Form Handling**: Type-safe forms with validation using TanStack Form
4. **Routing**: Type-safe navigation with TanStack Router
5. **State Management**: Effective state management patterns
6. **TypeScript Integration**: Leveraging TypeScript for better developer experience
7. **Modern React Patterns**: Hooks, context, and modern React practices

## 🎯 Key Demonstrations

### Query Demo (`/query-demo`)
- Fetching posts and users from JSONPlaceholder API
- Creating new posts with optimistic updates
- Deleting posts with cache management
- Real-time query status monitoring
- Background refetching demonstration

### Table Demo (`/table-demo`)
- Comprehensive user table with all TanStack Table features
- Sorting, filtering, and pagination
- Row selection and column visibility
- Responsive design patterns

### Form Demo (`/form-demo`)
- Complex contact form with multiple field types
- Real-time validation and async email checking
- Nested object handling (address, company)
- Form state monitoring and error handling

### Users Section (`/users`)
- User listing with navigation to detail pages
- User creation form integration
- Demonstrates router navigation patterns

## 🔧 API Integration

The project uses JSONPlaceholder (https://jsonplaceholder.typicode.com/) for:
- Fetching users and posts
- Demonstrating CRUD operations
- Simulating real API interactions

## 🎨 Styling

- Tailwind CSS for utility-first styling
- Responsive design principles
- Custom animations and transitions
- Consistent color palette and spacing
- Accessible form controls and navigation

## 📖 Additional Resources

- [TanStack Query Docs](https://tanstack.com/query)
- [TanStack Table Docs](https://tanstack.com/table)
- [TanStack Form Docs](https://tanstack.com/form)
- [TanStack Router Docs](https://tanstack.com/router)
- [React TypeScript Guide](https://react-typescript-cheatsheet.netlify.app/)

## 🤝 Contributing

This is a learning project. Feel free to:
- Add more examples
- Improve existing demonstrations
- Add better error handling
- Enhance the UI/UX
- Add tests

## 📄 License

MIT License - feel free to use this project for learning purposes.

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
