var keyMirror = require('react/lib/keyMirror');

module.exports = {

  CHANGE_EVENT: 'change',

  ActionTypes: keyMirror({
  	SEARCH_STARTED_TYPING: null,
  	SEARCH_RESULT_POPULATE: null,
  	SEARCH_REQUEST_FAILED: null,
  	SEARCH_RESULT_PAGINATE: null,
  	SEARCH_STARTED: null
  }),

  ActionSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  })

};
