import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { initiateUpdateProfile } from '../actions/profile';
import { validateFields } from '../utils/common';
import { resetErrors } from '../actions/errors';

class Profile extends React.Component {
  state = {
    user_name: '',
    errorMsg: '',
    isSubmitted: false
  };

  componentDidMount() {
    const { profile } = this.props;
    if (!_.isEmpty(profile)) {
      const { user_name } = profile;
      this.setState({
        user_name
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (!_.isEqual(prevProps.errors, this.props.errors)) {
      this.setState({
        errorMsg: this.props.errors
      });
    }
    if (!_.isEqual(prevProps.profile, this.props.profile)) {
      const { user_name } = this.props.profile;
      this.setState({ user_name });
    }
  }

  componentWillUnmount() {
    this.props.dispatch(resetErrors());
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { user_name } = this.state;
    const profileData = {
      user_name
    };

    const fieldsToValidate = [{ user_name }];

    const allFieldsEntered = validateFields(fieldsToValidate);
    if (!allFieldsEntered) {
      this.setState({
        errorMsg: {
          update_error: 'Please enter all the fields.'
        }
      });
    } else {
      this.setState({ isSubmitted: true, errorMsg: '' });
      this.props.dispatch(initiateUpdateProfile(profileData));
    }
  };

  handleOnChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    const { errorMsg, user_name, isSubmitted } = this.state;
    return (
      <div className="col-md-6 offset-md-3">
        <Form onSubmit={this.handleSubmit} className="profile-form">
          {errorMsg && errorMsg.update_error ? (
            <p className="errorMsg centered-message">{errorMsg.update_error}</p>
          ) : (
            isSubmitted && (
              <p className="successMsg centered-message">
                Profile updated successfully.
              </p>
            )
          )}
          <Form.Group controlId="user_name">
            <Form.Label>User name:</Form.Label>
            <Form.Control
              type="text"
              name="user_name"
              placeholder="Enter your user name"
              value={user_name}
              onChange={this.handleOnChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps)(Profile);