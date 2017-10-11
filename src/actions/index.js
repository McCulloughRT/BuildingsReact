export function clickMap(feature) {
  return {
    type: 'CLICK_MAP',
    payload: feature
  }
}

export function setStyle(style) {
  return {
    type: 'SET_STYLE',
    payload: style
  }
}

export function changeViz(event) {
  return {
    type: 'CHANGE_VIZ',
    payload: event.target.value
  }
}
