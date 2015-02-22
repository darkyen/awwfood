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
		var chef = recipe.Poster;
		console.log(recipe);
		return (
			<div className="cart-element">
				<div className="item-image">
					<img src={recipe.ImageURL120} />
				</div>
				<div className="item-details">
					<div className="chef-text-details">
						<h2 className="item-name">{recipe.Title}</h2>
						<h3 className="item-category">{recipe.Category}</h3>
						<Button onClick={this.removeFromCart}>Remove</Button>
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
					{this.state.cartStore.items.map((x)=>{
						return <Item key={x.RecipeID} data={x} />
					})}
				</div>
			</div>
		) 
	}
});

export default Cart;