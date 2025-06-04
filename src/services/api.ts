import axios from 'axios'
import { Product, ProductFilters } from '../types/product'

interface GetProductsParams extends ProductFilters {
  page?: number
  limit?: number
  sort?: string
  order?: 'asc' | 'desc'
  _start?: number
  _end?: number
  price_gte?: number
  price_lte?: number
  title_like?: string
  vendor_like?: string
  id_ne?: number
}

export const api = {
  async getProducts(params: GetProductsParams = {}): Promise<{ data: Product[], totalCount: number }> {
    const { 
      page, 
      limit, 
      sort, 
      order = 'asc', 
      _start, 
      _end, 
      price_gte,
      price_lte,
      title_like,
      vendor_like,
      id_ne,
      ...filters 
    } = params

    // Fetch the mock data
    const response = await axios.get<{ products: Product[] }>(`/mock/products.json`)
    let products = [...response.data.products]

    // Apply filters
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      products = products.filter(product => 
        product.title.toLowerCase().includes(searchTerm) ||
        product.vendor.toLowerCase().includes(searchTerm) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      )
    }

    if (filters.price !== undefined) {
      products = products.filter(product => product.price <= filters.price!)
    }

    if (filters.subscription !== undefined) {
      products = products.filter(product => product.subscription === filters.subscription)
    }

    if (filters.tags?.length) {
      products = products.filter(product => 
        filters.tags!.some(filterTag => 
          product.tags.some(productTag => 
            productTag.toLowerCase().includes(filterTag.toLowerCase())
          )
        )
      )
    }

    // Apply additional filter params
    if (price_gte !== undefined) {
      products = products.filter(product => product.price >= price_gte)
    }

    if (price_lte !== undefined) {
      products = products.filter(product => product.price <= price_lte)
    }

    if (title_like) {
      products = products.filter(product => 
        product.title.toLowerCase().includes(title_like.toLowerCase())
      )
    }

    if (vendor_like) {
      products = products.filter(product => 
        product.vendor.toLowerCase().includes(vendor_like.toLowerCase())
      )
    }

    if (id_ne !== undefined) {
      products = products.filter(product => product.id !== id_ne)
    }

    // Apply sorting
    if (sort) {
      products.sort((a, b) => {
        let aValue: any = a[sort as keyof Product]
        let bValue: any = b[sort as keyof Product]

        // Handle different data types
        if (typeof aValue === 'string') {
          aValue = aValue.toLowerCase()
          bValue = bValue.toLowerCase()
        }

        if (aValue < bValue) return order === 'asc' ? -1 : 1
        if (aValue > bValue) return order === 'asc' ? 1 : -1
        return 0
      })
    }

    const totalCount = products.length

    // Apply pagination
    let paginatedProducts = products
    
    if (_start !== undefined && _end !== undefined) {
      paginatedProducts = products.slice(_start, _end)
    } else if (page && limit) {
      const start = (page - 1) * limit
      const end = start + limit
      paginatedProducts = products.slice(start, end)
    }

    return {
      data: paginatedProducts,
      totalCount
    }
  }
}
