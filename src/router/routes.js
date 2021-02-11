// Website pages
const StartPage = () => import('@views/website/StartPage')
const HomePage = () => import('@views/website/HomePage')
const AboutPage = () => import('@views/website/AboutPage')

// Errors Pages
const Error404Page = () => import('@/views/errors/Error404Page')

export const routes = [
  {
    path: '/',
    component: StartPage,
    props: false,
    meta: {
      requiresAuth: false
    },
    children: [
      {
        path: '/',
        name: 'HomePage',
        component: HomePage,
        meta: { scrollToTop: true }
      },
      {
        path: '/about',
        name: 'AboutPage',
        component: AboutPage,
        meta: { scrollToTop: true }
      },
      {
        path: '/404',
        name: 'Error404Page',
        component: Error404Page,
        meta: { scrollToTop: true },
        props: false
      }
    ]
  },
  {
    path: '*',
    redirect: '/404'
  }
]
