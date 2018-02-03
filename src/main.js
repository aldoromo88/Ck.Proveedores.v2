// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuetify from 'vuetify';
import store from '@/store';
import App from './App';
import router from './router';
import proxyHelpers from '@/helpers/proxy';
import '@/widgets';
import 'vuetify/dist/vuetify.css';


Vue.use(Vuetify);
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
