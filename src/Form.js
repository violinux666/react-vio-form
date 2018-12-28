import React, { Component } from 'react';
import FormContext from './FormContext'
import isEmptyObj from './util/isEmptyObj'
import formManager from './formManager'
class Form extends Component {
    constructor(props){
        super(props);
        this.fieldMap={};
        this.model={};
        this.messageMap={};
        this.form={
            setError:(fieldName,message)=>{
                this.messageMap[fieldName]=message;
                //refresh Field Component
                this.fieldMap[fieldName].registerInfo.updateInfo({
                    value:this.model[fieldName],
                    message
                });
            },
            clearError:fieldName=>{
                delete this.messageMap[fieldName];
                //refresh Field Component
                this.fieldMap[fieldName].registerInfo.updateInfo({
                    value:this.model[fieldName],
                });
            },
            getModel:()=>this.model,
            submit:()=>this.handleSubmit()
        };
        let {id}=props;
        id&&formManager.put(id,this.form);
    }
    shouldComponentUpdate(){
        // only Field Component will update
        return false;
    }
    handleChange=({fieldName,message,regexp,updateInfo,onChange},value)=>{
        
        if(value==undefined)
            value='';
        // assign and validate
        if(regexp&&!regexp.test(value)){
            this.messageMap[fieldName]=message;
        }else{
            delete this.messageMap[fieldName];
        }
        this.model[fieldName]=value;
        // callback
        let {model,form}=this;
        onChange&&onChange(value,{model,form});
        // trigger Field's setState
        updateInfo({
            value,
            message:this.messageMap[fieldName]
        });
    }
    handleSubmit=(event)=>{
        event&&event.preventDefault();
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
        let {fieldName,onChange}=registerInfo;
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