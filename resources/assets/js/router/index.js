import Vue from 'vue'
import VueRouter from 'vue-router'
import Welcome from '../components/welcome'
import Login from '../components/membership/login'

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
      }
    ]
});
export default router
