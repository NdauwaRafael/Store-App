/*-------------------------------------------------------------------------
CREATED BY RAPHAEL KARANJA
---------------------------------------------------------------------------*/
import Vue from 'vue';
import Vuex from 'vuex';
import vuejsStorage from 'vuejs-storage'

Vue.use(Vuex);
Vue.use(vuejsStorage);

const state = {
  storeItems:[],

}

const getters = {
storeItems:state =>{
  return state.storeItems;
}
}


const mutations = {
  /*------registering Items to local storage-----*/
  ADD_ITEM(state, itms){
    state.storeItems.push(itms);
  },
  EDIT_ITEM(state, itm){

  },

  REMOVE_TODO(state, itm){

  }

  }

const actions = {
      getItem({commit}, itm){
        commit('GET_ITEM', itm)
      },
      addItem({commit}, itms){
        commit('ADD_ITEM', itms)
      },
      editTodo({commit}, itm){
        commit('EDIT_ITEM', itm)
      },
      removeTodo({commit}, todo){
        commit('REMOVE_ITEM', itm)
      }
}


const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations,

  plugins: [
  vuejsStorage({ namespace: 'store-items' })
]
});

export default store;
