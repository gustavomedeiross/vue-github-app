import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from './pages/Dashboard.vue';
import Detail from './pages/Detail.vue';

Vue.use(VueRouter);

const routes = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Dashboard,
    },
    {
      path: '/repository/:repository',
      component: Detail,
    },
  ],
});

export default routes;
