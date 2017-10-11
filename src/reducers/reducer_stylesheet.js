import Immutable from 'immutable';
import { buildingData } from '../data/buildingData';

export default function StylesheetReducer(styleState = null, action) {
  if(styleState === null && action.type !== 'SET_STYLE') return styleState;
  switch(action.type){
    case 'SET_STYLE': {
      return Immutable.fromJS(action.payload);
    }

    case 'CHANGE_VIZ': {
      const LAYER_ID = 'buildings';
      const { minAge, maxAge, minUnits, maxUnits, minSqft, maxSqft } = buildingData;
      const { categoryStops, lightBlue, darkBlue } = buildingData;
      const layerIdx = styleState.get('layers').findIndex(layer => layer.get('id') === LAYER_ID);
      let paint = {}; // <= not a constant, dont use elsewhere in this scope

      switch(action.payload) {
        case 'age':
          paint.property = 'YEAR_BUILT';
          paint.type = 'exponential';
          paint.stops = [[minAge,lightBlue],[maxAge,darkBlue]]
          break;
        case 'sqft':
          paint.property = 'BLDG_SQFT';
          paint.type = 'exponential';
          paint.stops = [[minSqft,lightBlue],[maxSqft,darkBlue]]
          break;
        case 'units':
          paint.property = 'UNITS_RES';
          paint.type = 'exponential';
          paint.stops = [[minUnits,lightBlue],[maxUnits,darkBlue]]
          break;
        case 'use':
          paint.property = 'BLDG_USE';
          paint.type = 'categorical';
          paint.stops = categoryStops;
          break;
        default:
          paint = darkBlue;
      }

      const newStyle = styleState.updateIn(['layers', layerIdx, 'paint'], property => {
        return property.set('fill-extrusion-color', paint);
      });
      return newStyle
    }

    default: return styleState;
  }
}
