import React from 'react'

export default function Help(): JSX.Element {
  return (
    <div className="container" style={{padding: '2rem 1rem'}}>
      <h1 style={{marginBottom: '0.5rem'}}>Help & Support</h1>
      <p style={{color: '#6b7280'}}>Welcome to the help page. Here are some quick links and info to get you started.</p>

      <section style={{marginTop: '1.25rem'}}>
        <h2 style={{fontSize: '1rem', marginBottom: '0.5rem'}}>Getting Started</h2>
        <ul>
          <li>Browse products from the <a href="/products">Products</a> page.</li>
          <li>Add items to the cart and proceed to checkout (demo only).</li>
          <li>Use the search box in the header to filter products.</li>
        </ul>
      </section>

      <section style={{marginTop: '1rem'}}>
        <h2 style={{fontSize: '1rem', marginBottom: '0.5rem'}}>Contact</h2>
        <p style={{color: '#6b7280'}}>For support, open an issue or email <a href="mailto:support@example.com">support@example.com</a>.</p>
      </section>
    </div>
  )
}
