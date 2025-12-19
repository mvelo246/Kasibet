import React from 'react'

export default function Terms() {
  return (
    <div className="min-h-screen p-4 lg:p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>
      
      <div className="space-y-6 text-gray-300">
        <section>
          <h2 className="text-xl font-semibold mb-3 text-white">1. Acceptance of Terms</h2>
          <p>
            By accessing and using KasiBet, you accept and agree to be bound by these Terms and Conditions.
            If you do not agree to these terms, please do not use our service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-white">2. Eligibility</h2>
          <p>
            You must be at least 18 years old to use KasiBet. By registering, you confirm that you meet
            the age requirement and are legally able to enter into binding contracts.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-white">3. Account Registration</h2>
          <p>
            You are responsible for maintaining the confidentiality of your account credentials. You agree
            to notify us immediately of any unauthorized use of your account.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-white">4. Betting Rules</h2>
          <p>
            All bets are final once a match begins. Players must follow fair play rules. Any form of
            cheating, collusion, or manipulation will result in immediate account termination.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-white">5. Payments</h2>
          <p>
            All deposits and withdrawals are subject to verification. We reserve the right to request
            additional documentation for security purposes. Processing times may vary.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-white">6. Responsible Gaming</h2>
          <p>
            We promote responsible gaming. If you feel you may have a gambling problem, please seek help
            and use our self-exclusion tools available in your account settings.
          </p>
        </section>

        <p className="text-sm text-gray-400 mt-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  )
}

