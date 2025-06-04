import React, { useState } from 'react'
import { Product } from '../types/product'
import { ProductModal } from './ProductModal'
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline'

interface ProductTableProps {
  products: Product[]
  sort?: string
  order?: 'asc' | 'desc'
  onSort?: (field: string) => void
}

export const ProductTable: React.FC<ProductTableProps> = ({
  products,
  sort,
  order,
  onSort,
}) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const handleSort = (field: string) => {
    if (onSort) {
      onSort(field)
    }
  }

  const renderSortIcon = (field: string) => {
    if (sort !== field) return null
    return order === 'asc' ? (
      <ChevronUpIcon className="h-4 w-4" />
    ) : (
      <ChevronDownIcon className="h-4 w-4" />
    )
  }

  return (
    <>
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                onClick={() => handleSort('title')}
              >
                <div className="flex items-center gap-1">
                  Product
                  {renderSortIcon('title')}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                onClick={() => handleSort('price')}
              >
                <div className="flex items-center gap-1">
                  Price
                  {renderSortIcon('price')}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                onClick={() => handleSort('subscription')}
              >
                <div className="flex items-center gap-1">
                  Subscription
                  {renderSortIcon('subscription')}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Tags
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-gray-50 cursor-pointer transition-all duration-200 group"
                onClick={() => setSelectedProduct(product)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-12 w-12 flex-shrink-0 rounded-lg overflow-hidden shadow-sm group-hover:shadow-md transition-shadow">
                      <img
                        className="h-12 w-12 object-cover group-hover:scale-105 transition-transform duration-200"
                        src={product.image_src}
                        alt={product.title}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                        {product.title}
                      </div>
                      <div className="text-sm text-gray-500">
                        {product.vendor}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    ${product.price.toFixed(2)}
                  </div>
                  {product.subscription_discount && (
                    <div className="text-sm text-green-600 flex items-center mt-1">
                      <span className="mr-1">
                        Save {product.subscription_discount}%
                      </span>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                        with subscription
                      </span>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      product.subscription
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {product.subscription ? 'Available' : 'Not Available'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-wrap gap-1">
                    {product.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 group-hover:bg-blue-200 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  )
}
