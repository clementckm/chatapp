import React, { Component } from 'react'
import moment from 'moment'
import io from "socket.io-client"
import ChatHistory from './ChatHistory.js'
import styled from 'styled-components'

const ChatInputBox = styled.input`
  width: 100%;
  height: 35px;
  font-size: 20px;
  margin-top: 10px;
  outline: none;
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

    render() {
      return (
          <div>
           <P>User address: {this.props.userAddress}</P>
           <Button onClick={() => this.reconnect()}>Reconnect</Button>
          <Button onClick={this.logout}>Logout</Button>
          {this.props.loggedIn !== 'Loading' ?
            <div>
            <ChatInputBox placeholder='Type a message' value={this.props.value} onChange={this.handleInputChange} onKeyPress={this.handlePressEnter}/>
            <ChatHistory userAddress={this.props.userAddress} chatHistory={this.props.chatHistory} />
            </div>
            : ('')}
          </div>
        )
      }
  }

export default Chat
