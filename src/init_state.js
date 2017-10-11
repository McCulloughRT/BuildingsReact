import Immutable from 'immutable';

function hydrate(usePrevious = null) {
  if(!usePrevious){
    return {
      mapStyle: null,
      userInterface: Immutable.fromJS({
        activeButton: 'age',
        activeLayer: 'buildings',
        popup: null
      })
    };
  }
}

const InitialState = hydrate();
export default InitialState;
