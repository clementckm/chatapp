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

const P = styled.p`
  color: black;
`;

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
        <Grid>
          <Row>
          <Col sm={8} smOffset={2}>
           <P>Welcome to public chat room</P>
           <P>User address: {this.props.userAddress}</P>
           <Button onClick={this.signInPublic}>Public Chat</Button>
           <Button onClick={this.logout}>Logout</Button>
           <UserList addFriend={this.props.addFriend} signInPrivate={this.signInPrivate} getReceiver={this.props.getReceiver} userLoggedIn={this.props.userLoggedIn}/>
           <Friends friends={this.props.friends} />
           Send To: {this.props.to}
          </Col>
          </Row>

       </Grid>
        )
      }
  }

export default Chat
