import React, { memo } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const SubHeader = memo(({ breadcrumbItems = [] }) => {
  return (
    <div className="sub-header">
      <Container>
        <Row>
          <Col lg={12} className="text-center">
            {/* Main Title (last breadcrumb item) */}
            <h3 className="text-white mb-4">
              {breadcrumbItems[breadcrumbItems.length - 1]}
            </h3>

            {/* Breadcrumb Trail */}
            <h6 className="text-white d-flex justify-content-center align-items-center gap-2 flex-wrap">
              {breadcrumbItems.map((item, index) => (
                <span key={index} className="d-flex align-items-center">
                  {index !== 0 ? (
                    <svg
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      style={{ margin: '0 5px' }}
                    >
                      <path
                        d="M12.1415 6.5899C11.9075 6.71614 11.7616 6.95618 11.7616 7.21726V11.2827H3.73429C3.32896 11.2827 3 11.604 3 12C3 12.3959 3.32896 12.7172 3.73429 12.7172H11.7616V16.7827C11.7616 17.0447 11.9075 17.2848 12.1415 17.4101C12.3755 17.5372 12.6614 17.5286 12.8875 17.39L20.6573 12.6073C20.8708 12.4753 21 12.2467 21 12C21 11.7532 20.8708 11.5247 20.6573 11.3927L12.8875 6.60998C12.7681 6.5373 12.632 6.5 12.4959 6.5C12.3745 6.5 12.2521 6.5306 12.1415 6.5899Z"
                        fill="currentColor"
                      />
                    </svg>
                  ) : null}

                  {/* Optional: Make the "Home" link clickable */}
                  {index === 0 ? (
                    <Link to="/" className="text-white text-decoration-none">
                      {item}
                    </Link>
                  ) : (
                    <span>{item}</span>
                  )}
                </span>
              ))}
            </h6>
          </Col>
        </Row>
      </Container>
    </div>
  );
});

export default SubHeader;
