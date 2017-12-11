import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { userEthereumClient } from './ethereumClient.js'
import { socket } from './socket.js'
import moment from 'moment'
import io from "socket.io-client"
import Login from './Login.js'
import Chat from './Chat.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: 'Loading',
      userAddress: 'Getting address..',
      to:'',
      userLoggedIn:[],
      chatHistory:[],
      value: '',
      message: {
        sender: '',
        payload: '',
        timestamp: ''
      }
    }

    socket.on('PRIVATE_MESSAGE', function(msg) {
      console.log(msg);
      addMessage(msg);
    });
    socket.on('RECEIVE_MESSAGE', function(data){
      addMessage(data);
    });
    const addMessage = data => {
      this.setState({chatHistory: [...this.state.chatHistory, data]});
    };
    socket.on('ONLINE_USER', function(data){
      addUser(data);
    });
    const addUser = data => {
      this.setState({userLoggedIn: [...this.state.userLoggedIn, data]});
    };
    socket.on('OFFLINE_USER', function(data){
      removeUser(data);
    });
    const removeUser = data => {
      var len
      var u = this.state.userLoggedIn.slice();
      for(var i = 0, len = this.state.userLoggedIn.length; i < len; i++ ) {
           if( u[i].userAddress === data ){
               u.splice(i,1);
           }
       }
      this.setState({userLoggedIn: u})
    }
    this.getCoinbase = this.getCoinbase.bind(this);
    this.getAccounts = this.getAccounts.bind(this);
    this.generateMessage = this.generateMessage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handlePressEnter = this.handlePressEnter.bind(this);
    this.logout = this.logout.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signInPrivate = this.signInPrivate.bind(this);
    this.sendPrivate = this.sendPrivate.bind(this);
    this.receivePrivate = this.receivePrivate.bind(this);
  }

  getAccounts(){
    userEthereumClient.eth.getAccounts(function(err, accounts){
        if (err != null) {
          this.setState({
            loggedIn: "An error occurred: " + err
          });
        } else if (accounts.length === 0) {
          this.setState({
            loggedIn: "User is not logged in to MetaMask"
          });
        } else {
          this.setState({
            loggedIn: "Successfully connected to MetaMask"
          });
        }
      }.bind(this)
    );
  }

  getCoinbase(){
    userEthereumClient.eth.getCoinbase(function(error, result){
      if(!error) {
          this.setState({
            userAddress:result
          });
        }
      }.bind(this)
    );
  }

  generateMessage () {
    const time =  moment().format('MMMM Do YYYY, h:mm:ss a');
      socket.emit('SEND_MESSAGE',
        {
          sender: this.state.userAddress,
          payload: this.state.value,
          timestamp: time
        }
      );
      this.setState({value:''})
    }

  handleChange(value) {
     this.setState({value: value});
   }

  handlePressEnter (evt) {
    if (evt.key === 'Enter') {
      this.generateMessage();
      this.setState({value:''});
      evt.preventDefault();
    }
  }

  signInPrivate () {
    // this.setState()
    console.log('triggered private function in app.js')
      socket.emit('JOIN', this.state.userAddress);
      console.log('emitted to join room message in app.js')
      // socket.emit('message', 'welcome to private chat');
  }

  sendPrivate () {
    socket.emit('PRIVATE_MESSAGE', { msg:'Private message from client', room: this.state.userAddress})
  }

  receivePrivate () {
    // socket.on('JOIN', function(room) {
    //   console.log('room hash:', room)
    //   socket.join(room);
    //   console.log('join room')

  }

  signIn () {
    socket.emit('ONLINE',{
      userAddress: this.state.userAddress
    })
  }

  logout(){
    socket.emit('OFFLINE', this.state.userAddress)
    this.setState({
      loggedIn: 'Loading',
      userAddress: 'Getting address..'
    })
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/login'
            render={routeProps =>
              <Login
              {...routeProps}
              loggedIn={this.state.loggedIn}
              userAddress={this.state.userAddress}
              getAccounts={this.getAccounts}
              getCoinbase={this.getCoinbase}
              signIn={this.signIn}/>}
          />
          <Route exact path='/'
            render={routeProps =>
              <Chat {...routeProps}
              loggedIn={this.state.loggedIn}
              userAddress={this.state.userAddress}
              getAccounts={this.getAccounts}
              getCoinbase={this.getCoinbase}
              logout={this.logout}
              handleChange={evt => this.handleChange(evt)}
              generateMessage={this.generateMessage}
              value={this.state.value}
              chatHistory={this.state.chatHistory}
              userLoggedIn={this.state.userLoggedIn}
              signInPrivate={this.signInPrivate}
              sendPrivate={this.sendPrivate}
              receivePrivate={this.receivePrivate}
              />}
           />
        </Switch>
      </div>
    );
  }
}

export default App;
