import React from 'react';
import { Link } from 'react-router-dom';
import './Forget.css';
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
											<h1 className="h4 text-gray-900 mb-2">Quên mật khẩu?</h1>
											<p className="mb-4">Nhập email của bạn vào bên dưới! Chúng tôi sẽ gửi cho bạn một email xác nhận để bạn đặt lại mật khẩu</p>
										</div>
										<form className="user" onSubmit={props.sendPasswordResetEmail}>
											<div className="form-group">
												<input name ="email"  type="email" className="form-control form-control-user" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Nhập địa chỉ Email..." />
											</div>
											<button type="submit" className="btn btn-primary btn-user btn-block">
												Đặt lại mật khẩu
                        					</button>
										</form>
										<hr />
										<div className="text-center">
											<Link className="small" to="/signup">Tạo tài khoản!</Link>
										</div>
										<div className="text-center">
											<Link className="small" to="/login">Có tài khoản? Đăng nhập tại đây!</Link>
										</div>
									</div>
								</div>
							</div>
							<div className={classNotForget}>
								<div className="col-lg-12">
									<div className="p-5">
										<div className="text-center">
											<h4 className="mb-8">Email đã được gửi, vui lòng vào email của bạn để xác nhận!</h4>
										</div>
										<hr />
										<div className="text-center">
											<Link className="small" to="/">Trở về trang chủ</Link>
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