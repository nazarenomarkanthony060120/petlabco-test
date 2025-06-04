import { render, screen, fireEvent } from '@testing-library/react'
import { ProductModal } from '../ProductModal'
import { Product } from '../../types/product'

describe('ProductModal', () => {
  const mockProduct: Product = {
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
  }

  const mockOnClose = jest.fn()

  beforeEach(() => {
    mockOnClose.mockClear()
  })

  it('renders product details correctly', () => {
    render(<ProductModal product={mockProduct} onClose={mockOnClose} />)

    expect(
      screen.getByRole('heading', { name: 'Test Product' })
    ).toBeInTheDocument()
    expect(screen.getByText('Test Vendor')).toBeInTheDocument()
    expect(screen.getByText('$99.99')).toBeInTheDocument()
    expect(screen.getByText('TEST-001')).toBeInTheDocument()
    expect(screen.getByText('Available')).toBeInTheDocument()
    expect(screen.getByText('Dog')).toBeInTheDocument()
    expect(screen.getByText('Chews')).toBeInTheDocument()
  })

  it('renders product image with correct attributes', () => {
    render(<ProductModal product={mockProduct} onClose={mockOnClose} />)

    const productImage = screen.getByRole('img', { name: 'Test Product' })
    expect(productImage).toBeInTheDocument()
    expect(productImage).toHaveAttribute('src', '/test-image.jpg')
    expect(productImage).toHaveAttribute('alt', 'Test Product')
  })

  it('shows subscription discount when available', () => {
    render(<ProductModal product={mockProduct} onClose={mockOnClose} />)

    const discountText = screen.getByText(/save 10% with subscription/i)
    expect(discountText).toBeInTheDocument()
  })

  it('displays subscription status correctly', () => {
    render(<ProductModal product={mockProduct} onClose={mockOnClose} />)

    expect(screen.getByText('Available')).toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', () => {
    render(<ProductModal product={mockProduct} onClose={mockOnClose} />)

    // Find the close button by looking for the button with no text (the X icon button)
    const closeButton = screen.getByRole('button', { name: '' })
    fireEvent.click(closeButton)

    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('displays all product sections', () => {
    render(<ProductModal product={mockProduct} onClose={mockOnClose} />)

    expect(screen.getByText('Vendor')).toBeInTheDocument()
    expect(screen.getByText('Price')).toBeInTheDocument()
    expect(screen.getByText('SKU')).toBeInTheDocument()
    expect(screen.getByText('Subscription')).toBeInTheDocument()
    expect(screen.getByText('Tags')).toBeInTheDocument()
  })

  it('handles product without subscription discount', () => {
    const productWithoutDiscount = { ...mockProduct, subscription_discount: 0 }
    render(<ProductModal product={productWithoutDiscount} onClose={mockOnClose} />)

    expect(screen.queryByText(/save.*with subscription/i)).not.toBeInTheDocument()
  })

  it('displays not available for products without subscription', () => {
    const productWithoutSubscription = { ...mockProduct, subscription: false }
    render(<ProductModal product={productWithoutSubscription} onClose={mockOnClose} />)

    expect(screen.getByText('Not Available')).toBeInTheDocument()
  })
}) 