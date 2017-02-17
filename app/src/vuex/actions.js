import * as types from './mutation-types'

export const createRow = ({ commit }, row) => {
  commit(types.CREATE_ROW, row)
}
export const updateRow = ({ commit }, oldRow, newRow) => {
  commit(types.UPDATE_ROW, oldRow, newRow)
}
export const deleteRow = ({ commit }, row) => {
  commit(types.DELETE_ROW, row)
}

export const setRows =  ({ commit }, rows) => {
  commit(types.SET_ROWS, rows)
}
export const addPropertyRow =  ({ commit }, newProp) => {
  commit(types.ADD_PROPERTY_ROW, newProp)
}
export const changePropertyRow =  ({ commit }, [newProp, oldProp]) => {
  debugger;
  commit(types.CHANGE_PROPERTY_ROW, [newProp, oldProp])
}
export const deletePropertyRow =  ({ commit }, prop) => {
  commit(types.DELETE_PROPERTY_ROW, prop)
}
