import axios from 'axios'
import { Product, ProductFilters } from '../types/product'

const API_URL = 'http://localhost:3010'

interface GetProductsParams extends ProductFilters {
  _start?: number
  _end?: number
  _sort?: string
  _order?: 'asc' | 'desc'
  price_gte?: number
  price_lte?: number
  title_like?: string
  vendor_like?: string
  id_ne?: number
}

export const api = {
  async getProducts(params: GetProductsParams = {}): Promise<{ data: Product[], totalCount: number }> {
    const {
      search,
      price,
      subscription,
      tags,
      _start,
      _end,
      _sort,
      _order,
    } = params
    const queryParams = new URLSearchParams()

    // Pagination
    if (_start !== undefined) queryParams.append('_start', _start.toString())
    if (_end !== undefined) queryParams.append('_end', _end.toString())

    // Sorting
    if (_sort) {
      queryParams.append('_sort', _sort)
      queryParams.append('_order', _order || 'asc')
    }

    // Filtering
    if (search) queryParams.append('q', search)
    if (price !== undefined) queryParams.append('price_lte', price.toString())
    if (subscription !== undefined) queryParams.append('subscription', subscription.toString())
    if (tags?.length) {
      tags.forEach(tag => queryParams.append('tags_like', tag))
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
