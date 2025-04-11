import React, { useContext } from 'react';
import { Dropdown } from 'react-bootstrap';
import { AuthContext } from '../../../context/authContext';
import ProductDropdown from './ProductDropdown';
import { Link } from 'react-router-dom';
import avatars1 from '../../../assets/images/avatars/01.png';
import CustomToggle from '../../dropdowns';

const NavbarItems = ({ onLogout }) => {
  const { user } = useContext(AuthContext);

  return (
    <ul className="nav ms-auto">
      <ProductDropdown
        title="Mattresses"
        items={[
          { label: 'Luxury Mattresses', link: '/products/luxury-mattresses' },
          { label: 'Orthopaedic Mattresses', link: '/products/orthopaedic-mattresses' },
          { label: 'Spring Mattresses', link: '/products/spring-attresses' },
          { label: 'Value Mattresses', link: '/products/value-mattresses' },
        ]}
      />

      <ProductDropdown
        title="Pillows"
        items={[
          { label: 'Royal Breeze Plain Form', link: '#' },
          { label: 'Royal Breeze Quilted Form', link: '#' },
          { label: 'Duraflex Plain Fibre', link: '#' },
          { label: 'Duraflex Quilted Fibre', link: '#' },
        ]}
      />

      <ProductDropdown title="Duvets" items={[{ label: 'Duvets', link: '#' }]} />

      {/* Profile Dropdown */}
      <Dropdown as="li" className="nav-item">
        <Dropdown.Toggle as={CustomToggle} variant="nav-link py-0 d-flex align-items-center">
          <img src={avatars1} alt="User-Profile" className="img-fluid avatar avatar-50 avatar-rounded" />
        </Dropdown.Toggle>
        <Dropdown.Menu className="dropdown-menu-end">
          <Dropdown.Divider />
          {user ? (
            <Dropdown.Item onClick={onLogout}>Logout</Dropdown.Item>
          ) : (
            <>
              <Dropdown.Item href="/auth/sign-in">Login</Dropdown.Item>
              <Dropdown.Item href="/auth/sign-up">Register</Dropdown.Item>
            </>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </ul>
  );
};

export default NavbarItems;
