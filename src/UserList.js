import React, { Component } from 'react'
import { socket } from './socket.js'

class UserList extends Component {
  constructor(props) {
    super(props);

  }


  render() {
    return (
      <div>
      User List:
      {this.props.userLoggedIn.map((item, i) => {
        return (<p key={i}>{item.userAddress}</p>)
      })}
      </div>

    )
  }
}

export default UserList
