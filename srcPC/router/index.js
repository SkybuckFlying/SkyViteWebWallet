import { createApp } from "/node_modules/.vite/deps/vue.js?v=705864e4";
import { createRouter, createWebHistory } from "/node_modules/.vite/deps/vue-router.js?v=705864e4";
import routes from "/srcPC/router/routes.js";
import i18n from "/srcPC/i18n/index.js";
import store from "/srcPC/store/index.js";
import openUrl from "/src/utils/openUrl.js";
import statistics from "/src/utils/statistics.js";
import { getExplorerLink } from "/src/utils/getLink.js";
import { getCurrHDAcc, StatusMap } from "/srcPC/wallet/index.js";

const loginRoutes = [];

const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...routes,
    { path: '/:catchAll(.*)', redirect: { name: 'notFound' } } // Fixed catch-all route
  ],
});

router.beforeEach((to, from, next) => {
  if (!to.name && to.path) {
    const arr = to.path.split('/');
    router.replace({ name: arr[arr.length - 1] || 'tradeCenter' });
    return;
  }

  if (to.name === 'viteExplorer') {
    openUrl(getExplorerLink(i18n.locale));
    return;
  }

  if (to.name === 'viteScanExplorer') {
    openUrl('https://vitescan.io');
    return;
  }

  if (to.name === 'create') {
    if (import.meta.env.DEV) {
      next();
      return;
    }
    router.replace({ name: 'notFound' });
    return;
  }

  const currHDAcc = getCurrHDAcc();
  if (!from.name) {
    if (!currHDAcc && to.name && ['startLogin', 'tradeCenter'].indexOf(to.name) === -1) {
      router.replace({ name: 'startLogin' });
      return;
    }
  }

  if ((!from.name || from.name !== 'tradeOperator') && to.name === 'tradeTxPairManage') {
    router.replace({ name: 'tradeOperator' });
    return;
  }

  if (to.name && to.name === 'startLogin' && from.name && from.name.indexOf('start') === -1) {
    store.commit('setLastPage', from.name);
  }

  if (loginRoutes.indexOf(to.name) >= 0 && currHDAcc.status === StatusMap.LOCK) {
    router.replace({ name: 'startLogin' });
    return;
  }

  statistics.pageView(to.path);
  next();
});

const app = createApp({
  // Your main component
});

app.use(router);
app.use(store);
app.use(i18n);
app.mount('#app');

export default router;