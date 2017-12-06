import React, { Component } from 'react';
import styled from 'styled-components';

const ChatHistoryBox = styled.div`
  text-align: left;
  width: 100%;
`;

const ChatBox = styled.div`
  padding-top: 7px;
  overflow: auto;
  float: ${props => props.sender === props.userAddress ? 'right' : 'left'};
  clear: both;
`;

const TimestampBox = styled.div`
  font-size: 13px;
  opacity: 0.7;
  font-style: italic;
`;

const PayloadBox = styled.div`
  padding: 7px;
  max-width: 300px;
  background-color: ${props=> props.sender === props.userAddress ? '#F44336' : '#8f9696'};
  color: #ffffff;
  border-radius: 5px;
`;

const SenderBox = styled.div`
  font-size: 13px;
  opacity: 0.7;
  font-style: italic;
`;
class ChatHistory extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <ChatHistoryBox>
        {this.props.chatHistory.map((item, i)=>{
          return (
            <ChatBox userAddress={this.props.userAddress} sender={item.sender} key={i}>
            <PayloadBox userAddress={this.props.userAddress} sender={item.sender}>{item.payload}</PayloadBox>
            <SenderBox>{item.sender}</SenderBox>
            <TimestampBox>{item.timestamp}</TimestampBox>
            </ChatBox>
          );
        })
        }
      </ChatHistoryBox>
    );
  }

}

export default ChatHistory;
