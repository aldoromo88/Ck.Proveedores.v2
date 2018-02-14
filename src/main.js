// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
require('es6-promise').polyfill();
import Vue from 'vue';
import Vuetify from 'vuetify';
import store from '@/store';
import App from './App';
import router from './router';
import proxyHelpers from '@/helpers/proxy';
import '@/widgets';
import 'vuetify/dist/vuetify.css';


Vue.use(Vuetify, {
	theme: {
		primary: '#0072c6',
	  secondary: '#424242',
	  accent: '#82B1FF',
	  error: '#FF5252',
	  info: '#2196F3',
	  success: '#4CAF50',
	  warning: '#FFC107'
	}
});
Vue.use(proxyHelpers);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: {App}
});
