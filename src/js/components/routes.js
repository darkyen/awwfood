import {Route, RouteHandler} from 'react-router';
import SearchResult from './SearchResult.jsx';
import Cart from './Cart.jsx';
import React from 'react';
var routes = (
	<Route 
		path="/" 
		handler={RouteHandler}
	>
		// Change this with Index.jsx
		<Route 
			path="/" 
			handler={SearchResult} />

		<Route 
			path="/:query/"
			handler={SearchResult} />

		<Route
			path="cart"
			name="cart"
			handler={Cart} />
	</Route>
);

export default routes;