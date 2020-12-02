import Vue from 'vue'
import Router from 'vue-router'
import SignIn from './views/SignIn.vue'
import Register from './views/Register'
import Dashboard from './views/Dashboard'
import viewgame from './views/viewgame'
//import Register from './views/Register'
import landing from './views/landing'
import viewgamereal from './views/viewgamereal'
import CourseDashboard from './views/CourseDash'
import coursemain from './views/CourseMain'
import lesson from './views/lesson.vue'
import settings from './views/Settings'
import editprofile from './views/editprofile'
import coursecreator from './views//courseCreator'
import lessoncreator from './views/lessonCreator'
//import CourseDashboard from './views/CourseDashboard'
Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/landing'
    },
    {
      path: '/',
      redirect: '/landing'
    },
  
    {
      path: '/login',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/landing',
      name: 'landing',
      component: landing
    },
     
    
   {
    path: '/registro',
    name: 'Register',
    component : Register
   },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
      
    } ,
    {
      path: '/viewgame/:id',
      name: 'viewgame',
      component: viewgame,
      meta: {
        requiresAuth: true
      }
      
    } ,
    {
      path: '/viewgamereal/:id',
      name: 'viewgamereal',
      component: viewgamereal,
      meta: {
        requiresAuth: true
      }
      
    },
    {
      path: '/courses',
      name: 'CourseDashboard',
      component: CourseDashboard,
      meta: {
        requiresAuth: true
      }
      
    }, 
    {
      path: '/course/:id',
      name: 'coursemain',
      component: coursemain,
      meta: {
        requiresAuth: true
      }
      
    },
    {
      path: '/lesson/:id',
      name: 'lesson',
      component: lesson,
      meta: {
        requiresAuth: true
      }
      
    },
    {
      path: '/settings',
      name: 'settings',
      component: settings,
      meta: {
        requiresAuth: true
      }
      
    },
    {
      path: '/editprofile',
      name: 'editprofile',
      component: editprofile,
      meta: {
        requiresAuth: true
      }
      
    },
    {
      path: '/coursecreator',
      name: 'coursecreator',
      component: coursecreator,
      meta: {
        requiresAuth: true
      }
      
    },
    {
      path: '/unit/:id',
      name: 'lessoncreator',
      component: lessoncreator,
      meta: {
        requiresAuth: true
      }
      
    }
    
   
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = sessionStorage.getItem('accToken')
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next('login')
  else if (!requiresAuth && currentUser) next('dashboard')
  else if (!requiresAuth && currentUser) next('viewgame')
  else next()
})


export default router