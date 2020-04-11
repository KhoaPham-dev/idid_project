import React from 'react';
import {Link} from 'react-router-dom';
import './RenderContestInfors.css';
import Popup from "reactjs-popup";
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton';
import { LoopCircleLoading, PointSpreadLoading } from 'react-loadingg';
import {ContentPostModal} from '../ContentModals/ContentModals';

export class RenderContestInfors extends React.Component{
  handleClickRegistryButton(e){
    this.props.registryContest(JSON.parse(e.target.name));
  }
  // findCharacterAndCut(char, str){
  //   let newArr = str.split('"');
  //   str = newArr.join("'");
  //   let firstIndex = str.indexOf(char);
  //   let firstPartOfStr = str.substring(0, firstIndex);
  //   let secondPartOfStr = str.substring(firstIndex+1);
  //   return firstPartOfStr+'%'+secondPartOfStr;
  // }
    render(){
      let countContests = 0;
        return(
            <React.Fragment>
            <div className="mb-4" style={{"textAlign": "center"}}>
                <div className="h3 mb-0 text-gray-900">
                  <span><strong>{this.props.isLoading ? <PointSpreadLoading style={{marginTop: "-50px", marginLeft: "45%"}}/> : "Sự kiện nổi bật"}</strong></span>
                </div>  
            </div>
            <div className="row">
            {this.props.contests? 
              this.props.contests.map((contest)=>{
                
                let isJoinedOrIsExpiredAndIsNotStarted = false;
                for(let i in contest.listParticipates){
                  if(this.props.userId === contest.listParticipates[i]){
                    isJoinedOrIsExpiredAndIsNotStarted = true;
                    break;
                  }
                }

                //For isStarted?
                let currDate = Date.now();
                let startRegistryDate = new Date(contest.startRegistryDate);
                let start_daysLeft = startRegistryDate.getTime() - currDate;
                //For isEpxired?
                
                let expireRegistryDate =  new Date(contest.expireRegistryDate);
                let expire_daysLeft =  expireRegistryDate.getTime() - currDate ;
                
                if(expire_daysLeft < 0 || start_daysLeft > 0){
                  isJoinedOrIsExpiredAndIsNotStarted = true;
                }
                if(!isJoinedOrIsExpiredAndIsNotStarted){
                  //let contentPost = this.findCharacterAndCut("&", contest.contentPost);
                  countContests++;
                  return <div key={contest.uidContest} className="col-md-4 mb-4">
                  <div className="card border-left-success shadow h-100 py-2">
                    <div className="card-header card-header-contest-infor">
                      <img className="poster-img" src={contest.posterImg} style={{"height": "100%", "width":"100%"}} />
                    </div>
                    <div className="card-body">
                        <div className="row no-gutters align-items-center padding-10">
                          <div className="table w-100 margin-bottom-0">
                              <div className="table-cell event-title" style={{fontSize: "1rem", color:"#333333"}}>
                              {/* Popup content -> post's content */}
                              <Popup 
                                modal
                                trigger={<strong style={{cursor: "pointer"}}>{contest.contestName}</strong>}>
                                
                                {close => <ContentPostModal contest={contest} close={close}/>}
                              </Popup>
                                  
                              </div>
                          </div>
                          <div className="col">
                            <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                              {contest.quantity}/{contest.numSlots}
                            </div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">
                              <input onClick={this.handleClickRegistryButton.bind(this)} type="button" name={JSON.stringify(contest)} value="Đăng ký" className="btn btn-info" />
                            </div>
                          </div>
                          <div className="calendar">
                              <i className="fas fa-calendar fa-2x text-black-800"></i>
                              <div className="start-date">{contest.startContestDate}</div>
                          </div>          
                        </div>
                      </div>
                  </div>
                </div>
                }
              })
               : <div>Hiện chưa có thêm cuộc thi nào</div>
            }
            {countContests === 0 ? <div>Hiện chưa có thêm cuộc thi nào</div> : null}
            </div>
          </React.Fragment>
        )
    }
}