import { useEffect, useRef, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { ProductTable } from './ProductTable'
import { FilterSidebar } from './FilterSidebar'
import { Header } from './Header'
import { LoadingSpinner } from './LoadingSpinner'
import { useProductStore } from '../store/productStore'
import { api } from '../services/api'
import { Pagination } from './Pagination'
import { Product, ProductFilters } from '../types/product'
import { parseBooleanParam, parseNumberParam } from '../utils'

const getInitialFiltersFromUrl = (
  searchParams: URLSearchParams,
): ProductFilters => {
  const initialFilters: ProductFilters = {}
  const searchParam = searchParams.get('search')
  if (searchParam) initialFilters.search = searchParam

  const priceParam = parseNumberParam(searchParams.get('price'))
  if (priceParam) initialFilters.price = priceParam

  const subscriptionParam = parseBooleanParam(searchParams.get('subscription'))
  if (subscriptionParam !== undefined)
    initialFilters.subscription = subscriptionParam

  const tagsParams = searchParams.getAll('tags')
  if (tagsParams.length > 0) initialFilters.tags = tagsParams
  return initialFilters
}

export const ProductPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const isInitialMount = useRef(true)

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
    setOrder,
    setLimit,
  } = useProductStore()

  useEffect(() => {
    if (isInitialMount.current && searchParams.toString()) {
      isInitialMount.current = false

      const initialFilters = getInitialFiltersFromUrl(searchParams)
      if (Object.keys(initialFilters).length > 0) {
        setFilters(initialFilters)
      }

      const pageParam = parseNumberParam(searchParams.get('page'), 1)
      if (pageParam && pageParam !== useProductStore.getState().page) {
        useProductStore.getState().setPage(pageParam)
      }

      const limitParam = parseNumberParam(searchParams.get('limit'), 10)
      if (limitParam && limitParam !== useProductStore.getState().limit) {
        setLimit(limitParam)
      }

      const sortParam = searchParams.get('sort')
      if (sortParam && sortParam !== useProductStore.getState().sort) {
        setSort(sortParam)
      }

      const orderParam = searchParams.get('order') as 'asc' | 'desc'
      if (orderParam && orderParam !== useProductStore.getState().order) {
        setOrder(orderParam)
      }
    } else if (isInitialMount.current) {
      isInitialMount.current = false
    }
  }, [searchParams, setFilters, setLimit, setOrder, setSort])

  const updateUrlParams = (
    newFilters: ProductFilters,
    newPage = page,
    newSort = sort,
    newOrder = order,
    newLimit = limit,
  ) => {
    const params = new URLSearchParams()
    if (newFilters.search) params.set('search', newFilters.search)
    if (newFilters.price) params.set('price', newFilters.price.toString())
    if (newFilters.subscription !== undefined)
      params.set('subscription', newFilters.subscription.toString())
    if (newFilters.tags?.length) {
      newFilters.tags.forEach((tag) => params.append('tags', tag))
    }
    if (newPage > 1) params.set('page', newPage.toString())
    if (newLimit !== 10) params.set('limit', newLimit.toString())
    if (newSort !== 'title') params.set('sort', newSort)
    if (newOrder !== 'asc') params.set('order', newOrder)
    setSearchParams(params)
  }

  const handleFilterChange = (newFilters: ProductFilters) => {
    setFilters(newFilters)
    updateUrlParams(newFilters, page, sort, order, limit)
  }

  const handlePageChange = (newPage: number) => {
    useProductStore.getState().setPage(newPage)
    updateUrlParams(filters, newPage, sort, order, limit)
  }

  const handleItemsPerPageChange = (newLimit: number) => {
    setLimit(newLimit)
    useProductStore.getState().setPage(1)
    updateUrlParams(filters, 1, sort, order, newLimit)
  }

  const handleSort = (newSort: string) => {
    const newOrder =
      sort === newSort ? (order === 'asc' ? 'desc' : 'asc') : 'asc'
    setSort(newSort)
    setOrder(newOrder)
    updateUrlParams(filters, page, newSort, newOrder, limit)
  }

  const { data: fetchedProductsData, isLoading } = useQuery<Product[], Error>({
    queryKey: ['products', page, limit, sort, order],
    queryFn: async () => {
      const start = (page - 1) * limit
      const end = start + limit
      const response = await api.getProducts({
        _start: start,
        _end: end,
        _sort: sort,
        _order: order,
      })
      setTotalCount(response.totalCount)
      return response.data
    },
  })

  const fetchedProducts: Product[] = fetchedProductsData || []

  useEffect(() => {
    if (fetchedProductsData) {
      setProducts(fetchedProducts)
    } else if (!isLoading && !fetchedProductsData) {
      setProducts([])
    }
  }, [fetchedProductsData, isLoading, setProducts])

  const productsToDisplay = useMemo(() => {
    let tempProducts = [...fetchedProducts]

    if (filters.search && filters.search.trim() !== '') {
      const searchTerm = filters.search.toLowerCase()
      tempProducts = tempProducts.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm) ||
          (product.vendor && product.vendor.toLowerCase().includes(searchTerm)),
      )
    }

    if (filters.price !== undefined) {
      tempProducts = tempProducts.filter(
        (product) => product.price <= filters.price!,
      )
    }

    if (filters.subscription !== undefined) {
      tempProducts = tempProducts.filter(
        (product) => product.subscription === filters.subscription,
      )
    }

    if (filters.tags && filters.tags.length > 0) {
      tempProducts = tempProducts.filter((product) =>
        filters.tags!.some((tag) => product.tags.includes(tag)),
      )
    }
    return tempProducts
  }, [fetchedProducts, filters])

  if (isLoading && fetchedProducts.length === 0) {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 flex-shrink-0 lg:sticky lg:top-8 lg:self-start">
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </aside>
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex flex-col">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Product List
                  </h2>
                  <div className="flex items-center gap-2">
                    <label
                      htmlFor="itemsPerPage"
                      className="text-sm text-gray-700"
                    >
                      Items per page:
                    </label>
                    <select
                      id="itemsPerPage"
                      value={limit}
                      onChange={(e) =>
                        handleItemsPerPageChange(Number(e.target.value))
                      }
                      className="rounded-md border border-gray-300 bg-white py-1.5 pl-3 pr-8 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={15}>15</option>
                      <option value={20}>20</option>
                    </select>
                  </div>
                </div>
                <span className="text-sm text-gray-500">
                  {productsToDisplay.length} products found
                </span>
              </div>
              <div className="overflow-x-auto">
                <ProductTable
                  products={productsToDisplay}
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
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
