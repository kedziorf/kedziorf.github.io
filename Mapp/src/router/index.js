import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import AddPlaceView from '../views/AddPlaceView.vue'
import ChatView from '../views/ChatView.vue'

import { auth } from '../firebase'; 


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      beforeEnter: (to, from, next) => {
        // Listen for auth state changes
        auth.onAuthStateChanged(user => {
          if (user) {
            // If user is signed in, proceed to home page
            next();
          } else {
            // If user is not signed in, redirect to login page
            next({ name: 'login' });
          }
        });
      },
    },
    {
      path: '/add-place',
      name: 'addplace',
      component: AddPlaceView,
      beforeEnter: (to, from, next) => {
        // Listen for auth state changes
        auth.onAuthStateChanged(user => {
          if (user) {
            // If user is signed in, proceed to home page
            next();
          } else {
            // If user is not signed in, redirect to login page
            next({ name: 'login' });
          }
        });
      }
    },
    {
      path: '/chat',
      name: 'chat',
      component: ChatView,
      beforeEnter: (to, from, next) => {
        // Listen for auth state changes
        auth.onAuthStateChanged(user => {
          if (user) {
            // If user is signed in, proceed to home page
            next();
          } else {
            // If user is not signed in, redirect to login page
            next({ name: 'login' });
          }
        });
      }
    }
  ]
})

export default router
