import { render, screen, fireEvent } from '@testing-library/react'
import { FilterSidebar } from '../FilterSidebar'
import { ProductFilters } from '../../types/product'

describe('FilterSidebar', () => {
  const mockFilters: ProductFilters = {
    search: '',
    price: undefined,
    subscription: undefined,
    tags: [],
  }

  const mockOnFilterChange = jest.fn()

  beforeEach(() => {
    mockOnFilterChange.mockClear()
  })

  it('renders all filter sections', () => {
    render(
      <FilterSidebar
        filters={mockFilters}
        onFilterChange={mockOnFilterChange}
      />
    )

    expect(screen.getByText('Search Products')).toBeInTheDocument()
    expect(screen.getByText('Price Range')).toBeInTheDocument()
    expect(screen.getByText('Subscription Status')).toBeInTheDocument()
    expect(screen.getByText('Product Categories')).toBeInTheDocument()
  })

  it('handles search input change', () => {
    render(
      <FilterSidebar
        filters={mockFilters}
        onFilterChange={mockOnFilterChange}
      />
    )

    const searchInput = screen.getByPlaceholderText(
      'Search by name or description...'
    )
    fireEvent.change(searchInput, { target: { value: 'test' } })

    const applyButton = screen.getByRole('button', { name: 'Apply Filters' })
    fireEvent.click(applyButton)

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      search: 'test',
      price: undefined,
      subscription: undefined,
      tags: [],
    })
  })

  it('handles price input changes', () => {
    render(
      <FilterSidebar
        filters={mockFilters}
        onFilterChange={mockOnFilterChange}
      />
    )

    const priceInput = screen.getByPlaceholderText('Enter maximum price')
    fireEvent.change(priceInput, { target: { value: '100' } })

    const applyButton = screen.getByRole('button', { name: 'Apply Filters' })
    fireEvent.click(applyButton)

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      search: '',
      price: 100,
      subscription: undefined,
      tags: [],
    })
  })

  it('handles subscription selection', () => {
    render(
      <FilterSidebar
        filters={mockFilters}
        onFilterChange={mockOnFilterChange}
      />
    )

    const yesRadio = screen.getByRole('radio', { name: 'Yes' })
    fireEvent.click(yesRadio)

    const applyButton = screen.getByRole('button', { name: 'Apply Filters' })
    fireEvent.click(applyButton)

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      search: '',
      price: undefined,
      subscription: true,
      tags: [],
    })
  })

  it('handles tag selection', () => {
    render(
      <FilterSidebar
        filters={mockFilters}
        onFilterChange={mockOnFilterChange}
      />
    )

    const dogCheckbox = screen.getByRole('checkbox', { name: 'Dog' })
    fireEvent.click(dogCheckbox)

    const applyButton = screen.getByRole('button', { name: 'Apply Filters' })
    fireEvent.click(applyButton)

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      search: '',
      price: undefined,
      subscription: undefined,
      tags: ['Dog'],
    })
  })

  it('clears all filters when clear button is clicked', () => {
    const filtersWithValues: ProductFilters = {
      search: 'test',
      price: 100,
      subscription: true,
      tags: ['Dog'],
    }

    render(
      <FilterSidebar
        filters={filtersWithValues}
        onFilterChange={mockOnFilterChange}
      />
    )

    const clearButton = screen.getByText('Clear all')
    fireEvent.click(clearButton)

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      search: '',
      price: undefined,
      subscription: undefined,
      tags: [],
    })
  })
})
