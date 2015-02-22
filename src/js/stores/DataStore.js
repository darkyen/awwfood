var AppDispatcher = require('../dispatchers/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/AppConstants');
var assign = require('object-assign');

// data storage
var _data = [{}];


function setData(data){
  _data = data;
}

function appendData(data){
  _data = _data.concat(data);
}

var DataStore = assign({}, EventEmitter.prototype, {
  // public method used to get only one
  getRecipeById(id) {
    return _data.Results[id].filter((x)=>x.RecipeID === id)[0];
  },

  // public methods used by Controller-View to operate on data
  getState() {
    return _data;
  },


  // Allow Controller-View to register itself with store
  addChangeListener: function(callback) {
    this.on(Constants.CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(Constants.CHANGE_EVENT, callback);
  },
  // triggers change listener above, firing controller-view callback
  emitChange: function() {
    this.emit(Constants.CHANGE_EVENT);
  },


  // register store with dispatcher, allowing actions to flow through
  dispatcherIndex: AppDispatcher.register(function(payload) {
    var action = payload.action;
    var source = payload.source;

    switch(action.type) {
      // This is a purely static store,
      // this is not going to do anything.
      case Constants.ActionTypes.SEARCH_RESULT_POPULATE:
        setData(action.data);
        DataStore.emitChange();
        break;
      case Constants.ActionTypes.SEARCH_RESULT_PAGINATE:
        appendData(action.data);
        DataStore.emitChange();
        break;
    }
  })

});

module.exports = DataStore;
