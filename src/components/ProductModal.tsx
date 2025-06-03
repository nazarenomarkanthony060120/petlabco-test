import React from 'react'
import {
  XMarkIcon,
  TagIcon,
  CurrencyDollarIcon,
  BuildingStorefrontIcon,
  QrCodeIcon,
  CheckCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline'
import { Product } from '../types/product'

interface ProductModalProps {
  product: Product
  onClose: () => void
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
}) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slideIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              {product.title}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 transition-colors p-1 hover:bg-gray-100 rounded-full"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="aspect-square rounded-xl overflow-hidden shadow-lg">
              <img
                src={product.image_src}
                alt={product.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-3">
                <BuildingStorefrontIcon className="h-6 w-6 text-blue-500 mt-1" />
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Vendor</h3>
                  <p className="mt-1 text-lg text-gray-900">{product.vendor}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CurrencyDollarIcon className="h-6 w-6 text-green-500 mt-1" />
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Price</h3>
                  <p className="mt-1 text-lg font-semibold text-gray-900">
                    ${product.price.toFixed(2)}
                  </p>
                  {product.subscription_discount && (
                    <p className="mt-1 text-sm text-green-600 flex items-center">
                      <span className="bg-green-100 px-2 py-0.5 rounded-full">
                        Save {product.subscription_discount}% with subscription
                      </span>
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <QrCodeIcon className="h-6 w-6 text-purple-500 mt-1" />
                <div>
                  <h3 className="text-sm font-medium text-gray-500">SKU</h3>
                  <p className="mt-1 text-lg text-gray-900">{product.sku}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                {product.subscription ? (
                  <CheckCircleIcon className="h-6 w-6 text-green-500 mt-1" />
                ) : (
                  <XCircleIcon className="h-6 w-6 text-gray-400 mt-1" />
                )}
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Subscription
                  </h3>
                  <p className="mt-1 text-lg text-gray-900">
                    {product.subscription ? 'Available' : 'Not Available'}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <TagIcon className="h-6 w-6 text-blue-500 mt-1" />
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Tags</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {product.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
