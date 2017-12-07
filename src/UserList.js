import React, { Component } from 'react'
import { socket } from './socket.js'

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state= {
      userLoggedIn: []
    };
    socket.on('ONLINE_USER', function(data){
      addUser(data);
    });
    const addUser = data => {
      this.setState({userLoggedIn: [...this.state.userLoggedIn, data]});
    };
  }

  render() {
    return (
      <div>
      User List:
      {this.state.userLoggedIn.map((item, i) => {
        return (<p key={i}>{item.userLoggedIn}</p>)
      })}
      </div>

    )
  }
}

export default UserList
