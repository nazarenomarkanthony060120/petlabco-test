import React from 'react'
import { ShoppingBagIcon } from '@heroicons/react/24/outline'

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center space-x-3">
          <ShoppingBagIcon className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Pet Lab Products</h1>
        </div>
      </div>
    </header>
  )
}
