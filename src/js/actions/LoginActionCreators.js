import AppDispatcher from '../dispatcher/dispatcher'
import LoginConstants from '../constants/LoginConstants'
import { browserHistory } from 'react-router'
var ActionTypes = LoginConstants.ActionTypes

module.exports = {

  loginUser: function (jwt) {
    AppDispatcher.dispatch({
      type: ActionTypes.USER_LOGGED_IN,
      jwt: jwt
    })
  }

}
