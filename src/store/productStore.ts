import { create } from 'zustand'
import { Product, ProductFilters } from '../types/product'

interface ProductState {
  products: Product[]
  filters: ProductFilters
  page: number
  limit: number
  totalCount: number
  sort: string
  order: 'asc' | 'desc'
  setProducts: (products: Product[]) => void
  setFilters: (filters: ProductFilters) => void
  setPage: (page: number) => void
  setLimit: (limit: number) => void
  setTotalCount: (count: number) => void
  setSort: (sort: string) => void
  setOrder: (order: 'asc' | 'desc') => void
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  filters: {
    search: '',
    price: undefined,
    subscription: undefined,
    tags: [],
  },
  page: 1,
  limit: 10,
  totalCount: 0,
  sort: 'title',
  order: 'asc',
  setProducts: (products) => set({ products }),
  setFilters: (filters) => set({ filters, page: 1 }), // Reset page when filters change
  setPage: (page) => set({ page }),
  setLimit: (limit) => set({ limit, page: 1 }), // Reset page when limit changes
  setTotalCount: (totalCount) => set({ totalCount }),
  setSort: (sort) => set({ sort }),
  setOrder: (order) => set({ order }),
}))
