import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-kasibet-bg-card py-8 text-center text-gray-400 text-sm border-t border-kasibet-border mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-6 mb-6 text-left">
          <div>
            <h3 className="text-white font-semibold mb-3">About</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/about" className="hover:text-kasibet-accent">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/how-to-play" className="hover:text-kasibet-accent">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">Support</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/help" className="hover:text-kasibet-accent">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-kasibet-accent">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-kasibet-accent">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">Legal</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/terms" className="hover:text-kasibet-accent">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-kasibet-accent">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/responsible-gaming" className="hover:text-kasibet-accent">
                  Responsible Gaming
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">Payment Methods</h3>
            <div className="flex flex-wrap gap-2">
              <span className="bg-gray-800 px-2 py-1 rounded text-xs">💳 Cards</span>
              <span className="bg-gray-800 px-2 py-1 rounded text-xs">🏦 Bank</span>
              <span className="bg-gray-800 px-2 py-1 rounded text-xs">📱 Mobile</span>
              <span className="bg-gray-800 px-2 py-1 rounded text-xs">₿ Crypto</span>
            </div>
          </div>
        </div>
        <p className="border-t border-kasibet-border pt-4">
          &copy; 2025 KasiBet. All Rights Reserved.
        </p>
        <p className="mt-2 text-kasibet-accent font-semibold">
          Play responsibly. 18+ only.
        </p>
      </div>
    </footer>
  )
}

