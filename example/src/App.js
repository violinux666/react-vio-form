import React, { Component } from 'react'
import {Form,Field} from 'react-vio-form'


class InputGroup extends Component {
  render() {
      let {title,meta,type="text"}=this.props;
      return (
          <div>
              <label>{title}:</label>
              <input type={type} onChange={e=>meta.onChange(e.target.value)}/>
              {meta.message&&<span>{meta.message}</span>}
          </div>
      );
  }
}
let requiredExp=/\w{1,}/;
class App extends Component {
    handleSubmit=({model})=>{
        console.log('form data is :'+JSON.stringify(model));
    }
    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Field component={InputGroup} fieldName="username" title="Username" regexp={requiredExp} message="Not be empty"></Field>
                <Field component={InputGroup} fieldName="address" title="Address"></Field>
                <Field component={InputGroup} fieldName="password" title="Password" type="password" regexp={requiredExp} message="Not be empty"></Field>
                <button type="submit">Submit</button>
            </Form>
        );
    }
}


export default App;