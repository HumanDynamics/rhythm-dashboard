import MicroEvent from 'microevent'
import AppDispatcher from '../dispatcher/dispatcher'
import LoginConstants from '../constants/LoginConstants'
import { hashHistory } from 'react-router'

import feathers from 'feathers-client'
import io from 'socket.io-client'

var ActionTypes = LoginConstants.ActionTypes
var CHANGE_EVENT = 'change'

class _LoginStore {
  constructor () {
    this._token = null
    this._socket = null
    this._app = null
  }

  get token () {
    return this._token || localStorage.jwt
  }

  get app () {
    return this._app
  }

  isLoggedIn () {
    return !!this._token
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
  _initializeApp(jwt)
}

AppDispatcher.register(function (payload) {
  switch (payload.type) {
    case ActionTypes.USER_LOGGED_IN:
      localStorage.setItem('jwt', payload.jwt)
      _loginUser(payload.jwt)
      hashHistory.push('/')
      LoginStore.trigger(CHANGE_EVENT)
      break
  }
})

export default LoginStore
