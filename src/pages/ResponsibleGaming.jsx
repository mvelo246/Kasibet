import React from 'react'
import Card from '../components/Card'
import Button from '../components/Button'

export default function ResponsibleGaming() {
  return (
    <div className="min-h-screen p-4 lg:p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Responsible Gaming</h1>

      <Card className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Our Commitment</h2>
        <p className="text-gray-300 mb-4">
          At KasiBet, we are committed to promoting responsible gaming and ensuring a safe,
          enjoyable experience for all our players. We recognize that while gaming can be
          entertaining, it should always be done responsibly.
        </p>
        <p className="text-gray-300">
          If you or someone you know has a gambling problem, please seek help immediately.
          We provide tools and resources to help you stay in control.
        </p>
      </Card>

      <Card className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Self-Exclusion Tools</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-white mb-2">Deposit Limits</h3>
            <p className="text-gray-300">
              Set daily, weekly, or monthly deposit limits to control your spending.
              These limits can be adjusted in your account settings.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-2">Time Limits</h3>
            <p className="text-gray-300">
              Set session time limits to help you manage how long you play. You'll
              receive reminders when your time limit is approaching.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-2">Self-Exclusion</h3>
            <p className="text-gray-300">
              If you need to take a break, you can temporarily or permanently exclude
              yourself from playing. Contact support to set up self-exclusion.
            </p>
          </div>
        </div>
        <div className="mt-6">
          <Button variant="primary">Manage Limits</Button>
        </div>
      </Card>

      <Card className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Warning Signs</h2>
        <p className="text-gray-300 mb-4">Be aware of these warning signs:</p>
        <ul className="space-y-2 text-gray-300">
          <li className="flex items-start">
            <span className="text-kasibet-danger mr-2">•</span>
            <span>Spending more money or time than you can afford</span>
          </li>
          <li className="flex items-start">
            <span className="text-kasibet-danger mr-2">•</span>
            <span>Chasing losses by betting more</span>
          </li>
          <li className="flex items-start">
            <span className="text-kasibet-danger mr-2">•</span>
            <span>Neglecting work, family, or other responsibilities</span>
          </li>
          <li className="flex items-start">
            <span className="text-kasibet-danger mr-2">•</span>
            <span>Lying about your gaming activities</span>
          </li>
          <li className="flex items-start">
            <span className="text-kasibet-danger mr-2">•</span>
            <span>Feeling anxious or depressed about gaming</span>
          </li>
        </ul>
      </Card>

      <Card>
        <h2 className="text-2xl font-semibold mb-4">Get Help</h2>
        <p className="text-gray-300 mb-4">
          If you're struggling with problem gambling, help is available:
        </p>
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-white mb-1">Gambling Help Line</h3>
            <p className="text-kasibet-accent">1-800-GAMBLER</p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-1">National Council on Problem Gambling</h3>
            <p className="text-kasibet-accent">www.ncpgambling.org</p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-1">GamCare</h3>
            <p className="text-kasibet-accent">www.gamcare.org.uk</p>
          </div>
        </div>
      </Card>

      <div className="mt-6 text-center text-sm text-gray-400">
        <p className="font-semibold text-kasibet-accent mb-2">Remember: 18+ Only</p>
        <p>You must be 18 years or older to use KasiBet. Age verification is required.</p>
      </div>
    </div>
  )
}

