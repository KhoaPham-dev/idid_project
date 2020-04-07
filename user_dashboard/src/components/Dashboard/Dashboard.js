import React from 'react';
import { Redirect} from 'react-router-dom';
import {app} from '../base';
import { RenderDashboard } from './RenderDashboard';
export class Dashboard extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      authenticated: true,
      currentUser: null,
      renderContent: "ContestInfors"
    }
    this.changeRenderContent = this.changeRenderContent.bind(this);
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

  changeRenderContent(content){
    this.setState({
      renderContent: content
    })
  }

  componentWillUnmount() {
    this.removeAuthListener();
  }
  
  render(){
    if(this.state.authenticated === false){
      return <Redirect to={'/login'} />;
    }
    return(
      this.state.currentUser ?
      <RenderDashboard  profilePicture={this.state.currentUser.photoURL}
                        displayName={this.state.currentUser.displayName} 
                        changeRenderContent = {this.changeRenderContent}
                        renderContent = {this.state.renderContent}
                        />
      : <RenderDashboard />
    )
  }
}
