import React, { Component } from 'react'
import styled from 'styled-components'
import { userEthereumClient } from './ethereumClient.js'

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
    }

  render() {

    return (
      <div>
        <H2>Welcome to the Chat Room. Please connect to the Metamask.</H2>
         <P>Login Status: {this.props.loggedIn}</P>
         <P>User address: {this.props.userAddress}</P>
         <Button onClick={() => this.checkLogin()}>Connect to Metamask</Button>
         {this.props.loggedIn !== 'Loading' ?
         <Button onClick={() => this.goToChat()}>Login</Button>
         : ('') }
      </div>
      )
    }
  }

export default Login
