import React, { useState } from 'react';
import { ShoppingCart, Star } from 'lucide-react';
import '../styles/pages/Marketplace.css';

function Marketplace() {
  const [products, setProducts] = useState([
    { id: 1, name: 'NFT Exclusivo', price: '50 SOL', rating: 4.9, seller: 'Creator Pro' },
    { id: 2, name: 'Token Premium', price: '25 SOL', rating: 4.7, seller: 'Developer' },
    { id: 3, name: 'Acceso VIP', price: '100 SOL', rating: 5.0, seller: 'Elite' },
    { id: 4, name: 'Dominio Digital', price: '75 SOL', rating: 4.8, seller: 'Web3' },
  ]);

  return (
    <div className="marketplace">
      <h1>💱 Mercado P2P</h1>
      <p className="marketplace-subtitle">Compra y vende con otros usuarios en Solana</p>
      
      <div className="marketplace-filters">
        <input type="text" placeholder="🔍 Buscar productos..." className="search-input" />
        <select className="filter-select">
          <option>Todas las Categorías</option>
          <option>NFTs</option>
          <option>Tokens</option>
          <option>Servicios</option>
        </select>
      </div>

      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image">
              <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect fill='%230ff' opacity='0.1' width='200' height='200'/%3E%3Ctext x='100' y='100' font-size='24' text-anchor='middle' dominant-baseline='middle' fill='%230ff'%3E💎%3C/text%3E%3C/svg%3E" alt={product.name} />
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <div className="product-rating">
                <Star size={16} className="star-icon" />
                <span>{product.rating}</span>
              </div>
              <p className="product-seller">por {product.seller}</p>
              <div className="product-footer">
                <span className="product-price">{product.price}</span>
                <button className="btn-buy"><ShoppingCart size={16} /> Comprar</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Marketplace;