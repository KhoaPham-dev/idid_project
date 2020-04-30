import React, { Component } from 'react';
import {db} from '../base';
import {RenderDatabase} from './RenderDatabase';
import { store } from 'react-notifications-component';

function closeModal(x){
    let close = document.getElementsByClassName("closeModal")
    close[x].children[0].click();
}
let count = 0;

export class Database extends Component {
    constructor(props){
        super(props);
        this.state = {
            database : {},
            choseDB : "",
            isLoading: true,
        }
        this.changeRenderCurrentDatabase = this.changeRenderCurrentDatabase.bind(this);
        this.renderCurrentDatabase = this.renderCurrentDatabase.bind(this);
        this.createDB = this.createDB.bind(this);
        this.deleteDB = this.deleteDB.bind(this);
        this.createQrCode = this.createQrCode.bind(this);
        this.JSONToCSVConvertor = this.JSONToCSVConvertor.bind(this);
    }

    createDB(e) {
        e.preventDefault();
        const DBname = document.querySelector('input[name="DBname"]');
        
        let x = document.getElementById("createDBLabel")
        if(DBname.value.length !== 0 && !this.state.database.hasOwnProperty(DBname.value)){
            
            db.ref('/admins/' + this.props.userId + '/database/' + DBname.value).set({
                'Column-name': ['id','value']
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
    componentDidMount(){
        db.ref('/admins/'+this.props.userId+'/database/').on('value', (snapshot)=>{
            let database = snapshot.val();
            let firstDB;
            for(let i in database){
                firstDB = i;
                break;
            }
            this.renderCurrentDatabase(database, sessionStorage.getItem('chdb') || firstDB);
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
        this.renderCurrentDatabase(this.state.database, propKeyOfDB);
        
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
                if(i == 0){
                    htmlText.html+=`<li><div><i id="${key}" className="far fa-minus-square db-plus-icon"></i><strong>${key}: </strong></div><ul>`;
                    htmlText.keyId.push(key);
                }
                let keyOfChildObject = Object.keys(obj[key])[i];
                this.handlingDataTreeFromDatabase(obj[key], keyOfChildObject, htmlText);
            }
            if(lenOfThisObject > 0)htmlText.html+="</ul></li>";
            return;
        }
        else if(typeof obj == 'array'){
            let lenOfThisArray = obj[key].length;
            for(let i = 0; i<lenOfThisArray ; i++){
                if(i == 0){
                    htmlText.html+=`<li><div><i  id="${key}" className="far fa-minus-square db-plus-icon"></i><strong>${key}: </strong></div><ul>`;
                    htmlText.keyId.push(key);
                }
                let keyOfChildArray = i;
                this.handlingDataTreeFromDatabase(obj[key], keyOfChildArray, htmlText);
            }
            if(lenOfThisArray > 0)htmlText.html+="</ul></li>";
            return;
        }
    }
    renderCurrentDatabase(database, choseDB){
        
        let htmlText = {
            html: "",
            keyId: []
        }
        if(choseDB){
            this.handlingDataTreeFromDatabase(database, choseDB, htmlText)
        }
        this.setState({
            listCurrentDB: htmlText.html,
            keyIdForEachField: htmlText.keyId
        })
    }
    componentDidUpdate(){
        if(this.state.keyIdForEachField)
        for(let i = 0; i < this.state.keyIdForEachField.length; i++){
            document.getElementById(this.state.keyIdForEachField[i]).addEventListener("click", (e)=>{
                if(!sessionStorage.getItem(e.target.getAttribute('id'))){
                    sessionStorage.setItem(e.target.getAttribute('id'),Date.now());
                    e.target.parentElement.nextElementSibling.classList.toggle("hide");
                    e.target.classList.toggle("fa-plus-square");
                }
                else if(Date.now()-parseInt(sessionStorage.getItem(e.target.getAttribute('id'))) > 200){
                    sessionStorage.setItem(e.target.getAttribute('id'),Date.now());
                    e.target.parentElement.nextElementSibling.classList.toggle("hide");
                    e.target.classList.toggle("fa-plus-square");
                }
            })
        }
    }
    
  
    JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
        //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
        let arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
        
        let CSV = '';    
        //Set Report title in first row or line
        
        CSV += ReportTitle + '\r\n\n';
    
        //This condition will generate the Label/Header
        if (ShowLabel) {
            let row = "";
            
            //This loop will extract the label from 1st index of on array
            //I fixed a little bit to compatible with this format of db
            //Getting the  property of array to be name of column
            for(let prop in arrData){
                if( typeof arrData[prop] == 'object'){
                    for (let index = 0; index < arrData[prop].length; index++) {
                    
                        //Now convert each value to string and comma-seprated
                        row += arrData[prop][index] + ',';
                    }
                    break;
                }
            }
            
    
            row = row.slice(0, -1);
            
            //append Label row with line break
            CSV += row + '\r\n';
        }
        
        //1st loop is to extract each row
        //for (let i = 0; i < arrData.length; i++) {
            let row = "";
            
            //2nd loop will extract each column and convert it in string comma-seprated
            for (let index in arrData) {
                if(typeof arrData[index] == "string" || typeof arrData[index] == "number"){
                    row += '"' + index.substring(1) + '",';
                    row += '"' + arrData[index] + '",';
                    row.slice(0, row.length - 1);
            
                    //add a line break after each row
                    row += '\r\n';
                }
            }
            CSV+=row;
        //}
    
        if (CSV == '') {        
            alert("Invalid data");
            return;
        }   
        
        //Generate a file name
        let fileName = "Database_";
        //this will remove the blank-spaces from the title and replace it with an underscore
        fileName += ReportTitle.replace(/ /g,"_");   
        
        //Initialize file format you want csv or xls
        let uri = 'data:text/xls;charset=utf-8,' + escape(CSV);
        
        // Now the little tricky part.
        // you can use either>> window.open(uri);
        // but this will not work in some browsers
        // or you will not get the correct file extension    
        
        //this trick will generate a temp <a /> tag
        let link = document.createElement("a");    
        link.href = uri;
        
        //set the visibility hidden so it will not effect on your web-layout
        link.style = "visibility:hidden";
        link.download = fileName + ".csv";
        
        //this part will append the anchor tag and remove it after automatic click
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    render() {
        
        return (
            <RenderDatabase 
                            listCurrentDB={this.state.listCurrentDB}
                            changeRenderCurrentDatabase={this.changeRenderCurrentDatabase}
                            choseDB={this.state.choseDB}
                            database={this.state.database}
                            isLoading={this.state.isLoading}
                            userId={this.props.userId}
                            createDB={this.createDB}
                            deleteDB={this.deleteDB}
                            createQrCode={this.createQrCode}
                            JSONToCSVConvertor={this.JSONToCSVConvertor}
                            />
        );
    }
}