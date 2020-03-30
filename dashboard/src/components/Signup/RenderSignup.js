import React from 'react';
import {Link} from 'react-router-dom';
export const RenderSignup = (props)=>{
    return(
        <div className="container">
        <div className="card o-hidden border-0 shadow-lg my-5">
        <div className="card-body p-0">
            {/* <!-- Nested Row within Card Body --> */}
            <div className="row">
            <div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
            <div className="col-lg-7">
                <div className="p-5">
                <div className="text-center">
                    <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
                </div>
                <form className="user" onSubmit={props.signUpWithEmailAndPassword}>
                    <div className="form-group row">
                    <div className="col-sm-6 mb-3 mb-sm-0">
                        <input name="first-name" type="text" className="form-control form-control-user" id="exampleFirstName" placeholder="First Name" required/>
                    </div>
                    <div className="col-sm-6">
                        <input name="last-name" type="text" className="form-control form-control-user" id="exampleLastName" placeholder="Last Name" required/>
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