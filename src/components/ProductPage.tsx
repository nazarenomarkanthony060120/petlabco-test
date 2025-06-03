import React, { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { ProductTable } from './ProductTable'
import { FilterSidebar } from './FilterSidebar'
import { Header } from './Header'
import { LoadingSpinner } from './LoadingSpinner'
import { useProductStore } from '../store/productStore'
import { api } from '../services/api'
import { Product } from '../types/product'
import { Pagination } from './Pagination'

export const ProductPage: React.FC = () => {
  const { 
    filters, 
    setFilters, 
    setProducts, 
    page, 
    limit, 
    totalCount, 
    setTotalCount,
    sort,
    order,
    setSort,
    setOrder 
  } = useProductStore()

  const { data, isLoading } = useQuery({
    queryKey: ['products', filters, page, limit, sort, order],
    queryFn: async () => {
      const start = (page - 1) * limit;
      const end = start + limit;
      const response = await api.getProducts({ 
        ...filters, 
        _start: start,
        _end: end,
        sort,
        order
      });
      setTotalCount(response.totalCount);
      return response.data;
    }
  })

  const products = data || []

  useEffect(() => {
    if (products) {
      setProducts(products)
    }
  }, [products, setProducts])

  const handleSort = (newSort: string) => {
    if (sort === newSort) {
      setOrder(order === 'asc' ? 'desc' : 'asc')
    } else {
      setSort(newSort)
      setOrder('asc')
    }
  }

  if (isLoading && !products.length) {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 flex-shrink-0 lg:sticky lg:top-8 lg:self-start">
            <FilterSidebar filters={filters} onFilterChange={setFilters} />
          </aside>
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Product List
                </h2>
                <span className="text-sm text-gray-500">
                  {totalCount} products found
                </span>
              </div>
              <div className="overflow-x-auto">
                <ProductTable 
                  products={products} 
                  sort={sort}
                  order={order}
                  onSort={handleSort}
                />
              </div>
              <div className="mt-6">
                <Pagination 
                  currentPage={page}
                  totalItems={totalCount}
                  itemsPerPage={limit}
                  onPageChange={(newPage: number) => useProductStore.getState().setPage(newPage)}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
