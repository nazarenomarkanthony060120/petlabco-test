import React, { useState, useEffect } from 'react'
import { ProductFilters } from '../types/product'
import {
  MagnifyingGlassIcon,
  TagIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  XMarkIcon,
  AdjustmentsHorizontalIcon,
  FunnelIcon,
} from '@heroicons/react/24/outline'

interface FilterSidebarProps {
  filters: ProductFilters
  onFilterChange: (filters: ProductFilters) => void
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFilterChange,
}) => {
  const [formFilters, setFormFilters] = useState<ProductFilters>(filters)

  // Update form filters when props change
  useEffect(() => {
    setFormFilters(filters)
  }, [filters])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target

    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement
      const tag = checkbox.value
      const currentTags = formFilters.tags || []
      const newTags = checkbox.checked
        ? [...currentTags, tag]
        : currentTags.filter((t) => t !== tag)
      setFormFilters((prev) => ({ ...prev, tags: newTags }))
    } else {
      setFormFilters((prev) => ({
        ...prev,
        [name]: value === '' ? undefined : value,
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onFilterChange(formFilters)
  }

  const handleClearAll = () => {
    const clearedFilters = {
      search: '',
      price: undefined,
      subscription: undefined,
      tags: [],
    }
    setFormFilters(clearedFilters)
    onFilterChange(clearedFilters)
  }

  const hasActiveFilters = Boolean(
    formFilters.search ||
      formFilters.price ||
      formFilters.subscription !== undefined ||
      (formFilters.tags && formFilters.tags.length > 0),
  )

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-sm border border-gray-100"
    >
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AdjustmentsHorizontalIcon className="h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          </div>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleClearAll}
              className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-blue-50 transition-colors"
            >
              <XMarkIcon className="h-4 w-4" />
              Clear all
            </button>
          )}
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            <div className="flex items-center gap-2 mb-2">
              <MagnifyingGlassIcon className="h-5 w-5 text-blue-600" />
              <span>Search Products</span>
            </div>
          </label>
          <div className="relative">
            <input
              type="text"
              name="search"
              value={formFilters.search || ''}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all bg-gray-50/50"
              placeholder="Search by name or description..."
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            <div className="flex items-center gap-2 mb-2">
              <CurrencyDollarIcon className="h-5 w-5 text-blue-600" />
              <span>Price Range</span>
            </div>
          </label>
          <div className="relative">
            <input
              type="number"
              name="price"
              value={formFilters.price || ''}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all bg-gray-50/50"
              placeholder="Enter maximum price"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircleIcon className="h-5 w-5 text-blue-600" />
              <span>Subscription Status</span>
            </div>
          </label>
          <select
            name="subscription"
            value={
              formFilters.subscription === undefined
                ? ''
                : formFilters.subscription.toString()
            }
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all bg-gray-50/50"
          >
            <option value="">All Products</option>
            <option value="true">Subscription Available</option>
            <option value="false">No Subscription</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            <div className="flex items-center gap-2 mb-2">
              <TagIcon className="h-5 w-5 text-blue-600" />
              <span>Product Categories</span>
            </div>
          </label>
          <div className="bg-gray-50/50 rounded-lg p-4 space-y-3 border border-gray-100">
            {['Dog', 'Cat', 'Chews', 'Formula', 'Shampoo'].map((tag) => (
              <div key={tag} className="flex items-center">
                <input
                  type="checkbox"
                  id={tag}
                  checked={formFilters.tags?.includes(tag) || false}
                  onChange={handleInputChange}
                  value={tag}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition-colors"
                />
                <label
                  htmlFor={tag}
                  className="ml-3 text-sm text-gray-700 cursor-pointer hover:text-gray-900 transition-colors"
                >
                  {tag}
                </label>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <FunnelIcon className="h-5 w-5" />
          Apply Filters
        </button>
      </div>
    </form>
  )
}
