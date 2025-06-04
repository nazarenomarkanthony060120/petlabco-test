import { render, screen } from '@testing-library/react'
import { Header } from '../Header'

describe('Header', () => {
  it('renders the title', () => {
    render(<Header />)
    expect(screen.getByText('Pet Lab Co')).toBeInTheDocument()
  })

  it('renders the logo image', () => {
    render(<Header />)
    const logo = screen.getByAltText('Pet Lab Co Logo')
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute('src', '/logo.png')
  })
})
