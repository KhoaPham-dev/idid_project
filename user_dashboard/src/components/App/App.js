import React from 'react';
import './App.css';
import {HashRouter, Route} from 'react-router-dom';
import {Login} from '../Login/Login';
import  {Dashboard}  from '../Dashboard/Dashboard';
import {Logout} from '../Logout/Logout';
import { Signup } from '../Signup/Signup';
import {Forget } from '../Forget/Forget';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'
class App extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <HashRouter>
      <ReactNotification />
      <Route exact path="/" render={(props=>{
        return <Dashboard />
      })} />
      <Route exact path="/login" render={(props)=>{
        return <Login />
      }}/>
      <Route exact path="/logout" component={Logout} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/forget" component={Forget} />
      </HashRouter>
    )
  }
}

export default App;
