import React from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import {Login} from '../Login/Login';
import  {Dashboard}  from '../Dashboard/Dashboard';
import {Logout} from '../Logout/Logout';
import { Signup } from '../Signup/Signup';
class App extends React.Component{
  
  render(){
    return(
      <BrowserRouter>
      <Route exact path="/" render={(props=>{
        return <Dashboard />
      })} />
      <Route exact path="/login" render={(props)=>{
        return <Login />
      }}/>
      <Route exact path="/logout" component={Logout} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/forget" component={Forget} />
      </BrowserRouter>
    )
  }
}

export default App;
