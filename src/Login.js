import React, { Component } from 'react'
import styled from 'styled-components'
import { userEthereumClient } from './ethereumClient.js'
import { Grid, Col, Row } from 'react-bootstrap'

const H2 = styled.h2`
  color: #F44336;
`;
const P = styled.p`
  color: black;
`;

const Button = styled.button`
  border-radius: 5px;
  border: none;
  background-color: #F44336;
  color: #ffffff;
  padding: 10px;
`;
const BackgroundAlign = styled.div`
  min-height: 100%;
  min-height: 100vh;

  /* Make it a flex container */
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;

  /* Align the bootstrap's container vertically */
    -webkit-box-align : center;
  -webkit-align-items : center;
       -moz-box-align : center;
       -ms-flex-align : center;
          align-items : center;
`;

class Login extends Component {
  constructor(props) {
    super(props);
      this.checkLogin = this.checkLogin.bind(this);
      this.goToChat = this.goToChat.bind(this);
  }

  checkLogin = () => {
    this.props.getAccounts();
    this.props.getCoinbase();
  }

  goToChat () {
      this.props.history.push('/');
      this.props.signIn();
    }

  render() {

    return (
      <BackgroundAlign>
      <Grid>
        <Row>
        <Col sm={8} smOffset={2}>
        <H2>Welcome to the Metamask Chat.</H2>
         <P>Login Status: {this.props.loggedIn}</P>
         <P>User address: {this.props.userAddress}</P>
         <Button onClick={() => this.checkLogin()}>Connect to Metamask</Button>
         {this.props.loggedIn === "Successfully connected to MetaMask" ?
         <Button onClick={() => this.goToChat()}>Login</Button>
         : ('') }
         </Col>
         </Row>
      </Grid>
      </BackgroundAlign>
      )
    }
  }

export default Login
