import React from 'react';
import { Link } from 'react-router-dom';
export const RenderForget = (props) => {
	let classForget = props.classForget;
	let classNotForget = props.classNotForget;
	return (
		<div className="container">
			{/* Outer Row */}
			<div className="row justify-content-center">
				<div className="col-xl-10 col-lg-12 col-md-9">
					<div className="card o-hidden border-0 shadow-lg my-5">
						<div className="card-body p-0">
							{/* Nested Row within Card Body */}
							<div className={classForget}>
								<div className="col-lg-6 d-none d-lg-block bg-password-image" />
								<div className="col-lg-6">
									<div className="p-5">
										<div className="text-center">
											<h1 className="h4 text-gray-900 mb-2">Forgot Your Password?</h1>
											<p className="mb-4">We get it, stuff happens. Just enter your email address below and we'll send you a link to reset your password!</p>
										</div>
										<form className="user" onSubmit={props.sendPasswordResetEmail}>
											<div className="form-group">
												<input name ="email"  type="email" className="form-control form-control-user" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter Email Address..." />
											</div>
											<button type="submit" className="btn btn-primary btn-user btn-block">
												Reset Password
                        					</button>
										</form>
										<hr />
										<div className="text-center">
											<a className="small" href="/signup">Create an Account!</a>
										</div>
										<div className="text-center">
											<a className="small" href="/login">Already have an account? Login!</a>
										</div>
									</div>
								</div>
							</div>
							<div className={classNotForget}>
								<div className="col-lg-12">
									<div className="p-5">
										<div className="text-center">
											<h4 className="mb-8">Email is sent! Please go to email to see reset password</h4>
										</div>
										<hr />
										<div className="text-center">
											<a className="small" href="/">Return to home page</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}