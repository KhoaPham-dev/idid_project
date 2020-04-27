import React, { Component } from 'react';
import {db} from '../base';
import {RenderDatabase} from './RenderDatabase';
import { store } from 'react-notifications-component';
function closeModal(x){
    var close = document.getElementsByClassName("closeModal")
    close[x].children[0].click();
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
        this.deleteDB = this.deleteDB.bind(this);
        this.createQrCode = this.createQrCode.bind(this);
    }

    createDB(e) {
        e.preventDefault();
        const DBname = document.querySelector('input[name="DBname"]');
        
        var x = document.getElementById("createDBLabel")
        if(DBname.value.length !== 0 && !this.state.database.hasOwnProperty(DBname.value)){
            
            db.ref('/admins/' + this.props.userId + '/database/' + DBname.value).set({
                0: 'init'
            })
            
            closeModal(0);
            sessionStorage.setItem("chdb", DBname.value);
            this.setState({
                choseDB: DBname.value
            })
            DBname.value = '';
            store.addNotification({
                title: "Thông báo",
                message: "Bạn đã tạo database thành công!",
                type: "success",
                insert: "bottom",
                container: "bottom-center",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                  duration: 1000
                }
              });
        }
        else{
            alert("Chưa nhập tên Database hoặc đã có database này rồi !!!");
        }
    }

    deleteDB() {
        sessionStorage.removeItem('chdb');
        db.ref('/admins/' + this.props.userId + '/database/' + this.state.choseDB).set({
        })
        closeModal(1);
        store.addNotification({
            title: "Thông báo",
            message: "Bạn đã xóa thành công!",
            type: "success",
            insert: "bottom",
            container: "bottom-center",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
              duration: 1000
            }
          });
          
    }
    createQrCode(){
        let DBname = this.state.choseDB;
        db.ref('/admins/' + this.props.userId + '/database/' + DBname).update({
            "qr-code": `admins/${this.props.userId}/database/${DBname}`
        }) 
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
                choseDB: sessionStorage.getItem('chdb') || firstDB,
                isLoading: false
            })
        })
    }


    changeRenderCurrentDatabase(propKeyOfDB){
        sessionStorage.setItem("chdb", propKeyOfDB);
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
                            deleteDB={this.deleteDB}
                            createQrCode={this.createQrCode}
                            />
        );
    }
}
