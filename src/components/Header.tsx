/**
 * Header
 * ----------------
 * Top navigation for the app. Includes:
 * - Logo and brand
 * - Search input (calls `onSearch` when value changes)
 * - Links to Home, Products and Help
 * - Cart button (calls `onShowCart`)
 *
 * Props:
 * - onSearch: (q: string) => void
 * - onShowCart: () => void
 * - cartCount: number
 * - placeholder?: string[]  (rotating placeholder phrases)
 *
 * Notes:
 * - Mobile menu toggles visibility for small screens.
 */
import React, { useState, useEffect } from "react";
import { Link, NavLink } from 'react-router-dom'
import { ShoppingCart, User, Search, Home as HomeIcon, HelpCircle, Menu,Package, X } from 'lucide-react'


type Props = {
  onSearch: (q: string) => void
  onShowCart: () => void
  cartCount: number
  placeholder?: string[]
}
    


export default function Header({ onSearch, onShowCart, cartCount, placeholder: passedPlaceholder = ["electronics", "fashion products", "general retail","general items"], ...passedProps }: Props) {
  const [placeholder, setPlaceholder] = useState("");
    const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileSearch, setMobileSearch] = useState(false)

    useEffect(() => {
        const interval = setInterval(() => {
            setPlaceholder(passedPlaceholder.map((item, index) => index === placeholderIndex ? item : null).filter(Boolean).join(''));
            if (placeholderIndex + 1 > passedPlaceholder.length) {
                setPlaceholderIndex(0);
            } else {
                setPlaceholderIndex(placeholderIndex + 1);
            }
        }, 400);

        return () => clearInterval(interval);
    }, [passedPlaceholder]);

  return (
    <header className={`site-header`} style={{backgroundColor:'#F8FAFC' ,color:'#0F172A'}}>
      <div className="container" style={{display:'flex',alignItems:'center',gap:12,padding:'0.5rem 0'}}>
        {/* Left: logo */}
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <Link to='/' className="logo" style={{fontWeight:800,color:'#0D6EFD'}}>Easy Shopping</Link>
        </div>

        {/* Middle: search (shows in md+, mobile toggles) */}
        <div style={{flex:1,display:'flex',justifyContent:'center'}}>
          <div className={`search-wrap`} style={{width:'100%',maxWidth:640}}>
            <div className="search-icon" style={{left:12}}>
              <Search size={18} />
            </div>
            <input
              className="search-input"
              style={{width:'100%'}}
              placeholder={`Search: ${placeholder}`}
              onChange={e => onSearch((e.target as HTMLInputElement).value)}
              aria-label="Search products"
            />
          </div>
        </div>

        {/* Right: nav links (md+), user, cart, mobile menu */}
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <nav className="nav-desktop" style={{display:'none'}}>
            <NavLink to="/" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
              <HomeIcon size={16} style={{marginRight:6}} />
              Home
            </NavLink>
            <NavLink to="/products" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
              <Package size={16} style={{marginRight:6}} />
              Products
            </NavLink>
            <NavLink to="/help" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
              <HelpCircle size={16} style={{marginRight:6}} />
              Help
            </NavLink>
          </nav>

          <button className="icon-btn" aria-label="Sign in">
            <User size={18} />
          </button>

          <button className="inline-flex items-center px-3 py-2 rounded-md text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700" onClick={onShowCart} aria-label="Open cart">
            <ShoppingCart size={16} />
            <span style={{marginLeft:8}}>Cart</span>
            <span style={{marginLeft:8,display:'inline-flex',alignItems:'center',justifyContent:'center',background:'#fff',color:'#4338ca',borderRadius:999,width:22,height:22,fontSize:12}}>{cartCount}</span>
          </button>

          <button className="icon-btn mobile-only" aria-label="Menu" onClick={() => setMobileOpen(v => !v)}>
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu (rendered when open) */}
      {mobileOpen && (
        <div className="mobile-menu container" style={{padding:'0.5rem 1rem',borderTop:'1px solid rgba(15,23,42,0.04) '}}>
          <div style={{display:'flex',flexDirection:'column',gap:8}}>
            <input  placeholder={`Search: ${placeholder}`} onChange={e => onSearch((e.target as HTMLInputElement).value)} aria-label="Search products" /> 
            <NavLink to="/" onClick={() => setMobileOpen(false)} className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>Home</NavLink>
            <NavLink to="/products" onClick={() => setMobileOpen(false)} className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>Products</NavLink>
            <NavLink to="/help" onClick={() => setMobileOpen(false)} className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>Help</NavLink>
          </div>
        </div>
      )}
    </header>
  )
}
