import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Example from './views/Example.vue';
import System from './views/System.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/example',
      name: 'example',
      component: Example,
    },
    {
      path: '/System/:id',
      name: 'System',
      component: System,
    }
  ],
});
