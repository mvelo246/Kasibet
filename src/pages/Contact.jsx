import React, { useState } from 'react'
import Card from '../components/Card'
import Input from '../components/Input'
import Button from '../components/Button'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Mock submission
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 3000)
  }

  return (
    <div className="min-h-screen p-4 lg:p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card>
          <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
          <div className="space-y-3 text-gray-300">
            <div>
              <div className="font-semibold text-white mb-1"> Address</div>
              <div>123 Main Street<br />Sandton, Johannesburg<br />Gauteng, 2196<br />South Africa</div>
            </div>
            <div>
              <div className="font-semibold text-white mb-1">Email</div>
              <div>support@kasibet.co.za</div>
            </div>
            <div>
              <div className="font-semibold text-white mb-1">Phone</div>
              <div>+27 11 123 4567</div>
            </div>
            <div>
              <div className="font-semibold text-white mb-1">WhatsApp</div>
              <div>+27 82 123 4567</div>
            </div>
            <div>
              <div className="font-semibold text-white mb-1">Support Hours</div>
              <div>Monday - Friday: 08:00 - 17:00 SAST<br />Saturday: 09:00 - 13:00 SAST<br />Sunday: Closed</div>
            </div>
            <div>
              <div className="font-semibold text-white mb-1">Response Time</div>
              <div>Within 24 hours (Business Days)</div>
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold mb-4">Follow Us</h2>
          <div className="space-y-3">
            <a href="#" className="block text-kasibet-accent hover:underline"> Facebook</a>
            <a href="#" className="block text-kasibet-accent hover:underline">Instagram</a>
            <a href="#" className="block text-kasibet-accent hover:underline">Twitter/X</a>
            <a href="#" className="block text-kasibet-accent hover:underline">LinkedIn</a>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-700">
            <h3 className="text-lg font-semibold mb-3">🇿🇦 South African Payment Methods</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <div>✓ FNB, Standard Bank, ABSA, Nedbank</div>
              <div>✓ Capitec, TymeBank</div>
              <div>✓ EFT, Instant EFT</div>
              <div>✓ SnapScan, Zapper</div>
              <div>✓ MTN Mobile Money, Vodacom M-Pesa</div>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <h2 className="text-xl font-semibold mb-4">Send us a Message</h2>
        {submitted ? (
          <div className="p-4 bg-green-900/20 border border-green-500 rounded text-green-400 text-center">
            Thank you! Your message has been sent. We'll get back to you soon.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <Input
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <Input
              type="text"
              placeholder="Subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              required
            />
            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea
                className="input-field min-h-[120px]"
                placeholder="Your message..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              />
            </div>
            <Button type="submit" variant="primary" className="w-full">
              Send Message
            </Button>
          </form>
        )}
      </Card>
    </div>
  )
}

