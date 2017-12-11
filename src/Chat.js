import React, { Component } from 'react'
import moment from 'moment'
import io from "socket.io-client"
import ChatHistory from './ChatHistory.js'
import styled from 'styled-components'
import UserList from './UserList.js'
import { Grid, Col, Row } from 'react-bootstrap'
import { Button } from './ui-component/Button.js'
import { ChatInputBox } from './ui-component/ChatInputBox.js'

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
      this.signInPrivate = this.signInPrivate.bind(this);
    }

    handleInputChange(evt) {
      this.props.handleChange(evt);
     }


    handlePressEnter (evt) {
      if (evt.key === 'Enter') {
        this.props.generateMessage();
        evt.preventDefault();
      }
    }

    signInPrivate () {
      this.props.signInPrivate();
      this.props.history.push('/privateChat')
    }

    logout(){
      this.props.history.push('/');
      this.props.logout();
    }

    render() {
      return (
        <Grid>
          <Row>
          <Col sm={8} smOffset={2}>
           <P>Welcome to public chat room</P>
           <P>User address: {this.props.userAddress}</P>
           <Button onClick={this.signInPrivate}>Private Chat</Button>
           <Button onClick={this.logout}>Logout</Button>

          </Col>
          </Row>
          {this.props.loggedIn === "Successfully connected to MetaMask" ?
            <Row>
            <Col sm={8} smOffset={2}>
              <UserList getReceiver={this.props.getReceiver} userLoggedIn={this.props.userLoggedIn}/>

              Send To: {this.props.to}
              <ChatHistory userAddress={this.props.userAddress} chatHistory={this.props.chatHistory} />
              <ChatInputBox placeholder='Type a message' name='value' value={this.props.value} onChange={this.handleInputChange} onKeyPress={this.handlePressEnter}/>
            </Col>
            </Row>
            : ('')}
       </Grid>
        )
      }
  }

export default Chat
