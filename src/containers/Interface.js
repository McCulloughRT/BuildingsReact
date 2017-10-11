import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';

import { changeViz } from '../actions/index';

class Interface extends Component {
  constructor(props) {
    super(props);

    this.buttons = [
      { value: 'age', contents: 'Building Age' },
      { value: 'sqft', contents: 'Building Sqft' },
      { value: 'units', contents: 'Housing Units' },
      { value: 'use', contents: 'Primary Use' }
    ];
  }

  // Makes a button that triggers the CHANGE_VIZ action
  // with a provided value.
  _makeButton(activeState, btnData) {
    const { value, contents } = btnData;
    const className = activeState === value ? 'btn btn-default active' : 'btn btn-default';

    return (
      <button
        value={ value }
        type='button'
        className={ className }
        onClick={ this.props.changeViz }
        key={ value }>
        { contents }
      </button>
    );
  }

  render() {
    const { activeButton } = this.props;
    // make all the buttons:
    const buttons = this.buttons.map(btn => this._makeButton(activeButton, btn));

    return (
      <div id='ui' style={ style.ui }>
        <div style={ style.header }>Select a metric to view:</div>
        <div className="btn-group-vertical" role="group" aria-label="..." style={{ width: '100%' }}>
          { buttons }
        </div>
        {/* static color legend: */}
        <div className='container' style={ style.legendBox }>
          <div style={ style.legendGradient }></div>
          <div className='row'>
            <div id='leftTxt' className='col-md-6' style={{ text: 'align-left'}}>Low</div>
            <div id='rightTxt' className='col-md-6' style={{ text: 'align-right'}}>High</div>
          </div>
        </div>
        <div style={ style.reminder }>Click on a building for more information!</div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    changeViz: changeViz
  },dispatch);
}
function mapStateToProps(state) {
  return{
    activeButton: state.userInterface.get('activeButton')
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Interface);

const style = {
  ui: {
    zIndex: 2,
    position: 'absolute',
    top: '20px',
    right: '20px',
    borderRadius: '7px',
    width: '230px',
    background: 'white',
    padding: '15px'
  },
  legendBox: {
    zIndex: 2,
    background: 'rgba(200,200,200,.55)',
    height: '55px',
    width: '100%',
    textAlign: 'center',
    padding: '15px',
    borderRadius: '5px',
    fontSize: 'x-small',
    marginTop: '30px'
  },
  legendGradient: {
    height: '10px',
    width: '100%',
    background: 'linear-gradient(to right, #f7fbff, #084594)',
    borderRadius: '10px',
    marginBottom: '5px'
  },
  header: {
    marginBottom: '20px',
    fontWeight: 'bold'
  },
  reminder: {
    fontSize: 'x-small',
    marginTop: '10px',
    marginLeft: '10px'
  }
};
