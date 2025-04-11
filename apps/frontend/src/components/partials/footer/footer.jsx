import React, { memo } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// images
import image1 from '../../../assets/images/brands/08.png';
import image2 from '../../../assets/images/brands/09.png';
import image3 from '../../../assets/images/brands/10.png';
import image4 from '../../../assets/images/brands/13.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Static data to avoid repetition
  const footerLinks = [
    { title: 'Links', items: ['About us', 'Features', 'Reviews', 'Team'] },
    { title: 'Help', items: ['My Account', 'Returns & Refunds', 'Payment Policy', 'FAQ'] },
  ];

  const socialImages = [
    { src: image1, alt: 'Facebook' },
    { src: image2, alt: 'Gmail' },
    { src: image3, alt: 'Instagram' },
    { src: image4, alt: 'LinkedIn' },
  ];

  return (
    <footer>
      {/* Main Footer */}
      <div className="bg-secondary inner-box">
        <Container>
          <Row>
            {/* Brand Info */}
            <Col md={4}>
              <Link to="/landing-modules/home" className="navbar-brand d-flex align-items-center">
                <svg
                  className="icon-30 text-primary"
                  width="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="-0.757" y="19.243" width="28" height="4" rx="2" transform="rotate(-45 -0.757 19.243)" fill="currentColor" />
                  <rect x="7.728" y="27.728" width="28" height="4" rx="2" transform="rotate(-45 7.728 27.728)" fill="currentColor" />
                  <rect x="10.537" y="16.395" width="16" height="4" rx="2" transform="rotate(45 10.537 16.395)" fill="currentColor" />
                  <rect x="10.556" y="-0.556" width="28" height="4" rx="2" transform="rotate(45 10.556 -0.556)" fill="currentColor" />
                </svg>
                <h4 className="logo-title ms-3 text-white">Royal Foam</h4>
              </Link>
              <p className="text-white my-4">
                It is a long established fact that the best and affordable mattresses is Royal Foam.
              </p>
              <div className="d-flex align-items-center mb-4">
                <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M1 6V22L8 18L16 22L23 18V2L16 6L8 2L1 6Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="M16 6V22" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8 2V18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="ms-4 mb-0 text-white">No 4 Dankwanu Street Kano</p>
              </div>
              <div className="d-flex align-items-center">
                <svg width="22" height="22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M21 15.92V18.92C21 19.19 20.94 19.47 20.83 19.73C20.72 19.98 20.56 20.21 20.35 20.4C20.15 20.59 19.9 20.73 19.64 20.82C19.38 20.91 19.1 20.95 18.82 20.92C15.74 20.59 12.79 19.53 10.19 17.85C7.77 16.31 5.72 14.26 4.19 11.85C2.5 9.24 1.45 6.27 1.12 3.18C1.09 2.9 1.12 2.62 1.22 2.36C1.31 2.1 1.45 1.85 1.63 1.65C1.82 1.45 2.05 1.28 2.3 1.17C2.55 1.06 2.83 1 3.11 1H6.11C6.6 0.99 7.07 1.17 7.43 1.48C7.8 1.8 8.04 2.24 8.11 2.72C8.24 3.68 8.47 4.62 8.81 5.53C8.94 5.89 8.97 6.28 8.89 6.65C8.81 7.02 8.63 7.37 8.36 7.64L7.09 8.91C8.51 11.41 10.58 13.48 13.09 14.91L14.36 13.64C14.63 13.37 14.98 13.19 15.35 13.11C15.72 13.03 16.11 13.05 16.47 13.19C17.38 13.53 18.32 13.76 19.28 13.89C19.77 13.96 20.21 14.2 20.53 14.58C20.84 14.95 21.01 15.43 21 15.92Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="ms-4 mb-0 text-white">(234) 0703-009-0052</p>
              </div>
            </Col>

            {/* Footer Links */}
            {footerLinks.map((section, idx) => (
              <Col md={2} className="mt-md-0 mt-4" key={idx}>
                <h5 className="mb-4 text-white">{section.title}</h5>
                <ul className="m-0 p-0 list-unstyled text-white">
                  {section.items.map((item, index) => (
                    <li key={index} className={`mb-3 ${index === section.items.length - 1 ? '' : 'mb-3'}`}>
                      {item}
                    </li>
                  ))}
                </ul>
              </Col>
            ))}

            {/* Newsletter & Socials */}
            <Col md={4} className="mt-md-0 mt-4">
              <h5 className="mb-4 text-white">Newsletter</h5>
              <div className="input-group mb-4">
                <input
                  type="text"
                  className="form-control input-email ps-0"
                  placeholder="Email"
                  aria-label="Email"
                />
                <span className="input-group-text input-email-btn" id="basic-addon1"></span>
              </div>

              <ul className="list-unstyled p-0 m-0 d-flex mt-4">
                {socialImages.map((img, idx) => (
                  <li key={idx} className={idx !== 0 ? 'ps-3' : ''}>
                    <Link to="#">
                      <img src={img.src} alt={img.alt} loading="lazy" className="rounded-pill" />
                    </Link>
                  </li>
                ))}
              </ul>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom bg-secondary">
        <Container className="border-top py-4 border-primary">
          <Row>
            <Col md={12} className="text-center text-white">
              <p className="mb-0">&copy; {currentYear} Royal Foam, All Rights Reserved.</p>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};

export default memo(Footer);
