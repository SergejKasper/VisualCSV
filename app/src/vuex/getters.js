export const rowsList = state => Object.keys(state.rows.list).map((key) => {
  state.rows.list[key].id = key;
  return state.rows.list[key];
})
export const rowsProperties = state => state.rows.properties;
