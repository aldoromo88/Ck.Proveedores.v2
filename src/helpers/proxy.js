import axios from 'axios';

axios.defaults.baseURL = process.env.API_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';

export default {
	install (Vue, options) {
		Vue.prototype.$post = function (path, payload) {
			this.$store.commit('IS_LOADING_GHANGED', true);
			return new Promise((resolve, reject) => {
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
		Vue.prototype.$downloadFile = function (path) {
			this.$store.commit('IS_LOADING_GHANGED', true);
			return new Promise((resolve, reject) => {
				return axios({
					url: path,
					method: 'GET',
					responseType: 'blob' // important
				})
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
		},
		Vue.prototype.$get = function (path) {
			this.$store.commit('IS_LOADING_GHANGED', true);
			return new Promise((resolve, reject) => {
				return axios.get(path)
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
