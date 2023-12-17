import React, { Component } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import Form from "react-validation/build/form";
import Form from 'react-bootstrap/Form'
// import CheckButton from "react-validation/build/button";
import Button from "react-bootstrap/Button";
import AuthService from '../Service/AuthService';
import HeaderGuest from './HeaderGuest';

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    //this.form.validateAll();

    AuthService.login(this.state.username, this.state.password).then(
      () => {
        this.props.history.push("/users");
        window.location.reload();
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        this.setState({
          loading: false,
          message: resMessage
        });
      }
    );
  }

  render() {
    const title = <h2>Log In</h2>;

    return (
      <div >
        <HeaderGuest />
        <div className="homeBg">
          <div className="homeOverlay">
            <Container>
              {title}

              <Form onSubmit={this.handleLogin}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="text" name="username" value={this.state.username}
                    onChange={this.onChangeUsername}
                    validations={[required]} placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required]} name="password" placeholder="Password" />
                </Form.Group>

                <Button name="checkBtn" variant="primary" type="submit">
                  Log in
                </Button>
              </Form>

            </Container>
          </div>
        </div>
      </div>
    );
  }
}

export default LogIn;