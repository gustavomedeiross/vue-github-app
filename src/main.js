import Vue from 'vue';
import App from './App.vue';
import router from './router';

import './config/font-awesome';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
}).$mount('#app');
