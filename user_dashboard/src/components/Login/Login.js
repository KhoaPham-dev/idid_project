import React from 'react';
import {app, facebookProvider, googleProvider, db} from '../base';
import { Redirect} from 'react-router-dom';
import { RenderLogin } from './RenderLogin';

function handleErrorLogin(message){
    this.message= message;
}

export class Login extends React.Component{
  constructor(props){
    super(props);
    this.loginWithFacebookAccount = this.loginWithFacebookAccount.bind(this);
    this.loginWithEmailAndPassword = this.loginWithEmailAndPassword.bind(this);
    this.loginWithGoogleAccount = this.loginWithGoogleAccount.bind(this);

    this.state = {
      redirect : false
    }
  }
  
  loginWithGoogleAccount(){
    app.auth().signInWithPopup(googleProvider)
    .then((result, error)=> {
      // Handle Errors here.
      if(error){
        //var errorMessage = error.message;
        // The email of the user's account used.
        // var email = error.email;
        // // The firebase.auth.AuthCredential type that was used.
        // var credential = error.credential;
        // ...
        throw new handleErrorLogin(error);
      }
      else{
        // This gives you a Google Access Token. You can use it to access the Google API.
        // var token = result.credential.accessToken;
        // // The signed-in user info.
        // var user = result.user;
        // ...
        console.log(result);
        return result;
      }  
    })
    .then((userProfile)=>{
      if(userProfile.additionalUserInfo.isNewUser){
        let userID = userProfile.user.uid;
        let email = userProfile.additionalUserInfo.profile.email;
        let profile_picture = userProfile.additionalUserInfo.profile.picture;
        let fullname = userProfile.additionalUserInfo.profile.name;
        return db.ref('users/' + userID).set({
          id: userID,
          username: email,
          email: email,
          fullname: fullname,
          profile_picture : profile_picture,
          permission: "user",
          joined_contest: {}
        })
      }
      else return;
    })
    .then((res)=>{
      console.log(res);
      this.setState({redirect: true})
    })
    .catch((error)=>{
      alert(error.message);
    })

  }

  loginWithFacebookAccount(){
    app.auth().signInWithPopup(facebookProvider)
      .then((result, error) => {
        if (error) {
          throw new handleErrorLogin(error);
        } 
        else {
          console.log(result);
        return result;
        
        }
      })
      .then((userProfile)=>{
        if(userProfile.additionalUserInfo.isNewUser){
          let userID = userProfile.user.uid;
          let email = userProfile.additionalUserInfo.profile.email;
          let profile_picture = userProfile.additionalUserInfo.profile.picture;
          let fullname = userProfile.additionalUserInfo.profile.name;
          return db.ref('users/' + userID).set({
            id: userID,
            username: email,
            email: email,
            fullname: fullname,
            profile_picture : profile_picture,
            permission: "user",
            joined_contest: {}
          })
        }
        else return;
      })
      .then((res)=>{
        console.log(res);
        this.setState({redirect: true})
      })
      .catch((error)=>{
        alert(error.message);
      })

  }
  loginWithEmailAndPassword(event){
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
          console.log(user);
          this.setState({redirect: true})
        }
        else{
          throw new handleErrorLogin("Email or password is wrong!");
        }
      })
      .catch((error) => {
        alert(error.message);
        document.querySelector("form").reset();
      })
  }
  componentWillMount(){
    this.removeAuthListener = app.auth().onAuthStateChanged((user)=>{
      //console.log(user);
      if(user){
        this.setState({
          redirect : true
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
    return <RenderLogin loginWithGoogleAccount={this.loginWithGoogleAccount} loginWithFacebookAccount={this.loginWithFacebookAccount} loginWithEmailAndPassword={this.loginWithEmailAndPassword} />
  }
}