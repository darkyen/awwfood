import React from 'react';
import Router from 'react-router';
import routes from './components/routes';

Router.run(routes, function(Handler){
	React.render(<Handler />, document.getElementById('main'));
});
