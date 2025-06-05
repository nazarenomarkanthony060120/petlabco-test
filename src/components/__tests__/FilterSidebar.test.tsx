import { render, screen, fireEvent, act } from '@testing-library/react'
import { FilterSidebar } from '../FilterSidebar'
import { ProductFilters } from '../../types/product'

jest.useFakeTimers()

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
    jest.clearAllTimers()
  })

  it('renders all filter sections', () => {
    render(
      <FilterSidebar
        filters={mockFilters}
        onFilterChange={mockOnFilterChange}
      />,
    )

    expect(screen.getByText('Search Products')).toBeInTheDocument()
    expect(screen.getByText('Price Range')).toBeInTheDocument()
    expect(screen.getByText('Subscription Status')).toBeInTheDocument()
    expect(screen.getByText('Product Categories')).toBeInTheDocument()
  })

  it('handles search input change with debounce', () => {
    render(
      <FilterSidebar
        filters={mockFilters}
        onFilterChange={mockOnFilterChange}
      />,
    )

    const searchInput = screen.getByPlaceholderText(
      'Search by name or description...',
    )
    fireEvent.change(searchInput, { target: { value: 'test' } })

    expect(mockOnFilterChange).not.toHaveBeenCalled()

    act(() => {
      jest.advanceTimersByTime(300)
    })

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      ...mockFilters,
      search: 'test',
    })
    expect(mockOnFilterChange).toHaveBeenCalledTimes(1)
  })

  it('handles price input changes immediately', () => {
    render(
      <FilterSidebar
        filters={mockFilters}
        onFilterChange={mockOnFilterChange}
      />,
    )

    const priceInput = screen.getByPlaceholderText('Enter maximum price')
    fireEvent.change(priceInput, { target: { value: '100' } })

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      ...mockFilters,
      price: 100,
    })
    expect(mockOnFilterChange).toHaveBeenCalledTimes(1)
  })

  it('handles subscription selection immediately', () => {
    render(
      <FilterSidebar
        filters={mockFilters}
        onFilterChange={mockOnFilterChange}
      />,
    )

    const yesRadio = screen.getByRole('radio', { name: 'Yes' })
    fireEvent.click(yesRadio)

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      ...mockFilters,
      subscription: true,
    })
    expect(mockOnFilterChange).toHaveBeenCalledTimes(1)
  })

  it('handles tag selection immediately', () => {
    render(
      <FilterSidebar
        filters={mockFilters}
        onFilterChange={mockOnFilterChange}
      />,
    )

    const dogCheckbox = screen.getByRole('checkbox', { name: 'Dog' })
    fireEvent.click(dogCheckbox)

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      ...mockFilters,
      tags: ['Dog'],
    })
    expect(mockOnFilterChange).toHaveBeenCalledTimes(1)

    fireEvent.click(dogCheckbox)
    expect(mockOnFilterChange).toHaveBeenCalledWith({
      ...mockFilters,
      tags: [],
    })
    expect(mockOnFilterChange).toHaveBeenCalledTimes(2)
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
      />,
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
