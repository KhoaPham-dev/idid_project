import React, { Component } from 'react';
import "./Person.css"

function refreshPage() {
    window.location.reload();
}

export default class RenderPerson extends Component {
    render() {
        return (
            <div className="container">
                <div className="card">
                    <div className="row">
                        <div className="col-sm-4 text-center align-self-center">
                            
                                <div className="file-field">
                                    <div className="mb-4">
                                        <img src={this.props.user.profile_picture} className="rounded-circle z-depth-1-half avatar-pic" alt="example placeholder avatar" />
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <div className="btn btn-mdb-color btn-rounded float-left">
                                            <span>Add photo</span>
                                            <input type="file" />
                                        </div>
                                    </div>
                                </div>
                            
                        </div>
                        <div className="col-sm-8">
                            <div className="row ">
                                <div className="col-sm-12 profile-height">
                                    <nav>
                                        <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                            <a className="nav-item nav-link active" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="true">Thông tin</a>
                                            <a className="nav-item nav-link" id="nav-email-tab" data-toggle="tab" href="#nav-email" role="tab" aria-controls="nav-email" aria-selected="false">Email</a>
                                            <a className="nav-item nav-link" id="nav-password-tab" data-toggle="tab" href="#nav-password" role="tab" aria-controls="nav-password" aria-selected="false">Mật khẩu</a>
                                        </div>
                                    </nav>
                                    <div className="tab-content" id="nav-tabContent">
                                        <div className="tab-pane fade show active" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                                            <div className="card card-default">
                                                <div className="card-header">
                                                    <div className="form-group form-group-default">
                                                        <label>Họ và tên</label>
                                                        <input name="fullname" className="form-control" type="text" defaultValue={this.props.user.fullname} readOnly />
                                                    </div>
                                                    <div className="form-group form-group-default">
                                                        <label>Số điện thoại</label>
                                                        <input name="phoneNumber" className="form-control" type="text" defaultValue={this.props.user.phoneNumber} readOnly />
                                                    </div>
                                                    <div className="button-change">
                                                        <div className="text-center">
                                                            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal-profile">
                                                                Thay đổi
                                                        </button>
                                                        </div>
                                                        <div className="modal fade" id="exampleModal-profile" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel-profile" aria-hidden="true">
                                                            <div className="modal-dialog" role="document">
                                                                <div className="modal-content">
                                                                    <div className="modal-header">
                                                                        <h5 className="modal-title" id="exampleModalLabel-profile">THAY ĐỔI THÔNG TIN</h5>
                                                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                            <span aria-hidden="true">&times;</span>
                                                                        </button>
                                                                    </div>
                                                                    <div className="modal-body">
                                                                        <form onSubmit={this.props.changeProfile}>
                                                                            <div className="form-group form-group-default">
                                                                                <label>Họ và tên</label>
                                                                                <input name="NewFullname" className="form-control" type="text" defaultValue={this.props.user.fullname} />
                                                                            </div>
                                                                            <div className="form-group form-group-default">
                                                                                <label>Số điện thoại</label>
                                                                                <input name="NewPhoneNumber" className="form-control" type="text" defaultValue={this.props.user.phoneNumber} readOnly />
                                                                            </div>
                                                                            <div className="modal-footer">
                                                                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Đóng</button>
                                                                                <button type="submit" onClick={refreshPage} className="btn btn-primary">Lưu thay đổi</button>
                                                                            </div>
                                                                        </form>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="nav-email" role="tabpanel" aria-labelledby="nav-email-tab">
                                            <div className="card card-default">
                                                <div className="card-header">
                                                    <div className="form-group form-group-default">
                                                        <label>Email</label>
                                                        <input name="email" className="form-control" type="text" defaultValue={this.props.user.email} readOnly />
                                                    </div>
                                                    <div className="button-save">
                                                        <div className="text-center">
                                                            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal-email">
                                                                Thay đổi
                                                        </button>
                                                        </div>
                                                        <div className="modal fade" id="exampleModal-email" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel-email" aria-hidden="true">
                                                            <div className="modal-dialog" role="document">
                                                                <div className="modal-content">
                                                                    <div className="modal-header">
                                                                        <h5 className="modal-title" id="exampleModalLabel-email">THAY ĐỔI EMAIL</h5>
                                                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                            <span aria-hidden="true">&times;</span>
                                                                        </button>
                                                                    </div>
                                                                    <div className="modal-body">
                                                                        <form onSubmit={this.props.changeEmail}>
                                                                            <div className="form-group form-group-default">
                                                                                <label>Mật khẩu</label>
                                                                                <input name="password" className="form-control" type="password" defaultValue="" />
                                                                            </div>
                                                                            <div className="form-group form-group-default">
                                                                                <label>Email mới</label>
                                                                                <input name="newEmail" className="form-control" type="text" defaultValue="" />
                                                                            </div>
                                                                            <div className="modal-footer">
                                                                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Đóng</button>
                                                                                <button type="submit" onClick={refreshPage} className="btn btn-primary">Lưu thay đổi</button>
                                                                            </div>
                                                                        </form>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="nav-password" role="tabpanel" aria-labelledby="nav-password-tab">
                                            <div className="card card-default">
                                                <div className="card-header">
                                                    <div className="form-group form-group-default">
                                                        <label>Mật khẩu</label>
                                                        <input name="availablepassword" className="form-control" type="text" defaultValue="*********" readOnly />
                                                    </div>
                                                    <div className="button-save">
                                                        <div className="text-center">
                                                            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal-password">
                                                                Thay đổi
                                                        </button>
                                                        </div>
                                                        <div className="modal fade" id="exampleModal-password" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel-password" aria-hidden="true">
                                                            <div className="modal-dialog" role="document">
                                                                <div className="modal-content">
                                                                    <div className="modal-header">
                                                                        <h5 className="modal-title" id="exampleModalLabel-password">THAY ĐỔI MẬT KHẨU</h5>
                                                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                            <span aria-hidden="true">&times;</span>
                                                                        </button>
                                                                    </div>
                                                                    <div className="modal-body">
                                                                        <form onSubmit={this.props.changePassword}>
                                                                            <div className="form-group form-group-default">
                                                                                <label>Mật khẩu cũ</label>
                                                                                <input name="currentPassword" className="form-control" type="password" defaultValue="" />
                                                                            </div>
                                                                            <div className="form-group form-group-default">
                                                                                <label>Mật khẩu mới</label>
                                                                                <input name="newPassword" className="form-control" type="text" defaultValue="" />
                                                                            </div>
                                                                            <div className="modal-footer">
                                                                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Đóng</button>
                                                                                <button type="submit" onClick={refreshPage} className="btn btn-primary">Lưu thay đổi</button>
                                                                            </div>
                                                                        </form>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
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