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
    'Bangladesh',
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
        <h1 className="text-2xl/8 font-bold text-gray-900">TanStack Form Demo</h1>
        <p className="mt-1 text-sm/6 text-gray-600">
          Comprehensive form with validation, async validation, and complex field types
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <div className="bg-white shadow sm:rounded-lg">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
              form.handleSubmit()
            }}
          >
            <div className="space-y-12 px-4 py-5 sm:p-6">
              {/* Personal Information Section */}
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base/7 font-semibold text-gray-900">Personal Information</h2>
                <p className="mt-1 text-sm/6 text-gray-600">
                  Basic contact information and personal details.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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
                      <div className="sm:col-span-3">
                        <label htmlFor={field.name} className="block text-sm/6 font-medium text-gray-900">
                          First Name *
                        </label>
                        <div className="mt-2">
                          <input
                            id={field.name}
                            name={field.name}
                            type="text"
                            autoComplete="given-name"
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6 ${
                              field.state.meta.errors.length > 0 
                                ? 'outline-red-300 focus:outline-red-600' 
                                : 'outline-gray-300 focus:outline-indigo-600'
                            }`}
                            placeholder="Enter first name"
                          />
                        </div>
                        {field.state.meta.errors.length > 0 && (
                          <p className="mt-2 text-sm text-red-600">{field.state.meta.errors[0]}</p>
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
                      <div className="sm:col-span-3">
                        <label htmlFor={field.name} className="block text-sm/6 font-medium text-gray-900">
                          Last Name *
                        </label>
                        <div className="mt-2">
                          <input
                            id={field.name}
                            name={field.name}
                            type="text"
                            autoComplete="family-name"
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6 ${
                              field.state.meta.errors.length > 0 
                                ? 'outline-red-300 focus:outline-red-600' 
                                : 'outline-gray-300 focus:outline-indigo-600'
                            }`}
                            placeholder="Enter last name"
                          />
                        </div>
                        {field.state.meta.errors.length > 0 && (
                          <p className="mt-2 text-sm text-red-600">{field.state.meta.errors[0]}</p>
                        )}
                      </div>
                    )}
                  </form.Field>

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
                      <div className="sm:col-span-4">
                        <label htmlFor={field.name} className="block text-sm/6 font-medium text-gray-900">
                          Email Address *
                        </label>
                        <div className="mt-2 relative">
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
                          <p className="mt-2 text-sm text-red-600">{field.state.meta.errors[0]}</p>
                        )}
                        {asyncValidationStatus.email === 'success' && field.state.meta.errors.length === 0 && (
                          <p className="mt-2 text-sm text-green-600">Email is available</p>
                        )}
                      </div>
                    )}
                  </form.Field>

                  {/* Phone */}
                  <form.Field
                    name="phone"
                    validators={{
                      onChange: ({ value }) =>
                        value && !/^[\d\s\-+()]+$/.test(value) ? 'Invalid phone number format' : undefined,
                    }}
                  >
                    {(field) => (
                      <div className="sm:col-span-3">
                        <label htmlFor={field.name} className="block text-sm/6 font-medium text-gray-900">
                          Phone Number
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

                  {/* Age */}
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
                      <div className="sm:col-span-2">
                        <label htmlFor={field.name} className="block text-sm/6 font-medium text-gray-900">
                          Age *
                        </label>
                        <div className="mt-2">
                          <input
                            id={field.name}
                            name={field.name}
                            type="number"
                            min="18"
                            max="120"
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(Number(e.target.value))}
                            className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6 ${
                              field.state.meta.errors.length > 0 
                                ? 'outline-red-300 focus:outline-red-600' 
                                : 'outline-gray-300 focus:outline-indigo-600'
                            }`}
                          />
                        </div>
                        {field.state.meta.errors.length > 0 && (
                          <p className="mt-2 text-sm text-red-600">{field.state.meta.errors[0]}</p>
                        )}
                      </div>
                    )}
                  </form.Field>

                  {/* Country */}
                  <form.Field
                    name="country"
                    validators={{
                      onChange: ({ value }) => !value ? 'Please select a country' : undefined,
                    }}
                  >
                    {(field) => (
                      <div className="sm:col-span-3">
                        <label htmlFor={field.name} className="block text-sm/6 font-medium text-gray-900">
                          Country *
                        </label>
                        <div className="mt-2 grid grid-cols-1">
                          <select
                            id={field.name}
                            name={field.name}
                            autoComplete="country-name"
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            className={`col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6 ${
                              field.state.meta.errors.length > 0 
                                ? 'outline-red-300 focus:outline-red-600' 
                                : 'outline-gray-300 focus:outline-indigo-600'
                            }`}
                          >
                            <option value="">Select a country</option>
                            {countries.map((country) => (
                              <option key={country} value={country}>
                                {country}
                              </option>
                            ))}
                          </select>
                          <svg 
                            className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" 
                            viewBox="0 0 16 16" 
                            fill="currentColor" 
                            aria-hidden="true"
                          >
                            <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                          </svg>
                        </div>
                        {field.state.meta.errors.length > 0 && (
                          <p className="mt-2 text-sm text-red-600">{field.state.meta.errors[0]}</p>
                        )}
                      </div>
                    )}
                  </form.Field>
                </div>
              </div>

              {/* Interests & Preferences Section */}
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base/7 font-semibold text-gray-900">Interests & Preferences</h2>
                <p className="mt-1 text-sm/6 text-gray-600">
                  Let us know about your interests and communication preferences.
                </p>

                <div className="mt-10 space-y-10">
                  {/* Interests */}
                  <fieldset>
                    <legend className="text-sm/6 font-semibold text-gray-900">Interests (select multiple)</legend>
                    <form.Field name="interests">
                      {(field) => (
                        <div className="mt-6 space-y-6">
                          <div className="grid grid-cols-2 gap-6">
                            {interestOptions.map((interest) => (
                              <div key={interest} className="flex gap-3">
                                <div className="flex h-6 shrink-0 items-center">
                                  <div className="group grid size-4 grid-cols-1">
                                    <input
                                      id={`interest-${interest}`}
                                      name="interests"
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
                                      className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                    />
                                    <svg
                                      fill="none"
                                      viewBox="0 0 14 14"
                                      className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                    >
                                      <path
                                        d="M3 8L6 11L11 3.5"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="opacity-0 group-has-checked:opacity-100"
                                      />
                                    </svg>
                                  </div>
                                </div>
                                <div className="text-sm/6">
                                  <label htmlFor={`interest-${interest}`} className="font-medium text-gray-900">
                                    {interest}
                                  </label>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </form.Field>
                  </fieldset>

                  {/* Newsletter Subscription */}
                  <fieldset>
                    <legend className="text-sm/6 font-semibold text-gray-900">Communication preferences</legend>
                    <form.Field name="newsletter">
                      {(field) => (
                        <div className="mt-6 space-y-6">
                          <div className="flex gap-3">
                            <div className="flex h-6 shrink-0 items-center">
                              <div className="group grid size-4 grid-cols-1">
                                <input
                                  id="newsletter"
                                  name="newsletter"
                                  type="checkbox"
                                  checked={field.state.value}
                                  onChange={(e) => field.handleChange(e.target.checked)}
                                  className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                />
                                <svg
                                  fill="none"
                                  viewBox="0 0 14 14"
                                  className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                >
                                  <path
                                    d="M3 8L6 11L11 3.5"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-checked:opacity-100"
                                  />
                                </svg>
                              </div>
                            </div>
                            <div className="text-sm/6">
                              <label htmlFor="newsletter" className="font-medium text-gray-900">
                                Newsletter subscription
                              </label>
                              <p className="text-gray-500">
                                Get notified about new features and updates.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </form.Field>
                  </fieldset>
                </div>
              </div>

              {/* Additional Information Section */}
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base/7 font-semibold text-gray-900">Additional Information</h2>
                <p className="mt-1 text-sm/6 text-gray-600">
                  Share any additional information or comments you'd like us to know.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  {/* Message */}
                  <form.Field
                    name="message"
                    validators={{
                      onChange: ({ value }) =>
                        value.length > 500 ? 'Message must be less than 500 characters' : undefined,
                    }}
                  >
                    {(field) => (
                      <div className="col-span-full">
                        <label htmlFor={field.name} className="block text-sm/6 font-medium text-gray-900">
                          Message
                        </label>
                        <div className="mt-2">
                          <textarea
                            id={field.name}
                            name={field.name}
                            rows={4}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6 ${
                              field.state.meta.errors.length > 0 
                                ? 'outline-red-300 focus:outline-red-600' 
                                : 'outline-gray-300 focus:outline-indigo-600'
                            }`}
                            placeholder="Enter additional information or comments..."
                          />
                        </div>
                        <div className="mt-2 flex justify-between">
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

                  {/* Agreement */}
                  <form.Field
                    name="agreement"
                    validators={{
                      onChange: ({ value }) => !value ? 'You must agree to the terms' : undefined,
                    }}
                  >
                    {(field) => (
                      <div className="col-span-full">
                        <div className="flex gap-3">
                          <div className="flex h-6 shrink-0 items-center">
                            <div className="group grid size-4 grid-cols-1">
                              <input
                                id={field.name}
                                name={field.name}
                                type="checkbox"
                                checked={field.state.value}
                                onChange={(e) => field.handleChange(e.target.checked)}
                                className={`col-start-1 row-start-1 appearance-none rounded-sm border bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto ${
                                  field.state.meta.errors.length > 0 ? 'border-red-300' : 'border-gray-300'
                                }`}
                              />
                              <svg
                                fill="none"
                                viewBox="0 0 14 14"
                                className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                              >
                                <path
                                  d="M3 8L6 11L11 3.5"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="opacity-0 group-has-checked:opacity-100"
                                />
                              </svg>
                            </div>
                          </div>
                          <div className="text-sm/6">
                            <label htmlFor={field.name} className="font-medium text-gray-900">
                              I agree to the terms and conditions and privacy policy *
                            </label>
                            {field.state.meta.errors.length > 0 && (
                              <p className="mt-1 text-sm text-red-600">{field.state.meta.errors[0]}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </form.Field>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
              >
                {([canSubmit, isSubmitting]) => (
                  <button
                    type="submit"
                    disabled={!canSubmit}
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
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
