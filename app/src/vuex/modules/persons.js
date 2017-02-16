import * as types from '../mutation-types'
import Vue from 'vue';

const state = {
  list: {
    },
  properties: [],
  index: 0
}


const mutations = {
 [types.CREATE_PERSON] (state, person) {
   Vue.set(state.list, state.index ++, person);
 },
 [types.UPDATE_PERSON] (state, oldPerson, newPerson) {
   state.list[person.id] = value;
 },
 [types.DELETE_PERSON] (state, person) {
   if(!state.list[person.id]) return;
   Vue.delete(state.list, person.id)
 },
 [types.ADD_PROPERTY_PERSON](state, propName){
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
 [types.CHANGE_PROPERTY_PERSON](state, [propNameNew, propNameOld]){
   Object.keys(state.list).map((key) => {
        Vue.set(state.list[key], propNameNew, state.list[key][propNameOld]);
        Vue.delete(state.list[key], propNameOld);
        return state.list[key];
   });
   Vue.set(state, 'properties', Object.keys(state.list[0]));
 },
 [types.DELETE_PROPERTY_PERSON](state, propName){
   Vue.set(state, 'list', Object.keys(state.list).map((key) => {
     delete state.list[key][propName];
     return state.list[key];
   }));
   Vue.set(state, 'properties', Object.keys(state.list[0]));
 },
 [types.SET_PERSONS] (state, pers) {
   if(!pers) return;
   var persons = {};
   state.index = 0;
   pers.map((p)=>{
     persons[state.index ++] = p;
   })
   Vue.set(state, 'list', persons);
   Vue.set(state, 'properties', Object.keys(state.list[0]));
 }
}

export default {
  state,
  mutations
}
