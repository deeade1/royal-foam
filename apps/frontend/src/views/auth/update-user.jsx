import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import { useForm } from '../../context/use-form';
import { useMutation } from '@apollo/client';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { UPDATE_USER } from '../../queries/mutations';
import avatars1 from '../../assets/images/avatars/01.png';



const UpdateUser = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  const updateUserCallback = () => {
    updateUser({ variables: { input: { userId: context.user.id, ...values } } });
  };

  const { onChange, onSubmit, values, formRef, isValidated, errors, setErrors } = useForm(updateUserCallback, {
    firstName: '',
    lastName: '',
    files: null,
    streetAddress1: '',
    companyName: '',
    city: '',
    state: '',
    country: '',
  });

  const [updateUser] = useMutation(UPDATE_USER, {
    update(proxy, { data: { updateUser: userData } }) {
      context.login(userData.user);
      navigate('/');
    },
    onError({ graphQLErrors }) {
      const formErrors = {};
      graphQLErrors.forEach(({ message }) => {
        formErrors.general = message;
      });
      setErrors(formErrors);
    },
  });

  return (
    <div>
      <Row>
        <Col sm="12" lg="6">
          <Card>
            <Card.Header className="d-flex justify-content-between">
              <div className="header-title">
                <h4 className="card-title">Update User</h4>
              </div>
            </Card.Header>
            <Card.Body>
              <Form ref={formRef} noValidate className={`needs-validation ${isValidated ? 'was-validated' : ''}`} onSubmit={onSubmit}>
                {errors.general && (
                  <div className="alert alert-danger">
                    {errors.general}
                  </div>
                )}
                <Row>
                  <Col lg="6">
                    <Form.Group className="form-group">
                      <Form.Label htmlFor="firstName">First Name</Form.Label>
                      <Form.Control
                        type="text"
                        id="firstName"
                        name="firstName"
                        autoComplete="off"
                        onChange={onChange}
                        required
                        className={errors.firstName ? 'is-invalid' : ''}
                      />
                      <div className="invalid-feedback">Please enter your first name.</div>
                    </Form.Group>
                  </Col>
                  <Col lg="6">
                    <Form.Group className="form-group">
                      <Form.Label htmlFor="lastName">Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        id="lastName"
                        name="lastName"
                        autoComplete="off"
                        onChange={onChange}
                        required
                        className={errors.lastName ? 'is-invalid' : ''}
                      />
                      <div className="invalid-feedback">Please enter your last name.</div>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col lg="6">
                    <Form.Group className="form-group">
                      <Form.Label htmlFor="files">Profile Picture</Form.Label>
                      <Form.Control
                        type="file"
                        id="files"
                        name="files"
                        onChange={onChange}
                        className={errors.files ? 'is-invalid' : ''}
                      />
                      <div className="invalid-feedback">Please upload your profile picture.</div>
                    </Form.Group>
                  </Col>
                  <Col lg="6">
                    <Form.Group className="form-group">
                      <Form.Label htmlFor="streetAddress1">Address</Form.Label>
                      <Form.Control
                        type="text"
                        id="streetAddress1"
                        name="streetAddress1"
                        autoComplete="off"
                        onChange={onChange}
                        required
                        className={errors.streetAddress1 ? 'is-invalid' : ''}
                      />
                      <div className="invalid-feedback">Please enter your address.</div>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col lg="6">
                    <Form.Group className="form-group">
                      <Form.Label htmlFor="companyName">Company Name</Form.Label>
                      <Form.Control
                        type="text"
                        id="companyName"
                        name="companyName"
                        autoComplete="off"
                        onChange={onChange}
                        className={errors.companyName ? 'is-invalid' : ''}
                      />
                      <div className="invalid-feedback">Please enter your company name.</div>
                    </Form.Group>
                  </Col>
                  <Col lg="6">
                    <Form.Group className="form-group">
                      <Form.Label htmlFor="city">City</Form.Label>
                      <Form.Control
                        type="text"
                        id="city"
                        name="city"
                        autoComplete="off"
                        onChange={onChange}
                        required
                        className={errors.city ? 'is-invalid' : ''}
                      />
                      <div className="invalid-feedback">Please enter your city.</div>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col lg="6">
                    <Form.Group className="form-group">
                      <Form.Label htmlFor="state">State</Form.Label>
                      <Form.Control
                        type="text"
                        id="state"
                        name="state"
                        autoComplete="off"
                        onChange={onChange}
                        required
                        className={errors.state ? 'is-invalid' : ''}
                      />
                      <div className="invalid-feedback">Please enter your state.</div>
                    </Form.Group>
                  </Col>
                  <Col lg="6">
                    <Form.Group className="form-group">
                      <Form.Label htmlFor="country">Country</Form.Label>
                      <Form.Control
                        type="text"
                        id="country"
                        name="country"
                        autoComplete="off"
                        onChange={onChange}
                        required
                        className={errors.country ? 'is-invalid' : ''}
                      />
                      <div className="invalid-feedback">Please enter your country.</div>
                    </Form.Group>
                  </Col>
                </Row>
                <div className="d-flex justify-content-center">
                  <Button type="submit" variant="primary">Update</Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default UpdateUser;




