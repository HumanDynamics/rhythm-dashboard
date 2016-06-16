import MicroEvent from 'microevent'
import AppDispatcher from '../dispatcher/dispatcher'
import LoginConstants from '../constants/LoginConstants'

var ActionTypes = LoginConstants.ActionTypes
var CHANGE_EVENT = 'change'

class _LoginStore {
  constructor () {
    this._email = null
    this._token = null
  }

  get token () {
    return this._token
  }

  get email () {
    return this._email
  }

  isLoggedIn () {
    return !!this._email || !!this._token
  }
}

MicroEvent.mixin(_LoginStore)
var LoginStore = new _LoginStore()

function _loginUser (email, jwt) {
  LoginStore._email = email
  LoginStore._jwt = jwt
}

AppDispatcher.register(function (payload) {
  switch (payload.type) {
    case ActionTypes.USER_LOGGED_IN:
      _loginUser(payload.email, payload.jwt)
      LoginStore.trigger(CHANGE_EVENT)
      break
  }
})
