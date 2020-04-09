import React from 'react';
import {Link} from 'react-router-dom';
import {ContestResults} from '../ContestResults/ContestResults';
import {ContestInfors} from '../ContestInfors/ContestInfors';
import {RegistriedContests} from '../RegistriedContests/RegistriedContests';
import './RenderDashboard.css';
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton';
import { LoopCircleLoading, PointSpreadLoading } from 'react-loadingg';
export class RenderDashboard extends React.Component{
    handleChangeContent(e){
      this.props.changeRenderContent(e.target.name);
    }
    changeContent(){
      switch (this.props.renderContent) {
        case "ContestInfors":
          return <ContestInfors contests={this.props.contests} 
                                userId={this.props.userId}
                                registryContest={this.props.registryContest}
                                isLoading={this.props.isLoading}/>
        case "ContestResults":
          return <ContestResults isLoading={this.props.isLoading}/>
        case "RegistriedContests":
          return <RegistriedContests isLoading={this.props.isLoading}/>

        //Show error 404 page
        default:
          return null
      }
    }
    componentDidMount(){
      document.getElementById("sidebarToggle").addEventListener('click', ()=> {
        document.body.classList.toggle("sidebar-toggled");
        this.sideBar.classList.toggle("toggled");
      })
      document.getElementById("sidebarToggleTop").addEventListener('click', ()=> {
        document.body.classList.toggle("sidebar-toggled");
        this.sideBar.classList.toggle("toggled");
      })
    }
    render(){
        return(   
         
        <React.Fragment>
         
        <div id="wrapper">
          <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar" 
            ref={element => this.sideBar = element }>
      
     
            <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/">
              <div className="sidebar-brand-icon rotate-n-15">
                <i className="fas fa-laugh-wink"></i>
              </div>
              <div className="sidebar-brand-text mx-3">Xin chào!</div>
            </Link>
      
   
            <hr className="sidebar-divider my-0" />
      
  
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                <i className="fas fa-fw fa-tachometer-alt"></i>
                <span>Bảng điều khiển</span></Link>
            </li>
      
   
            <hr className="sidebar-divider" />
      
  
            <div className="sidebar-heading">
              Cuộc thi
            </div>
      
    
            <li className="nav-item">
              <Link className="nav-link collapsed" to="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                <i className="fas fa-fw fa-cog"></i>
                <span>Thông tin các cuộc thi</span>
              </Link>
              <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                <div className="bg-white py-2 collapse-inner rounded">
                  <input onClick={this.handleChangeContent.bind(this)} type="button" className="collapse-item idid-button" name="ContestInfors" value="Sắp diễn ra"/>
                  <input onClick={this.handleChangeContent.bind(this)} type="button" className="collapse-item idid-button" name="RegistriedContests" value="Đã đăng ký"/>
                  <input onClick={this.handleChangeContent.bind(this)} type="button" className="collapse-item idid-button" name="ContestResults" value="Kết quả thi"/>
                </div>
              </div>
            </li>
  
            <hr className="sidebar-divider" />
      
  
            <div className="sidebar-heading">
              Tài khoản
            </div>
      
  
            <li className="nav-item">
              <Link className="nav-link collapsed" to="#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">
                <i className="fas fa-fw fa-folder"></i>
                <span>Thông tin cá nhân</span>
              </Link>
              <div id="collapsePages" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
                <div className="bg-white py-2 collapse-inner rounded">
                  <h6 className="collapse-header">Chỉnh sửa thông tin</h6>
                  <Link className="collapse-item" to="register.html">Profile</Link>
                  <Link className="collapse-item" to="login.html">Thay đổi email</Link>
                  <Link className="collapse-item" to="register.html">Thay đổi mật khẩu</Link>
                </div>
              </div>
            </li>
      
            <div className="sidebar-heading">
              Khác
            </div>
            <li className="nav-item">                 
              <Link className="nav-link" to=""  data-toggle="modal" data-target="#logoutModal">
                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                <span>Đăng xuất</span></Link>
            </li>
      
  
            <li className="nav-item">
              <Link className="nav-link" to="">
                <i className="fas fa-fw fa-mobile"></i>
                <span>Liên hệ BTC</span></Link>
            </li>
      
  
            <hr className="sidebar-divider d-none d-md-block"/>
      
   
            <div className="text-center d-none d-md-inline">
              <button className="rounded-circle border-0" id="sidebarToggle"></button>
            </div>
      
          </ul>


          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
      
    
                <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                  <i className="fa fa-bars"></i>
                </button>
      
              
                <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                  <div className="input-group">
                    <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2"/>
                    <div className="input-group-append">
                      <button className="btn btn-primary" type="button">
                        <i className="fas fa-search fa-sm"></i>
                      </button>
                    </div>
                  </div>
                </form>
      
            
                <ul className="navbar-nav ml-auto">
      
                
                  <li className="nav-item dropdown no-arrow d-sm-none">
                    <Link className="nav-link dropdown-toggle" to="#" id="searchDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i className="fas fa-search fa-fw"></i>
                    </Link>
             
                    <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in" aria-labelledby="searchDropdown">
                      <form className="form-inline mr-auto w-100 navbar-search">
                        <div className="input-group">
                          <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2"/>
                          <div className="input-group-append">
                            <button className="btn btn-primary" type="button">
                              <i className="fas fa-search fa-sm"></i>
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </li>
      
           
                  <li className="nav-item dropdown no-arrow mx-1">
                    <Link className="nav-link dropdown-toggle" to="#" id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i className="fas fa-bell fa-fw"></i>
                      {/* <!-- Counter - Alerts --> */}
                      <span className="badge badge-danger badge-counter">3+</span>
                    </Link>
               
                    <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="alertsDropdown">
                      <h6 className="dropdown-header">
                        Alerts Center
                      </h6>
                      <Link className="dropdown-item d-flex align-items-center" to="#">
                        <div className="mr-3">
                          <div className="icon-circle bg-primary">
                            <i className="fas fa-file-alt text-white"></i>
                          </div>
                        </div>
                        <div>
                          <div className="small text-gray-500">December 12, 2019</div>
                          <span className="font-weight-bold">A new monthly report is ready to download!</span>
                        </div>
                      </Link>
                      <Link className="dropdown-item d-flex align-items-center" to="#">
                        <div className="mr-3">
                          <div className="icon-circle bg-success">
                            <i className="fas fa-donate text-white"></i>
                          </div>
                        </div>
                        <div>
                          <div className="small text-gray-500">December 7, 2019</div>
                          $290.29 has been deposited into your account!
                        </div>
                      </Link>
                      <Link className="dropdown-item d-flex align-items-center" to="#">
                        <div className="mr-3">
                          <div className="icon-circle bg-warning">
                            <i className="fas fa-exclamation-triangle text-white"></i>
                          </div>
                        </div>
                        <div>
                          <div className="small text-gray-500">December 2, 2019</div>
                          Spending Alert: We've noticed unusually high spending for your account.
                        </div>
                      </Link>
                      <Link className="dropdown-item text-center small text-gray-500" to="#">Show All Alerts</Link>
                    </div>
                  </li>
      
          
                  <li className="nav-item dropdown no-arrow mx-1">
                    <Link className="nav-link dropdown-toggle" to="#" id="messagesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i className="fas fa-envelope fa-fw"></i>
                  
                      <span className="badge badge-danger badge-counter">7</span>
                    </Link>
                    {/* <!-- Dropdown - Messages --> */}
                    <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="messagesDropdown">
                      <h6 className="dropdown-header">
                        Message Center
                      </h6>
                      <Link className="dropdown-item d-flex align-items-center" to="#">
                        <div className="dropdown-list-image mr-3">
                          <img className="rounded-circle" src="https:<!--source.unsplash.com/fn_BT9fwg_E/60x60" alt=""/>
                          <div className="status-indicator bg-success"></div>
                        </div>
                        <div className="font-weight-bold">
                          <div className="text-truncate">Hi there! I am wondering if you can help me with a problem I've been having.</div>
                          <div className="small text-gray-500">Emily Fowler · 58m</div>
                        </div>
                      </Link>
                      <Link className="dropdown-item d-flex align-items-center" to="#">
                        <div className="dropdown-list-image mr-3">
                          <img className="rounded-circle" src="https:<!--source.unsplash.com/AU4VPcFN4LE/60x60" alt=""/>
                          <div className="status-indicator"></div>
                        </div>
                        <div>
                          <div className="text-truncate">I have the photos that you ordered last month, how would you like them sent to you?</div>
                          <div className="small text-gray-500">Jae Chun · 1d</div>
                        </div>
                      </Link>
                      <Link className="dropdown-item d-flex align-items-center" to="#">
                        <div className="dropdown-list-image mr-3">
                          <img className="rounded-circle" src="https:<!--source.unsplash.com/CS2uCrpNzJY/60x60" alt=""/>
                          <div className="status-indicator bg-warning"></div>
                        </div>
                        <div>
                          <div className="text-truncate">Last month's report looks great, I am very happy with the progress so far, keep up the good work!</div>
                          <div className="small text-gray-500">Morgan Alvarez · 2d</div>
                        </div>
                      </Link>
                      <Link className="dropdown-item d-flex align-items-center" to="#">
                        <div className="dropdown-list-image mr-3">
                          <img className="rounded-circle" src="https:<!--source.unsplash.com/Mv9hjnEUHR4/60x60" alt=""/>
                          <div className="status-indicator bg-success"></div>
                        </div>
                        <div>
                          <div className="text-truncate">Am I a good boy? The reason I ask is because someone told me that people say this to all dogs, even if they aren't good...</div>
                          <div className="small text-gray-500">Chicken the Dog · 2w</div>
                        </div>
                      </Link>
                      <Link className="dropdown-item text-center small text-gray-500" to="#">Read More Messages</Link>
                    </div>
                  </li>
      
                  <div className="topbar-divider d-none d-sm-block"></div>
      
              
                  <li className="nav-item dropdown no-arrow">
                    <Link className="nav-link dropdown-toggle" to="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <span className="mr-2 d-none d-lg-inline text-gray-600 small">{this.props.displayName}</span>
                      {this.props.isLoading ? <PointSpreadLoading style={{marginRight: "20px"}} />: <img className="img-profile rounded-circle" alt="" src={this.props.profilePicture}/>}
                    </Link>
             
                    <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                      <Link className="dropdown-item" to="#">
                        <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                        Profile
                      </Link>
                      <Link className="dropdown-item" to="#">
                        <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                        Settings
                      </Link>
                      <Link className="dropdown-item" to="#">
                        <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                        Activity Log
                      </Link>
                      <div className="dropdown-divider"></div>
                      <Link className="dropdown-item" to="#" data-toggle="modal" data-target="#logoutModal">
                        <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                        Logout
                      </Link>
                    </div>
                  </li>
      
                </ul>
      
              </nav>
              <div className="container-fluid" >
              {this.props.isLoading ? <PointSpreadLoading style={{marginTop: "-50px", marginLeft: "45%"}}/> : null}
                {/* Render Content */}
                {this.changeContent()|| <Skeleton height={100} count={4} duration={2} />}
              </div>
              {/* <!-- /.container-fluid --> */}
      
            </div>
            {/* <!-- End of Main Content --> */}
      
            {/* <!-- Footer --> */}
            <footer className="sticky-footer bg-white">
              <div className="container my-auto">
                <div className="copyright text-center my-auto">
                  <span>Copyright &copy; IDID 2020</span>
                </div>
              </div>
            </footer>
            {/* <!-- End of Footer --> */}
      
          </div>
          {/* <!-- End of Content Wrapper --> */}
      
        </div>
        {/* <!-- End of Page Wrapper --> */}
      
        {/* <!-- Scroll to Top Button--> */}
        <a className="scroll-to-top rounded" href="#page-top">
          <i className="fas fa-angle-up"></i>
        </a>
      
        {/* <!-- Logout Modal--> */}
        <div className="modal fade" id="logoutModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Bạn chắc chắn muốn thoát??</h5>
                <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">Chọn "Đăng xuất" nếu bạn đã chắc chắn.</div>
              <div className="modal-footer">
                <button className="btn btn-secondary" type="button" data-dismiss="modal">Hủy bỏ</button>
                <Link className="btn btn-primary" to="/logout">Đăng xuất</Link>
              </div>
            </div>
          </div>
        </div>
        </React.Fragment>
          )
      }
}