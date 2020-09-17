/* eslint-disable no-undef */
import Vue from 'vue';
import jQuery from 'jquery';
import 'bootstrap';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueSweetalert2 from 'vue-sweetalert2';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import {
  ValidationObserver, ValidationProvider, configure, extend, localize,
} from 'vee-validate'; // 驗證套件
import { regex } from 'vee-validate/dist/rules';
import * as rules from 'vee-validate/dist/rules'; // 規則檔案（ex: email...）
import zhTW from 'vee-validate/dist/locale/zh_TW.json'; // 語系檔案
import currencyFilter from './filters/currency'; // 過濾器

import App from './App.vue';
import router from './router';

Vue.use(VueSweetalert2);
Vue.use(VueAxios, axios);
Vue.use(Loading);
Vue.component('Loading', Loading);
Vue.config.productionTip = false;

window.$ = jQuery;

Vue.filter('currency', currencyFilter);
// Vue.filter('currency', (n) => n.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));

// vee-validate
Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
}); // 所有驗證規則
configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
  },
});
localize('tw', zhTW);
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
extend('regex', regex);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
