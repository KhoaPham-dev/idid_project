import React, { Component } from 'react';
import {Link} from 'react-router-dom';
export class RenderRegistriedContests extends Component {
    render() {
        return (
            <React.Fragment>
            <div className="mb-4" style={{"textAlign": "center"}}>
                <div className="h3 mb-0 text-gray-900">
                  <span><strong>Đã đăng ký</strong></span>
                </div>  
            </div>
            <div className="row">
      
                {/* <!-- Area Chart --> */}
                <div className="col-xl-8 col-lg-7">
                    <div className="card shadow mb-4">
                    {/* <!-- Card Header - Dropdown --> */}
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold text-primary">Earnings Overview</h6>
                        <div className="dropdown no-arrow">
                        <Link className="dropdown-toggle" to="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                        </Link>
                        <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
                            <div className="dropdown-header">Dropdown Header:</div>
                            <Link className="dropdown-item" to="#">Action</Link>
                            <Link className="dropdown-item" to="#">Another action</Link>
                            <div className="dropdown-divider"></div>
                            <Link className="dropdown-item" to="#">Something else here</Link>
                        </div>
                        </div>
                    </div>
                    {/* <!-- Card Body --> */}
                    <div className="card-body">
                        <div className="chart-area">
                        <canvas id="myAreaChart"></canvas>
                        </div>
                    </div>
                    </div>
                </div>

                {/* <!-- Pie Chart --> */}
                <div className="col-xl-4 col-lg-5">
                    <div className="card shadow mb-4">
                    {/* <!-- Card Header - Dropdown --> */}
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold text-primary">Revenue Sources</h6>
                        <div className="dropdown no-arrow">
                        <Link className="dropdown-toggle" to="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                        </Link>
                        <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
                            <div className="dropdown-header">Dropdown Header:</div>
                            <Link className="dropdown-item" to="#">Action</Link>
                            <Link className="dropdown-item" to="#">Another action</Link>
                            <div className="dropdown-divider"></div>
                            <Link className="dropdown-item" to="#">Something else here</Link>
                        </div>
                        </div>
                    </div>
                    {/* <!-- Card Body --> */}
                    <div className="card-body">
                        <div className="chart-pie pt-4 pb-2">
                        <canvas id="myPieChart"></canvas>
                        </div>
                        <div className="mt-4 text-center small">
                        <span className="mr-2">
                            <i className="fas fa-circle text-primary"></i> Direct
                        </span>
                        <span className="mr-2">
                            <i className="fas fa-circle text-success"></i> Social
                        </span>
                        <span className="mr-2">
                            <i className="fas fa-circle text-info"></i> Referral
                        </span>
                        </div>
                    </div>
                    </div>
                </div>
                </div>

            </React.Fragment>
        );
    }
}
