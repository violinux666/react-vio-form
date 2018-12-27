import React, { Component } from 'react';
import FormContext from './FormContext'
class Form extends Component {
    constructor(){
        super();
        this.model={};
        this.messageMap={};
    }
    componentWillUnmount(){
    }
    handleChange=({fieldName,message,regexp},value)=>{
        if(regexp.test(value)){
            this.model[fieldName]=value;
        }else{
            this.messageMap[fieldName]=message;
        }
    }
    handleSubmit=(evnet)=>{
        this.props.onSubmit.call(null,{model:this.model});
        event.preventDefault();
    }
    getFormContext=(param)=>{
        let {fieldName,message,regexp}=param;
        return {
            value:this.model[fieldName],
            message:this.messageMap[fieldName],
            onChange:(value)=>{
                this.handleChange(param,value)
            }
        }
    }
    render() {
        let {children,onSubmit}=this.props;
        return (
            <FormContext.Provider value={{
                getFormContext:this.getFormContext
            }}>
                <form onSubmit={this.handleSubmit}>
                    {children}
                </form>
            </FormContext.Provider>
        );
    }
}

export default Form;