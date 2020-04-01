import React from 'react';
import axios from 'axios';
import {app} from '../base';
import { RenderSignup } from './RenderSignup';
import { Redirect } from 'react-router-dom';
import { db } from '../base';

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/idid/image/upload";
const CLOUDINARY_UPLOAD_PRESET = 'preset1';
//checkValidInput
function handleErrorMessage(message){
  this.message = message;
}

function checkValidInput(firstName, lastName, email, password, repeatPassword){
  if(firstName === "" || lastName === "" || email === "" || password === "" || repeatPassword === "") throw new handleErrorMessage("Form must be filled!");
  if(password.length <= 6) throw new handleErrorMessage("Password should be longer!");
  if(password !== repeatPassword) throw new handleErrorMessage("Repeat password does not match password");
}
function uploadInforUserToDatabaseAndCloudinary(imageFile, username, email, fullname, userID){
  let formData = new FormData();
  formData.append('file', imageFile);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

  axios({
    url: CLOUDINARY_URL,
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: formData
})
  .then(function(res){
      db.ref('users/' + userID).set({
        id: userID,
        username: username,
        email: email,
        fullname: fullname,
        profile_picture : res.data.url,
        permission: "user",
        joined_contest: {}
      })
  })
  .catch((error)=>{
    alert(error.message);
  })
}

export class Signup extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            redirect: false,
            imgSrc: "https://source.unsplash.com/Mv9hjnEUHR4/600x800",
        }
        this.signUpWithEmailAndPassword = this.signUpWithEmailAndPassword.bind(this);
        this.handleChangeFileInput = this.handleChangeFileInput.bind(this);
        this.previewProfilePicture = this.previewProfilePicture.bind(this);
    }

    signUpWithEmailAndPassword(event){
      event.preventDefault();
  
      const fullname = document.querySelector('input[name="fullname"]').value;
      const username = document.querySelector('input[name="username"]').value;
      const email = document.querySelector('input[name="email"]').value;
      const password = document.querySelector('input[name="password"]').value;
      const repeatPassword = document.querySelector('input[name="repeat-password"]').value;
      const imageFile = document.querySelector('input[name="file"]').files[0];
      try {
        checkValidInput(fullname, username, email, password, repeatPassword);
        app.auth().createUserWithEmailAndPassword(email, password)
        .then((result)=>{
          console.log(result);
          let userID = result.user.uid;
          //Add to database
          return uploadInforUserToDatabaseAndCloudinary(imageFile, username, email, fullname, userID);
        })
        .then((res)=>{
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
    handleChangeFileInput(event){
      // Assuming only image
      var file =  event.target.files[0];
      var reader = new FileReader();
      var url = reader.readAsDataURL(file);
      console.log(url);
       reader.onloadend = function (e) {
          this.setState({
              imgSrc: [reader.result]
          })
        }.bind(this);

    }
    previewProfilePicture(){
      document.getElementsByClassName("register-image")[0].style.backgroundImage = `url(${this.state.imgSrc})`;
    }
    render(){
      if(this.state.redirect === true){
        return <Redirect to={'/login'} />
      }
        return <RenderSignup previewProfilePicture={this.previewProfilePicture} handleChangeFileInput={this.handleChangeFileInput} signUpWithEmailAndPassword={this.signUpWithEmailAndPassword} />;
    }
}