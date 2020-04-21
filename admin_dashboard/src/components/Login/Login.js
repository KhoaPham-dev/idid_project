import React from 'react';
import {app, db} from '../base';
import { Redirect} from 'react-router-dom';
import { RenderLogin } from './RenderLogin';

function handleErrorLogin(message){
    this.message= message;
}

export class Login extends React.Component{
  constructor(props){
    super(props);
    this.loginWithEmailAndPassword = this.loginWithEmailAndPassword.bind(this);

    this.state = {
      redirect : false,
      isLoading: false
    }
  }
  
  loginWithEmailAndPassword(event){
    this.setState({
      isLoading: true
    })
    event.preventDefault()

    const email = document.querySelector('input[type="email"]').value;

    const password = document.querySelector('input[type="password"]').value;

    app.auth().fetchSignInMethodsForEmail(email)
      .then((providers) => {
        //console.log(providers);
        if (providers.indexOf("password") === -1) {
          // they used facebook or google account
          document.querySelector("form").reset();
          throw new handleErrorLogin("Email has not registered yet!")
        } else {
          // sign user in
          return app.auth().signInWithEmailAndPassword(email, password)
        }
      })
      .then((user) => {
        if (user && user.user.email) {
          document.querySelector("form").reset();
        }
        else{
          throw new handleErrorLogin("Email or password is wrong!");
        }
      })
      .catch((error) => {
        this.setState({
          isLoading: false
        })
        alert(error.message);
        document.querySelector("form").reset();
      })
  }
  componentWillMount(){
    this.removeAuthListener = app.auth().onAuthStateChanged((user)=>{
      if(user){
      //check if this account is user or admin
      db.ref('/users/'+ user.uid + '/permission/').once('value', (snapshot)=>{
        //if this account is user => logout, does not have permission
        if(snapshot.val() == 'user'){
          app.auth().signOut().then((user) => {
            this.setState({ 
              redirect: false,
              isLoading: false
             })
          })
          alert("Email or password is wrong!");
        }
        else{
          this.setState({
            redirect: true,
            isLoading: false
          })
        }
      })
      }
    })
  }
  componentWillUnmount(){
    this.removeAuthListener();
  }
  render(){
    if (this.state.redirect === true) {
      return <Redirect to={'/'} />
    }
    return <RenderLogin 
                        loginWithEmailAndPassword={this.loginWithEmailAndPassword} 
                        isLoading={this.state.isLoading}
                        />
  }
}