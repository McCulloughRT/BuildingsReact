export default function popupCreator(feature) {
  if(!feature) return null;

  const { AVG_HEIGHT, BLDG_SQFT, BLDG_USE, BLDG_TYPE } = feature.properties;
  const { NUM_STORY, UNITS_RES, YEAR_BUILT } = feature.properties;
  const html = `
    <div>
      Height: ${ AVG_HEIGHT } m<br />
      Area: ${ BLDG_SQFT } sf<br />
      Use: ${ BLDG_USE } <br />
      Type: ${ BLDG_TYPE } <br />
      Floors: ${ NUM_STORY } <br />
      Units: ${ UNITS_RES } <br />
      Year: ${ YEAR_BUILT } <br />
    </div>
  `;
  return html;
}
