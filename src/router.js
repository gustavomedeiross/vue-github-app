import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from './pages/Dashboard.vue';

Vue.use(VueRouter);

const routes = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Dashboard,
    },
  ],
});

export default routes;
