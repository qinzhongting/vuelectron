import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'landing-page',
    //   component: () => import('@/components/LandingPage')     
    // },
    {
      path: '/',
      component: home,
      redirect: '/ax/dh1',
    },
    {
      path: '/:id',
      component: home,
      children: [
        {
          path: '/ax',
          component: home,
          children: [
            {path: 'dh1',name: 'dh1',component:()=>import('@/ax/dh1.vue'),meta: { title: '', noCache: true }},
            {path: 'dh2',name: 'dh2',component:()=>import('@/ax/dh2.vue'),meta: { title: '', noCache: true }},
            {path: 'dh3',name: 'dh3',component:()=>import('@/ax/dh3.vue'),meta: { title: '', noCache: true }},
            {path: 'dh4',name: 'dh4',component:()=>import('@/ax/dh4.vue'),meta: { title: '', noCache: true }},
          ]
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
