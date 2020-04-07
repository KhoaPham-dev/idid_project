import React from 'react';
import {Link} from 'react-router-dom';
import botImg from './botImg.png';
import './RenderContestInfors.css';
export class RenderContestInfors extends React.Component{
    render(){
        return(
            <React.Fragment>
            <div className="mb-4" style={{"textAlign": "center"}}>
                <div className="h3 mb-0 text-gray-900">
                  <span><strong>Sự kiện nổi bật</strong></span>
                </div>  
            </div>
            <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card border-left-success shadow h-100 py-2">
              <div className="card-header"><img src={botImg} style={{"height": "100%", "width":"100%"}} /></div>
                <div className="card-body">
                  <div className="row no-gutters align-items-center padding-10">
                    <div className="table w-100 margin-bottom-0">
                        <div className="table-cell event-title" style={{fontSize: "1rem", color:"#333333"}}>
                            <strong>Battle Of Tanks 2019</strong>
                        </div>
                    </div>
                    <div className="col">
                    <div className="text-xs font-weight-bold text-success text-uppercase mb-1">5/90</div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                      <button type="button" className="btn btn-info">Đăng ký</button>
                      </div>
                    </div>
                    <div className="calendar">
                        <i className="fas fa-calendar fa-2x text-black-800"></i>
                        <div className="start-date">12/7/2020</div>
                    </div>          
                  </div>
                </div>
              </div>
            </div>
         
            <div className="col-md-4 mb-4">
              <div className="card border-left-success shadow h-100 py-2">
              <div className="card-header"><img src={botImg} style={{"height": "100%", "width":"100%"}} /></div>
                <div className="card-body">
                  <div className="row no-gutters align-items-center padding-10">
                    <div className="table w-100 margin-bottom-0">
                        <div className="table-cell event-title" style={{fontSize: "1rem", color:"#333333"}}>
                            <strong>Battle Of Tanks 2019</strong>
                        </div>
                    </div>
                    <div className="col">
                    <div className="text-xs font-weight-bold text-success text-uppercase mb-1">5/90</div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                      <button type="button" className="btn btn-info">Đăng ký</button>
                      </div>
                    </div>
                    <div className="calendar">
                        <i className="fas fa-calendar fa-2x text-black-800"></i>
                        <div className="start-date">12/7/2020</div>
                    </div>          
                  </div>
                </div>
              </div>
            </div>
         

            <div className="col-md-4 mb-4">
              <div className="card border-left-success shadow h-100 py-2">
              <div className="card-header"><img src={botImg} style={{"height": "100%", "width":"100%"}} /></div>
                <div className="card-body">
                  <div className="row no-gutters align-items-center padding-10">
                    <div className="table w-100 margin-bottom-0">
                        <div className="table-cell event-title" style={{fontSize: "1rem", color:"#333333"}}>
                            <strong>Battle Of Tanks 2019</strong>
                        </div>
                    </div>
                    <div className="col">
                    <div className="text-xs font-weight-bold text-success text-uppercase mb-1">5/90</div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                      <button type="button" className="btn btn-info">Đăng ký</button>
                      </div>
                    </div>
                    <div className="calendar">
                        <i className="fas fa-calendar fa-2x text-black-800"></i>
                        <div className="start-date">12/7/2020</div>
                    </div>          
                  </div>
                </div>
              </div>
            </div>
         

            <div className="col-md-4 mb-4">
              <div className="card border-left-success shadow h-100 py-2">
              <div className="card-header"><img src={botImg} style={{"height": "100%", "width":"100%"}} /></div>
                <div className="card-body">
                  <div className="row no-gutters align-items-center padding-10">
                    <div className="table w-100 margin-bottom-0">
                        <div className="table-cell event-title" style={{fontSize: "1rem", color:"#333333"}}>
                            <strong>Battle Of Tanks 2019</strong>
                        </div>
                    </div>
                    <div className="col">
                    <div className="text-xs font-weight-bold text-success text-uppercase mb-1">5/90</div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                      <button type="button" className="btn btn-info">Đăng ký</button>
                      </div>
                    </div>
                    <div className="calendar">
                        <i className="fas fa-calendar fa-2x text-black-800"></i>
                        <div className="start-date">12/7/2020</div>
                    </div>          
                  </div>
                </div>
              </div>
            </div>
         

          </div>
          </React.Fragment>
        )
    }
}