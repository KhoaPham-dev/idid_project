import React from 'react';
import { Redirect} from 'react-router-dom';
import {app} from '../base';
import { RenderDashboard } from './RenderDashboard';
export class Dashboard extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      authenticated: true,
      currentUser: null
    }

  }
  
  componentWillMount(){
    this.removeAuthListener = app.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authenticated: true,
          currentUser: user,
        })
      } else {
        this.setState({
          authenticated: false,
          currentUser: null,
        })
      }
    })
  }

  // shouldComponentUpdate(nextProps, nextState){
  //   if(this.state.authenticated === nextState.authenticated) return false;
  //   else return true;
  // }

  // componentDidUpdate(prevProps, prevState){
     
  // }

  componentWillUnmount() {
    this.removeAuthListener();
  }
  
  render(){
    if(this.state.authenticated === false){
      return <Redirect to={'/login'} />;
    }
    return(
      this.state.currentUser ?
      <RenderDashboard profilePicture={this.state.currentUser.photoURL} displayName={this.state.currentUser.displayName} />
      : <RenderDashboard />
    )
  }
}
