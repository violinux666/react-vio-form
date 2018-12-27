import React, { Component } from 'react';
import FormContext from './FormContext'
import isEmptyObj from './util/isEmptyObj'
class Form extends Component {
    constructor(){
        super();
        this.fieldMap={};
        this.model={};
        this.messageMap={};
    }
    handleChange=({fieldName,message,regexp,updateInfo},value)=>{
        if(value==undefined)
            value='';
        if(regexp&&!regexp.test(value)){
            this.messageMap[fieldName]=message;
        }else{
            delete this.messageMap[fieldName];
        }
        this.model[fieldName]=value;
        updateInfo({
            value,
            message:this.messageMap[fieldName]
        });
    }
    handleSubmit=(evnet)=>{
        event.preventDefault();
        this.validateAllField();
        let {model,messageMap}=this;
        if(isEmptyObj(messageMap)){
            this.props.onSubmit.call(null,{model:model});
        }
    }
    validateAllField=()=>{
        // trigger all field change event
        let {fieldMap,model}=this;
        for(let i in fieldMap){
            let {registerInfo}=fieldMap[i];
            this.handleChange(registerInfo,model[registerInfo.fieldName])
        }
    }
    register=(registerInfo)=>{
        let {fieldName}=registerInfo;
        if(!this.fieldMap[fieldName]){
            // hasn't registered
            this.fieldMap[fieldName]={
                registerInfo,
                onChange:(value)=>{
                    this.handleChange(registerInfo,value)
                }
            }
            
        }
        return this.fieldMap[fieldName];
    }
    render() {
        let {children,onSubmit}=this.props;
        return (
            <FormContext.Provider value={{
                register:this.register
            }}>
                <form onSubmit={this.handleSubmit}>
                    {children}
                </form>
            </FormContext.Provider>
        );
    }
}

export default Form;