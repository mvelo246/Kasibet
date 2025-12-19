import React from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/Card'
import Button from '../components/Button'

export default function Help() {
  const helpCategories = [
    {
      title: 'Getting Started',
      articles: [
        'How to create an account',
        'Making your first deposit',
        'Selecting and playing games',
      ],
    },
    {
      title: 'Account Management',
      articles: [
        'Updating your profile',
        'Changing password',
        'Account security',
      ],
    },
    {
      title: 'Payment Methods',
      articles: [
        'Depositing funds',
        'Withdrawing winnings',
        'Payment processing times',
      ],
    },
    {
      title: 'Game Rules',
      articles: [
        'Card game rules',
        'Board game rules',
        'Billiards rules',
      ],
    },
  ]

  return (
    <div className="min-h-screen p-4 lg:p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Help Center</h1>

      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {helpCategories.map((category, index) => (
          <Card key={index}>
            <h2 className="text-xl font-semibold mb-4">{category.title}</h2>
            <ul className="space-y-2">
              {category.articles.map((article, idx) => (
                <li key={idx}>
                  <a href="#" className="text-kasibet-accent hover:underline">
                    {article}
                  </a>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      <Card>
        <h2 className="text-xl font-semibold mb-4">Still need help?</h2>
        <p className="text-gray-400 mb-4">
          Our support team is available 24/7 to assist you with any questions or issues.
        </p>
        <div className="flex gap-4">
          <Link to="/contact">
            <Button variant="primary">Contact Support</Button>
          </Link>
          <Link to="/faq">
            <Button variant="outline">View FAQ</Button>
          </Link>
        </div>
      </Card>
    </div>
  )
}

