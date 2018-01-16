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
    users: [
        {
            email: 'rkaranja@cytonn.com',
            password: 'password',
            name: 'Raphael Karanja',
            role: 'admin'
        },
        {
            email: 'jdoe@cytonn.com',
            password: 'password',
            name: 'John Doe',
            role: 'admin'
        }
    ],
    storeManagers: [

    ],
    offices: [
        {
            officeName: 'Fedha Plaza',
            officeId: '1'
        },
        {
            officeName: 'Chancery',
            officeId: '2'
        },
        {
            officeName: 'Alma',
            officeId: '3'
        },
        {
            officeName: 'Liason',
            officeId: '4'
        }
    ],

  error: false,
  loggedUser: {},
  loggedManager: {},
  loginError: false,
  userLoggedin: false,
  logoutMsg:false,
  managerAddedError: false,
  managerAddedSuccess: false,
  userCategory: ''
}

const getters = {
    storeItems:state =>{
      return state.storage.storeItems;
    },
    basketlist: state => {
      return state.basket
    },
    userLoggedin: state => {
        return state.userLoggedin;
    },
    loggedUser: state => {
        return state.loggedUser
    },
    loggedManager: state => {
        return state.loggedManager
    },
    loginError: state => {
        return state.loginError
    },
    logoutMsg: state =>{
      return state.logoutMsg
    },
    offices: state => {
       return state.offices;
    },
    storeManagers: state => {
        return state.storeManagers
    },
    managerAddedSuccess: state => {
        return state.managerAddedSuccess
    },
    managerAddedError: state => {
        return state.managerAddedError
    },
    userCategory: state => {
        return state.userCategory
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
      if (items.quantity > checkoutitem.basket_item_quantity) {
        checkoutitem.basket_item_quantity ++;
        this.state.error = false;
      }else {
        this.state.error = true;
        // this.$message.error('Opps!! That was not supposed to happen');
        console.log('error');
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

  },

  [types.CLEAR_BASKET_LIST](type, basketlist){
    this.state.basket = [];
  },

    [types.LOGIN_USER](types, userDetails){
        const email = userDetails.email;
        const password = userDetails.password;
        const userDirectory = state.users;

        // const LogedUser = userDirectory.filter(user => user.email == email && user.password == password )
        const LogedUser = userDirectory.find(function (LogedUser) { return LogedUser.email == email && LogedUser.password == password });
        const LoggedManager = state.storeManagers.find(function (LoggedManager) { return LoggedManager.managerEmail == userDetails.email && LoggedManager.managerPassword == userDetails.password  });
        console.log(userDetails)
        if(LogedUser){
            state.loggedUser.email = email;
            state.loggedUser.name = LogedUser.name;
            state.loggedUser.token = 'hashedvalue'+LogedUser.email ;
            state.userLoggedin = true;
            state.userCategory = 'admin'
        }else if(LoggedManager){
            state.loggedManager.managerEmail = userDetails.email;
            state.loggedManager.managerName = LoggedManager.managerName;
            state.userLoggedin = true;
            state.userCategory = 'manager'
        }else{
            state.loggedUser = {};
            state.loggedManager = {};
            state.userLoggedin = false;
            state.loginError = true;
        }

    },
    [types.LOGOUT_USER](types, logedUser){
        const logedIn = state.loggedUser
        if (logedIn){
            state.loggedUser = {};
            state.userLoggedin = false;
            state.logoutMsg = true;
        }
    },

    /*@==============================
        MANAGER
    ====================================@*/
    [types.ADD_MANAGER](types, manager){
        // this.state.storeManagers.push(manager);
        const mngerAvailable = state.storeManagers.find(mng => mng.managerEmail ===manager.managerEmail);
        if (!mngerAvailable){
            this.state.storeManagers.push(manager);
            this.state.managerAddedSuccess = true;
            this.state.managerAddedError = false;
        }else{
            this.state.managerAddedError = true;
            this.state.managerAddedSuccess = false;
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
      },
      addToBasket({ commit }, itm){
        commit(types.ADD_TO_BASKET, {
          id: itm.id
        })
        },
      dispatchBasket({ commit }, basketlist){
        commit(types.CHECKOUT_BASKET_LIST, basketlist)
      },

      clearBasket({ commit }, basketlist){
        commit(types.CLEAR_BASKET_LIST, basketlist)
      },
      login({commit}, user){
          commit('LOGIN_USER', user)
      },

      logout({commit}, user){
          commit('LOGOUT_USER', user)
      },

    addManager({commit}, manager){
          commit('ADD_MANAGER', manager)
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
