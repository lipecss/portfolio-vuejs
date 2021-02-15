import { getPostsBySlug } from '../services/api'

// Website pages
const StartPage = () => import('@views/website/StartPage')
const HomePage = () => import('@views/website/HomePage')
const PortfolioPage = () => import('@views/website/PortfolioPage')
const BlogPage = () => import('@views/website/BlogPage')

// Errors Pages
const Error404Page = () => import('@/views/errors/Error404Page')

// Modules Pages
const SystemBodyPage = () => import('@/views/system/SystemBodyPage')
// Admim
const AdminDashboardPage = () => import('@/views/system/DashboardPage')

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
        path: '/blog/:slug',
        name: 'BlogPage',
        component: BlogPage,
        meta: { scrollToTop: true },
        async beforeEnter (to, from, next) {
          try {
            const hasSlugParam = to.params.slug.split(' ').join('-')
            if (!hasSlugParam || hasSlugParam === undefined) {
              next()
            } else {
              const slugData = await getPostsBySlug(hasSlugParam)
              to.params.post = slugData
              if (slugData.status === 'error') {
                next({ name: 'Error404Page' })
              } else {
                next()
              }
            }
          } catch (error) {
            next()
          }
        }
      },
      {
        path: '/dashboard',
        component: SystemBodyPage,
        props: false,
        meta: {
          requiresAuth: false
        },
        children: [
          {
            path: 'admin',
            name: 'AdminDashboardPage',
            component: AdminDashboardPage,
            meta: {
              userAdmin: true
            }
          }
        ]
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
