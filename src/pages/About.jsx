import React from 'react'
import Card from '../components/Card'

export default function About() {
  return (
    <div className="min-h-screen p-4 lg:p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">About KasiBet</h1>
      
      <Card className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
        <p className="text-gray-300 mb-4">
          KasiBet was founded with a simple mission: to bring the excitement of skill-based betting
          to players who love card games, board games, and billiards. We believe that betting should
          be about skill, strategy, and fair competition.
        </p>
        <p className="text-gray-300">
          Unlike traditional betting platforms, KasiBet allows you to bet on your own skills by
          challenging other players in games you know and love. Whether you're a chess master,
          a poker pro, or a pool shark, KasiBet is the place to prove your skills and win real money.
        </p>
      </Card>

      <Card className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">What Makes Us Unique</h2>
        <ul className="space-y-3 text-gray-300">
          <li className="flex items-start">
            <span className="text-kasibet-accent mr-2">✓</span>
            <span>Skill-based matching ensures fair and competitive games</span>
          </li>
          <li className="flex items-start">
            <span className="text-kasibet-accent mr-2">✓</span>
            <span>Play with friends or match with random players worldwide</span>
          </li>
          <li className="flex items-start">
            <span className="text-kasibet-accent mr-2">✓</span>
            <span>Instant payouts with no delays or hidden fees</span>
          </li>
          <li className="flex items-start">
            <span className="text-kasibet-accent mr-2">✓</span>
            <span>Bank-level security protects your funds and data</span>
          </li>
          <li className="flex items-start">
            <span className="text-kasibet-accent mr-2">✓</span>
            <span>Responsible gaming tools to help you stay in control</span>
          </li>
        </ul>
      </Card>

      <Card>
        <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
        <div className="space-y-4 text-gray-300">
          <div>
            <h3 className="font-semibold text-white mb-2">Fair Play</h3>
            <p>We ensure all matches are fair, competitive, and free from cheating.</p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-2">Transparency</h3>
            <p>Clear rules, fair odds, and honest communication with our players.</p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-2">Security</h3>
            <p>Your safety and security are our top priorities.</p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-2">Responsibility</h3>
            <p>We promote responsible gaming and provide tools to help you stay in control.</p>
          </div>
        </div>
      </Card>
    </div>
  )
}

