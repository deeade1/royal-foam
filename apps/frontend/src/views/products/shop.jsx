import React, { memo, useState, useEffect, useMemo, useCallback } from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { Row, Col, Nav, Tab, Button, Card, Container } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { GET_PRODUCTS, GET_PRODUCT } from '../../product_query/productQuery';

// Reusable Product Card Component
const ProductCard = memo(({ product, client }) => {
  const productMedia = useMemo(() => product.media.edges.map(({ node }) => node.image), [product.media]);
  const firstValidMedia = useMemo(() => productMedia.find(media => media !== ''), [productMedia]);

  const handleProductHover = useCallback(() => {
    client.query({ query: GET_PRODUCT, variables: { id: product.id } });
  }, [client, product.id]);

  return (
    <div className="col" key={product.id}>
      <div className="card iq-product-custom-card animate:hover-media">
        <div className="iq-product-hover-img position-relative animate:hover-media-wrap">
          <Link
            to={`/products/product-detail/${product.id}`}
            onMouseOver={handleProductHover}
            style={{ textDecoration: 'none' }}
          >
            {firstValidMedia ? (
              <img
                src={`http://localhost:8080/media/${firstValidMedia}`}
                alt={product.name}
                style={{ width: '400px', height: '400px', objectFit: 'cover', borderRadius: '10px' }}
              />
            ) : (
              <img src="/path/to/default-image.png" alt="Default Image" style={{ width: '400px' }} />
            )}
          </Link>
          <div className="iq-product-card-hover-effect-1 iq-product-info">
            <Button variant="icon" className="rounded-pill wishlist-btn">
              <span className="btn-inner">{/* SVG for Wishlist */}</span>
            </Button>
          </div>
          <div className="iq-product-card-hover-effect-2 iq-product-info">
            <Button variant="icon" className="rounded-pill cart-btn">
              <span className="btn-inner">{/* SVG for Cart */}</span>
            </Button>
          </div>
        </div>
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-1">
            <Link to={`/products/product-detail/${product.id}`} className="h6 iq-product-detail mb-0">
              {product.name}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
});

// Reusable Tab Navigation Component
const TabNavigation = memo(({ tabs, toggleState, setToggleState }) => {
  return (
    <Nav as="ul" className="nav-tabs nav-tunnel nav-slider">
      {tabs.map((tab) => (
        <Nav.Item as="li" key={tab} role="presentation">
          <Nav.Link
            className={toggleState === tab ? 'tabs active bg-primary' : 'tabs d-flex align-items-center'}
            onClick={() => setToggleState(tab)}
            data-bs-toggle="tab"
            data-bs-target={`#content-card-${tab}`}
            role="tab"
            aria-selected={toggleState === tab}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );
});

// Main Shop Component
const Shop = memo(() => {
  const [toggleState, setToggleState] = useState('all');
  const { loading, error, data, client } = useQuery(GET_PRODUCTS, { variables: { first: 10 } });

  const tabs = useMemo(() => ['all', 'popular', 'latest'], []);

  useEffect(() => {
    if (data) {
      console.log(data.allProducts.edges);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="content-inner pb-0 container-fluid" id="page_layout">
      <div className="d-flex justify-content-end">
        <TabNavigation tabs={tabs} toggleState={toggleState} setToggleState={setToggleState} />
      </div>
      <Tab.Container activeKey={toggleState}>
        <Tab.Content>
          {tabs.map((tab) => (
            <Tab.Pane
              key={tab}
              eventKey={tab}
              className={toggleState === tab ? 'content active-content' : 'content'}
              id={`content-card-${tab}`}
              role="tabpanel"
            >
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
                {data.allProducts.edges.map(({ node: product }) => (
                  <ProductCard key={product.id} product={product} client={client} />
                ))}
              </div>
            </Tab.Pane>
          ))}
        </Tab.Content>
      </Tab.Container>
    </div>
  );
});

export default Shop;