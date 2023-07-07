import * as VueRouter from 'vue-router'
import routes from './routes'

const router: VueRouter.Router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes // `routes: routes` 的缩写
})
export default router
