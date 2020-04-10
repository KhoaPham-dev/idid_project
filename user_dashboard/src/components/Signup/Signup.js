import React from 'react';
import axios from 'axios';
import {app} from '../base';
import { RenderSignup } from './RenderSignup';
import { Redirect } from 'react-router-dom';
import { db } from '../base';
import error_extension_img from './error_extension.jpg';


const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/idid/image/upload";
const CLOUDINARY_UPLOAD_PRESET = 'preset1';
//checkValidInput
function handleErrorMessage(message){
  this.message = message;
}
function checkFileExtension(filename){
  let extension = filename.split('.').pop();
  if(extension === "png" || extension === "jpg" || extension === "gif") return true;
  return false;
}
function checkValidInput(firstName, lastName, email, password, repeatPassword, imageFile, phone){
  if(firstName === "" || lastName === "" || email === "" || password === "" || repeatPassword === "" || !imageFile || phone ==="") throw new handleErrorMessage("Form must be filled!");
  if(password.length <= 6) throw new handleErrorMessage("Mật khẩu cần dài hơn 6 kí tự!");
  if(password !== repeatPassword) throw new handleErrorMessage("Nhập lại mật khẩu không trùng khớp!");
  if(phone.length <= 9) throw new handleErrorMessage("Số điện thoại phải dài hơn 9 số!");
}


export class Signup extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            redirect: false,
            imgSrc: 'https://source.unsplash.com/Mv9hjnEUHR4/600x800',
            isLoading: false
        }
        this.signUpWithEmailAndPassword = this.signUpWithEmailAndPassword.bind(this);
        this.handleChangeFileInput = this.handleChangeFileInput.bind(this);
        this.previewProfilePicture = this.previewProfilePicture.bind(this);
    }
    async uploadInforUserToDatabaseAndCloudinary(imageFile, username, email, fullname, userID, phone){
      let formData = new FormData();
      formData.append('file', imageFile);
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
      await axios({
        url: CLOUDINARY_URL,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: formData
      })
      .then(async(res)=>{
            await db.ref('users/' + userID).set({
            id: userID,
            username: username,
            email: email,
            fullname: fullname,
            profile_picture : res.data.url,
            permission: "user",
            joined_contest: {},
            phone: phone
          })
        return res.data.url;
      })
      .then((profilePictureUrl)=>{
        return this.removeAuthListener = app.auth().onAuthStateChanged(async (user)=>{
          if (user) {
              await user.updateProfile({
              displayName: username,
              photoURL: profilePictureUrl
            })
          }
        });
      })
      .catch(async(error)=>{
        console.log(error.message);
        await db.ref('users/' + userID).set({
          id: userID,
          username: username,
          email: email,
          fullname: fullname,
          profile_picture : 'https://res.cloudinary.com/idid/image/upload/v1586429434/pwurg93muoztvc4bdf8s.png',
          permission: "user",
          joined_contest: {},
          phone: phone
        })
        this.removeAuthListener = app.auth().onAuthStateChanged(async (user)=>{
          if (user) {
              await user.updateProfile({
              displayName: username,
              photoURL: 'https://res.cloudinary.com/idid/image/upload/v1586429434/pwurg93muoztvc4bdf8s.png'
              })
          }
        })
      })
    }
    signUpWithEmailAndPassword(event){
      event.preventDefault();
  
      const fullname = document.querySelector('input[name="fullname"]').value;
      const username = document.querySelector('input[name="username"]').value;
      const email = document.querySelector('input[name="email"]').value;
      const password = document.querySelector('input[name="password"]').value;
      const repeatPassword = document.querySelector('input[name="repeat-password"]').value;
      const imageFile = document.querySelector('input[name="file"]').files[0];
      const phone = document.querySelector('input[name="phone"]').value;
      try {
        checkValidInput(fullname, username, email, password, repeatPassword, imageFile, phone);
        this.setState({
          isLoading: true
        })
        app.auth().createUserWithEmailAndPassword(email, password)
        .then((result)=>{
          console.log(result);
          let userID = result.user.uid;
          //Add to database
          //return profile picture url and username
          return this.uploadInforUserToDatabaseAndCloudinary(imageFile, username, email, fullname, userID, phone); 
        })
        .then((res)=>{
          //wait for response from update profile
          setTimeout(()=>{
            this.setState({
              redirect: true,
              isLoading: false
            })
          }, 2000)
        })
        .catch((error)=> {
          alert(error.message);
          this.setState({
            isLoading: false
          })
        });
      } catch (error) {
        alert(error.message);
        this.setState({
          isLoading: false
        })
      }
    }
    handleChangeFileInput(event){   //note: for profile picture
      // Assuming only image
      var file =  event.target.files[0];
      var reader = new FileReader();
      if(file && checkFileExtension(file.name)){
      reader.readAsDataURL(file);
       reader.onloadend = function (e) {
          this.setState({
              imgSrc: reader.result
          })
        }.bind(this);
      }
      else {
        this.setState({
          imgSrc: error_extension_img
        })
      }
    }
    previewProfilePicture(){
      document.getElementsByClassName("register-image")[0].style.backgroundImage = `url(${this.state.imgSrc})`;
    }

    componentWillUnmount() {
      this.removeAuthListener();
    }
    render(){
      if(this.state.redirect === true){
        return <Redirect to={'/'} />
      }
        return <RenderSignup isLoading={this.state.isLoading} previewProfilePicture={this.previewProfilePicture} handleChangeFileInput={this.handleChangeFileInput} signUpWithEmailAndPassword={this.signUpWithEmailAndPassword} />;
    }
}