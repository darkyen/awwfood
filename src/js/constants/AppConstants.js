var keyMirror = require('react/lib/keyMirror');

var n = null;

module.exports = {

  CHANGE_EVENT: 'change',

  ActionTypes: keyMirror({
  	SEARCH_STARTED_TYPING: n,
  	SEARCH_RESULT_POPULATE: n,
  	SEARCH_REQUEST_FAILED: n,
  	SEARCH_RESULT_PAGINATE: n,
  	SEARCH_STARTED: n,
  	ADD_TO_CART: n,
  	REMOVE_FROM_CART: n,
  	RESET_CART: n
  }),

  ActionSources: keyMirror({
    SERVER_ACTION: n,
    VIEW_ACTION: n
  })

};
