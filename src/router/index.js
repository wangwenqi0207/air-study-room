import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('../components/index.vue'),
      meta:{
        title:'首页',
        index:1
    }
    },
    {
      path: '/animation',
      name: 'animation',
      component: () => import('../components/gif.vue'),
      meta:{
        title:'动画',
        index:2
    }
    },
    {
      path: '/studentId',
      name: 'studentId',
      component: () => import('../components/student_id.vue'),
      meta:{
        title:'学生证',
        index:3
    }
    },
     {
      path: '/studentRoom',
      name: 'studentRoom',
      component: () => import('../components/student_room.vue'),
      meta:{
        title:'自习室',
        index:4
    }
    },
  ]
})
