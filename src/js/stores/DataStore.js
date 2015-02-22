var AppDispatcher = require('../dispatchers/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/AppConstants');
var assign = require('object-assign');

// data storage
var _data = [{}];
var _priceTable = {};

if( localStorage.prices ){
  _priceTable = JSON.parse(localStorage.prices);
}

function generatePriceAndSave(recipe){

  if( _priceTable[recipe.RecipeID] ){
    recipe.Price = _priceTable[recipe.RecipeID];
    return recipe;
  }

  recipe.Price = (~~(Math.random() * 100)) * 10;
  _priceTable[recipe.RecipeID] = recipe.price;
  return recipe;
}

function setData(data){
  data.Results = data.Results.map(generatePriceAndSave);
  _data = data;
  localStorage.prices = JSON.stringify(_priceTable);
}

function appendData(data){
  _data.Results = _data.Results.concat(data.Results.map(generatePriceAndSave));
  localStorage.prices = JSON.stringify(_priceTable);
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
