/**
 * ProductDetail
 * ----------------
 * Renders a full product details page including image, metadata,
 * interactive 5-star rating (persisted locally per session) and
 * a comments section stored in `localStorage` keyed by product id.
 *
 * Props:
 * - onAdd: (p: Product, qty?: number) => void  -- called to add product to cart
 *
 * Notes:
 * - Fetches product data from the Fake Store API when mounted (by id route).
 * - This component uses optimistic local updates for ratings/comments
 *   (demo-only; no backend persistence).
 */
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Star, Tag } from 'lucide-react'
import type { Product } from '../types'

type Props = {
  onAdd: (p: Product, qty?: number) => void
  product?: Product
  onBack?: () => void
}

export default function ProductDetail({ onAdd }: Props) {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [qty, setQty] = useState(1)
  const [userRating, setUserRating] = useState<number | null>(null)
  const [hoverRating, setHoverRating] = useState(0)
  const [comments, setComments] = useState<Array<{ id: number; name: string; text: string; createdAt: string }>>([])
  const [commentName, setCommentName] = useState('')
  const [commentText, setCommentText] = useState('')

  // fetch single product by id from the fake store API
  useEffect(() => {
    if (!id) return
    setLoading(true)
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then((p: any) => {
        setProduct({
          id: String(p.id),
          title: p.title,
          price: Number(p.price),
          image: p.image,
          description: p.description || '',
          category: p.category,
          rating: p.rating
        })
      })
      .catch(() => setProduct(null))
      .finally(() => setLoading(false))
  }, [id])

  // load comments from localStorage for this product
  useEffect(() => {
    if (!product) return
    try {
      const raw = localStorage.getItem(`comments_product_${product.id}`)
      if (raw) setComments(JSON.parse(raw))
    } catch (err) {
      // ignore
    }
  }, [product])

  if (loading) return <div className="p-6">Loading...</div>
  if (!product) return <div className="p-6">Product not found</div>

  return (
    <div className="product-detail container-custom">
      <button onClick={() => navigate(-1)} className="icon-btn mb-4 inline-flex items-center gap-2">
        <ArrowLeft size={16} />
        <span className="text-sm muted">Back</span>
      </button>

      <div className="detail-grid">
        <div className="product-image">
          <div className="cover">
            <img src={product.image} alt={product.title} />
          </div>
          {/* thumbs could be added here */}
        </div>

        <div className="detail-info">
          <h1>{product.title}</h1>

          <div className="detail-meta">
            {product.category && (
              <div className="detail-category"><Tag size={14} style={{verticalAlign:'middle',marginRight:6}} />{product.category}</div>
            )}

            {product.rating && (
              <div className="detail-rating">
                <Star size={14} style={{color:'#fbbf24'}} />
                <span>{product.rating.rate.toFixed(1)}</span>
                <span className="muted">({product.rating.count})</span>
              </div>
            )}

           

            {/* Interactive rating control */}
            <div className="detail-rate-control" aria-label="Rate this product">
              <div className="stars" style={{display:'inline-flex',gap:6,alignItems:'center'}}>
                {Array.from({ length: 5 }).map((_, i) => {
                  const idx = i + 1
                  const filled = hoverRating ? idx <= hoverRating : userRating ? idx <= userRating : product.rating ? idx <= Math.round(product.rating.rate) : false
                  return (
                    <button
                      key={idx}
                      type="button"
                      onMouseEnter={() => setHoverRating(idx)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => {
                        if (userRating) return
                        const r = idx
                        // update local user rating and product average locally
                        setUserRating(r)
                        setProduct(prev => {
                          if (!prev) return prev
                          const prevRate = prev.rating?.rate ?? 0
                          const prevCount = prev.rating?.count ?? 0
                          const newCount = prevCount + 1
                          const newRate = ((prevRate * prevCount) + r) / newCount
                          return { ...prev, rating: { rate: newRate, count: newCount } }
                        })
                        // small acknowledgement could be shown
                      }}
                      className="icon-btn"
                      aria-pressed={userRating ? idx <= userRating : false}
                      title={`Rate ${idx} star${idx > 1 ? 's' : ''}`}>
                      <Star size={18} style={{ color: filled ? '#fbbf24' : '#ddd' }} />
                    </button>
                  )
                })}
              </div>
              <div style={{marginLeft:12}} className="muted small">
                {userRating ? `You rated ${userRating}★ — thank you!` : product.rating ? `Avg ${product.rating.rate.toFixed(1)} (${product.rating.count})` : 'No ratings yet'}
              </div>
            </div>
          </div>

          <div className="detail-price">${product.price.toFixed(2)}</div>
          <p className="detail-description">{product.description}</p>

          <div className="detail-actions">
            <div className="qty-selector">
              <label className="text-sm muted" style={{minWidth:36}}>Qty</label>
              <div className="qty">
                <button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease qty" className="icon-btn"><span>-</span></button>
                <input type="number" value={qty} min={1} onChange={e => setQty(Number((e.target as HTMLInputElement).value))} className="qty-input" />
                <button onClick={() => setQty(qty + 1)} aria-label="Increase qty" className="icon-btn"><span>+</span></button>
              </div>
            </div>

            <div className="add-actions">
              <button onClick={() => onAdd(product, qty)} className="btn btn-primary">Add to cart</button>
            </div>
          </div>
        </div>
      </div>
       {/* Comments */}
            <div className="detail-comments" style={{marginTop:16}}>
              <h3 style={{marginBottom:8}}>Comments</h3>
              <div className="comments-list">
                {comments.length === 0 && <div className="muted">No comments yet — be the first.</div>}
                {comments.map(c => (
                  <div key={c.id} className="comment" style={{padding:'8px 0',borderBottom:'1px solid #eee'}}>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                      <strong>{c.name || 'Anonymous'}</strong>
                      <span className="muted small">{new Date(c.createdAt).toLocaleString()}</span>
                    </div>
                    <div className="comment-text" style={{marginTop:6}}>{c.text}</div>
                  </div>
                ))}
              </div>

              <form className="comment-form" onSubmit={(e) => {
                e.preventDefault()
                if (!commentText.trim()) return
                const newComment = { id: Date.now(), name: commentName.trim() || 'Anonymous', text: commentText.trim(), createdAt: new Date().toISOString() }
                setComments(prev => {
                  const next = [newComment, ...prev]
                  try { localStorage.setItem(`comments_product_${product.id}`, JSON.stringify(next)) } catch (err) {}
                  return next
                })
                setCommentText('')
                setCommentName('')
              }} style={{marginTop:12,display:'grid',gap:8}}>
                <input placeholder="Your name (optional)" value={commentName} onChange={e => setCommentName((e.target as HTMLInputElement).value)} className="input" />
                <textarea placeholder="Write a comment..." value={commentText} onChange={e => setCommentText((e.target as HTMLTextAreaElement).value)} rows={3} className="textarea" />
                <div style={{display:'flex',justifyContent:'flex-end'}}>
                  <button type="submit" className="btn btn-primary">Post comment</button>
                </div>
              </form>
            </div>
    </div>
    
  )
}