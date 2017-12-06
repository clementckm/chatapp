import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { userEthereumClient } from './ethereumClient.js'
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
      chatHistory:[],
      value: '',
      message: {
        sender: '',
        payload: '',
        timestamp: ''
      }
    }
    this.socket = io('localhost:5000');
    this.socket.on('RECEIVE_MESSAGE', function(data){
      addMessage(data);
    });

    const addMessage = data => {
      this.setState({chatHistory: [...this.state.chatHistory, data]});
    };
    this.getCoinbase = this.getCoinbase.bind(this);
    this.getAccounts = this.getAccounts.bind(this);
    this.generateMessage = this.generateMessage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handlePressEnter = this.handlePressEnter.bind(this);
    this.logout = this.logout.bind(this);
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
      this.socket.emit('SEND_MESSAGE',
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

  logout(){
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
              getCoinbase={this.getCoinbase}/>}
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
              />}
           />
        </Switch>
      </div>
    );
  }
}

export default App;