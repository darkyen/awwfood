var AppDispatcher = require('../dispatchers/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/AppConstants');
var assign = require('object-assign');

// data storage
var _data = {
  items: [],
  price: 0
};

if( localStorage['cart'] ){
  _data = JSON.parse(localStorage.cart);
}

function calcPrice(){
  _data.price = _data.items.reduce(function(price, item){
    price += item.Price * item.Quantity;
    return price;
  }, 0);
}

function saveCart(){
  calcPrice();
  localStorage.cart = JSON.stringify(_data);
}

function addToCart(item){
  var exists = _data.items.filter( x => x.RecipeID === item.RecipeID )[0];
  if( exists ){
    exists.Quantity ++;
    return;
  }

  item.Quantity = 1;
  _data.items.push(item);
}

function removeFromCart(id){
  _data.items = _data.items.filter( x => x.RecipeID !== id );
}

function reset(){
  _data.items = [];
}

var CartStore = assign({}, EventEmitter.prototype, {

  // public methods used by Controller-View to operate on data
  getState () {
    return _data;
  },


  // Allow Controller-View to register itself with store
  addChangeListener (callback) {
    this.on(Constants.CHANGE_EVENT, callback);
  },
  removeChangeListener (callback) {
    this.removeListener(Constants.CHANGE_EVENT, callback);
  },
  // triggers change listener above, firing controller-view callback
  emitChange () {
    this.emit(Constants.CHANGE_EVENT);
  },


  // register store with dispatcher, allowing actions to flow through
  dispatcherIndex: AppDispatcher.register(function(payload) {
    
    var action = payload.action;
    var source = payload.source;

    switch(action.type) {
      case Constants.ActionTypes.ADD_TO_CART:
        addToCart(action.data);
        saveCart();
        CartStore.emitChange();
      break;

      case Constants.ActionTypes.REMOVE_FROM_CART:
        removeFromCart(action.data);
        saveCart();
        CartStore.emitChange();
      break;

      case Constants.ActionTypes.RESET_CART:
        reset();
        saveCart();
        CartStore.emitChange();
      break;
      // add more cases for other actionTypes...
    }
  })

});

module.exports = CartStore;
