import React from "react";
import { Link } from "react-router-dom";
import firebase from "../../firebase";

import {
  Grid, Segment, Button, Header, Message, Icon, Form
} from 'semantic-ui-react';

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    errors: [],
    loading: false
  };

  displayErrors = errors => errors.map((error, i) => <p key={i}>{error.message}</p>);

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.isFormValid(this.state)) {
      this.setState({ errors: [], loading: true });

      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(signedInuser => {
          console.log(signedInuser);
          this.setState({ loading: false });
        })
        .catch(err => {
          this.setState({ errors: this.state.errors.concat(err), loading: false });
        });
    }
  }

  isFormValid = ({ email, password }) => email && password;

  handleInputErrpr = (errors, inputName) => {
    return errors.some(error => error.message.toLowerCase().includes('email')) ? 'error' : '';
  }

  // Available colors = "red","orange","yellow","olive","green","teal","blue","violet","purple","pink","brown","grey","black"
  render() {
    const { email, password, errors, loading } = this.state;

    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" icon color="teal" textAlign="center">
            <Icon name="user secret" color="teal"></Icon>
            Login Secret Society
          </Header>

          <Form onSubmit={this.handleSubmit} size="large">
            <Segment stacked>
              <Form.Input fluid className={this.handleInputErrpr(errors, 'email')} name="email" icon="mail" iconPosition="left" placeholder="Email" onChange={this.handleChange} type="email" value={email} />
              <Form.Input fluid className={this.handleInputErrpr(errors, 'password')} name="password" icon="lock" iconPosition="left" placeholder="Password" onChange={this.handleChange} type="password" value={password} />

              <Button disabled={loading} className={loading ? 'loading' : ''} color="teal" fluid size="large">Submit</Button>
            </Segment>
          </Form>
          {errors.length > 0 && (
            <Message error>
              <h3>Error</h3>
              {this.displayErrors(errors)}
            </Message>
          )}
          <Message>Don't have a account?<Link to="/register">Register</Link></Message>
        </Grid.Column>
      </Grid>
    );
  };

}

export default Login;
