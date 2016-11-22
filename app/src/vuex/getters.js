export const mainCounter = state => state.counters.main
export const personsList = state => Object.keys(state.persons.list).map((key) => {
  state.persons.list[key].id = key;
  return state.persons.list[key];
})
export const personsProperties = state => state.persons.properties;
