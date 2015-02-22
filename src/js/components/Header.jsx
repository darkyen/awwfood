import React from 'react';
import SearchActions from './../actions/SearchActionCreator';
import {Route, RouteHandler, Link} from 'react-router';
import NavBar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import SmartSearch from './SmartSearch.jsx';
import CartStore from './../stores/CartStore.js';
import DataStore from './../stores/DataStore.js';
import router from './routes';

var Header = React.createClass({
  
  getInitialState(){

    if(CartStore === DataStore){
      debugger;
    }
    var cartStore = CartStore.getState();
    var dataStore = DataStore.getState();
    return {
      cartStore: cartStore
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
  
  render (){
    return (<div className="header-component">
              <NavBar fixedTop={true}>
                  <Col
                    className="padd-top-5" 
                    xs={10}
                    sm={10}
                  >
                    <Row>
                      <SmartSearch
                        placeholder="Search awesome food around you" 
                        onChangeStart={SearchActions.startTyping}
                        onChangeEnd={SearchActions.query}
                      />
                    </Row>
                  </Col>
                  <Col
                    className="padd-top-5 no-right-padding"
                    xs={2}
                  > 
                    <Link to="cart">
                      <Button onClick={this.openCart} className="form-control">Cart : Rs{this.state.cartStore.price}</Button>
                    </Link>
                  </Col>
              </NavBar>
            </div>)
  }
});

export default Header;