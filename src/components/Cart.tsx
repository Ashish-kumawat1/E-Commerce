/**
 * Cart
 * ----------------
 * Renders items currently in the cart and provides quantity
 * controls and a (mock) checkout interaction.
 *
 * Props:
 * - items: CartItem[]
 * - onUpdate: (id: string, qty: number) => void  (update quantity)
 * - onBack: () => void  (navigate back to shopping)
 * - onClear: () => void (clear cart contents)
 *
 * Notes:
 * - The checkout flow is mocked and simply clears the cart with
 *   a confirmation message (no real payments).
 */
import React, { useMemo, useState } from 'react'
import type { CartItem } from '../types'
import { Trash2, Plus, Minus, ShoppingCart } from 'lucide-react'

type Props = {
  items: CartItem[]
  onUpdate: (id: string, qty: number) => void
  onBack: () => void
  onClear: () => void
  onRemove: (id: string) => void
}

export default function Cart({ items, onUpdate, onBack, onClear, onRemove }: Props) {
  const [checkoutMsg, setCheckoutMsg] = useState('')
  const total = useMemo(() => items.reduce((s, i) => s + i.price * i.qty, 0), [items])

  function checkout() {
    setCheckoutMsg('Order placed — thank you! (mock)')
    onClear()
  }

  return (
    <div className="cart container-custom">
      <div className="flex items-center justify-between mb-4">
        <button onClick={onBack} className="icon-btn inline-flex items-center gap-2"><ShoppingCart size={16} /> <span className="muted">Continue shopping</span></button>
        <button onClick={onClear} className="btn btn-ghost hidden md:inline-flex items-center gap-2"><Trash2 size={14} /> Clear cart</button>
      </div>

      <h2 className="text-2xl font-bold mb-4">Your cart</h2>

      {items.length === 0 && <p className="text-gray-600">Your cart is empty.</p>}

      {items.length > 0 && (
        <div className="cart-layout">
          <ul className="cart-list">
            {items.map(i => (
              <li key={i.id} className="cart-item">
                <img src={i.image} alt={i.title} className="w-20 h-16 object-cover rounded-md" />

                <div className="cart-meta">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-medium text-gray-900">{i.title}</div>
                      <div className="text-sm muted">${i.price.toFixed(2)}</div>
                    </div>
                    <div className="text-right text-sm muted">${(i.price * i.qty).toFixed(2)}</div>
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    <button onClick={() => onUpdate(i.id, Math.max(1, i.qty - 1))} className="icon-btn" aria-label="Decrease">
                      <Minus size={14} />
                    </button>
                    <div className="px-2">{i.qty}</div>
                    <button onClick={() => onUpdate(i.id, i.qty + 1)} className="icon-btn" aria-label="Increase">
                      <Plus size={14} />
                    </button>
                    <button onClick={() => onRemove(i.id)} className="icon-btn text-red-600 ml-2" aria-label="Remove item">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <aside className="cart-sidebar">
            <div className="cart-summary card">
              <div>
                <div className="text-sm muted">Total</div>
                <div className="text-xl font-semibold">${total.toFixed(2)}</div>
              </div>

              <div className="mt-4 flex gap-2">
                <button onClick={checkout} className="btn btn-primary flex-1">Checkout</button>
                <button onClick={onClear} className="btn btn-outline flex items-center gap-2"><Trash2 size={14} /> Clear</button>
              </div>

              {checkoutMsg && <p className="text-sm" style={{marginTop:12}}>{checkoutMsg}</p>}
            </div>
          </aside>
        </div>
      )}
    </div>
  )
}
