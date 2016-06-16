import React from 'react'

import TextField from 'material-ui/lib/TextField'
import FlatButton from 'material-ui/lib/flat-button'
import Auth from '../services/AuthService'

export default class Login extends React.Component {
  constructor (props, context) {
    console.log('constructing login component...')
    super(props, context)
    this.state = {
      email: '',
      password: ''
    }
    this.login = this.login.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
  }

  login (e) {
    e.preventDefault()
    Auth.login(this.state.email, this.state.password)
     .catch((err) => {
       alert('Couldnt log you in!')
       console.log('Error logging in user:', err)
     })
  }

  handlePasswordChange (e) {
    this.setState({password: e.target.value})
  }

  handleEmailChange (e) {
    this.setState({email: e.target.value})
  }

  render () {
    return (
      <div>
        <TextField
          hintText='Email'
          floatingLabelText='Email'
          onChange={this.handleEmailChange}
          id='email'/>
        <br/>
        <TextField
          hintText='Password'
          floatingLabelText='Password'
          type='password'
          onChange={this.handlePasswordChange}
          id='password'
          ref='password'/>
        <br/>
        <FlatButton
          label='Login'
          onClick={this.login}/>
      </div>
    )
  }
}
