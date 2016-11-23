import * as types from './mutation-types'

export const decrementMain = ({ commit }) => {
  commit(types.DECREMENT_MAIN_COUNTER)
}

export const incrementMain = ({ commit }) => {
  commit(types.INCREMENT_MAIN_COUNTER)
}

export const createPerson = ({ commit }, person) => {
  commit(types.CREATE_PERSON, person)
}
export const updatePerson = ({ commit }, oldPerson, newPerson) => {
  commit(types.UPDATE_PERSON, oldPerson, newPerson)
}
export const deletePerson = ({ commit }, person) => {
  commit(types.DELETE_PERSON, person)
}

export const setPersons =  ({ commit }, persons) => {
  commit(types.SET_PERSONS, persons)
}
export const addPropertyPerson =  ({ commit }, newProp) => {
  commit(types.ADD_PROPERTY_PERSON, newProp)
}
export const changePropertyPerson =  ({ commit }, [newProp, oldProp]) => {
  debugger;
  commit(types.CHANGE_PROPERTY_PERSON, [newProp, oldProp])
}
export const deletePropertyPerson =  ({ commit }, prop) => {
  commit(types.DELETE_PROPERTY_PERSON, prop)
}
