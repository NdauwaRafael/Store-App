import Vue from 'vue'
import VueRouter from 'vue-router'
import Welcome from '../components/welcome'
import Login from '../components/membership/login'
import Home from '../components/home/home'
import Dashboard from '../components/home/Dashboard'
import AddItem from '../components/items/AddItem.vue'
import ItemList from '../components/items/ItemList.vue'
import Store from '../components/home/test.vue'
Vue.use(VueRouter);

const router = new VueRouter({

    routes: [
      {
        path: '*',
        component: Welcome
      },
      {
        path: '/',
        component: Welcome
      },
      {
        path: '/login',
        component: Login
      },
      {
        path: '/home',
        component: Home,
          children: [
              {
                path: '/addItem',
                component: AddItem,
                name: 'addItem'
              },
              {
                path: '/itemList',
                component: ItemList,
                name: 'itemList'
              },
              {
                path: '/dashboard',
                component: Dashboard,
                name: 'Dashboard'
              },
              {
                  path: '/test',
                  component: Store
              }
          ]
      }
    ]
});
export default router
