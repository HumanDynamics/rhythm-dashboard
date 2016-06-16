import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { Router, Route, browserHistory } from 'react-router'
import {Nav} from './components/components'
import Login from './components/login'
import MeetingTable from './components/meetingList'
import MeetingSummary from './components/meeting/meetingSummary'
import LoginStore from './stores/loginStore'

const App = React.createClass({
  render () {
    return (
      <div>
        <Nav/>
        {this.props.children || <div>No component</div>}
      </div>
    )
  }
})

// requires authentication, then moves them back to where they were
// trying to go.
function requireAuth (nextState, replace) {
  if (!LoginStore.isLoggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

const app = {
  initialize: function () {
    console.log('Trying to render main...')
    injectTapEventPlugin()
    document.addEventListener('deviceready', this.onDeviceReady, false)
    document.addEventListener('DOMContentLoaded', this.onDeviceReady, false)
  },

  onDeviceReady: function () {
    console.log('Device ready, will try to render main !')
    const mountNode = document.getElementById('reactAppContainer')
    ReactDOM.render(
      <Router history={browserHistory}>
        <Route path='/' component={App}>
          <Route path='login' component={Login}/>
          <Route path='meetings' component={MeetingTable} onEnter={requireAuth}/>
          <Route path='meeting/:meetingId' component={MeetingSummary} onEnter={requireAuth}/>
        </Route>
      </Router>,
      mountNode
    )
  }
}

app.initialize()
