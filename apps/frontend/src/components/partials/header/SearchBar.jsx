import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { SEARCH_PRODUCTS } from '../../../product_query/productQuery';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const navigate = useNavigate();

  const { loading, error, data, refetch } = useQuery(SEARCH_PRODUCTS, {
    variables: { name: searchTerm },
    skip: searchTerm.length < 2,
  });

  useEffect(() => {
    if (searchTerm.length < 2) setSelectedIndex(-1);
  }, [searchTerm]);

  const handleKeyDown = (e) => {
    const products = data?.searchProducts || [];
    if (!products.length) return;

    if (e.key === 'ArrowDown') {
      setSelectedIndex((prev) => Math.min(prev + 1, products.length - 1));
    } else if (e.key === 'ArrowUp') {
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && selectedIndex !== -1) {
      navigate(`/products/product-detail/${products[selectedIndex].slug}`);
    }
  };

  return (
    <div className="position-relative">
      <div className="input-group search-input">
        <span className="input-group-text">
          🔍
        </span>
        <input
          type="search"
          className="form-control"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            refetch();
          }}
          onKeyDown={handleKeyDown}
          autoComplete="off"
        />
      </div>

      {searchTerm.length >= 2 && data?.searchProducts?.length > 0 && (
        <ul className="list-group position-absolute w-100 shadow bg-white z-index-10 mt-1">
          {data.searchProducts.map((product, index) => (
            <li
              key={product.id}
              className={`list-group-item ${selectedIndex === index ? 'active' : ''}`}
              onClick={() => navigate(`/products/product-detail/${product.slug}`)}
              onMouseEnter={() => setSelectedIndex(index)}
              style={{ cursor: 'pointer' }}
            >
              <strong>{product.name}</strong>
            </li>
          ))}
        </ul>
      )}

      {loading && <p className="text-muted">Searching...</p>}
      {error && <p className="text-danger">Error: {error.message}</p>}
    </div>
  );
};

export default SearchBar;
