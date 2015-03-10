import AppDispatcher from '../dispatchers/AppDispatcher';
import Constants from '../constants/AppConstants';
import request from 'superagent';
import cartStore from './../stores/CartStore';

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
  checkout(phoneNumber){
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.RESET_CART
    });
    var money = cartStore.getState().price;
    
    request.post('http://batuapay.azurewebsites.net/',{
      phoneNumber: phoneNumber,
      money: money
    }).then((x)=>{
      window.top.location = window.top.location.toString().replace('cart', '');
    });
  }
};

export default CartActions;
