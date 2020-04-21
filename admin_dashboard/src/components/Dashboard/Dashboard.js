import React from 'react';
import { Redirect} from 'react-router-dom';
import {app, db} from '../base';
import { RenderDashboard } from './RenderDashboard'; 
import { store } from 'react-notifications-component';
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton';

export class Dashboard extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      userId: "",
      authenticated: true,
      currentUser: null,
      renderContent: "ContestInfors",
      isLoading: true
    }
    this.changeRenderContent = this.changeRenderContent.bind(this);
  }
  
  componentWillMount(){
    this.removeAuthListener = app.auth().onAuthStateChanged(async(user) => {
      //Get contests infors
      if (user) {
       
          this.setState({
            authenticated: true,
            currentUser: user,
            userId: user.uid,
            isLoading: false,
            renderContent: document.cookie.substring(6) || "ContestInfors"
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
    document.cookie=`path=/${content}`;
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
      <RenderDashboard  userId={this.state.userId}
                        profilePicture={this.state.currentUser.photoURL}
                        displayName={this.state.currentUser.displayName} 
                        changeRenderContent = {this.changeRenderContent}
                        renderContent = {this.state.renderContent}
                        isLoading={this.state.isLoading}

                        />
      : <RenderDashboard isLoading={this.state.isLoading} />
    )
  }
}
