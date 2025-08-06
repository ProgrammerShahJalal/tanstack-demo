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
        <h1 className="text-2xl/8 font-bold text-gray-900">Create New User</h1>
      </div>

      <div className="bg-white shadow sm:rounded-lg">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
        >
          <div className="space-y-12 px-4 py-5 sm:p-6">
            {/* Personal Information */}
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base/7 font-semibold text-gray-900">Personal Information</h2>
              <p className="mt-1 text-sm/6 text-gray-600">
                Basic contact information for the new user.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              {/* Name Field */}
              <form.Field
                name="name"
                validators={{
                  onChange: ({ value }) =>
                    !value ? 'Name is required' : value.length < 2 ? 'Name must be at least 2 characters' : undefined,
                }}
              >
                {(field) => (
                  <div className="sm:col-span-3">
                    <label htmlFor={field.name} className="block text-sm/6 font-medium text-gray-900">
                      Name *
                    </label>
                    <div className="mt-2">
                      <input
                        id={field.name}
                        name={field.name}
                        type="text"
                        autoComplete="name"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6 ${
                          field.state.meta.errors.length > 0 
                            ? 'outline-red-300 focus:outline-red-600' 
                            : 'outline-gray-300 focus:outline-indigo-600'
                        }`}
                        placeholder="Enter full name"
                      />
                    </div>
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
                  <div className="sm:col-span-3">
                    <label htmlFor={field.name} className="block text-sm/6 font-medium text-gray-900">
                      Email *
                    </label>
                    <div className="mt-2">
                      <input
                        id={field.name}
                        name={field.name}
                        type="email"
                        autoComplete="email"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6 ${
                          field.state.meta.errors.length > 0 
                            ? 'outline-red-300 focus:outline-red-600' 
                            : 'outline-gray-300 focus:outline-indigo-600'
                        }`}
                        placeholder="Enter email address"
                      />
                    </div>
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
                  <div className="sm:col-span-3">
                    <label htmlFor={field.name} className="block text-sm/6 font-medium text-gray-900">
                      Phone *
                    </label>
                    <div className="mt-2">
                      <input
                        id={field.name}
                        name={field.name}
                        type="tel"
                        autoComplete="tel"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6 ${
                          field.state.meta.errors.length > 0 
                            ? 'outline-red-300 focus:outline-red-600' 
                            : 'outline-gray-300 focus:outline-indigo-600'
                        }`}
                        placeholder="Enter phone number"
                      />
                    </div>
                    {field.state.meta.errors.length > 0 && (
                      <p className="mt-2 text-sm text-red-600">{field.state.meta.errors[0]}</p>
                    )}
                  </div>
                )}
              </form.Field>

              {/* Website Field */}
              <form.Field name="website">
                {(field) => (
                  <div className="sm:col-span-3">
                    <label htmlFor={field.name} className="block text-sm/6 font-medium text-gray-900">
                      Website
                    </label>
                    <div className="mt-2">
                      <input
                        id={field.name}
                        name={field.name}
                        type="url"
                        autoComplete="url"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        placeholder="Enter website URL"
                      />
                    </div>
                  </div>
                )}
              </form.Field>
            </div>

            {/* Address Section */}
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base/7 font-semibold text-gray-900">Address Information</h2>
              <p className="mt-1 text-sm/6 text-gray-600">
                Address information for the user.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <form.Field
                  name="address.street"
                  validators={{
                    onChange: ({ value }) =>
                      !value ? 'Street address is required' : undefined,
                  }}
                >
                  {(field) => (
                    <div className="col-span-full">
                      <label htmlFor={field.name} className="block text-sm/6 font-medium text-gray-900">
                        Street Address *
                      </label>
                      <div className="mt-2">
                        <input
                          id={field.name}
                          name={field.name}
                          type="text"
                          autoComplete="street-address"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6 ${
                            field.state.meta.errors.length > 0 
                              ? 'outline-red-300 focus:outline-red-600' 
                              : 'outline-gray-300 focus:outline-indigo-600'
                          }`}
                          placeholder="Enter street address"
                        />
                      </div>
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
                    <div className="sm:col-span-2 sm:col-start-1">
                      <label htmlFor={field.name} className="block text-sm/6 font-medium text-gray-900">
                        City *
                      </label>
                      <div className="mt-2">
                        <input
                          id={field.name}
                          name={field.name}
                          type="text"
                          autoComplete="address-level2"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6 ${
                            field.state.meta.errors.length > 0 
                              ? 'outline-red-300 focus:outline-red-600' 
                              : 'outline-gray-300 focus:outline-indigo-600'
                          }`}
                          placeholder="Enter city"
                        />
                      </div>
                      {field.state.meta.errors.length > 0 && (
                        <p className="mt-2 text-sm text-red-600">{field.state.meta.errors[0]}</p>
                      )}
                    </div>
                  )}
                </form.Field>

                <form.Field name="address.zipcode">
                  {(field) => (
                    <div className="sm:col-span-2">
                      <label htmlFor={field.name} className="block text-sm/6 font-medium text-gray-900">
                        ZIP / Postal Code
                      </label>
                      <div className="mt-2">
                        <input
                          id={field.name}
                          name={field.name}
                          type="text"
                          autoComplete="postal-code"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                          placeholder="Enter ZIP code"
                        />
                      </div>
                    </div>
                  )}
                </form.Field>
              </div>
            </div>

            {/* Company Section */}
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base/7 font-semibold text-gray-900">Company Information</h2>
              <p className="mt-1 text-sm/6 text-gray-600">
                Optional company information.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <form.Field name="company.name">
                  {(field) => (
                    <div className="sm:col-span-4">
                      <label htmlFor={field.name} className="block text-sm/6 font-medium text-gray-900">
                        Company Name
                      </label>
                      <div className="mt-2">
                        <input
                          id={field.name}
                          name={field.name}
                          type="text"
                          autoComplete="organization"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                          placeholder="Enter company name"
                        />
                      </div>
                    </div>
                  )}
                </form.Field>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                onClick={() => navigate({ to: '/users' })}
                className="text-sm/6 font-semibold text-gray-900 hover:text-gray-700"
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
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
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
          </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateUserPage
