import {Route, RouteHandler} from 'react-router';
import SearchResult from './SearchResult.jsx';
import React from 'react';
var routes = (
	<Route 
		path="/" 
		handler={RouteHandler}
	>
		
		<Route 
			path="/" 
			handler={SearchResult} 
		/>
		
		<Route 
			path="/:query/"
			handler={SearchResult} 
		/>

	</Route>
);

export default routes;