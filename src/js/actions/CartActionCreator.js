import AppDispatcher from '../dispatchers/AppDispatcher';
import Constants from '../constants/AppConstants';
import request from 'superagent';

var CartActions = {
  addToCart(recipe){
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.ADD_TO_CART,
      data: recipe
    });
  },
  removeFromCart(id){
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.REMOVE_FROM_CART,
      data: id
    });
  },
  checkout(){

  }
};

export default CartActions;