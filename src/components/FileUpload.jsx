import React, { useRef, useState } from 'react'
import { IoCloudUploadOutline, IoClose, IoImageOutline } from 'react-icons/io5'

export default function FileUpload({ 
  label, 
  accept = 'image/*,.pdf', 
  maxSize = 5, // MB
  value,
  onChange,
  error,
  required = false 
}) {
  const fileInputRef = useRef(null)
  const [dragActive, setDragActive] = useState(false)
  const [preview, setPreview] = useState(null)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file) => {
    // Validate file size
    const fileSizeMB = file.size / (1024 * 1024)
    if (fileSizeMB > maxSize) {
      alert(`File size must be less than ${maxSize}MB`)
      return
    }

    // Validate file type
    const validTypes = accept.split(',').map(type => type.trim())
    const isValidType = validTypes.some(type => {
      if (type.includes('/*')) {
        return file.type.startsWith(type.split('/')[0])
      }
      return file.type === type || file.name.endsWith(type.replace('.', ''))
    })

    if (!isValidType) {
      alert(`File type not supported. Accepted: ${accept}`)
      return
    }

    // Create preview for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(file)
    } else {
      setPreview(null)
    }

    onChange(file)
  }

  const handleRemove = () => {
    setPreview(null)
    onChange(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium mb-2 text-kasibet-text-primary">
          {label}
          {required && <span className="text-kasibet-danger ml-1">*</span>}
        </label>
      )}
      
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-6 transition-colors ${
          dragActive
            ? 'border-kasibet-accent bg-kasibet-bg-modal'
            : error
            ? 'border-kasibet-danger bg-kasibet-bg-card'
            : 'border-gray-600 bg-kasibet-bg-card hover:border-kasibet-accent'
        }`}
      >
        {value ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-16 h-16 object-cover rounded"
                />
              ) : (
                <div className="w-16 h-16 bg-kasibet-bg-modal rounded flex items-center justify-center">
                  <IoImageOutline className="w-8 h-8 text-gray-400" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{value.name}</p>
                <p className="text-xs text-gray-400">
                  {(value.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleRemove}
              className="text-gray-400 hover:text-white transition-colors p-2"
              aria-label="Remove file"
            >
              <IoClose className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div className="text-center">
            <IoCloudUploadOutline className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-sm text-gray-300 mb-1">
              Drag and drop your file here, or
            </p>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-kasibet-accent hover:text-kasibet-accent-hover font-semibold text-sm"
            >
              browse to upload
            </button>
            <p className="text-xs text-gray-400 mt-2">
              Accepted: {accept} (Max {maxSize}MB)
            </p>
          </div>
        )}
        
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-kasibet-danger">{error}</p>
      )}
    </div>
  )
}

