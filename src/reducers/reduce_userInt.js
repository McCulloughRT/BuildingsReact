import Immutable from 'immutable';
import popupCreator from '../utilities/popup';

export default function UserIntReducer(userIntState = null, action) {
  switch(action.type){
    case 'CHANGE_VIZ': {
      return userIntState.set('activeButton', action.payload);
    }

    case 'CLICK_MAP': {
      const html = popupCreator(action.payload);
      return userIntState.set('popup', html);
    }
    default: return userIntState;
  }

  return userIntState;
}
