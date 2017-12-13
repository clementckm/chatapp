import React, { Component } from 'react'
import styled from 'styled-components'
import { userEthereumClient } from './ethereumClient.js'
import { Grid, Col, Row } from 'react-bootstrap'
import { Button } from './ui-component/Button.js'
import { keyframes } from 'styled-components'
  // color: #5f6c72;
const boxChange = keyframes`
  from {width: 0%;}
  to {width: 100%;}
`;

const H2 = styled.h2`
 color: #ffffff;

`;
const Status = styled.div`
  margin: 0px;
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

const LoginBox = styled.div`
  height: 50px;
  border-radius: 5px;
  padding: 15px;
  background-color: #FFFFFF;
  margin-top: 15px;
  margin-bottom: 15px;
  overflow: hidden !important;
  ${props => props.loggedIn  === "Successfully connected to MetaMask" ? `animation: ${boxChange} normal 0.5s` : ''  }
`;



class Login extends Component {
  constructor(props) {
    super(props);
      this.checkLogin = this.checkLogin.bind(this);
      this.goToChat = this.goToChat.bind(this);
  }

  checkLogin () {
    this.props.getAccounts();
    this.props.getCoinbase();
  }

  goToChat () {
      this.props.history.push('/chat');
      this.props.signIn();
    }

  render() {

    return (
      <BackgroundAlign>
      <Grid>
        <Row>
        <Col sm={6} smOffset={3}>
        <H2>Chat App.</H2>
        {this.props.loggedIn === "Successfully connected to MetaMask" ?
        <div>
        <LoginBox loggedIn={this.props.loggedIn}>
         <Status>Login Status: {this.props.loggedIn}</Status>
         </LoginBox>
         <LoginBox loggedIn={this.props.loggedIn}>
         <Status>User address: {this.props.userAddress}</Status>
         </LoginBox>
        <Button onClick={() => this.goToChat()}>Login</Button>
        </div>
        : ('') }
         <Button onClick={() => this.checkLogin()}>Connect to Metamask</Button>


         </Col>
         </Row>
      </Grid>
      </BackgroundAlign>
      )
    }
  }

export default Login
