import React from "react";
import { Link } from "react-router-dom";
import firebase from "../../firebase";
import md5 from 'md5';

import {
  Grid, Segment, Button, Header, Message, Icon, Form, Divider
} from 'semantic-ui-react';

import SocialLogin from "./SocialLogin";

class Register extends React.Component {
  state = {
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    errors: [],
    loading: false,
    usersRef: firebase.database().ref('users')
  };

  isFormValid = () => {
    let errors = [];
    let error;

    if (this.isFormEmpty(this.state)) {
      error = { message: 'Provide all information' };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else if (!this.isPasswordValid(this.state)) {
      error = { message: 'Passsword is not valid' };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else {
      return true;
    }
  }

  isFormEmpty = ({ username, email, password, passwordConfirmation }) => {
    return !username.length || !email.length || !password.length || !passwordConfirmation.length;
  }

  isPasswordValid = ({ password, passwordConfirmation }) => {
    if (password.length < 6 || passwordConfirmation.length < 6) {
      return false;
    } else if (password !== passwordConfirmation) {
      return false;
    } else {
      return true;
    }
  }

  displayErrors = errors => errors.map((error, i) => <p key={i}>{error.message}</p>);

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.isFormValid()) {
      this.setState({ errors: [], loading: true });

      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(createdUser => {
          createdUser.user.updateProfile({
            displayName: this.state.username,
            photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
          })
            .then(() => {
              this.saveUser(createdUser).then(() => {
                console.log('user saved');
                this.setState({ loading: false });
              })
            })
            .catch(err => {
              this.setState({ errors: this.state.errors.concat(err), loading: false })
            });
        })
        .catch(err => {
          let errors = [];
          let error = { message: err.message }
          this.setState({ errors: errors.concat(error), loading: false });
        });
    }
  }

  saveUser = (createdUser) => {
    return this.state.usersRef.child(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      avatar: createdUser.user.photoURL
    });
  }

  handleInputErrpr = (errors, inputName) => {
    return errors.some(error => error.message.toLowerCase().includes(inputName)) ? 'error' : '';
  }

  // Available colors = "red","orange","yellow","olive","green","teal","blue","violet","purple","pink","brown","grey","black"
  render() {
    const { username, email, password, passwordConfirmation, errors, loading } = this.state;

    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" icon color="teal" textAlign="center">
            <Icon name="user secret" color="teal"></Icon>
            Register for Secret Society
          </Header>

          <Form onSubmit={this.handleSubmit} size="large">
            <Segment stacked>
              <Form.Input fluid className={this.handleInputErrpr(errors, 'user')} name="username" icon="user" iconPosition="left" placeholder="Username" onChange={this.handleChange} type="text" value={username} />
              <Form.Input fluid className={this.handleInputErrpr(errors, 'email')} name="email" icon="mail" iconPosition="left" placeholder="Email" onChange={this.handleChange} type="email" value={email} />
              <Form.Input fluid className={this.handleInputErrpr(errors, 'password')} name="password" icon="lock" iconPosition="left" placeholder="Password" onChange={this.handleChange} type="password" value={password} />
              <Form.Input fluid className={this.handleInputErrpr(errors, 'password')} name="passwordConfirmation" icon="repeat" iconPosition="left" placeholder="Password Confirmation" onChange={this.handleChange} type="password" value={passwordConfirmation} />

              <Button disabled={loading} className={loading ? 'loading' : ''} color="teal" fluid size="large">Submit</Button>
            </Segment>

            <Divider horizontal>Or</Divider>
            <SocialLogin />
          </Form>
          {errors.length > 0 && (
            <Message error>
              <h3>Error</h3>
              {this.displayErrors(errors)}
            </Message>
          )}
          <Message>Already a user?<Link to="/login">Login</Link></Message>
        </Grid.Column>
      </Grid>
    );
  };

}

export default Register;
