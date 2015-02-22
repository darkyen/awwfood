import React from 'react';
import SearchActions from './../actions/SearchActionCreator';
import {Route, RouteHandler, Link} from 'react-router';
import NavBar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import SmartSearch from './SmartSearch.jsx';

var Header = React.createClass({
  render (){
    return (<div className="lemonKnows">
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
                    <Button bsStyle="success" className="form-control">Checkout</Button>
                  </Col>
              </NavBar>
            </div>)
  }
});

export default Header;