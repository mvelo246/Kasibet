import React from 'react'

export default function Input({ 
  label, 
  error, 
  className = '', 
  required = false,
  ...props 
}) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium mb-2 text-kasibet-text-primary">
          {label}
          {required && <span className="text-kasibet-danger ml-1">*</span>}
        </label>
      )}
      <input
        className={`input-field ${error ? 'border-kasibet-danger' : ''} ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-kasibet-danger">{error}</p>
      )}
    </div>
  )
}

