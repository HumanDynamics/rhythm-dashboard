import LoginActions from '../actions/LoginActionCreators'
import request from 'request-promise'

class AuthService {
  login (email, password) {
    return request({
      url: process.env.RHYTHM_SERVER_URL + '/auth/local',
      method: 'POST',
      headers: {
        'cache-control': 'no-cache',
        'content-type': 'application/json'
      },
      crossOrigin: true,
      body: {
        email: email,
        password: password
      },
      json: true
    }).then(function (body) {
      let jwt = body.token
      LoginActions.loginUser(jwt)
    })
  }
}

export default new AuthService()
