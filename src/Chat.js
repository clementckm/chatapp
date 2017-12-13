import React, { Component } from 'react'
import moment from 'moment'
import io from "socket.io-client"
import ChatHistory from './ChatHistory.js'
import styled from 'styled-components'
import UserList from './UserList.js'
import Friends from './Friends.js'
import { Grid, Col, Row } from 'react-bootstrap'
import { Button } from './ui-component/Button.js'
import { ChatInputBox } from './ui-component/ChatInputBox.js'
import { ChatBackground } from './ui-component/ChatBackground.js'
import { H2, H4 } from './ui-component/Font.js'
import { Nav } from './ui-component/Nav.js'
const ChatArea = styled.div`
  border: 1px solid red;
`;



class Chat extends Component {
  constructor(props) {
    super(props);
      this.logout = this.logout.bind(this);
      this.signInPrivate = this.signInPrivate.bind(this);
      this.signInPublic = this.signInPublic.bind(this);
    }

    signInPrivate () {
      this.props.signInPrivate();
      this.props.history.push('/privateChat')
    }

    signInPublic () {
      this.props.history.push('/publicChat')
    }

    logout(){
      this.props.history.push('/');
      this.props.logout();
    }

    render() {
      return (
        <Row>

          <Col sm={10} smOffset={1}>

           <H2>Chat Room.</H2>

           <H4>User address: {this.props.userAddress}</H4>
           <Nav>
           <Button onClick={this.signInPublic}>Public Chat</Button>
           <Button onClick={this.logout}>Logout</Button>
           </Nav>
            <H4>Send To: {this.props.to} </H4>
           <Row>
           <Col sm={6}>
           <ChatBackground>
           <UserList addFriend={this.props.addFriend} signInPrivate={this.signInPrivate} getReceiver={this.props.getReceiver} userLoggedIn={this.props.userLoggedIn}/>
           </ChatBackground>
           </Col>
           <Col sm={6}>
           <ChatBackground>
           <Friends friends={this.props.friends} getReceiver={this.props.getReceiver} signInPrivate={this.signInPrivate} />

           </ChatBackground>
           </Col>
           </Row>
          </Col>

       </Row>
        )
      }
  }

export default Chat
