// Website pages
const StartPage = () => import('@views/website/StartPage')
const HomePage = () => import('@views/website/HomePage')
const PortfolioPage = () => import('@views/website/PortfolioPage')
const BlogPage = () => import('@views/website/BlogPage')

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
        path: '/portfolio?',
        name: 'PortfolioPage',
        component: PortfolioPage,
        meta: { scrollToTop: true }
      },
      {
        path: '/blog?',
        name: 'BlogPage',
        component: BlogPage,
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
