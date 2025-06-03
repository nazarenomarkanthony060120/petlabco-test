import axios from 'axios'
import { Product, ProductFilters } from '../types/product'

const API_URL = 'http://localhost:3010'

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
      order, 
      _start, 
      _end, 
      price_gte,
      price_lte,
      title_like,
      vendor_like,
      id_ne,
      ...filters 
    } = params
    const queryParams = new URLSearchParams()

    // Add pagination params
    if (_start !== undefined) queryParams.append('_start', _start.toString())
    if (_end !== undefined) queryParams.append('_end', _end.toString())
    if (page && limit) {
      const start = (page - 1) * limit
      const end = start + limit
      queryParams.append('_start', start.toString())
      queryParams.append('_end', end.toString())
    }

    // Add sorting params
    if (sort) {
      queryParams.append('_sort', sort)
      queryParams.append('_order', order || 'asc')
    }

    // Add range operators
    if (price_gte !== undefined) queryParams.append('price_gte', price_gte.toString())
    if (price_lte !== undefined) queryParams.append('price_lte', price_lte.toString())

    // Add like operators
    if (title_like) queryParams.append('title_like', title_like)
    if (vendor_like) queryParams.append('vendor_like', vendor_like)

    // Add not equal operator
    if (id_ne !== undefined) queryParams.append('id_ne', id_ne.toString())

    // Add filter params
    if (filters.search) queryParams.append('q', filters.search)
    if (filters.price) queryParams.append('price_lte', filters.price.toString())
    if (filters.subscription !== undefined) queryParams.append('subscription', filters.subscription.toString())
    if (filters.tags?.length) {
      filters.tags.forEach(tag => queryParams.append('tags_like', tag))
    }

    const response = await axios.get<Product[]>(`${API_URL}/products`, {
      params: queryParams,
    })
    return {
      data: response.data,
      totalCount: parseInt(response.headers['x-total-count'] || '0', 10)
    }
  }
}
