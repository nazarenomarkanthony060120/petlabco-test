import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ProductPage } from './components/ProductPage'
import { BrowserRouter } from 'react-router-dom'

const queryClient = new QueryClient()

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ProductPage />
      </QueryClientProvider>
    </BrowserRouter>
  )
}

export default App
