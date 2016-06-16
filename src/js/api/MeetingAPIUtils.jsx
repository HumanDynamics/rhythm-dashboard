import MeetingActionCreators from '../actions/MeetingActionCreators'
import AppDispatcher from '../dispatcher/dispatcher'
import MeetingConstants from '../constants/MeetingConstants'
import LoginStore from '../stores/loginStore'
import _ from 'underscore'

var ActionTypes = MeetingConstants.ActionTypes

function updateMeetingActive (meeting, active) {
  var meetings = LoginStore.app.service('meetings')
  meetings.patch(meeting, {'active': active}, {},
                 function (error, data) {
                   if (!error && data) {
                     console.log('Patched meeting active successfully')
                   }
                 })
}

// get all meetings from server
function getAllMeetings () {
  var meetings = LoginStore.app.service('meetings')
  var turns = LoginStore.app.service('turns')
  meetings.find({}).then((foundMeetings) => {
    console.log('[utils] received meetings:', foundMeetings, MeetingActionCreators)
    MeetingActionCreators.receiveAllMeetings(foundMeetings)
    return foundMeetings
  }).then((meetings) => {
    console.log('[utils] getting turns..:')
    _.each(meetings, function (meeting) {
      turns.find({
        meeting: meeting._id
      }).then((turns) => {
        if (turns !== undefined && turns.length > 0) {
          console.log('[apiutils] latest turn', turns)
          MeetingActionCreators.updateTurns(_.max(turns, (t) => new Date(t.timestamp)),
                                            meeting._id)
        } else {
          MeetingActionCreators.updateTurns([], meeting._id)
        }
      }).catch((err) => {
        console.log('[utils] caught error:', err)
      })
    })
  })
}

function registerCreatedCallback () {
  var meetings = LoginStore.app.service('meetings')
  meetings.on('created', function (meeting) {
    console.log('[utils] new meeting created:', meeting)
    MeetingActionCreators.receiveNewMeeting(meeting)
  })
}

function registerChangedCallback () {
  var meetings = LoginStore.app.service('meetings')
  meetings.on('patched', function (meeting) {
    MeetingActionCreators.receiveChangedMeeting(meeting)
  })
}

// Register Dispatcher for API events
AppDispatcher.register(function (payload) {
  switch (payload.type) {
    case ActionTypes.UPDATE_MEETING_ACTIVE:
      updateMeetingActive(payload.meetingDBId, payload.active)
  }
})

module.exports = {
  getAllMeetings: getAllMeetings,
  registerCreatedCallback: registerCreatedCallback,
  registerChangedCallback: registerChangedCallback,
  updateMeetingActive: updateMeetingActive
}
