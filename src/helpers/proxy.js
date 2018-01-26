import axios from 'axios';

axios.defaults.baseURL = process.env.API_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';


export default {
	install (Vue, options) {
		Vue.prototype.$proxy = function (path, payload) {
			return new Promise((resolve, reject) => {
				this.$store.commit('IS_LOADING_GHANGED', true);
				return axios.post(path, payload)
					.then((d) => {
						resolve(d.data);
					})
					.catch((e) => {
						reject(e);
					})
					.finally(() => {
						this.$store.commit('IS_LOADING_GHANGED', false);
					});
			});
		};
		Vue.prototype.$goTo = function (route) {
			if (typeof route === 'string') this.$router.push(route);
			else throw 'Route is not a string';
		};
	}
};
