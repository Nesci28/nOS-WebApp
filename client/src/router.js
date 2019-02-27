import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';
import Example from './views/Example.vue';
import EditSystem from './views/EditSystem.vue';
import EditCoins from './views/EditCoins.vue';
import EditOverclocks from './views/EditOverclocks.vue';
import Miners from './views/Miners.vue';
import Coins from './views/Coins.vue';
import Rigs from './views/Rigs.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/example',
      name: 'example',
      component: Example,
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
      path: '/Coins',
      name: 'Coins',
      component: Coins,
    },
    {
      path: '/miners',
      name: 'miners',
      component: Miners,
    },
    {
      path: '/rigs',
      name: 'rigs',
      component: Rigs,
    }
  ],
});
