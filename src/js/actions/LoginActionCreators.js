import AppDispatcher from '../dispatcher/dispatcher'
import LoginConstants from '../constants/LoginConstants'
var ActionTypes = LoginConstants.ActionTypes

module.exports = {

  loginUser: function (jwt) {
    AppDispatcher.dispatch({
      type: ActionTypes.USER_LOGGED_IN,
      jwt: jwt
    })
  }
}
