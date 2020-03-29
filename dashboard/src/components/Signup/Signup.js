import React from 'react';
import {app} from '../base';
import { RenderSignup } from './RenderSignup';
import { Redirect } from 'react-router-dom';

//checkValidInput
function handleErrorMessage(message){
  this.message = message;
}

function checkValidInput(firstName, lastName, email, password, repeatPassword){
  if(firstName === "" || lastName === "" || email === "" || password === "" || repeatPassword === "") throw new handleErrorMessage("Form must be filled!");
  if(password.length <= 6) throw new handleErrorMessage("Password should be longer!");
  if(password !== repeatPassword) throw new handleErrorMessage("Repeat password does not match password");
}

export class Signup extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            redirect: false
        }
        this.signUpWithEmailAndPassword = this.signUpWithEmailAndPassword.bind(this);
    }

    signUpWithEmailAndPassword(event){
      event.preventDefault();
  
      const firstName = document.querySelector('input[name="first-name"]').value;
      const lastName = document.querySelector('input[name="last-name"]').value;
      const email = document.querySelector('input[name="email"]').value;
      const password = document.querySelector('input[name="password"]').value;
      const repeatPassword = document.querySelector('input[name="repeat-password"]').value;
      try {
        checkValidInput(firstName, lastName, email, password, repeatPassword);
        app.auth().createUserWithEmailAndPassword(email, password)
        .then((result)=>{
          console.log(result);
          this.setState({
            redirect: true
          })
        })
        .catch((error)=> {
          alert(error.message);
        });
      } catch (error) {
        alert(error.message);
      }
    }

    render(){
      if(this.state.redirect === true){
        return <Redirect to={'/login'} />
      }
        return <RenderSignup signUpWithEmailAndPassword={this.signUpWithEmailAndPassword} />;
    }
}