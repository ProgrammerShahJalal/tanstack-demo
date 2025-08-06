import { createRootRoute, createRoute, createRouter, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import React from 'react'
import Layout from './components/Layout'
import Home from './pages/Home'
import UsersPage from './pages/UsersPage'
import UserDetailPage from './pages/UserDetailPage'
import CreateUserPage from './pages/CreateUserPage'
import QueryDemo from './pages/QueryDemo'
import TableDemo from './pages/TableDemo'
import FormDemo from './pages/FormDemo'

// Root route
const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
      <TanStackRouterDevtools />
    </Layout>
  ),
})

// Define routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
})

const usersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/users',
  component: UsersPage,
})

const userDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/users/$userId',
  component: UserDetailPage,
})

const createUserRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/users/create',
  component: CreateUserPage,
})

const queryDemoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/query-demo',
  component: QueryDemo,
})

const tableDemoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/table-demo',
  component: TableDemo,
})

const formDemoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/form-demo',
  component: FormDemo,
})

// Create the route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  usersRoute,
  userDetailRoute,
  createUserRoute,
  queryDemoRoute,
  tableDemoRoute,
  formDemoRoute,
])

// Create router
export const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
