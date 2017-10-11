// import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import ReactMap from '../containers/ReactMap';
import Interface from '../containers/Interface';

const TOKEN = 'YOUR_MAPBOX_TOKEN';
const LONG = -122.66661759147235;
const LAT = 45.51886025215052;
const ZOOM = 14.26;
const STYLE_ID = 'USER_NAME/STYLE';

export default class App extends Component {

  render() {
    return (
      <div>
        <Interface />
        <ReactMap
          token= { TOKEN }
          longitude= { LONG }
          latitude= { LAT }
          zoom= { ZOOM }
          showPopUp= { true }
          styleID = { STYLE_ID }
        />
      </div>
    );
  }
}
