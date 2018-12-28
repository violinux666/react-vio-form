# react-vio-form

> React form tool with not any dependencies

[![NPM](https://img.shields.io/npm/v/react-vio-form.svg)](https://www.npmjs.com/package/react-vio-form) 

[demo](https://violinux666.github.io/react-vio-form/)

[简体中文](https://github.com/violinux666/blog/issues/3)

## Intro

A lightweight, customizable react component that make easily to manage you web form. require React16+



## changeLog

- 1.2.0: form.clearError
- 1.1.0: form.setError|form.getModel|form.submit

## Install

```bash
npm install --save react-vio-form
```

## Run example
```
npm start
# (in another tab)
cd example
npm start # runs create-react-app dev server
```

## Usage

### quick start

first,Customize your InputGroup Component

***InputGroup.js***
```jsx
import React, { Component } from 'react';

class InputGroup extends Component {
    render() {
    let {
        onChange,//required 
        value,//required 
        message,//required
        title,//custom prop
        type="text"//custom prop
    }=this.props;
    return (
        <div>
            <label>{title}:</label>
            <input type={type} onChange={e=>onChange(e.target.value)}/>
            {message&&<span>{message}</span>}
        </div>
    );
  }
}
export default InputGroup;
```

And then,config your form APP

Field.props:
- component:Your customizable React Component
- fieldName:Form field property name
- regexp:The validate regexp
- message:when field's validation fails,pass to InputGroup props

Form.props:
- onSubmit: will trigger without any error

***App.js***
```jsx
import React, { Component } from 'react';
import InputGroup from './InputGroup';
let requiredExp=/\w{1,}/;
class App extends Component {
    handleSubmit=({model})=>{
        console.log('form data is :'+JSON.stringify(model));
    }
    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Field component={InputGroup} fieldName="username" title="Username" 
                regexp={requiredExp} message="Not be empty"></Field>
                <Field component={InputGroup} fieldName="address" title="Address"></Field>
                <Field component={InputGroup} fieldName="password" title="Password" 
                type="password" regexp={requiredExp} message="Not be empty"></Field>
                <button type="submit">Submit</button>
            </Form>
        );
    }
}


export default App;
```

### callback

* ```<Form onSubmit={//}>``` will trigger without any error
- ```<Field onChange={//}>``` will trigger when change

***App.js***
```jsx
class App extends Component {
    handleSubmit=({model})=>{
        //form submit callback
        console.log('form data is :'+JSON.stringify(model));
    }
    passwordChange=(value,{model,form})=>{
        //change callback
        console.log(`password:${value}`);
    }
    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit} id="form">
                    <Field component={InputGroup} fieldName="username" title="Username"></Field>
                    <Field component={InputGroup} fieldName="password" title="Password" 
                    type="password" onChange={this.passwordChange}></Field>
                    <button type="submit">Submit</button>
                </Form>
            </div>
        );
    }
}
```

### API

form object can control the Form App.
how to get form object:
- formManager.get(id)
- the arguments to the callback function

form API:
- setError(fieldName,message) 
- clearError(fieldName)
- getModel()
- submit()

***App.js***
```jsx
import React, { Component } from 'react'
import {Form,Field,formManager} from 'react-vio-form'
let requiredExp=/\w{1,}/;
class App extends Component {
    handleSubmit=({model})=>{
        //form submit callback
        console.log('form data is :'+JSON.stringify(model));
    }
    handleOutsideSubmit=()=>{
        // submit outside Form Component
        // param is Form id
        formManager.get('form').submit();
    }
    passwordChange=(value,{model,form})=>{
        if(model.password!==model.password2){
            //set Error Message
            form.setError('password2','password2 must be equaled to password');
        }else{
            //clear Error Message
            form.clearError('password2');
        }
    }
    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit} id="form">
                    <Field component={InputGroup} fieldName="username" title="Username"></Field>
                    <Field component={InputGroup} fieldName="password" title="Password" 
                    type="password" regexp={requiredExp} message="Not be empty" onChange={this.passwordChange}></Field>
                    <Field component={InputGroup} fieldName="password2" title="Password2" 
                    type="password" onChange={this.passwordChange}></Field>
                </Form>
                <button onClick={this.handleOutsideSubmit}>outside submit</button>
            </div>
        );
    }
}
```

## Get Help

- Contact me on iewnap@outlook.com
- raise an issue on Github.[Submit a issue](https://github.com/violinux666/react-vio-form/issues/new)

## Thanks
- [create-react-library](https://github.com/transitive-bullshit/create-react-library)

## License

MIT © [violinux666](https://github.com/violinux666)