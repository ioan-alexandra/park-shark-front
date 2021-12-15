import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthService from '../Service/AuthService';
import HeaderGuest from './HeaderGuest';

class SignUp extends Component {
  emptyItem = {
    username: '',
    email: '',
    password: ''
  };
  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = { ...this.state.item };
    item[name] = value;
    this.setState({ item });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { item } = this.state;

    AuthService.register(item);

    this.props.history.push('/users');
  }

  render() {
    const { item } = this.state;
    const title = <h2>Sign Up</h2>;

    return (
      <div>
        <HeaderGuest />
        <div className="homeBg">
          <div className="homeOverlay">
            <Container>
              {title}

              <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                  <Label for="username">Username</Label>
                  <Input type="text" name="username" id="username" value={item.username || ''}
                    required onChange={this.handleChange} />
                </FormGroup>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input type="email" name="email" id="email" value={item.email || ''}
                    required onChange={this.handleChange} />
                </FormGroup>
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input type="text" name="password" id="password" value={item.password || ''}
                    required onChange={this.handleChange} />
                </FormGroup>
                <FormGroup>
                  <Button color="primary" type="submit">Sign Up</Button>{' '}
                  <Button color="secondary" tag={Link} to="/">Cancel</Button>
                </FormGroup>
              </Form>
            </Container>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;