import React, { Component } from 'react'
import styled from 'styled-components'
import { Grid, Col, Row } from 'react-bootstrap'
import { Button } from './ui-component/Button.js'
import { ChatInputBox } from './ui-component/ChatInputBox.js'
import PrivateChatHistory from './PrivateChatHistory.js'
import { ChatBackground } from './ui-component/ChatBackground.js'
import { H4 } from './ui-component/Font.js'
import { Nav } from './ui-component/Nav.js'
class PrivateChat extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    this.backButton = this.backButton.bind(this);
    this.handlePressEnter = this.handlePressEnter.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  backButton () {
    this.props.history.push('/chat')
  }

  handleInputChange(evt) {
    this.props.handleChange(evt);
   }

  handlePressEnter (evt) {
    if (evt.key === 'Enter') {
      this.props.sendPrivateMessage();
      evt.preventDefault();
    }
  }
  render () {
    return (
      <Grid>
        <Row>
        <Col sm={8} smOffset={2}>
        <ChatInputBox placeholder='Type a message' name='value' value={this.props.value} onChange={this.handleInputChange} onKeyPress={this.handlePressEnter}/>
          <Nav><Button onClick={this.backButton}>Back</Button></Nav>
          <H4>From : {this.props.userAddress}</H4>
          <H4>To: {this.props.to}</H4>
          <ChatBackground>
          <PrivateChatHistory userAddress={this.props.userAddress} to={this.props.to} privateChatHistory={this.props.privateChatHistory} />
          </ChatBackground>
       </Col>
       </Row>
      </Grid>
      )
    }
  }

export default PrivateChat
