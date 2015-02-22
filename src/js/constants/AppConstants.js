var keyMirror = require('react/lib/keyMirror');

module.exports = {

  CHANGE_EVENT: 'change',

  ActionTypes: keyMirror({
    ADD_TO_CART: null,
    REMOVE_FROM_CART: null,
    CHECKOUT: null
  }),

  ActionSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  })

};
