import { hashHistory } from 'react-router'
import MicroEvent from 'microevent'
import jwtDecode from 'jwt-decode'
import feathers from 'feathers-client'
import io from 'socket.io-client'

import AppDispatcher from '../dispatcher/dispatcher'
import LoginConstants from '../constants/LoginConstants'

var ActionTypes = LoginConstants.ActionTypes
var CHANGE_EVENT = 'change'

class _LoginStore {
  constructor () {
    this._token = null
    this._socket = null
    this._app = null
    this._user = null
  }

  get token () {
    console.log('getting token:', localStorage.jwt, this._token)
    if (this._token == null) {
      return localStorage.jwt
    } else {
      return this._token
    }
  }

  get app () {
    return this._app
  }

  get user () {
    return this._user
  }

  isLoggedIn () {
    return this.token != null
  }
}

MicroEvent.mixin(_LoginStore)
var LoginStore = new _LoginStore()

function _initializeApp (jwt) {
  LoginStore._socket = io(process.env.RHYTHM_SERVER_URL, {
    'transports': [
      'websocket',
      'flashsocket',
      'htmlfile',
      'xhr-polling',
      'jsonp-polling'
    ]
  })

  LoginStore._app = feathers()
    .configure(feathers.socketio(LoginStore._socket))
    .configure(feathers.hooks())
    .configure(feathers.authentication())
  LoginStore._app.authenticate({
    type: 'token',
    token: jwt
  })
}

function _loginUser (jwt) {
  LoginStore._token = jwt
//  LoginStore._user = jwtDecode(jwt)
  _initializeApp(jwt)
}

AppDispatcher.register(function (payload) {
  switch (payload.type) {
    case ActionTypes.USER_LOGGED_IN:
      _loginUser(payload.jwt)
      hashHistory.push('/')
      LoginStore.trigger(CHANGE_EVENT)
      break
    case ActionTypes.LOGOUT_USER:
      LoginStore._token = null
      LoginStore._app = null
//      LoginStore._user = null
      LoginStore.trigger(CHANGE_EVENT)
      break
  }
})

export default LoginStore
