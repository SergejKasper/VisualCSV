import * as types from '../mutation-types'
import Vue from 'vue';

const state = {
  list: {
    },
  properties: [],
  index: 0
}


const mutations = {
  [types.CREATE_ROW] (state, row) {
    Vue.set(state.list, state.index ++, row);
  },
 [types.DELETE_ROW] (state, row) {
   if(!state.list[row.id]) return;
   Vue.delete(state.list, row.id)
 },
 [types.ADD_PROPERTY_ROW](state, propName){
   if(!propName) return;
   if(state.properties.indexOf(propName) !== -1){
     alert("Die Spalte " + propName + "gibt es schon.")
     return;
   }
   Vue.set(state, 'list', Object.keys(state.list).map((key) => {
        state.list[key][propName] = "";
        return state.list[key];
   }));
   Vue.set(state, 'properties', Object.keys(state.list[0]));
 },
 [types.CHANGE_PROPERTY_ROW](state, [propNameNew, propNameOld]){
   Object.keys(state.list).map((key) => {
        Vue.set(state.list[key], propNameNew, state.list[key][propNameOld]);
        Vue.delete(state.list[key], propNameOld);
        return state.list[key];
   });
   Vue.set(state, 'properties', Object.keys(state.list[0]));
 },
 [types.DELETE_PROPERTY_ROW](state, propName){
   Vue.set(state, 'list', Object.keys(state.list).map((key) => {
     delete state.list[key][propName];
     return state.list[key];
   }));
   Vue.set(state, 'properties', Object.keys(state.list[0]));
 },
 [types.SET_ROWS] (state, pers) {
   if(!pers) return;
   var rows = {};
   state.index = 0;
   pers.map((p)=>{
     rows[state.index ++] = p;
   })
   Vue.set(state, 'list', rows);
   Vue.set(state, 'properties', Object.keys(state.list[0]));
 }
}

export default {
  state,
  mutations
}
