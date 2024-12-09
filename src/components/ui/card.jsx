import React from 'react'

export function Card({ className, ...props }) {
  return (
    <div
      className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}
      {...props}
    />
  )
}

Card.displayName = "Card"

export function CardContent({ className, ...props }) {
  return (
    <div className={`p-6 ${className}`} {...props} />
  )
}

CardContent.displayName = "CardContent"