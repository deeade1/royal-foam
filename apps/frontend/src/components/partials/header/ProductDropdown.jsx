import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CustomToggle from '../../dropdowns';

const ProductDropdown = ({ title, items }) => {
  return (
    <Dropdown as="li" className="nav-item text-white">
      <Dropdown.Toggle as={CustomToggle} variant="search-toggle nav-link">
        {title}
      </Dropdown.Toggle>
      <Dropdown.Menu className="p-0 sub-drop dropdown-menu-end">
        <div className="card border-0 shadow-none">
          <ul className="list-group list-group-flush">
            {items.map((item, idx) => (
              <li key={idx} className="iq-sub-card list-group-item">
                <Link to={item.link}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ProductDropdown;
