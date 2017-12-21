import Vue from 'vue'
import VueRouter from 'vue-router'
import Welcome from '../components/welcome'
import Login from '../components/membership/login'
import Home from '../components/home/home'

Vue.use(VueRouter);

const router = new VueRouter({

    routes: [
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
        component: Home
      }
    ]
});
export default router
