import React, { Component } from 'react';
import { app } from '../base';
import axios from 'axios';
import RenderPerson from './RenderPerson';
import { store } from 'react-notifications-component';
import { LoopCircleLoading, PointSpreadLoading } from 'react-loadingg';
import error_extension_img from './error_extension.jpg';
import { auth as FirebaseAuth } from 'firebase';

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/idid/image/upload";
const CLOUDINARY_UPLOAD_PRESET = 'preset1';
function checkFileExtension(filename){
    let extension = filename.split('.').pop();
    if(extension === "png" || extension === "jpg" || extension === "gif") return true;
    return false;
  }
export class Person extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uId: null,
            userAvail: null,
            previewProfilePicture: null,
            currentUser: null,
            isLoading: false
        }

        this.changeProfile = this.changeProfile.bind(this);
        this.changePassword = this.changePassword.bind(this);
        //this.changeEmail = this.changeEmail.bind(this);
        this.handleClickChangeProfilePicture = this.handleClickChangeProfilePicture.bind(this);
        this.handleChangePreviewProfilePicture = this.handleChangePreviewProfilePicture.bind(this);
    }


    
    getDataUser() {
        app.auth().onAuthStateChanged((user) => {
            var userId = app.auth().currentUser.uid;
            app.database().ref('admins/' + userId).on('value', snapshot => {
                var getDataUser = snapshot.val();
                this.setState({
                    uId: userId,
                    userAvail: getDataUser,     //user-infor in database
                    previewProfilePicture: user.photoURL,
                    currentUser: app.auth().currentUser //user-infor in authentication of firebase
                });
            });
        });
    }

    changeProfile(event) {
        event.preventDefault();
        const fullname = document.querySelector('input[name="newFullname"]').value;
        const phoneNumber = document.querySelector('input[name="newPhonenumber"]').value;
        const brand = document.querySelector('input[name="newBrand"]').value;
        const fanpage = document.querySelector('input[name="newFanpage"]').value;

        var newDatas = {
            fullname: fullname,
            phoneNumber: phoneNumber,
            brand: brand,
            fanpage: fanpage
        };

        var updates = {};

        for (var key in newDatas) {
            updates['/admins/' + this.state.uId + '/' + key] = newDatas[key];
        }
        
        return app.database().ref().update(updates);
    }

    checkCurrentPassword(currentPassword) {
        var user = app.auth().currentUser;
        var cred = FirebaseAuth.EmailAuthProvider.credential(user.email, currentPassword);
        return user.reauthenticateWithCredential(cred);
    }
    
    // changeEmail(event) {
    //     event.preventDefault();

    //     const password = document.querySelector('input[name="password"]').value;
    //     const newEmail = document.querySelector('input[name="newEmail"]').value;

    //     this.checkCurrentPassword(password).then(() => {
    //         var user = app.auth().currentUser;

    //         user.updateEmail(newEmail).then(()=> {
    //             alert("Email đã được thay đổi ^^");

    //             var updates = {};

    //             updates['/admins/' + this.state.uid + '/' + "email"] = newEmail;
    //             return app.database().ref().update(updates);
    //         }).catch(function (error) {
    //             alert(error.message);
    //         });
    //     }).catch(() => {
    //         alert("Sai mật khẩu cũ !!!");
    //     });
    // }

    changePassword(event) {
        event.preventDefault();

        const currentPassword = document.querySelector('input[name="currentPassword"]').value;
        const newPassword = document.querySelector('input[name="newPassword"]').value;

        this.checkCurrentPassword(currentPassword).then(() => {
            var user = app.auth().currentUser;

            user.updatePassword(newPassword).then(() => {
                alert("Mật khẩu đã được thay đổi ^^")
            }).catch((error) => {
                alert(error.message);
            });

        }).catch(() => {
            alert("Sai mật khẩu cũ !!!");
        });
    }

    changeProfilePicture(){
        const imageFile = document.querySelector('input[name="person-file"]').files[0];
        if(!imageFile){
            this.setState({
                isLoading: false
            })
            store.addNotification({
                title: "Thông báo",
                message: "Bạn cần chọn file hình ảnh!",
                type: "warning",
                insert: "bottom",
                container: "bottom-center",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                  duration: 1000
                }
              });
              return;
        }
        let user = app.auth().currentUser;
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
        .then(async(res)=>{

            await user.updateProfile({
                photoURL: res.data.url
            })
            return res.data.url;
        })
        .then((profilePictureUrl)=>{
            return app.database().ref('admins/' + user.uid).update({
              profile_picture : profilePictureUrl,
            })
        })
        .then(()=>{
            this.setState({
                isLoading: false
            })
            store.addNotification({
                title: "Thông báo",
                message: "Đã đổi thành công",
                type: "success",
                insert: "bottom",
                container: "bottom-center",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                  duration: 1000
                }
              });
              window.location.reload();
        })
        .catch(async(error)=>{
            this.setState({
                isLoading: false
            })
            store.addNotification({
                title: "Thông báo",
                message: "Gặp sự cố, vui lòng thử lại",
                type: "warning",
                insert: "bottom",
                container: "bottom-center",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                  duration: 1000
                }
              });        
            })

      }

    handleClickChangeProfilePicture(){
        this.setState({
            isLoading: true
        })
        this.changeProfilePicture();
    }

    handleChangePreviewProfilePicture(event){
        var file =  event.target.files[0];
      var reader = new FileReader();
      if(file && checkFileExtension(file.name)){
      reader.readAsDataURL(file);
       reader.onloadend = function (e) {
          this.setState({
              previewProfilePicture: reader.result
          })
        }.bind(this);
      }
      else {
        this.setState({
          previewProfilePicture: error_extension_img
        })
      }
       
    }
    componentDidMount() {
        this.getDataUser();
    }

    render() {
        
        let user = this.state.userAvail;
        if (user !== null) {
            return <RenderPerson
                isLoading={this.state.isLoading}
                user={user}     //user-infor in database
                currentUser={this.state.currentUser}    //user-infor in authentication of firebase
                changeProfile={this.changeProfile}
                changeEmail={this.changeEmail}
                changePassword={this.changePassword}
                phoneAuth={this.phoneAuth}
                previewProfilePicture={this.state.previewProfilePicture}
                handleChangePreviewProfilePicture={this.handleChangePreviewProfilePicture}
                handleClickChangeProfilePicture={this.handleClickChangeProfilePicture}
            />
        } else return <PointSpreadLoading />
    }
}