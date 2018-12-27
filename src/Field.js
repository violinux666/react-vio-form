import React, { Component } from 'react';
import FormContext from './FormContext'

class Field extends Component {
    constructor(){
        super();
        let id=new Date().getTime();
        this.id=id;
    }
    componentWillUnmount(){
    }
    getComponentName=()=>{
        return this.props.component;
    }
    render() {
        let {fieldName,message,regexp,...other}=this.props;
        let Component=this.getComponentName();
        return (
            <FormContext.Consumer>
                {
                    ({getFormContext})=>{
                        let meta=getFormContext({fieldName,message,regexp});
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