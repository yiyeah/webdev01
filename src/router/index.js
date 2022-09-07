import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Cover',
    component: () => import('../views/Cover/Cover')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/About.vue')
  },
  {
    path: '/login',
    component: () => import('../views/User/Login.vue')
  },
  {
    path: '/userinfo',
    component: () => import('../views/User/Userinfo.vue'),
    redirect: '/userinfo/profile',
    children:[
      {
        path:'profile',
        component: () => import('../components/User/UserProfile.vue')
      },
    ]
  },
  {
    path: '/addAch',
    component: () => import('../views/Achievement/Addach.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/Achievement/components/AddArticle.vue'),
      },
      {
        path: 'patent',
        component: () => import('../views/Achievement/components/AddPatent.vue'),
      },
      {
        path: 'report',
        component: () => import('../views/Achievement/components/AddReport.vue'),
      },
    ]
  },
  {
    path: '/question',
    component: () => import('../views/Question/Question.vue'),
    children: [
      {
        path: 'recommend',
        component: () => import('../views/Question/QuestionRecommend.vue')
      },
      {
        path: 'follow',
        component: () => import('../views/Question/QuestionYouFollow.vue')
      },
      {
        path: 'ask',
        component: () => import('../views/Question/QuestionYouAsk.vue')
      }
    ]
  },
  {
    path: '/answer',
    component: () => import('../views/Question/Answer.vue')
  },
  {
    path: '/search',
    component: () => import('../views/Search/Search.vue'),
    children: [
      {
        path: 'question',
        component: () => import('../views/Search/components/SearchQ.vue'),
      },
      {
        path: 'publication',
        component: () => import('../views/Search/components/SearchAch.vue'),
      },
      {
        path: 'researcher',
        component: () => import('../views/Search/components/SearchUser.vue'),
      },
    ]
  },
  {
    path: '/achDetail/:id',
    component: () => import('../views/Achievement/AchDetail.vue')
  },
  {
    path: '/message',
    component: () => import('../views/User/Message.vue'),
  },
  {
    path: '/dialog',
    component: () => import('../views/User/Dialog.vue')
  },
  {
    path: '/notification',
    component: () => import('../views/User/Notification.vue')
  },
  {
    path: '/square',
    component: () => import('../views/Moments/Square.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
