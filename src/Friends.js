import React, { Component } from 'react'
import { Button } from './ui-component/Button.js'

class Friends extends Component {
  constructor(props) {
    super(props);
    this.getReceiver = this.getReceiver.bind(this);
    this.signInPrivate = this.signInPrivate.bind(this);
  }

  getReceiver (item) {
    this.props.getReceiver(item)
  }

  signInPrivate () {
    this.props.signInPrivate();
  }

  render() {
    return (
      <div>
      Friends List:
      <ul>
      {this.props.friends.map((item, i) => {
        return (
          <li onClick={() => this.getReceiver(item)} key={i}>{item}
          <Button onClick={() => this.signInPrivate()}>Private Chat</Button></li>)
      })}
      </ul>
      </div>

    )
  }
}

export default Friends
