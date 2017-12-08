import React, { Component } from 'react'
import moment from 'moment'
import io from "socket.io-client"
import ChatHistory from './ChatHistory.js'
import styled from 'styled-components'
import UserList from './UserList.js'
import { Grid, Col, Row } from 'react-bootstrap'

const ChatInputBox = styled.input`
  position: fixed;
  bottom: 8px;
  width: 100%;
  max-width: 650px; //variable
  padding: 10px;
  height: 40px;
  font-size: 20px;
  margin-top: 10px;
  outline: none;
  border: 1px solid #8f9696;
  margin-top: 0;
`;
const Button = styled.button`
  border-radius: 5px;
  border: none;
  background-color: #F44336;
  color: #ffffff;
  padding: 10px;
`;
const P = styled.p`
  color: black;
`;

const ChatArea = styled.div`
  border: 1px solid red;
`;

class Chat extends Component {
  constructor(props) {
    super(props);
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handlePressEnter = this.handlePressEnter.bind(this);
      this.logout = this.logout.bind(this);
      this.reconnect = this.reconnect.bind(this);

    }

    handleInputChange(evt) {
      this.props.handleChange(evt.target.value);
     }


    handlePressEnter (evt) {
      if (evt.key === 'Enter') {
        this.props.generateMessage();
        evt.preventDefault();
      }
    }

    logout(){
      this.props.history.push('/Login');
      this.props.logout();
    }

    reconnect () {
      this.props.getCoinbase();
      this.props.getAccounts();
    }
          //  <Button onClick={() => this.reconnect()}>Reconnect</Button>
    render() {
      return (
        <Grid>
          <Row>
          <Col sm={8} smOffset={2}>
           <P>User address: {this.props.userAddress}</P>

          <Button onClick={this.logout}>Logout</Button>
          </Col>
          </Row>
          {this.props.loggedIn === "Successfully connected to MetaMask" ?
            <Row>
            <Col sm={8} smOffset={2}>
              <UserList userLoggedIn={this.props.userLoggedIn}/>
              <ChatHistory userAddress={this.props.userAddress} chatHistory={this.props.chatHistory} />
              <ChatInputBox placeholder='Type a message' value={this.props.value} onChange={this.handleInputChange} onKeyPress={this.handlePressEnter}/>
            </Col>
            </Row>
            : ('')}
       </Grid>
        )
      }
  }

export default Chat
