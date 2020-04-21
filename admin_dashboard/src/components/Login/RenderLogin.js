import React from 'react';
import {Link} from 'react-router-dom';
export class RenderLogin extends React.Component{

  render(){
  return (
      <div className="container">
      
      {/* {<!-- Outer Row -->} */}
      <div className="row justify-content-center">
  
        <div className="col-xl-5 col-lg-12 col-md-9">
  
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              {/* {<!-- Nested Row within Card Body -->} */}
              <div className="row">
                <div className="col-lg-12">
                  <div className="p-5">
                    <div className="text-center">
                    {this.props.isLoading ?<h1 className="h4 text-gray-900 mb-4"><i className="fa fa-spinner fa-spin"></i>Loading...</h1>:
                      <h1 className="h4 text-gray-900 mb-4">Admin</h1>}
                    </div>
                    <form className="user" onSubmit={this.props.loginWithEmailAndPassword} ref={(form)=>{this.loginForm = form}}>
                      <div className="form-group">
                        <input ref={(email)=>{this.emailInput = email}} type="email" className="form-control form-control-user" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter Email Address..."/>
                      </div>
                      <div className="form-group">
                        <input ref={(password)=>{this.passwordInput = password}} type="password" className="form-control form-control-user" id="exampleInputPassword" placeholder="Password"/>
                      </div>
                     
                      <button type="submit" className="btn btn-primary btn-user btn-block">
                        Đăng nhập
                      </button>
                    </form>
                    <hr/>
                    <div className="text-center">
                      <Link className="small" to="/forget">Quên mật khẩu?</Link>
                    </div>
                   
                  </div>
                </div>
              </div>
            </div>
          </div>
  
        </div>
  
      </div>
  
    </div>
  )
  }
}