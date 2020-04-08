import React from 'react';
import {Link} from 'react-router-dom';
import './RenderContestInfors.css';

export class RenderContestInfors extends React.Component{
  handleClickRegistryButton(e){
    this.props.registryContest(JSON.parse(e.target.name));
  }
    render(){
      let countContests = 0;
        return(
            <React.Fragment>
            <div className="mb-4" style={{"textAlign": "center"}}>
                <div className="h3 mb-0 text-gray-900">
                  <span><strong>Sự kiện nổi bật</strong></span>
                </div>  
            </div>
            <div className="row">
            {this.props.contests? 
              this.props.contests.map((contest)=>{
                let isJoined = false;
                for(let i in contest.listParticipates){
                  if(this.props.userId === contest.listParticipates[i]){
                    isJoined = true;
                    break;
                  }
                }
                if(!isJoined){
                  countContests++;
                  return <div key={contest.uidContest} className="col-md-4 mb-4">
                  <div className="card border-left-success shadow h-100 py-2">
                    <div className="card-header">
                      <img src={contest.posterImg} style={{"height": "100%", "width":"100%"}} />
                    </div>
                    <div className="card-body">
                        <div className="row no-gutters align-items-center padding-10">
                          <div className="table w-100 margin-bottom-0">
                              <div className="table-cell event-title" style={{fontSize: "1rem", color:"#333333"}}>
                                  <strong>{contest.contestName}</strong>
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