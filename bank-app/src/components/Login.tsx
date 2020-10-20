import React from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { validateFields } from '../utils/common';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  state = {
    userName: '',
    password: '',
    errorMsg:{signin_error:''} 
  };

  handleLogin = (event : React.FormEvent<EventTarget>) => {
    event.preventDefault();
    const { userName, password } = this.state;
    const fieldsToValidate = [{ userName }, { password }];

    const allFieldsEntered = validateFields(fieldsToValidate);
    if (!allFieldsEntered) {
      this.setState({
        errorMsg: {
          signin_error: 'Please enter all the fields.'
        }
      });
    } else {
      this.setState({
        errorMsg: {
          signin_error: ''
        }
      }); 
      // login successful
    }
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  render() {
    const { errorMsg } = this.state;
    return (
      <div className="login-page">
        <h1>Banking Application</h1>
        <div className="login-form">
          <Form onSubmit={this.handleLogin}>
            {errorMsg && errorMsg.signin_error && (
              <p className="errorMsg centered-message">
                {errorMsg.signin_error}
              </p>
            )}
            <Form.Group controlId="userName">
              <Form.Label>User name</Form.Label>
              <Form.Control
                type="userName"
                name="userName"
                placeholder="Enter user name"
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter password"
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <div className="action-items">
              <Button variant="primary" type="submit">
                Login
              </Button>
              <Link to="/register" className="btn btn-secondary">
                Create account
              </Link>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

export default connect()(Login);