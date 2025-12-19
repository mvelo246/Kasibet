import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Card from '../components/Card'
import Button from '../components/Button'
import FileUpload from '../components/FileUpload'
import { IoCheckmarkCircle, IoTimeOutline, IoCloseCircle, IoLockClosed } from 'react-icons/io5'

export default function ProfileVerification() {
  const navigate = useNavigate()
  const { user, submitVerification } = useAuth()
  const [idFile, setIdFile] = useState(null)
  const [addressFile, setAddressFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [idError, setIdError] = useState('')
  const [addressError, setAddressError] = useState('')

  const verification = user?.verification || { status: 'not_verified', submittedAt: null }

  const getStatusInfo = () => {
    switch (verification.status) {
      case 'verified':
        return {
          icon: <IoCheckmarkCircle className="w-8 h-8 text-kasibet-success" />,
          text: 'Verified',
          color: 'text-kasibet-success',
          bg: 'bg-green-900/20',
          border: 'border-green-500',
        }
      case 'pending':
        return {
          icon: <IoTimeOutline className="w-8 h-8 text-kasibet-warning" />,
          text: 'Pending Review',
          color: 'text-kasibet-warning',
          bg: 'bg-yellow-900/20',
          border: 'border-yellow-500',
        }
      case 'rejected':
        return {
          icon: <IoCloseCircle className="w-8 h-8 text-kasibet-danger" />,
          text: 'Rejected',
          color: 'text-kasibet-danger',
          bg: 'bg-red-900/20',
          border: 'border-red-500',
        }
      default:
        return {
          icon: null,
          text: 'Not Verified',
          color: 'text-gray-400',
          bg: 'bg-gray-900/20',
          border: 'border-gray-600',
        }
    }
  }

  const statusInfo = getStatusInfo()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIdError('')
    setAddressError('')

    if (!idFile) {
      setIdError('Please upload your ID document')
      return
    }

    if (!addressFile) {
      setAddressError('Please upload proof of address')
      return
    }

    setLoading(true)

    try {
      await submitVerification(idFile, addressFile)
      // Success - status will be updated in context
    } catch (err) {
      setError(err.message || 'Failed to submit verification. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen p-4 lg:p-8 max-w-3xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate('/profile')}
          className="text-gray-400 hover:text-white transition-colors"
          aria-label="Back to profile"
        >
          ← Back
        </button>
        <h1 className="text-3xl font-bold">Profile Verification</h1>
      </div>

      {/* Verification Status */}
      <Card className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className={`p-3 rounded-lg ${statusInfo.bg} ${statusInfo.border} border`}>
            {statusInfo.icon || <IoLockClosed className="w-8 h-8 text-gray-400" />}
          </div>
          <div>
            <h2 className="text-xl font-semibold">Verification Status</h2>
            <p className={`${statusInfo.color} font-medium`}>{statusInfo.text}</p>
            {verification.submittedAt && (
              <p className="text-sm text-gray-400 mt-1">
                Submitted: {new Date(verification.submittedAt).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>

        {verification.status === 'rejected' && verification.feedback && (
          <div className="mt-4 p-4 bg-red-900/20 border border-red-500 rounded-lg">
            <p className="text-sm font-semibold text-red-400 mb-2">Review Feedback:</p>
            <p className="text-sm text-gray-300">{verification.feedback}</p>
          </div>
        )}
      </Card>

      {/* Upload Form */}
      {verification.status !== 'verified' && (
        <form onSubmit={handleSubmit}>
          <Card className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Required Documents</h2>
            
            <div className="space-y-6">
              <div>
                <FileUpload
                  label="ID Document"
                  accept="image/*,.pdf"
                  maxSize={5}
                  value={idFile}
                  onChange={setIdFile}
                  error={idError}
                  required
                />
                <p className="text-xs text-gray-400 mt-2">
                  Acceptable: Passport, Driver's License, National ID (PDF, JPG, PNG)
                </p>
              </div>

              <div>
                <FileUpload
                  label="Proof of Address"
                  accept="image/*,.pdf"
                  maxSize={5}
                  value={addressFile}
                  onChange={setAddressFile}
                  error={addressError}
                  required
                />
                <p className="text-xs text-gray-400 mt-2">
                  Acceptable: Utility bill, Bank statement, Government document (PDF, JPG, PNG)
                </p>
              </div>
            </div>
          </Card>

          {/* Security Notice */}
          <Card className="mb-6">
            <div className="flex items-start gap-3">
              <IoLockClosed className="w-6 h-6 text-kasibet-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Security & Privacy</h3>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• All documents are encrypted and stored securely</li>
                  <li>• Documents are only used for verification purposes</li>
                  <li>• Your information is protected by bank-level encryption</li>
                  <li>• Documents are reviewed within 1-3 business days</li>
                </ul>
              </div>
            </div>
          </Card>

          {error && (
            <div className="mb-4 p-3 bg-red-900/20 border border-red-500 rounded text-red-400 text-sm">
              {error}
            </div>
          )}

          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/profile')}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={loading || !idFile || !addressFile}
              className="flex-1"
            >
              {loading ? 'Submitting...' : 'Submit for Review'}
            </Button>
          </div>
        </form>
      )}

      {/* Already Verified Message */}
      {verification.status === 'verified' && (
        <Card>
          <div className="text-center py-8">
            <IoCheckmarkCircle className="w-16 h-16 text-kasibet-success mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Your account is verified!</h3>
            <p className="text-gray-400 mb-4">
              Your verification was approved on {new Date(verification.submittedAt).toLocaleDateString()}
            </p>
            <Button variant="primary" onClick={() => navigate('/profile')}>
              Back to Profile
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}

