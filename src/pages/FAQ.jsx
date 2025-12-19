import React from 'react'
import Accordion from '../components/Accordion'

export default function FAQ() {
  const faqItems = [
    {
      question: 'How do I get started?',
      answer: 'Simply register an account, make a deposit, and start playing! Choose a game, select an opponent, place your bet, and start playing.',
    },
    {
      question: 'What is the minimum bet amount?',
      answer: 'Minimum bet amounts vary by game, typically ranging from R5 to R50. Check each game card for specific minimum bet requirements.',
    },
    {
      question: 'How do I deposit funds?',
      answer: 'Go to your Wallet page and click "Deposit". You can use credit/debit cards, bank transfer, mobile money, or cryptocurrency.',
    },
    {
      question: 'How long do withdrawals take?',
      answer: 'Withdrawals are processed within 1-3 business days. The exact time depends on your chosen withdrawal method.',
    },
    {
      question: 'Can I play with friends?',
      answer: 'Yes! When selecting an opponent, choose "Play with Friend" and enter your friend\'s username.',
    },
    {
      question: 'What happens if I disconnect during a game?',
      answer: 'If you disconnect, you have a limited time to reconnect. If you don\'t reconnect in time, you may forfeit the match.',
    },
    {
      question: 'Is KasiBet safe and secure?',
      answer: 'Yes! We use bank-level encryption to protect all transactions and personal data. Your funds are secure with us.',
    },
    {
      question: 'How do I contact support?',
      answer: 'You can contact us through the Help Center page, use the live chat feature, or email us directly from the Contact page.',
    },
  ]

  return (
    <div className="min-h-screen p-4 lg:p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
      <Accordion items={faqItems} />
    </div>
  )
}

