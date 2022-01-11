const routes = [
  {
    path: '/',
    name: 'Home',
    component: ()=> import('../pages/home/index'),
    meta: {
      keepAlive: true,
      title: 'Home'
    }
  },
  {
    path: '/hello',
    name: 'Hello',
    component: ()=> import('../pages/hello-world/index'),
    meta: {
      keepAlive: true,
      title: 'Hello'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: ()=> import('../pages/about'),
    meta: {
      keepAlive: true,
      title: 'About'
    }
  },
  {
    path: '/404',
    name: '404',
    component: ()=> import('../pages/404'),
    meta: {
      keepAlive: true,
      title: '404'
    }
  },
  {
    path: "/:catchAll(.*)",
    redirect: '/404',
  }
]

export default routes