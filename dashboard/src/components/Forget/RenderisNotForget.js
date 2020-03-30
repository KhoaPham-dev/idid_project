import React from 'react';
import { Link } from 'react-router-dom';
export const RenderisNotForget = (props) => {
	return (
		<div className="container">
			{/* Outer Row */}
			<div className="row justify-content-center">
				<div className="col-xl-10 col-lg-12 col-md-9">
					<div className="card o-hidden border-0 shadow-lg my-5">
						<div className="card-body p-0">
							{/* Nested Row within Card Body */}
							<div className="row">
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