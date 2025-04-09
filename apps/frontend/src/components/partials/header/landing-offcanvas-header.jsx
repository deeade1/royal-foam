import React, { memo, useState, useMemo } from 'react';
import { Nav, Offcanvas, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import RoyalLogo from '../../../assets/images/RoyalLogo.png';

const LandingOffcanvasHeader = () => {
  const [show, setShow] = useState(false);
  const [productMenuOpen, setProductMenuOpen] = useState(false);
  const location = useLocation();

  // Predefine nav links to avoid duplication
  const navLinks = useMemo(() => ([
    { to: '/about', label: 'About Us' },
    { to: '/blog/blog', label: 'Blog', mobileOnly: true },
    { to: '/faq', label: 'FAQ', mobileOnly: true },
    { to: '/contact-us', label: 'Contact Us', mobileOnly: true },
  ]), []);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Toggle Button */}
      <button
        className="d-xl-none btn btn-primary rounded-pill p-1 pt-0"
        type="button"
        onClick={() => setShow(true)}
      >
        <svg width="20px" height="20px" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"
          ></path>
        </svg>
      </button>

      {/* Offcanvas */}
      <Offcanvas
        show={show}
        onHide={() => setShow(false)}
        className="mobile-offcanvas nav navbar navbar-expand-xl hover-nav py-0"
      >
        <Container fluid className="p-lg-0">
          <Offcanvas.Header closeButton className="px-0 mx-3">
            <Link to="/" className="navbar-brand ms-3">
              <img src={RoyalLogo} alt="Royal Logo" style={{ width: '30px' }} />
              <h5 className="logo-title">Royal</h5>
            </Link>
          </Offcanvas.Header>

          <Offcanvas.Body>
            <div className="landing-header">
              <Nav as="ul" className="navbar-nav rf-nav-menu list-unstyled" id="header-menu">
                {/* Product Collapsible Menu */}
                <Nav.Item as="li">
                  <Link
                    to="#homedata"
                    className="nav-link"
                    onClick={() => setProductMenuOpen(!productMenuOpen)}
                    aria-controls="homedata"
                    aria-expanded={productMenuOpen}
                    data-bs-toggle="collapse"
                  >
                    Product
                    <svg
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon-18"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M19 8.5L12 15.5L5 8.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </Link>

                  <Nav as="ul" className={`sub-nav collapse list-unstyled ${productMenuOpen ? 'show' : ''}`} id="homedata">
                    <Nav.Item as="li">
                      <Link className={`nav-link ${isActive('/products/shop') ? 'active' : ''}`} to="/products/shop">
                        Shop
                      </Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                      <Link className={`nav-link ${isActive('/products/product-detail') ? 'active' : ''}`} to="/products/product-detail">
                        Product Detail
                      </Link>
                    </Nav.Item>
                  </Nav>
                </Nav.Item>

                {/* Static Nav Items */}
                {navLinks.map((item, idx) => (
                  <Nav.Item
                    as="li"
                    key={idx}
                    className={item.mobileOnly ? 'd-xl-none' : ''}
                  >
                    <Link
                      className={`nav-link ${isActive(item.to) ? 'active' : ''}`}
                      to={item.to}
                    >
                      {item.label}
                    </Link>
                  </Nav.Item>
                ))}
              </Nav>
            </div>
          </Offcanvas.Body>
        </Container>
      </Offcanvas>
    </>
  );
};

export default memo(LandingOffcanvasHeader);
