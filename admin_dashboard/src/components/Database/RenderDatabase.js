import React, { Component } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { LoopCircleLoading, PointSpreadLoading } from 'react-loadingg';
import './RenderDatabase.css';
const HtmlToReactParser = require('html-to-react').Parser;


export class RenderDatabase extends Component {
    handleChangeCurrentDatabase(e) {
        this.props.changeRenderCurrentDatabase(e.target.value)
    }
    handleClickExportToCSVFile(e){
        let data = this.props.database[this.props.choseDB];
        if(data == '')
            return;
        this.props.JSONToCSVConvertor(data, this.props.choseDB, true);
    }
    
    render() {
        let databaseKeys = [];
        for (let i in this.props.database) {
            databaseKeys.push(i);
        }
        
        return (
            <Container>
                <Row>
                    <Col xl={6}>
                        <div className="container-btn-db">
                            <div className="btn-db">
                                {/* Button trigger modal */}
                                <button type="button" className="btn btn-primary btn-db-create" data-toggle="modal" data-target="#createDB">
                                    Create DB
                                </button>
                                {/* Modal */}
                                <div className="modal fade" id="createDB" tabIndex={-1} role="dialog" aria-labelledby="createDBLabel" aria-hidden="true">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="createDBLabel">Create DB</h5>
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">×</span>
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                <form onSubmit={this.props.createDB}>
                                                    <div className="form-group form-group-default">
                                                        <label>Tên Databse</label>
                                                        <input name="DBname" className="form-control" type="text" defaultValue="" />
                                                    </div>
                                                    <div className="modal-footer closeModal">
                                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Đóng</button>
                                                        <button type="submit" className="btn btn-primary">Tạo</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="btn-db">
                                {/* Button trigger modal */}
                                <button type="button" className="btn btn-danger btn-db-del" data-toggle="modal" data-target="#deleteDB">
                                    Delete DB
                                </button>
                                {/* Modal */}
                                <div className="modal fade" id="deleteDB" tabIndex={-1} role="dialog" aria-labelledby="deleteDBlabel" aria-hidden="true">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="deleteDBlabel">Delete DB</h5>
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">×</span>
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                <p>Bạn có muốn xóa database <b>{this.props.choseDB}</b></p>
                                                <div className="modal-footer closeModal">
                                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Đóng</button>
                                                    <button type="button" onClick={this.props.deleteDB} className="btn btn-danger">Xóa</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="btn-db">
                                {/* Button trigger modal */}
                                <button onClick={this.props.createQrCode} type="button" className="btn btn-success btn-db-scanner" data-toggle="modal" data-target="#qrDB">
                                    Connect DB
                                </button>
                                {/* Modal */}
                                <div className="modal fade" id="qrDB" tabIndex={-1} role="dialog" aria-labelledby="qrDBlabel" aria-hidden="true">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="qrDBlabel">QRcode</h5>
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">×</span>
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                <p>Dùng QRcode để liên kết scanner và database <b>{this.props.choseDB}</b></p>
                                                {this.props.database[this.props.choseDB] ? <img src={`https://chart.googleapis.com/chart?cht=qr&chs=350x350&chl=${this.props.database[this.props.choseDB]["qr-code"]}`} /> : <PointSpreadLoading/>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
        
                            </div>
                            <div className="btn-db">
                                {/* Button download csv file */}
                                <button onClick={this.handleClickExportToCSVFile.bind(this)} type="button" className="btn btn-light btn-db-scanner">
                                <svg className="bi bi-arrow-bar-down" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M11.354 10.146a.5.5 0 010 .708l-3 3a.5.5 0 01-.708 0l-3-3a.5.5 0 01.708-.708L8 12.793l2.646-2.647a.5.5 0 01.708 0z" clipRule="evenodd"/>
                                    <path fillRule="evenodd" d="M8 6a.5.5 0 01.5.5V13a.5.5 0 01-1 0V6.5A.5.5 0 018 6zM2 3.5a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5z" clipRule="evenodd"/>
                                </svg>Export DB
                                </button>
                               
                            </div>
                        </div>
                            
                    </Col>
                    <Col xl={5}>
                        <Form>
                            <Form.Group controlId="selectedDB">
                                <Form.Control  as="select" value={this.props.choseDB} onChange={this.handleChangeCurrentDatabase.bind(this)}>
                                    {databaseKeys ? databaseKeys.map(key => {
                                        return <option key={key} value={key}>{key}</option>
                                    }) : null}
                                </Form.Control>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
                <Row lx={12} className="justify-content-md-center db-container" style={{ minHeight: "50px", backgroundColor: "white", marginBottom: "1px", boxShadow: "0 -1px 3px 1px #B7B8BB", borderRadius: "5px 5px 0 0" }}>
                    <h2 className="chose-db-name">{this.props.choseDB}</h2>
                </Row>
                <Row className="db-container" style={{ minHeight: "400px", backgroundColor: "white", marginBottom: "25px", boxShadow: "0 1px 2px 1px #B7B8BB" }}>
                    {this.props.listCurrentDB ?
                        <Col lx={12} as="div">
                            <ul className="current-db-tree"  > {new HtmlToReactParser().parse(this.props.listCurrentDB)} </ul>
                        </Col>
                        : <LoopCircleLoading />}

                </Row>
            </Container>
        );
    }
}
