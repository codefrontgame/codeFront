import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/views/Welcome'
// Load the game module async to prevent heavy loading of the start page
const Game = () => import('@/views/Game')

Vue.use(Router)

const myRouter = new Router({
  routes: [
    {
      path: '/welcome',
      name: 'Welcome',
      component: Welcome,
    },
    {
      path: '/game',
      name: 'Game',
      component: Game,
    },
    {
      path: '/',
      redirect: {
        name: 'Welcome',
      },
    },
  ],
})

Vue.router = myRouter

export default myRouter
