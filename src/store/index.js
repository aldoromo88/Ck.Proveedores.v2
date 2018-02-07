import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	//actions,
	//getters,
	state: {
		Lenguage: '',
		IsLoading: false,
		User: null,
		Menu: [],
		Title: ''
	},
	getters: {
		Lenguage: (state) => state.Lenguage,
		IsLoading: (state) => state.IsLoading,
		Menu: (state) => state.Menu,
		User: (state) => state.User,
		Title: (state) => state.Title
	},
	mutations: {
		'LENGUAGE_CHANGED' (state, lenguage) {
			state.Lenguage = lenguage;
		},
		'IS_LOADING_GHANGED' (state, isLoading) {
			state.IsLoading = isLoading;
		},
		'MENU_CHANGED' (state, menu) {
			state.Menu = menu;
		},
		'USER_CHANGED' (state, user) {
			state.User = user;
		},
		'CHANGE_TITLE' (state, title) {
			state.Title = title;
		}
	}
});
