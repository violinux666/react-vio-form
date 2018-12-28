import React, { Component } from 'react'
import {Form,Field,formManager} from 'react-vio-form'


class InputGroup extends Component {
  render() {
      let {onChange,value,message,title,type="text"}=this.props;
      return (
          <div>
              <label>{title}:</label>
              <input type={type} onChange={e=>onChange(e.target.value)}/>
              {message&&<span>{message}</span>}
          </div>
      );
  }
}
let requiredExp=/\w{1,}/;
class App extends Component {
    handleSubmit=({model})=>{
        console.log('form data is :'+JSON.stringify(model));
    }
    passwordChange=(value,{model,form})=>{
        if(model.password!==model.password2){
            form.setError('password2','password2 must be equaled to password');
        }else{
            form.clearError('password2');
        }
    }
    handleOutsideSubmit=()=>{
        // param is Form id
        formManager.get('form').submit();
    }
    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit} id="form">
                    <Field component={InputGroup} fieldName="username" title="Username" regexp={requiredExp} message="Not be empty"></Field>
                    <Field component={InputGroup} fieldName="address" title="Address"></Field>
                    <Field component={InputGroup} fieldName="password" title="Password" type="password" regexp={requiredExp} message="Not be empty" onChange={this.passwordChange}></Field>
                    <Field component={InputGroup} fieldName="password2" title="Password2" type="password" onChange={this.passwordChange}></Field>
                    <button type="submit">Submit</button>
                </Form>
                <button onClick={this.handleOutsideSubmit}>outside submit</button>
            </div>
        );
    }
}


export default App;