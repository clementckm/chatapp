import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { ChatHistoryBox, ChatBox, TimestampBox, PayloadBox, SenderBox, EndDiv } from './ui-component/ChatBoxUI.js'

class PrivateChatHistory extends Component {
  constructor(props){
    super(props);
    this.scrollToBottom = this.scrollToBottom.bind(this);
  }
  scrollToBottom() {
    const node = ReactDOM.findDOMNode(this.el)
    node.scrollIntoView();

  }
  componentDidUpdate() {
    this.scrollToBottom();
  }
  render() {
    return (
      <ChatHistoryBox>
        {this.props.privateChatHistory.map((item, i)=>{
          return (
            <ChatBox ref={i} userAddress={this.props.userAddress} sender={item.sender} key={i}>
            <PayloadBox userAddress={this.props.userAddress} sender={item.sender}>{item.payload}</PayloadBox>
            <SenderBox>{item.sender}</SenderBox>
            <TimestampBox>{item.timestamp}</TimestampBox>
            </ChatBox>
          );
        })
        }
        <EndDiv ref={el => { this.el = el; }}></EndDiv>
      </ChatHistoryBox>
    );
  }

}

export default PrivateChatHistory;
