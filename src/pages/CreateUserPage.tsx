import React from 'react'
import { useForm } from '@tanstack/react-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import axios from 'axios'

interface UserFormData {
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

const createUser = async (userData: UserFormData) => {
  const response = await axios.post('https://jsonplaceholder.typicode.com/users', userData)
  return response.data
}

const CreateUserPage: React.FC = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      navigate({ to: '/users' })
    },
  })

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      website: '',
      address: {
        street: '',
        city: '',
        zipcode: '',
      },
      company: {
        name: '',
      },
    } as UserFormData,
    onSubmit: async ({ value }) => {
      mutation.mutate(value)
    },
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button
          type="button"
          onClick={() => navigate({ to: '/users' })}
          className="text-blue-500 hover:text-blue-600 flex items-center"
        >
          <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Users
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Create New User</h1>
      </div>

      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
              form.handleSubmit()
            }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Name Field */}
              <form.Field
                name="name"
                validators={{
                  onChange: ({ value }) =>
                    !value ? 'Name is required' : value.length < 2 ? 'Name must be at least 2 characters' : undefined,
                }}
              >
                {(field) => (
                  <div>
                    <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                      Name *
                    </label>
                    <input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                        field.state.meta.errors.length > 0 ? 'border-red-300' : ''
                      }`}
                      placeholder="Enter full name"
                    />
                    {field.state.meta.errors.length > 0 && (
                      <p className="mt-2 text-sm text-red-600">{field.state.meta.errors[0]}</p>
                    )}
                  </div>
                )}
              </form.Field>

              {/* Email Field */}
              <form.Field
                name="email"
                validators={{
                  onChange: ({ value }) => {
                    if (!value) return 'Email is required'
                    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email'
                    return undefined
                  },
                }}
              >
                {(field) => (
                  <div>
                    <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                      Email *
                    </label>
                    <input
                      id={field.name}
                      name={field.name}
                      type="email"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                        field.state.meta.errors.length > 0 ? 'border-red-300' : ''
                      }`}
                      placeholder="Enter email address"
                    />
                    {field.state.meta.errors.length > 0 && (
                      <p className="mt-2 text-sm text-red-600">{field.state.meta.errors[0]}</p>
                    )}
                  </div>
                )}
              </form.Field>

              {/* Phone Field */}
              <form.Field
                name="phone"
                validators={{
                  onChange: ({ value }) =>
                    !value ? 'Phone is required' : undefined,
                }}
              >
                {(field) => (
                  <div>
                    <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                      Phone *
                    </label>
                    <input
                      id={field.name}
                      name={field.name}
                      type="tel"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                        field.state.meta.errors.length > 0 ? 'border-red-300' : ''
                      }`}
                      placeholder="Enter phone number"
                    />
                    {field.state.meta.errors.length > 0 && (
                      <p className="mt-2 text-sm text-red-600">{field.state.meta.errors[0]}</p>
                    )}
                  </div>
                )}
              </form.Field>

              {/* Website Field */}
              <form.Field name="website">
                {(field) => (
                  <div>
                    <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                      Website
                    </label>
                    <input
                      id={field.name}
                      name={field.name}
                      type="url"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      placeholder="Enter website URL"
                    />
                  </div>
                )}
              </form.Field>
            </div>

            {/* Address Section */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Address Information</h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <form.Field
                  name="address.street"
                  validators={{
                    onChange: ({ value }) =>
                      !value ? 'Street address is required' : undefined,
                  }}
                >
                  {(field) => (
                    <div>
                      <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                        Street Address *
                      </label>
                      <input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                          field.state.meta.errors.length > 0 ? 'border-red-300' : ''
                        }`}
                        placeholder="Enter street address"
                      />
                      {field.state.meta.errors.length > 0 && (
                        <p className="mt-2 text-sm text-red-600">{field.state.meta.errors[0]}</p>
                      )}
                    </div>
                  )}
                </form.Field>

                <form.Field
                  name="address.city"
                  validators={{
                    onChange: ({ value }) =>
                      !value ? 'City is required' : undefined,
                  }}
                >
                  {(field) => (
                    <div>
                      <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                        City *
                      </label>
                      <input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                          field.state.meta.errors.length > 0 ? 'border-red-300' : ''
                        }`}
                        placeholder="Enter city"
                      />
                      {field.state.meta.errors.length > 0 && (
                        <p className="mt-2 text-sm text-red-600">{field.state.meta.errors[0]}</p>
                      )}
                    </div>
                  )}
                </form.Field>

                <form.Field name="address.zipcode">
                  {(field) => (
                    <div>
                      <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                        ZIP Code
                      </label>
                      <input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        placeholder="Enter ZIP code"
                      />
                    </div>
                  )}
                </form.Field>
              </div>
            </div>

            {/* Company Section */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Company Information</h3>
              <form.Field name="company.name">
                {(field) => (
                  <div>
                    <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                      Company Name
                    </label>
                    <input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      placeholder="Enter company name"
                    />
                  </div>
                )}
              </form.Field>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => navigate({ to: '/users' })}
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
              >
                {([canSubmit, isSubmitting]) => (
                  <button
                    type="submit"
                    disabled={!canSubmit || isSubmitting || mutation.isPending}
                    className="bg-blue-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {mutation.isPending ? 'Creating...' : 'Create User'}
                  </button>
                )}
              </form.Subscribe>
            </div>

            {mutation.isError && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <div className="text-red-800">
                  Error creating user: {mutation.error instanceof Error ? mutation.error.message : 'Unknown error'}
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateUserPage
