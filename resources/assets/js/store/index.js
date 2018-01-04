/*-------------------------------------------------------------------------
CREATED BY RAPHAEL KARANJA
---------------------------------------------------------------------------*/
import Vue from 'vue';
import Vuex from 'vuex';
import vuejsStorage from 'vuejs-storage'
import updateItemInArray from 'array-update-item'

Vue.use(Vuex);
Vue.use(vuejsStorage);

const state = {
  storage: {
    storeItems:[],
  }

}

const getters = {
storeItems:state =>{
  return state.storage.storeItems;
}
}


const mutations = {
  /*------registering Items to local storage-----*/
  ADD_ITEM(state, itms){

      state.storage.storeItems.push(itms);

  },
  EDIT_ITEM(state, itm){
    var id = itm.id;

    if (delete itm.id) {
      state.storage.storeItems[id] = itm
    }

  },

  REMOVE_ITEM(state, itm){
    console.log(itm);
    if (state.storage.storeItems.splice(itms,1)) {
      return true;
    }else {
      return false;
    }
  }

  }

const actions = {
      getItem({commit}, itm){
        commit('GET_ITEM', itm)
      },
      addItem({commit}, itms){
        commit('ADD_ITEM', itms)
      },
      editItem({commit}, itm, index){
        commit('EDIT_ITEM', itm, index)
      },
      removeItem({commit}, itm){
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
