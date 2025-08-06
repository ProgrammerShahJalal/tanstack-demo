import React, { useState } from 'react'
import { useForm } from '@tanstack/react-form'

interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  age: number
  country: string
  interests: string[]
  newsletter: boolean
  message: string
  agreement: boolean
}

interface AsyncValidationResult {
  available: boolean
  message: string
}

// Simulate async email validation
const validateEmailAvailability = async (email: string): Promise<AsyncValidationResult> => {
  await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
  
  const unavailableEmails = ['admin@example.com', 'test@test.com', 'user@demo.com']
  const isAvailable = !unavailableEmails.includes(email.toLowerCase())
  
  return {
    available: isAvailable,
    message: isAvailable ? 'Email is available' : 'Email is already taken'
  }
}

const FormDemo: React.FC = () => {
  const [submittedData, setSubmittedData] = useState<ContactFormData | null>(null)
  const [asyncValidationStatus, setAsyncValidationStatus] = useState<{[key: string]: 'idle' | 'validating' | 'success' | 'error'}>({})

  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      age: 18,
      country: '',
      interests: [],
      newsletter: false,
      message: '',
      agreement: false,
    } as ContactFormData,
    onSubmit: async ({ value }) => {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSubmittedData(value)
      
      // Reset form after successful submission
      form.reset()
    },
  })

  const countries = [
    'United States',
    'Canada',
    'United Kingdom',
    'Germany',
    'France',
    'Australia',
    'Japan',
    'Other'
  ]

  const interestOptions = [
    'Technology',
    'Sports',
    'Music',
    'Travel',
    'Food',
    'Art',
    'Science',
    'Literature'
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">TanStack Form Demo</h1>
        <p className="mt-2 text-gray-600">
          Comprehensive form with validation, async validation, and complex field types
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Contact Information Form</h2>
          
          <form
            onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
              form.handleSubmit()
            }}
            className="space-y-6"
          >
            {/* Personal Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Personal Information</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* First Name */}
                <form.Field
                  name="firstName"
                  validators={{
                    onChange: ({ value }) =>
                      !value ? 'First name is required' :
                      value.length < 2 ? 'First name must be at least 2 characters' :
                      !/^[a-zA-Z\s]+$/.test(value) ? 'First name can only contain letters' :
                      undefined,
                    onBlur: ({ value }) =>
                      value.length > 50 ? 'First name must be less than 50 characters' : undefined,
                  }}
                >
                  {(field) => (
                    <div>
                      <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                        First Name *
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
                        placeholder="Enter first name"
                      />
                      {field.state.meta.errors.length > 0 && (
                        <p className="mt-1 text-sm text-red-600">{field.state.meta.errors[0]}</p>
                      )}
                    </div>
                  )}
                </form.Field>

                {/* Last Name */}
                <form.Field
                  name="lastName"
                  validators={{
                    onChange: ({ value }) =>
                      !value ? 'Last name is required' :
                      value.length < 2 ? 'Last name must be at least 2 characters' :
                      !/^[a-zA-Z\s]+$/.test(value) ? 'Last name can only contain letters' :
                      undefined,
                  }}
                >
                  {(field) => (
                    <div>
                      <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                        Last Name *
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
                        placeholder="Enter last name"
                      />
                      {field.state.meta.errors.length > 0 && (
                        <p className="mt-1 text-sm text-red-600">{field.state.meta.errors[0]}</p>
                      )}
                    </div>
                  )}
                </form.Field>
              </div>

              {/* Email with Async Validation */}
              <form.Field
                name="email"
                validators={{
                  onChange: ({ value }) => {
                    if (!value) return 'Email is required'
                    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email'
                    return undefined
                  },
                  onChangeAsync: async ({ value }) => {
                    if (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return
                    
                    setAsyncValidationStatus(prev => ({ ...prev, email: 'validating' }))
                    try {
                      const result = await validateEmailAvailability(value)
                      setAsyncValidationStatus(prev => ({ ...prev, email: result.available ? 'success' : 'error' }))
                      return result.available ? undefined : result.message
                    } catch {
                      setAsyncValidationStatus(prev => ({ ...prev, email: 'error' }))
                      return 'Error validating email'
                    }
                  },
                }}
              >
                {(field) => (
                  <div>
                    <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                      Email Address *
                    </label>
                    <div className="relative">
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
                      {asyncValidationStatus.email === 'validating' && (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                        </div>
                      )}
                      {asyncValidationStatus.email === 'success' && (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                          <span className="text-green-500">✓</span>
                        </div>
                      )}
                    </div>
                    {field.state.meta.errors.length > 0 && (
                      <p className="mt-1 text-sm text-red-600">{field.state.meta.errors[0]}</p>
                    )}
                    {asyncValidationStatus.email === 'success' && field.state.meta.errors.length === 0 && (
                      <p className="mt-1 text-sm text-green-600">Email is available</p>
                    )}
                  </div>
                )}
              </form.Field>

              {/* Phone and Age */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.Field
                  name="phone"
                  validators={{
                    onChange: ({ value }) =>
                      value && !/^[\d\s\-+()]+$/.test(value) ? 'Invalid phone number format' : undefined,
                  }}
                >
                  {(field) => (
                    <div>
                      <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                        Phone Number
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
                        <p className="mt-1 text-sm text-red-600">{field.state.meta.errors[0]}</p>
                      )}
                    </div>
                  )}
                </form.Field>

                <form.Field
                  name="age"
                  validators={{
                    onChange: ({ value }) =>
                      value < 18 ? 'Must be at least 18 years old' :
                      value > 120 ? 'Age must be realistic' :
                      undefined,
                  }}
                >
                  {(field) => (
                    <div>
                      <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                        Age *
                      </label>
                      <input
                        id={field.name}
                        name={field.name}
                        type="number"
                        min="18"
                        max="120"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(Number(e.target.value))}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                          field.state.meta.errors.length > 0 ? 'border-red-300' : ''
                        }`}
                      />
                      {field.state.meta.errors.length > 0 && (
                        <p className="mt-1 text-sm text-red-600">{field.state.meta.errors[0]}</p>
                      )}
                    </div>
                  )}
                </form.Field>
              </div>

              {/* Country */}
              <form.Field
                name="country"
                validators={{
                  onChange: ({ value }) => !value ? 'Please select a country' : undefined,
                }}
              >
                {(field) => (
                  <div>
                    <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                      Country *
                    </label>
                    <select
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                        field.state.meta.errors.length > 0 ? 'border-red-300' : ''
                      }`}
                    >
                      <option value="">Select a country</option>
                      {countries.map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                    {field.state.meta.errors.length > 0 && (
                      <p className="mt-1 text-sm text-red-600">{field.state.meta.errors[0]}</p>
                    )}
                  </div>
                )}
              </form.Field>
            </div>

            {/* Interests Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Interests & Preferences</h3>
              
              <form.Field name="interests">
                {(field) => (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Interests (select multiple)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {interestOptions.map((interest) => (
                        <label key={interest} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={field.state.value.includes(interest)}
                            onChange={(e) => {
                              const currentInterests = field.state.value
                              if (e.target.checked) {
                                field.handleChange([...currentInterests, interest])
                              } else {
                                field.handleChange(currentInterests.filter(i => i !== interest))
                              }
                            }}
                            className="rounded"
                          />
                          <span className="text-sm text-gray-700">{interest}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </form.Field>

              <form.Field name="newsletter">
                {(field) => (
                  <div className="flex items-center space-x-2">
                    <input
                      id={field.name}
                      name={field.name}
                      type="checkbox"
                      checked={field.state.value}
                      onChange={(e) => field.handleChange(e.target.checked)}
                      className="rounded"
                    />
                    <label htmlFor={field.name} className="text-sm text-gray-700">
                      Subscribe to newsletter
                    </label>
                  </div>
                )}
              </form.Field>
            </div>

            {/* Message Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Additional Information</h3>
              
              <form.Field
                name="message"
                validators={{
                  onChange: ({ value }) =>
                    value.length > 500 ? 'Message must be less than 500 characters' : undefined,
                }}
              >
                {(field) => (
                  <div>
                    <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                      Message
                    </label>
                    <textarea
                      id={field.name}
                      name={field.name}
                      rows={4}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                        field.state.meta.errors.length > 0 ? 'border-red-300' : ''
                      }`}
                      placeholder="Enter additional information or comments..."
                    />
                    <div className="mt-1 flex justify-between">
                      {field.state.meta.errors.length > 0 && (
                        <p className="text-sm text-red-600">{field.state.meta.errors[0]}</p>
                      )}
                      <p className="text-sm text-gray-500 ml-auto">
                        {field.state.value.length}/500 characters
                      </p>
                    </div>
                  </div>
                )}
              </form.Field>

              <form.Field
                name="agreement"
                validators={{
                  onChange: ({ value }) => !value ? 'You must agree to the terms' : undefined,
                }}
              >
                {(field) => (
                  <div>
                    <div className="flex items-start space-x-2">
                      <input
                        id={field.name}
                        name={field.name}
                        type="checkbox"
                        checked={field.state.value}
                        onChange={(e) => field.handleChange(e.target.checked)}
                        className={`mt-1 rounded ${
                          field.state.meta.errors.length > 0 ? 'border-red-300' : ''
                        }`}
                      />
                      <label htmlFor={field.name} className="text-sm text-gray-700">
                        I agree to the terms and conditions and privacy policy *
                      </label>
                    </div>
                    {field.state.meta.errors.length > 0 && (
                      <p className="mt-1 text-sm text-red-600">{field.state.meta.errors[0]}</p>
                    )}
                  </div>
                )}
              </form.Field>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t">
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
              >
                {([canSubmit, isSubmitting]) => (
                  <button
                    type="submit"
                    disabled={!canSubmit}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Form'}
                  </button>
                )}
              </form.Subscribe>
            </div>
          </form>
        </div>

        {/* Form State Display */}
        <div className="space-y-6">
          {/* Form State */}
          <div className="bg-white p-6 rounded-lg shadow border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Form State</h3>
            <form.Subscribe>
              {(state) => (
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Valid:</span>
                    <span className={state.isValid ? 'text-green-600' : 'text-red-600'}>
                      {state.isValid ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Can Submit:</span>
                    <span className={state.canSubmit ? 'text-green-600' : 'text-red-600'}>
                      {state.canSubmit ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Is Submitting:</span>
                    <span className={state.isSubmitting ? 'text-yellow-600' : 'text-gray-600'}>
                      {state.isSubmitting ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Is Dirty:</span>
                    <span className={state.isDirty ? 'text-blue-600' : 'text-gray-600'}>
                      {state.isDirty ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Error Count:</span>
                    <span className="text-red-600">{state.errorMap ? Object.keys(state.errorMap).length : 0}</span>
                  </div>
                </div>
              )}
            </form.Subscribe>
          </div>

          {/* Live Form Values */}
          <div className="bg-white p-6 rounded-lg shadow border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Form Values</h3>
            <form.Subscribe>
              {(state) => (
                <pre className="text-xs bg-gray-100 p-4 rounded overflow-auto max-h-64">
                  {JSON.stringify(state.values, null, 2)}
                </pre>
              )}
            </form.Subscribe>
          </div>

          {/* Submitted Data */}
          {submittedData && (
            <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-green-900 mb-4">Form Submitted Successfully!</h3>
              <pre className="text-xs bg-white p-4 rounded overflow-auto max-h-64 border">
                {JSON.stringify(submittedData, null, 2)}
              </pre>
              <button
                onClick={() => setSubmittedData(null)}
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700"
              >
                Clear
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FormDemo
