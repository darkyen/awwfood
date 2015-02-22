import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Header from './Header.jsx';
import CartStore from './../stores/CartStore';
import CartActions from './../actions/CartActionCreator';

var Item = React.createClass({

	removeFromCart(){
		CartActions.removeFromCart(this.props.data.RecipeID);
	},

	render(){
		var recipe = this.props.data;
		return (
			<div className="cart-element">
				<div className="item-image">
					<img src={recipe.ImageURL120} />
				</div>
				<Button className="remove-button"
						onClick={this.removeFromCart}>X</Button>
				<div className="item-details">
					<div className="chef-text-details">
						<h2 className="item-name">{recipe.Title}</h2>
						<h3 className="item-category">Rs {recipe.Price} x {recipe.Quantity} = Rs {recipe.Price * recipe.Quantity}</h3>
					</div>
				</div>
			</div>
		);	
	}
});

var Cart = React.createClass({
	getInitialState(){
		return {
			cartStore: CartStore.getState()
		}
	},

	updateState(){
		this.setState({
			cartStore: CartStore.getState()
		});
	},
	
	componentDidMount(){
		CartStore.addChangeListener(this.updateState);
	},

	componentWillUnmount(){
		CartStore.removeChangeListener(this.updateState);
	},

	render(){
		return (
			<div className="awe-food">
				<div className="cart">
					<div className="dishes">
						{this.state.cartStore.items.map((x)=>{
							return <Item key={x.RecipeID} data={x} />
						})}
					</div>
					<hr />
					<div className="payment">
						<div className="form-group">
							<label>Pay via:</label>
							<select className="form-control">
								<option selected={true}>Cash</option>
								<option>Credit Cart</option>
								<option>Debit Card</option>
								<option>Net Banking</option>
								<option>Wallet</option>
							</select>
						</div>
						<div className="form-group">
							<Button onClick={CartActions.checkout} bsStyle="success" className="form-control">Pay Rs{this.state.cartStore.price}</Button>
						</div>
					</div>
				</div>
			</div>
		) 
	}
});

export default Cart;