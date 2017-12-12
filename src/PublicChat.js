import React, { Component } from 'react'
import styled from 'styled-components'
import { Grid, Col, Row } from 'react-bootstrap'
import { Button } from './ui-component/Button.js'
import { ChatInputBox } from './ui-component/ChatInputBox.js'
import ChatHistory from './ChatHistory.js'

class PublicChat extends Component {
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
      this.props.generateMessage();
      evt.preventDefault();
    }
  }
  render () {
    return (
      <Grid>
        <Row>
        <Col sm={8} smOffset={2}>
        <Button onClick={this.backButton}>Back</Button>
        <p>From : {this.props.userAddress}</p>
        {this.props.loggedIn === "Successfully connected to MetaMask" ?
          <Row>
          <Col sm={8} smOffset={2}>
            <ChatHistory userAddress={this.props.userAddress} chatHistory={this.props.chatHistory} />
            <ChatInputBox placeholder='Type a message' name='value' value={this.props.value} onChange={this.handleInputChange} onKeyPress={this.handlePressEnter}/>
          </Col>
          </Row>
          : ('')}
       </Col>
       </Row>
      </Grid>
      )
    }
  }

export default PublicChat
