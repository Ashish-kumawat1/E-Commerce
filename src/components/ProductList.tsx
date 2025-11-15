/**
 * ProductList
 * ----------------
 * Displays a responsive grid of products and provides a small
 * sort control. Each product is rendered with `ProductCard`.
 *
 * Props:
 * - products: Product[]
 * - onAdd: (p: Product) => void
 * - onView?: (p: Product) => void
 * - sort: string
 * - setSort: (s: string) => void
 *
 * Notes:
 * - Navigation to product details uses `useNavigate` internally.
 */
import React from 'react'
import { useNavigate } from 'react-router-dom'
import type { Product } from '../types'
import ProductCard from './ProductCard'

type Props = {
  products: Product[]
  onAdd: (p: Product) => void
  onView?: (p: Product) => void
  sort: string
  setSort: (s: string) => void
}

export default function ProductList({ products, onAdd, sort, setSort }: Props) {
  const navigate = useNavigate()

  return (
    <div className="container-custom my-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <label className="muted">Sort:</label>
          <select className="border rounded px-2 py-1" value={sort} onChange={e => setSort((e.target as HTMLSelectElement).value)}>
            <option value="default">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="product-grid">
        {products.map(p => (
          <ProductCard
            key={p.id}
            product={p}
            onAdd={() => onAdd(p)}
            onView={() => navigate(`/product/${p.id}`)}
          />
        ))}
      </div>
    </div>
  )
}
