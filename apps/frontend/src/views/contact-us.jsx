import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Card, Col, Row, Container, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import SubHeader from "../components/widgets/sub-header";
import image from "../assets/landing-modules/images/home-4/contact.webp";
import { CREATE_CONTACT_US } from "../marketingQuery/Mutation";

// Constants
const defaultFormData = {
  fullName: "",
  email: "",
  subject: "",
  message: "",
  agree: false,
};

const contactInfo = [
  {
    icon: "fas fa-map-marker-alt",
    title: "Address",
    description: "234 North Avenue Luke Lane, IN 360001",
  },
  {
    icon: "fas fa-envelope",
    title: "Email Us",
    description: "info@royalfoam.ng",
  },
  {
    icon: "fas fa-phone-alt",
    title: "Call Us",
    description: "0703-009-0052",
  },
];

const googleMapUrl = "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d123505.75790910245!2d121.05573800000002!3d14.681181!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397ba0942ef7375%3A0x4a9a32d9fe083d40!2sQuezon%20City%2C%20Metro%20Manila%2C%20Philippines!5e0!3m2!1sen!2sus!4v1676356596840!5m2!1sen!2sus";

const ContactUs = () => {
  const [formData, setFormData] = useState(defaultFormData);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // Apollo Mutation
  const [createContactUs, { loading }] = useMutation(CREATE_CONTACT_US);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const { data } = await createContactUs({
        variables: { input: formData },
      });

      if (data.createContactUs.contactUs) {
        setSuccessMessage("Your message has been sent successfully!");
        setFormData(defaultFormData);
      }
    } catch (error) {
      setErrorMessage("Failed to submit the form. Please try again.");
      console.error("GraphQL Error:", error);
    }
  };

  // Reusable Input Component
  const FormInput = ({ label, name, type = "text", ...rest }) => (
    <Form.Group className="form-group">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        required
        {...rest}
      />
    </Form.Group>
  );

  return (
    <>
      <SubHeader title="Contact Us" />

      {/* Contact Info Section */}
      <div className="section-padding">
        <Container>
          <Row>
            {contactInfo.map((info, index) => (
              <Col md={12} lg={4} key={index}>
                <Card className="rounded-1 mb-lg-0">
                  <Card.Body className="text-center">
                    <div className="services bg-soft-primary rounded-pill text-center mx-auto mb-4">
                      <i className={`${info.icon} fa-2x`}></i>
                    </div>
                    <h5 className="mt-4">{info.title}</h5>
                    <p className="mt-3">{info.description}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      {/* Contact Form Section */}
      <div className="section-padding bg-secondary">
        <Container>
          <Row>
            <Col md={12} lg={6}>
              <p className="mb-2 text-uppercase text-white">Contact Us</p>
              <h2 className="text-white mb-4">
                Have any query? <br /> Get in Touch.
              </h2>
              <img src={image} alt="Contact" className="img-fluid" loading="lazy" />
            </Col>

            <Col md={12} lg={6} className="mt-4 mt-md-0">
              {successMessage && <Alert variant="success">{successMessage}</Alert>}
              {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

              <Form onSubmit={handleSubmit}>
                <FormInput label="Full Name" name="fullName" placeholder="Your Name" />
                <FormInput label="Your Email" name="email" type="email" placeholder="Your Email" />
                <FormInput label="Your Subject" name="subject" placeholder="Your Subject" />
                <Form.Group className="form-group mb-3">
                  <Form.Label>Your Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="message"
                    rows="5"
                    placeholder="Type something..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Check className="form-check mb-3">
                  <Form.Check.Input
                    type="checkbox"
                    id="customCheck1"
                    name="agree"
                    checked={formData.agree}
                    onChange={handleChange}
                    required
                  />
                  <Form.Check.Label htmlFor="customCheck1">
                    By Clicking You Agree To Use Our “Form” Terms & Condition
                  </Form.Check.Label>
                </Form.Check>

                <Button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? "Submitting..." : "Submit"}
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Google Map Section */}
      <div>
        <iframe
          title="google-map"
          src={googleMapUrl}
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </>
  );
};

export default ContactUs;
