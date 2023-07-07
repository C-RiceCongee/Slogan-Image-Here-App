import * as VueRouter from 'vue-router'

const routes: VueRouter.RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/upload',
    component: () => import('@renderer/layout/index.vue'),
    meta: {
      keepAlive: true,
      title: 'Slogan',
      needLogin: false,
      icon: 'camera'
    },
    children: [
      {
        path: 'upload',
        component: () => import('@renderer/app/upload/index.vue'),
        meta: {
          keepAlive: true,
          title: '上传区域',
          needLogin: false,
          icon: 'upload'
        }
      },
      {
        path: 'about',
        component: () => import('@renderer/app/about/index.vue'),
        meta: {
          keepAlive: true,
          title: '关于Slogan',
          needLogin: false,
          icon: 'info'
        }
      }
    ]
  }
]
export default routes
