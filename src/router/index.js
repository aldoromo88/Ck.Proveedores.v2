import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';
import auth from '@/services/auth';

const Login = (resolve) => require(['@/components/Login'], resolve);
const Publicaciones = (resolve) => require(['@/components/Publicaciones'], resolve);
const CapturaEmbarque = (resolve) => require(['@/components/CapturaEmbarque'], resolve);
const ImpresionEmbarque = (resolve) => require(['@/components/ImpresionEmbarque'], resolve);

Vue.use(Router);

var authCheck = (to, from, next) => {

	auth.getLastSession().then((c) => {
		const user = store.getters.User;
		const menu = store.getters.Menu;

		if (to.meta.isPrivate) {
			if (user) {
				if (to.meta.types.indexOf(user.Type) != -1) {
					next();
				} else {
					next(null); //Returns to previous page;
				}
	  }
			else {
				next({path: '/login', query: {redirect: to.fullPath}});
	  }
		}
		else {
	    next(); // make sure to always call next()!
		}
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
		{path: '/shipments/print', name: 'ImpresionEmbarque', component: ImpresionEmbarque, meta: {isPrivate: true, types: ['WEB', 'CON']}}
	]
});

router.beforeEach(authCheck);

export default router;
