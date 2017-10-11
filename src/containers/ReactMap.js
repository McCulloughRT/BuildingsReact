/* global mapboxgl */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';

import { clickMap, setStyle } from '../actions/index';
import diffStyles from '../utilities/diff.js';

class ReactMap extends Component {
  componentDidMount(){
    // set map properties
    const { token, longitude, latitude, zoom, minZoom, styleID } = this.props;
    const mapConfig = {
      container: 'map',
      style: `mapbox://styles/${ styleID }`,
      center: [longitude, latitude],
      zoom: zoom,
    };
    if(this.props.pitch) mapConfig['pitch'] = this.props.pitch;
    if(this.props.bearing) mapConfig['bearing'] = this.props.bearing;

    mapboxgl.accessToken = token;
    this.map = new mapboxgl.Map(mapConfig);

    this.map.on('load', () => {
      // Get the map style and set it in the state tree
      const style = this.map.getStyle();
      this.props.setStyle(style);

      this.map.on('click', e => {
        const features = this.map.queryRenderedFeatures(e.point);
        // Send a specific feature to the action/reducer:
        const currentLayer = this.props.userInterface.get('activeLayer');
        const selectedFeature = features.filter(f => f.layer.id === currentLayer);
        this.props.clickMap(selectedFeature[0]);

        // Make a popup from stateful markup:
        if(this.props.showPopUp && this.props.userInterface.get('popup') != null) {
          new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(this.props.userInterface.get('popup'))
            .addTo(this.map);
        }
      });
    });
  }

  // Utilizes diffStyles to update the DOM map from a new Immutable stylesheet
  componentWillReceiveProps(nextProps) {
    if(this.props.mapStyle === null) return;

    const before = this.props.mapStyle;
    const after = nextProps.mapStyle;
    const map = this.map;

    if(!Immutable.is(before, after)) {
      const changes = diffStyles(before.toJS(), after.toJS());
      changes.forEach(change => {
        if(change.command == 'updateSource'){
          // This is a workaround patch for updateSource not being
          // low level enough for a generic apply command - dff.js has also
          // been patched.
          map.getSource(change.args[0]).setData(change.args[1].data);
        } else {
          console.log(change);
          map[change.command].apply(map, change.args);
        }
      });
    }
  }

  render(){
    return (
      <div id='map'></div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    clickMap: clickMap,
    setStyle: setStyle
  }, dispatch);
}
function mapStateToProps(state) {
  return {
    mapStyle: state.mapStyle,
    userInterface: state.userInterface
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ReactMap);
