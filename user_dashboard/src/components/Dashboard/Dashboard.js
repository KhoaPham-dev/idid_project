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
      registriedContests:[],
      userJoinedContests:[],
      showRegistriedContestInfor: "",
      isLoading: true
    }
    this.changeRenderContent = this.changeRenderContent.bind(this);
    this.registryContest = this.registryContest.bind(this);
    this.changeRegistriedContestsInfor = this.changeRegistriedContestsInfor.bind(this);
    this.removeContest = this.removeContest.bind(this);
  }
  
  componentWillMount(){
    this.removeAuthListener = app.auth().onAuthStateChanged(async(user) => {
      //Get contests infors
      if (user) {
        db.ref('/contests/').on('value', (snapshot)=> {
          let arrContests = [];
          let contests = snapshot.val();
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
              contentPost: contests[contest]["content-post"],
              expireRegistryDate: contests[contest]["expire-registry-date"],
              startRegistryDate: contests[contest]["start-registry-date"],
              type: contests[contest]["type"]
            }
            arrContests.push(contest);
          }
          this.setState({
            authenticated: true,
            currentUser: user,
            contests: arrContests,
            userId: user.uid,
            isLoading: false,
            renderContent: document.cookie.substring(6) || "ContestInfors"
          })
        })
        db.ref('/users/' + user.uid + '/joined-contest/').on('value', (snapshot)=>{
          let registriedContests=[]; //registried contests of users in contests database
          let uidContests = snapshot.val();
          let userJoinedContests=[]; //registried contests of users in users database
          for(let uidContest in uidContests){
            userJoinedContests.push(uidContests[uidContest]);
            db.ref('/contests/' + uidContest).on('value', (snapshot)=>{
              let contest = snapshot.val();
              registriedContests.push(contest)
            })
          }
          this.setState({
            registriedContests: registriedContests,
            userJoinedContests: userJoinedContests,
            showRegistriedContestInfor: registriedContests[0] ? registriedContests[0]["contest-name"] : null
          })
        })
        
        
      } else {
        this.setState({
          authenticated: false,
          currentUser: null,
        })
      }
      
    })
  }

  registryContest(contest){
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date+' '+time;
    let updates = {};
    let lenListParticipates = contest.listParticipates ? contest.listParticipates.length : 0;
    updates['/contests/' + contest.uidContest + '/participates/' + 'quantity'] = contest.quantity+1;
    updates['/contests/' + contest.uidContest + '/participates/'+ 'list/' + lenListParticipates] = this.state.userId;
    updates['/users/' + this.state.userId + '/joined-contest/' + contest.uidContest] = {
      "uid-contest" : contest.uidContest,
      "num-do-test" : contest.numDoTest,
      "start-contest-date": contest.startContestDate,
      "user-registried-date": dateTime
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
    document.cookie=`path=/${content}`;
    this.setState({
      renderContent: content
    })
  }

  changeRegistriedContestsInfor(registriedContestName){
    this.setState({
      showRegistriedContestInfor: registriedContestName
    })
  }
 
  removeContest(contest){
    let indexOfContest;
    let updates = {};
    for(let i = 0; i < contest["participates"]["list"].length; i++){
      if(contest["participates"]["list"][i] === this.state.userId){
        indexOfContest = i;
        break;
      }
    }
    updates['/contests/' + contest["uid"] + '/participates/' + 'quantity'] = contest["participates"]["quantity"]-1;  //decreasing
    updates['/contests/' + contest["uid"] + '/participates/'+ 'list/' + indexOfContest] = null; //removing
    updates['/users/' + this.state.userId + '/joined-contest/' + contest["uid"]] = null; //removing
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
    .catch(error=>{
      alert(error)
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
                        registriedContests = {this.state.registriedContests? this.state.registriedContests:null}
                        userJoinedContests = {this.state.userJoinedContests? this.state.userJoinedContests:null}
                        changeRegistriedContestsInfor = {this.changeRegistriedContestsInfor}
                        renderRegistriedContestInfor = {this.state.showRegistriedContestInfor}
                        registryContest = {this.registryContest}
                        removeContest = {this.removeContest}
                        isLoading={this.state.isLoading}

                        />
      : <RenderDashboard isLoading={this.state.isLoading} />
    )
  }
}
