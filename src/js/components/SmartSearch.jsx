import React from 'react';
import Input from 'react-bootstrap/Input';

var SmartSearch = React.createClass({
  __timer: -1,
  __start: false,
  __emitOnChangeStart(){
    if( this.props.onChangeStart ){
      this.props.onChangeStart();
    }
    this.__start = true;;
  },

  __emitOnChange(){
    if( this.props.onChange ){
      this.props.onChange(this.refs.query.getValue());
    }
    this.__emitOnChangeEnd();
  },

  __emitOnChangeEnd(){
    if( this.props.onChangeEnd ){
      this.props.onChangeEnd(this.refs.query.getValue());
    }
    this.__start = false;
  },

  handleChange(){
    
    if( this.__start === false ){
      this.__emitOnChangeStart();
    }

    if( this.props.immediateUpdate ){
      return this.__emitOnChange(); 
    }
    
    clearTimeout(this.__timer);
    this.__timer = setTimeout(this.__emitOnChange, this.props.finishedDelay || 500);
  
  },

  render (){

    var brand = (
      <a isActive={true} href="/" className="navbar-brand">LemonKnows Pizza</a>
    );
    return (<div className="smart-search">
              <Input {...this.props} type="search" ref="query"  onChange={this.handleChange} />
            </div>)
  }

});


export default SmartSearch;