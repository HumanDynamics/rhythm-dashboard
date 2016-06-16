import AppDispatcher from '../dispatcher/dispatcher'
import LoginConstants from '../constants/LoginConstants'
import { browserHistory } from 'react-router'
var ActionTypes = LoginConstants.ActionTypes

module.exports = {

  loginUser: function (email, jwt) {
    localStorage.setItem('jwt', jwt)
    browserHistory.push('/meetings')
    AppDispatcher.dispatch({
      type: ActionTypes.USER_LOGGED_IN,
      email: email,
      jwt: jwt
    })
  }

}
