import React, { Component } from 'react';
import './RenderRegistriedContests.css';
import { Link, animateScroll as scroll } from "react-scroll";

export class RenderRegistriedContests extends Component {
    handleClickShowRegistriedContestsInfor(e){
        this.props.changeRegistriedContestsInfor(e.target.innerText);
    }
    handleClickRemoveContest(e){
        this.props.removeContest(JSON.parse(e.target.name))
    }
    iframe(ifr) {
        return {
          __html: ifr
        }
      }
    render() {
        return (
            <React.Fragment>
            <div className="mb-4" style={{"textAlign": "center"}}>
                <div className="h3 mb-0 text-gray-900">
                  <span><strong>Đã đăng ký</strong></span>
                </div>  
            </div>
            <div className="row">
      
                {/* <!-- Danh sach cuoc thi da dang ky --> */}
                <div className="col-xl-7 col-lg-7">
                    <div className="card shadow mb-4">
                    {/* <!-- Card Header - Dropdown --> */}
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold text-primary">Danh sách các cuộc thi đã đăng ký</h6>
                     
                    </div>
                    {/* <!-- Card Body --> */}
                    <div className="card-body">
                        <div className="listing-contests-area">
                            {this.props.registriedContests[0] ?
                            <ul>
                                {this.props.registriedContests.map((registriedContest)=>{
                                    return (
                                            <React.Fragment key={registriedContest["uid"]}>
                                            <div className="py-3 d-flex flex-row align-items-center justify-content-between">
                                                
                                                <li>                                            
                                                    <Link className="registried-contest-name" activeClass="active" spy={true} smooth={true} offset={-70} duration= {500} to={`${registriedContest["uid"]}`} onClick={this.handleClickShowRegistriedContestsInfor.bind(this)}>
                                                        {registriedContest["contest-name"]}
                                                    </Link>
                                                    <p>Tổ chức bởi: {registriedContest["holder"]}</p>
                                                    {this.props.userJoinedContests.map((userJoinedContest)=>{
                                                            return userJoinedContest["uid-contest"] === registriedContest["uid"] ? <p key={userJoinedContest["uid-contest"]}>Đăng ký ngày: <i>{userJoinedContest["user-registried-date"]}</i></p>:null
                                                        })
                                                    }
                                                </li>
                                                <li className="dropdown no-arrow" style={{listStyle: "none"}}>
                                                    <div className="dropdown-toggle dropdown-toggle-unregistry" to="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{}}>
                                                                <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                                                    </div>
                                                    <div className="dropdown-unregistry dropdown-menu dropdown-menu-right shadow animated--grow-in"  aria-labelledby="userDropdown">
                                                    
    
                                                            <input onClick={this.handleClickRemoveContest.bind(this)} type="button" name={JSON.stringify(registriedContest)} value="Hủy đăng ký" className="dropdown-item btn btn-primary" />
                                                    </div>
                                                </li>
                                            </div>
                                            <hr/>
                                            </React.Fragment>
                                    )
                                })}
                            </ul>
                            :"Bạn chưa đăng ký cuộc thi nào"}
                        </div>
                    </div>
                    </div>
                </div>

                {/* <!-- Thong tin cuoc thi --> */}
                <div className="col-xl-4 col-lg-5 detail-infor">
                    <div className="card shadow mb-4">
                    {/* <!-- Card Header - Dropdown --> */}
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold text-primary">Thông tin chi tiết</h6>
                        
                    </div>
                    {/* <!-- Card Body --> */}
                    <div className="card-body">
                        <div className="pt-4 pb-2">
                        {this.props.registriedContests[0] ?
                                this.props.registriedContests.map((registriedContest)=>{
                                    return registriedContest["contest-name"] === this.props.renderRegistriedContestInfor?
                                    (
                                        <React.Fragment key={registriedContest["uid"]}>
                                            {/* <img id={registriedContest["uid"]} className="img-registried-contest" src={registriedContest["poster-img"]} alt={registriedContest["contest-name"]} /> */}
                                            <div id={registriedContest["uid"]} dangerouslySetInnerHTML={this.iframe(registriedContest["content-post"])}/>
                                        </React.Fragment>
                                    )
                                    : null 
                                })
                            :"Bạn chưa đăng ký cuộc thi nào"}
                        </div>
                        <div className="mt-4 text-center small">
                    
                        </div>
                    </div>
                    </div>
                </div>
                </div>

            </React.Fragment>
        );
    }
}
