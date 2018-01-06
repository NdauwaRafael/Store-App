import store from '../../index'
import * as types from '../../mutation-types'
const state = {
    storage: {
        loggedUser: {
            email: '',
            name: '',
            token: '',
            id: ''
            },
    },
    users: [
        {
            email: 'rkaranja@cytonn.com',
            password: 'password',
            name: 'Raphael Karanja'
        },
        {
            email: 'jdoe@cytonn.com',
            password: 'password',
            name: 'John Doe'
        }
        ],
    userLoggedin: false,
    loginError: false
}

const getters = {
    userLoggedin: state => {
        return state.userLoggedin;
    },
    loggedUser: state => {
        return state.storage.loggedUser
    },
    loginError: state => {
        return state.loginError
    }
}

const mutations = {
    [types.LOGIN_USER](types, userDetails){
        const email = userDetails.email;
        const password = userDetails.password;
        const userDirectory = state.users;
        var i;
        for (i=0; i<=userDirectory; i++){
            if(email === userDirectory[i].email && password=== userDirectory[i].password){
                state.storage.loggedUser.email = email;
                state.storage.loggedUser.name = userDirectory[i].name;
                state.storage.loggedUser.token = 'hashedvalue'+userDirectory[i].email + i;

                state.userLoggedin = true;
            }else {
                state.loginError  = true
            }
        }
    }
}

const actions = {
    login({commit}, user){
        commit('LOGIN_USER', user)
    }

}


export default {
    state,
    getters,
    actions,
    mutations
}