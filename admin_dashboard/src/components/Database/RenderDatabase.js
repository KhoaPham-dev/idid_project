import React, { Component } from 'react';
import {Container, Row, Col, Card, Button, Form} from 'react-bootstrap';
import { LoopCircleLoading, PointSpreadLoading } from 'react-loadingg';
import './RenderDatabase.css';
export class RenderDatabase extends Component {
    handleChangeCurrentDatabase(e){
        this.props.changeRenderCurrentDatabase(e.target.value)
    }

    
    render() {
        let databaseKeys = [];
        for(let i in this.props.database){
            databaseKeys.push(i);
        }
        return (
            <Container>
                <Row>
                    <Col xl={3}>
                        <Button variant="primary">Create Database</Button>
                    </Col>
                    <Col xl={5}>
                    <Form>
                        <Form.Group controlId="exampleForm.SelectCustom">
                                <Form.Control as="select" custom onChange={this.handleChangeCurrentDatabase.bind(this)}>
                                    {databaseKeys ? databaseKeys.map(key=>{
                                        return <option key={key} value={key}>{key}</option>
                                    }) : null} 
                                </Form.Control>
                        </Form.Group>
                    </Form>
                    </Col>
                </Row>
                <Row lx={12} className="justify-content-md-center" style={{minHeight:"50px", backgroundColor:"white", marginBottom:"1px", boxShadow:"0 -1px 3px 1px #B7B8BB", borderRadius:"5px 5px 0 0"}}>
                    {this.props.choseDB}   
                </Row>
                <Row style={{minHeight:"400px", backgroundColor:"white", marginBottom:"25px", boxShadow:"0 1px 2px 1px #B7B8BB"}}>
                    {this.props.renderCurrentDatabase ? 
                        <Col lx={12} as="ul" style={{margin:"10px 0 5px 25px"}} dangerouslySetInnerHTML={{__html: this.props.renderCurrentDatabase}}>         
                        </Col>
                    : <LoopCircleLoading/>}
                    
                </Row>
            </Container>
        );
    }
}
