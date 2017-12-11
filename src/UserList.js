import React, { Component } from 'react'
import { socket } from './socket.js'

class UserList extends Component {
  constructor(props) {
    super(props);
    this.getReceiver = this.getReceiver.bind(this);
  }

  getReceiver (receiver) {
    this.props.getReceiver(receiver);
  }

  render() {
    return (
      <div>
      User List:
      <ul>
      {this.props.userLoggedIn.map((item, i) => {
        return (<li onClick={() => this.getReceiver(item.userAddress)} key={i}>{item.userAddress}</li>)
      })}
      </ul>
      </div>

    )
  }
}

export default UserList
