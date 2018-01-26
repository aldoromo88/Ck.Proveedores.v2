import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex);

export default new Vuex.Store({
	//actions,
	//getters,
	state: {
		Lenguage: '',
		IsLoading: false
	},
	getters: {
		Lenguage: (state) => state.Lenguage,
		IsLoading: (state) => state.IsLoading
	},
	mutations: {
		'LENGUAGE_CHANGED' (state, lenguage) {
			state.Lenguage = lenguage;
		},
		'IS_LOADING_GHANGED' (state, isLoading) {
			state.IsLoading = isLoading;
		}
	}
});
