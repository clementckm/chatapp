import React, { Component } from 'react'
import { Button } from './ui-component/Button.js'

class UserList extends Component {
  constructor(props) {
    super(props);
    this.getReceiver = this.getReceiver.bind(this);
    this.addFriend = this.addFriend.bind(this);
    this.signInPrivate = this.signInPrivate.bind(this);
  }

  getReceiver (item) {
    this.props.getReceiver(item);
  }

  addFriend (item) {
    this.props.addFriend(item)
  }

  signInPrivate () {
    this.props.signInPrivate();
  }
        // <Button onClick={() => this.signInPrivate()}>Private Chat</Button>
  render() {
    return (
      <div>
      User List:
      <ul>
      {this.props.userLoggedIn.map((item, i) => {
        return (
          <li onClick={() => this.getReceiver(item)} key={i}>{item}
          <Button onClick={() => this.addFriend(item)}>Add Friend</Button>

          </li>)
      })}
      </ul>
      </div>

    )
  }
}

export default UserList
