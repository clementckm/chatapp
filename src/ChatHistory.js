import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const ChatHistoryBox = styled.div`
  text-align: left;
  width: 100%;
  height: 620px;
  overflow-y: auto;
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
const EndDiv = styled.div`
  clear: both;
`;
class ChatHistory extends Component {
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
        {this.props.chatHistory.map((item, i)=>{
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

export default ChatHistory;
