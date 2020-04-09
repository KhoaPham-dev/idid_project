import React, { Component } from 'react';
import { app } from '../base';

import RenderPerson from './RenderPerson';

import { LoopCircleLoading, PointSpreadLoading } from 'react-loadingg';

import { auth as FirebaseAuth } from 'firebase';



export class Person extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uId: null,
            userAvail: null
        }

        this.changeProfile = this.changeProfile.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
    }

    getDataUser() {
        app.auth().onAuthStateChanged((user) => {
            var user = app.auth().currentUser.uid;
            app.database().ref('users/' + user).on('value', snapshot => {
                var getDataUser = snapshot.val();
                this.setState({
                    uId: user,
                    userAvail: getDataUser
                });
            });
        });
    }

    changeProfile(event) {
        event.preventDefault();

        const fullname = document.querySelector('input[name="NewFullname"]').value;
        const phoneNumber = document.querySelector('input[name="NewPhoneNumber"]').value;

        var updates = {
            fullname: fullname,
            phoneNumber: phoneNumber
        };

        for (var key in updates) {
            updates['/users/' + this.state.uId + '/' + key] = updates[key];
        }
        return app.database().ref().update(updates);
    }

    checkCurrentPassword(currentPassword) {
        var user = app.auth().currentUser;
        var cred = FirebaseAuth.EmailAuthProvider.credential(user.email, currentPassword);
        return user.reauthenticateWithCredential(cred);
    }
    
    changeEmail(event) {
        event.preventDefault();

        const password = document.querySelector('input[name="password"]').value;
        const newEmail = document.querySelector('input[name="newEmail"]').value;

        this.checkCurrentPassword(password).then(() => {
            var user = app.auth().currentUser;

            user.updateEmail(newEmail).then(function () {
                alert("Email đã được thay đổi ^^")
            }).catch(function (error) {
                alert(error.message);
            });
        }).catch(() => {
            alert("Sai mật khẩu cũ !!!");
        });

        var updates = {};

        updates['/users/' + this.state.uid + '/' + "email"] = newEmail;
        return app.database().ref().update(updates);
    }

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

    componentDidMount() {
        this.getDataUser();
    }

    render() {
        let user = this.state.userAvail;
        if (user !== null) {
            return <RenderPerson
                user={user}
                changeProfile={this.changeProfile}
                changeEmail={this.changeEmail}
                changePassword={this.changePassword}
            />
        } else return <PointSpreadLoading />
    }
}