import { render, screen, fireEvent } from '@testing-library/react'
import { ProductTable } from '../ProductTable'
import { Product } from '../../types/product'

describe('ProductTable', () => {
  const mockProducts: Product[] = [
    {
      id: 1,
      slug: 'test-product',
      title: 'Test Product',
      vendor: 'Test Vendor',
      price: 99.99,
      subscription: true,
      subscription_discount: 10,
      tags: ['Dog', 'Chews'],
      image_src: '/test-image.jpg',
      published: true,
      url: '/products/test-product',
      option_value: 'Default',
      sku: 'TEST-001',
    },
  ]

  const mockOnSort = jest.fn()

  beforeEach(() => {
    mockOnSort.mockClear()
  })

  it('renders product table with headers', () => {
    render(<ProductTable products={mockProducts} />)

    expect(screen.getByText('Product')).toBeInTheDocument()
    expect(screen.getByText('Price')).toBeInTheDocument()
    expect(screen.getByText('Subscription')).toBeInTheDocument()
    expect(screen.getByText('Tags')).toBeInTheDocument()
  })

  it('renders product data correctly', () => {
    render(<ProductTable products={mockProducts} />)

    const productTitle = screen.getByRole('cell', { name: /test product/i })
    expect(productTitle).toBeInTheDocument()

    const vendorCell = screen.getByRole('cell', { name: /test vendor/i })
    expect(vendorCell).toBeInTheDocument()

    const priceCell = screen.getByRole('cell', { name: /\$99\.99/i })
    expect(priceCell).toBeInTheDocument()

    expect(screen.getByText('Available')).toBeInTheDocument()

    const tableTags = screen.getAllByText(/dog|chews/i, {
      selector: 'span.px-2.py-1.text-xs',
    })
    expect(tableTags).toHaveLength(2)
  })

  it('handles sort click', () => {
    render(<ProductTable products={mockProducts} onSort={mockOnSort} />)

    const productHeader = screen.getByRole('columnheader', { name: /product/i })
    fireEvent.click(productHeader)

    expect(mockOnSort).toHaveBeenCalledWith('title')
  })

  it('shows subscription discount when available', () => {
    render(<ProductTable products={mockProducts} />)

    expect(screen.getByText('Save 10%')).toBeInTheDocument()
    expect(screen.getByText('with subscription')).toBeInTheDocument()
  })

  it('opens modal when product is clicked', () => {
    render(<ProductTable products={mockProducts} />)

    const productRow = screen.getByRole('row', { name: /test product/i })
    fireEvent.click(productRow)

    const modalTitle = screen.getByRole('heading', { name: 'Test Product' })
    expect(modalTitle).toBeInTheDocument()

    const modalVendor = screen.getByText('Test Vendor', {
      selector: 'p.mt-1.text-lg.text-gray-900',
    })
    expect(modalVendor).toBeInTheDocument()

    const modalPrice = screen.getByText('$99.99', {
      selector: 'p.mt-1.text-lg.font-semibold.text-gray-900',
    })
    expect(modalPrice).toBeInTheDocument()

    const modalTags = screen.getAllByText(/dog|chews/i, {
      selector: 'span.px-3.py-1.text-sm',
    })
    expect(modalTags).toHaveLength(2)
  })
})
