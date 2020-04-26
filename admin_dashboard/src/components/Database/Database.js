import React, { Component } from 'react';
import {db} from '../base';
import {RenderDatabase} from './RenderDatabase';

function closeModal(){
    var close = document.getElementById("closeModal");
    close.click();
}


export class Database extends Component {
    constructor(props){
        super(props);
        this.state = {
            database : {},
            choseDB : "",
            isLoading: true,
            displayListDB: true
        }
        this.changeRenderCurrentDatabase = this.changeRenderCurrentDatabase.bind(this);
        this.renderCurrentDatabase = this.renderCurrentDatabase.bind(this);
        this.togglePlusSquare = this.togglePlusSquare.bind(this);
        this.createDB = this.createDB.bind(this);
    }

    createDB(e) {
        e.preventDefault();
        const DBname = document.querySelector('input[name="DBname"]');
        var x = document.getElementById("exampleModal")
        if(DBname.length !== 0){
            e.preventDefault();
            db.ref('/admins/' + this.props.userId + '/database/' + DBname.value).set({
                0: 'init'
            })
            DBname.value = '';
            closeModal();
        }
        else{
            alert("Chưa nhập tên Database !!!");
        }
    }

    componentWillMount(){
        db.ref('/admins/'+this.props.userId+'/database/').on('value', (snapshot)=>{
            let database = snapshot.val();
            let firstDB;
            for(let i in database){
                firstDB = i;
                break;
            }
            this.setState({
                database: database,
                choseDB: firstDB,
                isLoading: false
            })
        })
    }


    changeRenderCurrentDatabase(propKeyOfDB){
        this.setState({
            choseDB: propKeyOfDB
        })
    }
    //using algorithm
    handlingDataTreeFromDatabase(obj, key, htmlText){
        //Thuat toan khoadev :v
        if(typeof obj[key] != 'object'){
            htmlText.html += `<li><div>${key}: ${obj[key]}</div></li>`;
            return;
        }
        else if(typeof obj == 'object'){
            let lenOfThisObject = Object.keys(obj[key]).length;
            for(let i = 0; i<lenOfThisObject ; i++){
                if(i == 0) htmlText.html+=`<li><div><i class="far fa-plus-square db-plus-icon"></i><strong>${key}: </strong></div><ul>`;
                // else if(i > 0) htmlText.html+="<li>";
                let keyOfChildObject = Object.keys(obj[key])[i];
                this.handlingDataTreeFromDatabase(obj[key], keyOfChildObject, htmlText);
            }
            if(lenOfThisObject > 0)htmlText.html+="</ul></li>";
            return;
        }
        else if(typeof obj == 'array'){
            let lenOfThisArray = obj[key].length;
            for(let i = 0; i<lenOfThisArray ; i++){
                if(i == 0) htmlText.html+=`<li><div><i class="far fa-plus-square db-plus-icon"></i><strong>${key}: </strong></div><ul>`;
                // else if(i > 0) htmlText.html+="<li>";
                let keyOfChildArray = i;
                this.handlingDataTreeFromDatabase(obj[key], keyOfChildArray, htmlText);
            }
            if(lenOfThisArray > 0)htmlText.html+="</ul></li>";
            return;
        }
    }
    renderCurrentDatabase(){
        let htmlText = {
            html: ""
        }
        if(this.state.choseDB){
            this.handlingDataTreeFromDatabase(this.state.database, this.state.choseDB, htmlText)
        }
        return htmlText.html;
    }
    togglePlusSquare(){
            this.setState((currentState) => ({
                displayListDB: !currentState.displayListDB, 
            }));
    }
    render() {
        return (
            <RenderDatabase renderCurrentDatabase={this.renderCurrentDatabase()}
                            changeRenderCurrentDatabase={this.changeRenderCurrentDatabase}
                            choseDB={this.state.choseDB}
                            database={this.state.database}
                            isLoading={this.state.isLoading}
                            userId={this.props.userId}
                            togglePlusSquare={this.togglePlusSquare}
                            createDB={this.createDB}
                            />
        );
    }
}
