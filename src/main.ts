import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import './assets/scripts/custom';
import vuetify from './plugins/vuetify';
import VueSweetalert2 from 'vue-sweetalert2';
import { mask } from 'vue-the-mask';
import Vuex from 'vuex';

const options = {
  confirmButtonColor: 'primary',
  cancelButtonColor: 'secondary',
};

Vue.config.productionTip = false;
Vue.use(VueSweetalert2, options);
Vue.use(Vuex);
Vue.directive('mask', mask);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
