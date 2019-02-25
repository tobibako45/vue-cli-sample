import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import about from '@/components/about'
import help from '@/components/help'
import weather from '@/components/weather'
import qiita from '@/components/qiita'

Vue.use(Router)

export default new Router({
  mode: 'history', // /#/をなくすやつ
  routes: [{
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/about',
      name: 'about',
      component: about
    },
    {
      path: '/help',
      name: 'help',
      component: help
    },
    {
      path: '/weather',
      name: 'weather',
      component: weather
    },
    {
      path: '/qiita',
      name: 'qiita',
      component: qiita
    },
  ]
})
