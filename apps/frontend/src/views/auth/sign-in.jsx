import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import { useForm } from '../../context/use-form';
import { useMutation } from '@apollo/client';
import { SIGNIN } from '../../queries/mutations';
import { Row, Col, Card, Form, Button, Image } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
//import Card from '../../components/Card'
// img
//import auth1 from '../../assets/images/auth/01.png'
import family from '../../assets/images/family.jpg';


const SignIn = () => {
  let navigate = useNavigate();
  const context = useContext(AuthContext);
  
  const signInCallback = () => {
    signIn({ variables: { contact: values.contact, password: values.password } });
  };

  const { onChange, onSubmit, values, formRef, isValidated, errors, setErrors } = useForm(signInCallback, {
    contact: '',
    password: ''
  });

  const [signIn, { loading }] = useMutation(SIGNIN, {
    update(proxy, { data: { signIn: userData }}) {
      context.login(userData);
      navigate('/');
    },
    onError({ graphQLErrors }) {
      const formErrors = {};
      graphQLErrors.forEach(({ message }) => {
        formErrors.general = message;
      });
      setErrors(formErrors);
    },
    variables: { input: values }
  });

  return (
    <>
      <section className="login-content">
        <Row className="m-0 align-items-center bg-white vh-100">
          <Col md="6">
            <Row className="justify-content-center">
              <Col md="10">
                <Card className="card-transparent shadow-none d-flex justify-content-center mb-0 auth-card">
                  <Card.Body>
                    <Link to="/dashboard" className="navbar-brand d-flex align-items-center mb-3">
                      <img src='/src/assets/images/favicon-32x32.png' alt="Logo" />
                      <h4 className="logo-title ms-3">Royal Foam</h4>
                    </Link>
                    <h2 className="mb-2 text-center">Log In</h2>
                    <p className="text-center">Login to stay connected.</p>
                    <Form ref={formRef} noValidate className={`needs-validation ${isValidated ? 'was-validated' : ''}`} onSubmit={onSubmit}>
                      {errors.general && (
                        <div className="alert alert-danger">
                          {errors.general}
                        </div>
                      )}
                      <Row>
                        <Col lg="6">
                          <Form.Group className="form-group">
                            <Form.Label htmlFor="contact">Email or Phone No:</Form.Label>
                            <Form.Control
                              type="text"
                              id="contact"
                              name="contact"
                              autoComplete="on"
                              aria-describedby="contact"
                              onChange={onChange}
                              required
                              className={errors.contact ? 'is-invalid' : ''}
                            />
                            <div className="invalid-feedback">Please enter your contact.</div>
                          </Form.Group>
                        </Col>
                        <Col lg="6">
                          <Form.Group className="form-group">
                            <Form.Label htmlFor="password">Password</Form.Label>
                            <Form.Control
                              type="password"
                              autoComplete="off"
                              name="password"
                              id="password"
                              onChange={onChange}
                              required
                              className={errors.password ? 'is-invalid' : ''}
                            />
                            <div className="invalid-feedback">Please enter your password.</div>
                          </Form.Group>
                        </Col>
                      </Row>
                      <div className="d-flex justify-content-center">
                        <Button type="submit" variant="primary">Log In</Button>
                      </div>
                      <p className="mt-3 text-center">
                        Don’t have an account? <Link to="/auth/sign-up" className="text-underline">Click here to sign up.</Link>
                      </p>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <div className="sign-bg">
              <svg width="280" height="230" viewBox="0 0 431 398" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.05">
                  <rect x="-157.085" y="193.773" width="543" height="77.5714" rx="38.7857" transform="rotate(-45 -157.085 193.773)" fill="#3B8AFF" />
                  <rect x="7.46875" y="358.327" width="543" height="77.5714" rx="38.7857" transform="rotate(-45 7.46875 358.327)" fill="#3B8AFF" />
                  <rect x="61.9355" y="138.545" width="310.286" height="77.5714" rx="38.7857" transform="rotate(45 61.9355 138.545)" fill="#3B8AFF" />
                  <rect x="62.3154" y="-190.173" width="543" height="77.5714" rx="38.7857" transform="rotate(45 62.3154 -190.173)" fill="#3B8AFF" />
                </g>
              </svg>
            </div>
          </Col>
          <Col md="6" className="d-md-block d-none bg-primary p-0 mt-n1 vh-100 overflow-hidden">
            <Image src={family} className="Image-fluid gradient-main animated-scaleX" alt="images" />
          </Col>
        </Row>
      </section>
    </>
  );
};

export default SignIn;
