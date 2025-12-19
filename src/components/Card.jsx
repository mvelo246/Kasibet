import React from 'react'

export default function Card({ children, className = '', onClick, hover = true }) {
  return (
    <div
      className={`card ${hover ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

