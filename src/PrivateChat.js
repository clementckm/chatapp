import React, { Component } from 'react'
import styled from 'styled-components'
import { Grid, Col, Row } from 'react-bootstrap'
import { Button } from './ui-component/Button.js'
import { ChatInputBox } from './ui-component/ChatInputBox.js'
import PrivateChatHistory from './PrivateChatHistory.js'

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
          <Button onClick={this.backButton}>Back</Button>
          <p>From : {this.props.userAddress}</p>
          <p>To: {this.props.to}</p>
          <PrivateChatHistory userAddress={this.props.userAddress} privateChatHistory={this.props.privateChatHistory} />
       </Col>
       </Row>
      </Grid>
      )
    }
  }

export default PrivateChat
