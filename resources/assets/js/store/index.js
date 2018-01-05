/*-------------------------------------------------------------------------
CREATED BY RAPHAEL KARANJA
---------------------------------------------------------------------------*/
import Vue from 'vue';
import Vuex from 'vuex';
import vuejsStorage from 'vuejs-storage'
import updateItemInArray from 'array-update-item'
import * as types from './mutation-types'

Vue.use(Vuex);
Vue.use(vuejsStorage);

const state = {
  storage: {
    storeItems:[],
  },

  basket: [],
  checkoutBasketList: [],

  error: false

}

const getters = {
storeItems:state =>{
  return state.storage.storeItems;
},

basketlist: state => {
  return state.basket

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
    if (state.storage.storeItems.splice(itm,1)) {
      return true;
    }else {
      return false;
    }
  },

  /*@----MUTATIONS FOR CAT--@*/
  [types.ADD_TO_BASKET](type, {id}){
    const checkoutitem = state.basket.find(item => item.id ===id);
    const items = state.storage.storeItems[id];

    if (!checkoutitem) {
      this.state.basket.push({
        id,
        basket_item_name: items.name,
        basket_item_quantity: 1
      })
    }else{
      if (items.quantity > 1) {
        checkoutitem.basket_item_quantity ++;
        this.state.error = false;
      }else {
        this.state.error = true;
      }
    }

  },

  /*@------MUTATIONS TO CHECKOUT BASKET ITEMS------@*/
  [types.CHECKOUT_BASKET_LIST](type, basketlist){
    var i;
    for(i = 0; i < basketlist.length; i++) {
      const basketItem = basketlist[i];
      const qtty = basketItem.basket_item_quantity;
      const bId = basketItem.id;
      const index = basketlist.indexOf(basketItem);
      state.storage.storeItems[bId].quantity -=qtty;

    }

    this.state.checkoutBasketList.push(basketlist);
    this.state.basket = [];

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
      },

      addToBasket({ commit }, itm){
        commit(types.ADD_TO_BASKET, {
          id: itm.id
    })
  },
  dispatchBasket({ commit }, basketlist){
    commit(types.CHECKOUT_BASKET_LIST, basketlist)
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
