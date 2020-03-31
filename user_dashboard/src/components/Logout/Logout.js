import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import {app} from '../base';
export class Logout extends Component {
    constructor() {
        super()
        this.state = {
          redirect: false
        }
      }
    
      componentWillMount() {
        app.auth().signOut().then((user) => {
          this.setState({ redirect: true })
        })
      }
      componentWillUnmount(){
          let item = document.getElementsByClassName("modal-backdrop")[0];
          document.body.removeChild(item);
      }
      render() {
        if (this.state.redirect === true) {
          return <Redirect to="/Login" />
        }
    
        return (
          <div style={{ textAlign: "center", position: "absolute", top: "25%", left: "50%" }}>
            <h3>Logging Out</h3>
          </div>
        )
      }
}
