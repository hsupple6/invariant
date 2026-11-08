import { createContext, useContext, type ReactNode } from 'react'
import type { Product } from './config'

const ProductContext = createContext<Product | null>(null)

export function ProductProvider({ value, children }: { value: Product; children: ReactNode }) {
  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
}

export function useProduct() {
  const product = useContext(ProductContext)
  if (!product) throw new Error('useProduct must be used inside ProductProvider')
  return product
}
