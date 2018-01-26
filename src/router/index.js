import Vue from 'vue'
import Router from 'vue-router'

const Login = resolve => require(['@/components/Login'], resolve);
const Publicaciones = resolve => require(['@/components/Publicaciones'], resolve);
const CapturaEmbarque = resolve => require(['@/components/CapturaEmbarque'], resolve);
const ImpresionEmbarque = resolve => require(['@/components/ImpresionEmbarque'], resolve);


Vue.use(Router)


var authCheck = (to, from, next) => {

    //next({path:'/login'})
    next()

}

var router =  new Router({
  routes: [
    {path: '/login',  name: 'Login', component: Login},
    {path: '/', redirect:'/releases'},
    {path: '/releases',  name: 'Publicaciones', component: Publicaciones, beforeEnter: authCheck},
    {path: '/shipments/new',  name: 'NuevoEmbarque', component: CapturaEmbarque, beforeEnter: authCheck},
    {path: '/shipments/print',  name: 'ImpresionEmbarque', component: ImpresionEmbarque, beforeEnter: authCheck},
  ]
})

//router.beforeEach(authCheck)

export default router;
