import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Header from './Header.jsx';
import SearchStore from './../stores/DataStore';
import CartActions from './../actions/CartActionCreator';

var Recipe = React.createClass({
	
	addToCart(){
		CartActions.addToCart(this.props.data);
	},

	render(){
		var recipe = this.props.data;
		var chef = recipe.Poster;
		console.log(recipe);
		return (
			<div className="recipe-element">
				<div className="recipe-image" style={{
					backgroundImage: 'url("' + recipe.ImageURL + '")'
				}}>
				</div>
				<div className="recipe-details">
					<div className="chef-profile-pic">
						<img src={chef.ImageURL48 || 'http://images.bigoven.com/image/upload/t_recipe-48,d_avatar-default.png/avatar-default.png'} />
					</div>
					<div className="chef-text-details">
						<h2 className="dish-name">{recipe.Title}</h2>
						<h3 className="chef-name">{chef.UserName || 'AnonyMouse'}</h3>
					</div>
				</div>
				<div className="add-to-cart">
					<Button bsStyle="danger" onClick={this.addToCart} className="form-control">Add To Cart</Button>
				</div>
			</div>
		);	
	}
});

var SearchResult = React.createClass({
	getInitialState(){
		return {
			searchStore: SearchStore.getState()
		}
	},

	updateState(){
		this.setState({
			searchStore: SearchStore.getState()
		});
	},
	
	componentDidMount(){
		SearchStore.addChangeListener(this.updateState);
	},

	componentWillUnmount(){
		SearchStore.removeChangeListener(this.updateState);
	},

	render(){
		return (
			<div className="awe-food">
				<Header />
				<div className="results">
					{this.state.searchStore.Results?this.state.searchStore.Results.map((x)=>{
						return <Recipe key={x.RecipeID} data={x} />
					}):''}
				</div>
			</div>
		) 
	}
});

export default SearchResult;