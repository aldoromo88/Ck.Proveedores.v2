import axios from 'axios';
import store from '@/store';
import JWTDecode from 'jwt-decode';

const LOCALSTORAGE_JWT_CODE = process.env.APP_CODE + '-jwt';

export default{
	isInitialized: false,
	getLastSession () {
		if (this.isInitialized) return Promise.resolve();


		this.isInitialized = true;
		const token = localStorage.getItem(LOCALSTORAGE_JWT_CODE);
		this.setToken(token);
		return this.getMenu();
	},

	authenticate (username, password) {
		store.commit('IS_LOADING_GHANGED', true);

		return axios.post('api/User/UserLogin', {username, password})
  			.then((c) => {
  				this.setToken(c.data);
  				return this.getMenu();
  			})
				.finally(() => {
					store.commit('IS_LOADING_GHANGED', false);
				});
	},

	getMenu () {
		store.commit('IS_LOADING_GHANGED', true);

		return axios.post('api/User/GetMenu')
			.then((c) => {
				store.commit('MENU_CHANGED', c.data);
			})
			.catch((e) => {
				this.clearToken();
			})
			.finally(() => {
				store.commit('IS_LOADING_GHANGED', false);
			});
	},

	onAuthentication (token) {
		this.setToken(token);
	},

	setToken (token) {
		if (!token) return;
		axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
		store.commit('USER_CHANGED', JWTDecode(token));
		localStorage.setItem(LOCALSTORAGE_JWT_CODE, token);
	},

	clearToken () {
		axios.defaults.headers.common['Authorization'] = null;
		store.commit('USER_CHANGED', null);
		store.commit('MENU_CHANGED', []);
		localStorage.removeItem(LOCALSTORAGE_JWT_CODE);
	}


};
