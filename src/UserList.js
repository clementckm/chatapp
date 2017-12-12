import React, { Component } from 'react'
import { socket } from './socket.js'

class UserList extends Component {
  constructor(props) {
    super(props);
    this.getReceiver = this.getReceiver.bind(this);
  }

  getReceiver (item) {
    this.props.getReceiver(item);
  }

  render() {
    return (
      <div>
      User List:
      <ul>
      {this.props.userLoggedIn.map((item, i) => {
        return (<li onClick={() => this.getReceiver(item)} key={i}>{item}</li>)
      })}
      </ul>
      </div>

    )
  }
}

export default UserList
