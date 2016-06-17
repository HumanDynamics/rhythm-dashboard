import AppDispatcher from '../dispatcher/dispatcher'
import LoginConstants from '../constants/LoginConstants'
import {hashHistory} from 'react-router'
var ActionTypes = LoginConstants.ActionTypes

module.exports = {

  loginUser: function (jwt) {
    localStorage.setItem('jwt', jwt)
    AppDispatcher.dispatch({
      type: ActionTypes.USER_LOGGED_IN,
      jwt: jwt
    })
  },

  logoutUser: function () {
    localStorage.removeItem('jwt')
    hashHistory.push('/login')
    AppDispatcher.dispatch({
      type: ActionTypes.LOGOUT_USER
    })
  }
}
