import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    meta: { requiresAuth: true },
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: { requiresAuth: true },
    component: () => import('../views/login/login.vue')
  },
  {
    path: '/home',
    name: 'home',
    meta: {
      title:'首页',
      requiresAuth: true
    },
    component: () => import('../views/menu/menu.vue'),
    children: [
      {
        path: '/home',
        name: 'home',
        meta: { 
          title:'首页',
          requiresAuth: true
        },
        component: () => import('../views/home/home.vue'),
      },
      {
        path: '/list',
        name: 'list',
        meta: { 
          title:'列表',
          requiresAuth: true
        },
        component: () => import('../views/list/list.vue'),
      },
      {
        path: '/form',
        name: 'form',
        meta: { 
          title:'表单',
          requiresAuth: true
        },
        component: () => import('../views/form/form.vue'),
      },
    ]
  },
  // {
  //   path: '/home',
  //   name: 'home',
  //   meta: { requiresAuth: true },
  //   component: () => import('../views/home/home.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

NProgress.configure({     
  easing: 'ease', // 动画方式
  speed: 500, // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3 // 初始化时的最小百分比
})

// 白名单
const whiteList = [
  '/index',
  '/login'
]

// const redirect
//当路由进入前
router.beforeEach((to, from , next) => {
  // // 每次切换页面时，调用进度条
  NProgress.start();
  // 这个一定要加，没有next()页面不会跳转的。这部分还不清楚的去翻一下官网就明白了
  // next();
  // 在route中必须配置meta
  if (to.matched.some(record => record.meta.requiresAuth)) {
    console.log('sessionStorage.token', sessionStorage.token)
    if (!sessionStorage.token) {
      if (whiteList.indexOf(to.path) !== -1) {
        next();
      } else {
        // 否则全部重定向到登录页,redirect 后面是前一个页面的地址
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        })
      }
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
});

//当路由进入后：关闭进度条
router.afterEach(() => {  
  // 在即将进入新的页面组件前，关闭掉进度条
  NProgress.done()
})

export default router