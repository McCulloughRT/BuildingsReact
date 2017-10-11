import { combineReducers } from 'redux';
import Immutable from 'immutable';
import StylesheetReducer from './reducer_stylesheet';
import UserIntReducer from './reduce_userInt';

const rootReducer = combineReducers({
  mapStyle: StylesheetReducer,
  userInterface: UserIntReducer
});
console.log('reducers combined');
export default rootReducer;
