import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';
import auth from '@/services/auth';

const Login = (resolve) => require(['@/components/Login'], resolve);
const Publicaciones = (resolve) => require(['@/components/Publicaciones'], resolve);
const CapturaEmbarque = (resolve) => require(['@/components/CapturaEmbarque'], resolve);
const ImpresionEmbarque = (resolve) => require(['@/components/ImpresionEmbarque'], resolve);
const PasswordManagement = (resolve) => require(['@/components/PasswordManagement'], resolve);

Vue.use(Router);

var authCheck = (to, from, next) => {

	auth.getLastSession().then((c) => {
		const user = store.getters.User;
		const menu = store.getters.Menu;

		if (!to.meta.isPrivate) { //Public page, just navigate to it
			next();
			return;
		}

		if (!user) { //No user, go to login
			next({path: '/login', query: {redirect: to.fullPath}});
			return;
		}

		if (to.meta.types.indexOf(user.Type) === -1) { //Invalid user type, cancel navigation
			next(false);
			return;
		}

		next();
	});
};

var router = new Router({
	mode: 'history',
	scrollBehavior (to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition;
		} else {
			return {x: 0, y: 0};
		}
	},
	routes: [
		{path: '/login', name: 'Login', component: Login},
		{path: '/', redirect: '/releases'},
		{path: '/releases', name: 'Publicaciones', component: Publicaciones, meta: {isPrivate: true, types: ['WEB', 'VAN', 'CON']}},
		{path: '/shipments/new', name: 'NuevoEmbarque', component: CapturaEmbarque, meta: {isPrivate: true, types: ['WEB', 'CON']}},
		{path: '/shipments/print', name: 'ImpresionEmbarque', component: ImpresionEmbarque, meta: {isPrivate: true, types: ['WEB', 'CON']}},
		{path: '/releases', name: 'Publicaciones', component: Publicaciones, meta: {isPrivate: true, types: ['WEB', 'VAN', 'CON']}},
		{path: '/passwrodChange', name: 'CambioContraseña', component: PasswordManagement, meta: {isPrivate: true, types: ['WEB', 'VAN', 'CON']}},
		{path: '/logout', meta: {isPrivate: true, types: ['WEB', 'VAN', 'CON']}, beforeEnter: (to, from, next) => {
			 auth.clearToken();
			 next('/login');
		}}
	]
});

router.beforeEach(authCheck);

export default router;
