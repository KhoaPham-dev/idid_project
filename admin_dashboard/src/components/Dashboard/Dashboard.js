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
      renderContent: "Database",
      isLoading: true
    }
    this.changeRenderContent = this.changeRenderContent.bind(this);
  }
  
  componentWillMount(){
    this.removeAuthListener = app.auth().onAuthStateChanged(async(user) => {
      //Get contests infors
      if (user) {
       //check if this account is user or admin
      db.ref('/admins/'+ user.uid + '/permission/').once('value', (snapshot)=>{
        //if this account is user => logout, does not have permission
        if(snapshot.val() != 'admin'){
          app.auth().signOut().then((user) => {
            this.setState({ 
              authenticated: false,
              isLoading: false
             })
          })
          alert("Email or password is wrong!");
        }
        else{
          this.setState({
            authenticated: true,
            currentUser: user,
            userId: user.uid,
            isLoading: false,
            renderContent: document.cookie.substring(6) || "Database"
          })
        }
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
