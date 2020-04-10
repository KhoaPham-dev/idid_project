import React from 'react';
import {Link} from 'react-router-dom';
import './Signup.css';
export class RenderSignup extends React.Component {
    componentDidMount(){
        this.props.previewProfilePicture();
    }
    componentDidUpdate(){
        this.props.previewProfilePicture();
    }

    render(){
    
    return(
        
        <div className="container">
        <div className="card o-hidden border-0 shadow-lg my-5">
        <div className="card-body p-0">
            {/* <!-- Nested Row within Card Body --> */}
            <div className="row">
            <div className="col-lg-5 d-none d-lg-block register-image"></div>
            <div className="col-lg-7">
                <div className="p-5">
                <div className="text-center">
                {this.props.isLoading ?<h1 className="h4 text-gray-900 mb-4"><i className="fa fa-spinner fa-spin"></i>Loading...</h1> 
                :<h1 className="h4 text-gray-900 mb-4">Tạo tài khoản!</h1>}
                </div>
                <form className="user" onSubmit={this.props.signUpWithEmailAndPassword}>
                    <div className="form-group row">
                    <div className="col-sm-6 mb-3 mb-sm-0">
                        <input name="username" type="text" className="form-control form-control-user" id="exampleUsername" placeholder="Tài khoản" required/>
                    </div>
                    <div className="col-sm-6">
                        <input name="fullname" type="text" className="form-control form-control-user" id="exampleFullname" placeholder="Tên đầy đủ" required/>
                    </div>
                    </div>
                    <div className="form-group">
                    <input name="email" type="email" className="form-control form-control-user" id="exampleInputEmail" placeholder="Địa chỉ email" required/>
                    </div>
                    <div className="form-group row">
                    <div className="col-sm-6 mb-3 mb-sm-0">
                        <input name="password" type="password" className="form-control form-control-user" id="exampleInputPassword" placeholder="Mật khẩu" required/>
                    </div>
                    <div className="col-sm-6">
                        <input name="repeat-password" type="password" className="form-control form-control-user" id="exampleRepeatPassword" placeholder="Nhập lại mật khẩu" required/>
                    </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-6">
                            <input name="phone" type="number" className="form-control form-control-user" id="phonenumber" placeholder="Số điện thoại" required/>
                        </div>
                        <input onChange={this.props.handleChangeFileInput} className="inputFile" name="file" type="file" accept="image/jpg, image/png, image/gif" id="file" aria-label="File browser example"/>
                        <label className="labelFile" htmlFor="file"> Chọn một ảnh đại diện…</label>
                    </div>
                    <button  type="submit" className="btn btn-primary btn-user btn-block">
                    Đăng ký tài khoản
                    </button>
                    <hr/>
                    
                </form>
                <div className="text-center">
                    <Link className="small" to="/forget">Quên mật khẩu?</Link>
                </div>
                <div className="text-center">
                    <Link className="small" to="/login">Đã đăng ký? Đăng nhập tại đây!</Link>
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