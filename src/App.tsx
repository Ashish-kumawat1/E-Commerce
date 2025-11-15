import React, { useEffect, useMemo, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
// products will be fetched from the fake store API
import type { Product, CartItem } from './types'
import Header from './components/Header'
import ProductList from './components/ProductList'
import ProductDetail from './components/ProductDetail'
import Cart from './components/Cart'
import Footer from './components/Footer'
import Help from './pages/Help'

export default function App(): JSX.Element {
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('default')
  const navigate = useNavigate()

  const [cart, setCart] = useState<Record<string, CartItem>>(() => {
    try {
      return JSON.parse(localStorage.getItem('cart') || '{}') as Record<string, CartItem>
    } catch (e) {
      return {}
    }
  })

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const [products, setProducts] = useState<Product[]>([])
  const [loadingProducts, setLoadingProducts] = useState(false)
  const [productsError, setProductsError] = useState<string | null>(null)

  useEffect(() => {
    setLoadingProducts(true)
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then((data: any[]) => {
        const mapped: Product[] = data.map(p => ({
          id: String(p.id),
          title: p.title,
          price: Number(p.price),
          image: p.image,
          description: p.description || '',
          category: p.category,
          rating: p.rating
        }))
        setProducts(mapped)
      })
      .catch(err => setProductsError(String(err)))
      .finally(() => setLoadingProducts(false))
  }, [])

  const filtered = useMemo(() => {
    let out = products.slice()
    if (query) {
      const q = query.toLowerCase()
      out = out.filter(p => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
    }
    if (sort === 'price-asc') out.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') out.sort((a, b) => b.price - a.price)
    return out
  }, [products, query, sort])

  function addToCart(product: Product, qty = 1) {
    setCart(prev => {
      const copy = { ...prev }
      const id = product.id
      if (!copy[id]) copy[id] = { ...product, qty: 0 }
      copy[id].qty += qty
      return copy
    })
  }

  function updateQty(id: string, qty: number) {
    setCart(prev => {
      const copy = { ...prev }
      if (!copy[id]) return copy
      copy[id].qty = qty
      if (copy[id].qty <= 0) delete copy[id]
      return copy
    })
  }

  function clearCart() {
    setCart({})
  }

  return (
    <div className="app">
      <Header onSearch={setQuery} onShowCart={() => navigate('/cart')} cartCount={Object.values(cart).reduce((s, i) => s + i.qty, 0)} />

      <main className="container">
        <Routes>
          <Route path="/" element={<ProductList products={filtered} onAdd={addToCart} sort={sort} setSort={setSort} />} />
          <Route path="/products" element={<ProductList products={filtered} onAdd={addToCart} sort={sort} setSort={setSort} />} />
          <Route path="/product/:id" element={<ProductDetail onAdd={addToCart} />} />
          <Route path="/cart" element={<Cart items={Object.values(cart)} onUpdate={updateQty} onBack={() => navigate('/')} onClear={clearCart} />} />
          <Route path="/help" element={<Help />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}
