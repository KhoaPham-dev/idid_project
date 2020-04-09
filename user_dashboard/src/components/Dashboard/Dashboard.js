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
      contests:[],
      isLoading: true

    }
    this.changeRenderContent = this.changeRenderContent.bind(this);
    this.registryContest = this.registryContest.bind(this);
  }
  
  componentWillMount(){
    this.removeAuthListener = app.auth().onAuthStateChanged((user) => {
      //Get contests infors
      if (user) {
          db.ref('/contests/').on('value', (snapshot)=> {
          let contests = snapshot.val();
          let arrContests = [];
          for (let contest in contests){
            contest = {
              contestName : contests[contest]["contest-name"],
              posterImg : contests[contest]["poster-img"],
              startContestDate: contests[contest]["start-contest-date"],
              quantity: contests[contest]["participates"]["quantity"],
              numSlots: contests[contest]["num-slots"],
              uidContest: contests[contest]["uid"],
              listParticipates: contests[contest]["participates"]["list"],
              numDoTest: contests[contest]["num-do-test"],
              contentPost: contests[contest]["content-post"]
            }
            arrContests.push(contest);
          }
          this.setState({
            authenticated: true,
            currentUser: user,
            contests: arrContests,
            userId: user.uid,
            isLoading: false
          })
        });
      } else {
        this.setState({
          authenticated: false,
          currentUser: null,
        })
      }
      
    })
  }

  registryContest(contest){
    let updates = {};
    let lenListParticipates = contest.listParticipates ? contest.listParticipates.length : 0;
    updates['/contests/' + contest.uidContest + '/participates/'+ '/list/' + lenListParticipates] = this.state.userId;
    updates['/users/' + this.state.userId + '/joined-contest/' + contest.uidContest] = {
      "uid-contest" : contest.uidContest,
      "num-do-test" : contest.numDoTest,
      "start-contest-date": contest.startContestDate
    };
    db.ref().update(updates)
    .then(()=>{
      store.addNotification({
        title: "Thông báo",
        message: "Bạn đã đăng ký thành công!",
        type: "success",
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

  changeRenderContent(content){
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
                        contests = {this.state.contests?this.state.contests:null}
                        registryContest = {this.registryContest}
                        isLoading={this.state.isLoading}
                        />
      : <RenderDashboard isLoading={this.state.isLoading} />
    )
  }
}
