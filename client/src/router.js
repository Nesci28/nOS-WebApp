import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';
import EditSystem from './views/EditSystem.vue';
import EditCoins from './views/EditCoins.vue';
import EditOverclocks from './views/EditOverclocks.vue';
import Rigs from './views/Rigs.vue';
import Logs from './views/Logs.vue';
import Download from './views/Download.vue';
import AboutnOS from './views/AboutnOS.vue';
import AboutMe from './views/AboutMe.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/EditSystem/:id',
      name: 'EditSystem',
      component: EditSystem,
    },
    {
      path: '/EditCoins/:id',
      name: 'EditCoins',
      component: EditCoins,
    },
    {
      path: '/EditOverclocks/:id',
      name: 'EditOverclocks',
      component: EditOverclocks,
    },
    {
      path: '/rigs',
      name: 'rigs',
      component: Rigs,
    },
    {
      path: '/logs',
      name: 'logs',
      component: Logs,
    },
    {
      path: '/download',
      name: 'download',
      component: Download,
    },
    {
      path: '/aboutnOS',
      name: 'aboutnOS',
      component: AboutnOS,
    },
    {
      path: '/aboutMe',
      name: 'aboutMe',
      component: AboutMe,
    },
  ],
});
