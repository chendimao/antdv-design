import { createRouter, createWebHistory } from 'vue-router'
import applyManager from '../applyManager/index.vue';
import applyManager2 from '../applyManager2/index.vue';
import Home from '../views/home/index.vue';
import Test from '../../package/formDesign/test.vue';

export const myRoutes = [

  {
    path: '/',
    name: 'home',
    title: '',
    component: Home
  },{
    path: '/test',
    name: 'form',
    title: '',
    component: Test
  },
  {
    path: '/home1',
    // redirect: '/home1',
    name: 'home1',
    title: '',
    component: applyManager2
  }, 

];




const router = createRouter({
  history: createWebHistory(),
  routes: myRoutes
})
router.afterEach((to, from) => {
  // 在每次路由跳转后滚动到顶部
  window.scrollTo(0, 0);
});
export default router
