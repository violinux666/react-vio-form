import React, { Component } from 'react';
import FormContext from './FormContext'

class Field extends React.PureComponent {
    constructor(){
        super();
        let id=new Date().getTime();
        this.id=id;
        this.state={};
    }
    componentWillUnmount(){
        // when destroyed
    }
    getComponentName=()=>{
        return this.props.component;
    }
    updateInfo=({value,message})=>{
        //executed by Form 
        this.setState({value,message});
    }
    render() {
        let {fieldName,message,regexp,...other}=this.props;
        let Component=this.getComponentName();
        let RegisterInfo={
            fieldName,message,regexp,
            updateInfo:this.updateInfo
        }
        let _value=this.state.value;
        let _message=this.state.message;
        return (
            <FormContext.Consumer>
                {
                    ({register})=>{
                        let {onChange}=register(RegisterInfo);
                        let meta={
                            onChange,
                            value:_value,
                            message:_message
                        }
                        return (
                            <Component meta={meta} {...other}></Component>
                        )
                    }
                }
            </FormContext.Consumer>
        )
    }
}

export default Field;