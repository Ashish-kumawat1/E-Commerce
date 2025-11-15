/**
 * ProductCard
 * ----------------
 * Small card used in lists to render a single product.
 *
 * Props:
 * - product: Product  (product data to display)
 * - onAdd: () => void  (called when "Add to cart" clicked)
 * - onView?: () => void (optional: navigate to product detail)
 *
 * Notes:
 * - This component is intentionally presentation-focused and
 *   does not manage cart state itself.
 */
import React from 'react'
import { Info, Heart, Star } from 'lucide-react'
import type { Product } from '../types'

type Props = {
  product: Product
  onAdd: () => void
  onView?: () => void
}

export default function ProductCard({ product, onAdd, onView }: Props) {
  return (
    <article className="product-card detail-like">
      <div className="card-media">
        <img
          className="w-full h-44 md:h-64 object-contain rounded-md cursor-pointer"
          src={product.image}
          alt={product.title}
          onClick={onView}
        />
      </div>

      <div className="card-content">
        <h3 className="product-title" onClick={onView}>{product.title}</h3>

        <p className="text-sm muted truncate" style={{marginTop:8}}>{product.description}</p>

        <div style={{display:'flex',alignItems:'center',gap:8,marginTop:6}}>
          {product.category && <span className="badge">{product.category}</span>}
          {product.rating && (
            <div className="text-sm muted" style={{display:'flex',alignItems:'center',gap:6}}>
              <Star size={14} style={{color:'#fbbf24'}} />
              <span>{product.rating.rate.toFixed(1)}</span>
              <span className="muted">({product.rating.count})</span>
            </div>
          )}
        </div>


        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginTop:12}}>
          <div className="product-price">${product.price.toFixed(2)}</div>
          <div style={{display:'flex',gap:8}}>
            <button className="px-3 py-2 border rounded-md text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2" onClick={onAdd} aria-label="Add to cart">
              <Heart size={16} />
              <span>Add to cart</span>
            </button>

            <button className="px-3 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700 flex items-center gap-2" onClick={onView} aria-label="View details">
              <Info size={16} />
              <span>Details</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
