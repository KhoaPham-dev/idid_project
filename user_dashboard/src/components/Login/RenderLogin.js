import React from 'react';
import {Link} from 'react-router-dom';
export class RenderLogin extends React.Component{

  render(){
  return (
      <div className="container">
      
      {/* {<!-- Outer Row -->} */}
      <div className="row justify-content-center">
  
        <div className="col-xl-10 col-lg-12 col-md-9">
  
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              {/* {<!-- Nested Row within Card Body -->} */}
              <div className="row">
                <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                <div className="col-lg-6">
                  <div className="p-5">
                    <div className="text-center">
                    {this.props.isLoading ?<h1 className="h4 text-gray-900 mb-4"><i className="fa fa-spinner fa-spin"></i>Loading...</h1>:
                      <h1 className="h4 text-gray-900 mb-4">Đăng nhập!</h1>}
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
                      <hr/>
                      <button onClick={this.props.loginWithGoogleAccount} type="button" className="btn btn-google btn-user btn-block">
                        <i className="fab fa-google fa-fw"></i> Đăng nhập với tài khoản Google
                      </button>
                      <button onClick={this.props.loginWithFacebookAccount} type="button" className="btn btn-facebook btn-user btn-block">
                        <i className="fab fa-facebook-f fa-fw"></i> Đăng nhập với tài khoản Facebook
                      </button>
                    </form>
                    <hr/>
                    <div className="text-center">
                      <Link className="small" to="/forget">Quên mật khẩu?</Link>
                    </div>
                    <div className="text-center">
                      <Link className="small" to="/signup">Tạo tài khoản!</Link>
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