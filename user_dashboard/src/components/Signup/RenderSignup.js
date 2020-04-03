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
                :<h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>}
                </div>
                <form className="user" onSubmit={this.props.signUpWithEmailAndPassword}>
                    <div className="form-group row">
                    <div className="col-sm-6 mb-3 mb-sm-0">
                        <input name="username" type="text" className="form-control form-control-user" id="exampleUsername" placeholder="Username" required/>
                    </div>
                    <div className="col-sm-6">
                        <input name="fullname" type="text" className="form-control form-control-user" id="exampleFullname" placeholder="Fullname" required/>
                    </div>
                    </div>
                    <div className="form-group">
                    <input name="email" type="email" className="form-control form-control-user" id="exampleInputEmail" placeholder="Email Address" required/>
                    </div>
                    <div className="form-group row">
                    <div className="col-sm-6 mb-3 mb-sm-0">
                        <input name="password" type="password" className="form-control form-control-user" id="exampleInputPassword" placeholder="Password" required/>
                    </div>
                    <div className="col-sm-6">
                        <input name="repeat-password" type="password" className="form-control form-control-user" id="exampleRepeatPassword" placeholder="Repeat Password" required/>
                    </div>
                    </div>

                    <input onChange={this.props.handleChangeFileInput} className="inputFile" name="file" type="file" accept="image/jpg, image/png, image/gif" id="file" aria-label="File browser example"/>
                    <label className="labelFile" htmlFor="file"> Choose a profile picture…</label>

                    <button  type="submit" className="btn btn-primary btn-user btn-block">
                    Register Account
                    </button>
                    <hr/>
                    
                </form>
                <div className="text-center">
                    <Link className="small" to="/forget">Forgot Password?</Link>
                </div>
                <div className="text-center">
                    <Link className="small" to="/login">Already have an account? Login!</Link>
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