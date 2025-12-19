import React from 'react'

export default function Privacy() {
  return (
    <div className="min-h-screen p-4 lg:p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      
      <div className="space-y-6 text-gray-300">
        <section>
          <h2 className="text-xl font-semibold mb-3 text-white">1. Information We Collect</h2>
          <p>
            We collect information you provide directly to us, including name, email address, payment
            information, and gameplay data. We also automatically collect certain information when you
            use our service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-white">2. How We Use Your Information</h2>
          <p>
            We use your information to provide, maintain, and improve our services, process transactions,
            send you updates, and ensure security. We do not sell your personal information to third parties.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-white">3. Data Security</h2>
          <p>
            We implement industry-standard security measures to protect your data, including encryption,
            secure servers, and regular security audits. However, no method of transmission over the
            internet is 100% secure.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-white">4. Cookies</h2>
          <p>
            We use cookies and similar technologies to enhance your experience, analyze usage patterns,
            and personalize content. You can control cookie preferences through your browser settings.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-white">5. Your Rights</h2>
          <p>
            You have the right to access, update, or delete your personal information. You can also
            opt-out of certain communications. Contact us to exercise these rights.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-white">6. Third-Party Services</h2>
          <p>
            We may use third-party services for payment processing and analytics. These services have
            their own privacy policies, and we encourage you to review them.
          </p>
        </section>

        <p className="text-sm text-gray-400 mt-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  )
}

