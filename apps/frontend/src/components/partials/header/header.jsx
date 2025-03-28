import React, { useEffect, memo, useContext, useCallback } from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../../context/authContext';
import LandingOffcanvasHeader from './landing-offcanvas-header';
import SearchBar from './SearchBar';
import NavbarItems from './NavbarItems';

// ✅ Import image properly (NO require)
import favicon from '../../../assets/images/favicon32x32.png';

const Header = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = useCallback(() => {
    logout();
    navigate('/');
  }, [logout, navigate]);

  // Sticky navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      const nav = document.querySelector('nav');
      if (window.scrollY > 50) {
        nav.classList.add('menu-sticky');
      } else {
        nav.classList.remove('menu-sticky');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Navbar expand="lg" variant="light" className="nav rf-navbar navs-sticky">
      <Container fluid className="navbar-inner">
        <div className="d-flex align-items-center justify-content-between w-100 landing-header">
          
          {/* Offcanvas header (mobile menu) */}
          <LandingOffcanvasHeader />

          {/* Mobile Logo */}
          <div className="d-flex align-items-center d-xl-none">
            <Link to="/" className="navbar-brand ms-3">
              <img src={favicon} alt="Logo" />
              <h5 className="logo-title text-white ms-2">Royal Foam</h5>
            </Link>
          </div>

          {/* Search */}
          <SearchBar />

          {/* Navbar Items (dropdowns & profile) */}
          <NavbarItems onLogout={handleLogout} />

        </div>
      </Container>
    </Navbar>
  );
};

export default memo(Header);
