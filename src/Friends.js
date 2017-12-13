import React, { Component } from 'react'

class Friends extends Component {
  constructor(props) {
    super(props);
    this.getFriends = this.getFriends.bind(this);
  }

  getFriends (item) {
    console.log('friends')
  }

  render() {
    return (
      <div>
      Friends List:
      <ul>
      {this.props.friends.map((item, i) => {
        return (<li onClick={() => this.getFriends(item)} key={i}>{item}</li>)
      })}
      </ul>
      </div>

    )
  }
}

export default Friends
