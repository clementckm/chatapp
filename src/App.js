import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { userEthereumClient } from './ethereumClient.js'
import { socket } from './socket.js'
import moment from 'moment'
import io from "socket.io-client"
import Login from './Login.js'
import Chat from './Chat.js'
import PrivateChat from './PrivateChat.js'
import PublicChat from './PublicChat.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: 'Loading',
      userAddress: 'Getting address..',
      to:'',
      userLoggedIn:[],
      chatHistory:[],
      privateChatHistory:[],
      value: '',
      message: {
        sender: '',
        payload: '',
        timestamp: ''
      }
    }

    socket.on('PRIVATE_MESSAGE', function(data) {
      addPrivateMessage(data);
    });
    const addPrivateMessage = data => {
      this.setState({privateChatHistory: data});
    };
    socket.on('RECEIVE_MESSAGE', function(data){
      addMessage(data);
    });
    const addMessage = data => {
      this.setState({chatHistory: data});
    };
    socket.on('ONLINE_USER', function(data){
      addUser(data);
    });
    socket.on('OFFLINE_USER', function(data){
      addUser(data);
    });
    const addUser = data => {
      this.setState({userLoggedIn: data});
    };

    this.getCoinbase = this.getCoinbase.bind(this);
    this.getAccounts = this.getAccounts.bind(this);
    this.generateMessage = this.generateMessage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.logout = this.logout.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signInPrivate = this.signInPrivate.bind(this);
    this.sendPrivateMessage = this.sendPrivateMessage.bind(this);
    this.getReceiver = this.getReceiver.bind(this);
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

  getReceiver (receiver) {
    this.setState({to: receiver});
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

    sendPrivateMessage(){
      const time =  moment().format('MMMM Do YYYY, h:mm:ss a');
        socket.emit('PRIVATE_MESSAGE',
          {
            sender: this.state.userAddress,
            receiver: this.state.to,
            roomSender: this.state.userAddress +'_'+ this.state.to,
            roomReceiver: this.state.to +'_'+ this.state.userAddress,
            payload: this.state.value,
            timestamp: time
          }
        );
        this.setState({value:''})
    }

  handleChange(evt) {
    const name = ((evt.target) || evt).name; // for onClick event, we pass in an object with format {name: '', value: ''}
    const value = ((evt.target) || evt).value; // for onClick event, we pass in an object with format {name: '', value: ''}
    this.setState({
      [name]: value
    });
   }

  signInPrivate () {
    const sender = this.state.userAddress
    const to = this.state.to
    socket.emit('JOIN', sender + '_' + to);
    socket.emit('JOIN', to + '_' + sender);
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
          <Route exact path='/'
            render={routeProps =>
              <Login
              {...routeProps}
              loggedIn={this.state.loggedIn}
              userAddress={this.state.userAddress}
              getAccounts={this.getAccounts}
              getCoinbase={this.getCoinbase}
              signIn={this.signIn}/>}
          />
          <Route exact path='/chat'
            render={routeProps =>
              <Chat {...routeProps}
              userAddress={this.state.userAddress}
              logout={this.logout}
              userLoggedIn={this.state.userLoggedIn}
              signInPrivate={this.signInPrivate}
              to={this.state.to}
              getReceiver={this.getReceiver}
              />}
           />
           <Route exact path='/privateChat'
             render={routeProps =>
               <PrivateChat
               {...routeProps}
               to={this.state.to}
               userAddress={this.state.userAddress}
               handleChange={evt => this.handleChange(evt)}
               value={this.state.value}
               sendPrivateMessage={this.sendPrivateMessage}
               privateChatHistory={this.state.privateChatHistory}
               />}
           />
           <Route exact path='/publicChat'
             render={routeProps =>
               <PublicChat
               {...routeProps}
               loggedIn={this.state.loggedIn}
               userAddress={this.state.userAddress}
               handleChange={evt => this.handleChange(evt)}
               value={this.state.value}
               chatHistory={this.state.chatHistory}
               generateMessage={this.generateMessage}
               />}
           />
        </Switch>
      </div>
    );
  }
}

export default App;
