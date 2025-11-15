/**
 * Footer
 * ----------------
 * Simple footer with links and social placeholders.
 * No props — presentational only.
 *
 * Notes:
 * - Update the links and contact text as needed for production.
 */
import React from 'react'
import { Link } from 'react-router-dom'
import { Twitter, Instagram, Github } from 'lucide-react'

export default function Footer(): JSX.Element {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <h3 style={{margin:0}}>Easy Shopping</h3>
          <p className="muted text-sm">Simple demo e-commerce UI</p>
        </div>

        <div className="footer-links">
          <h4>Pages</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/help">Help</Link></li>
            <li><Link to="/cart">Cart</Link></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4>Contact</h4>
          <p className="text-sm muted">Not a real shop — this is a demo. For issues, open a repo issue.</p>
        </div>

        <div className="footer-social">
          <h4>Follow</h4>
          <div style={{display:'flex',gap:8,alignItems:'center'}}>
            <a href="#" aria-label="Twitter" className="icon-btn"><Twitter size={18} /></a>
            <a href="#" aria-label="Instagram" className="icon-btn"><Instagram size={18} /></a>
            <a href="#" aria-label="GitHub" className="icon-btn"><Github size={18} /></a>
          </div>
        </div>
      </div>

      <div className="container" style={{borderTop:'1px solid rgba(15,23,42,0.04)',marginTop:18,paddingTop:12,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div className="muted text-sm">© {new Date().getFullYear()} Easy Shopping</div>
        
      </div>
    </footer>
  )
}
