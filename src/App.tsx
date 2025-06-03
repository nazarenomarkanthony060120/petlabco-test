import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ProductPage } from './components/ProductPage'

const queryClient = new QueryClient()

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ProductPage />
    </QueryClientProvider>
  )
}

export default App
