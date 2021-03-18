import { getPostsBySlug, getProjectsBySlug } from '../services/api'

// Website pages
const StartPage = () => import('@views/website/StartPage')
const HomePage = () => import('@views/website/HomePage')
const PortfolioPage = () => import('@views/website/PortfolioPage')
const BlogPage = () => import('@views/website/BlogPage')
const BlogListPage = () => import('@views/website/BlogListPage')
const LoginPage = () => import('@/views/website/LoginPage')

// Project pages
const ProjectListPage = () => import('@/views/projects/ProjectListPage')
const ProjectPage = () => import('@/views/projects/ProjectPage')

// Errors Pages
const Error404Page = () => import('@/views/errors/Error404Page')

// Admim Pages
const SystemBodyPage = () => import('@/views/system/SystemBodyPage')

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
        meta: { scrollBehavior: true }
      },
      {
        path: '/portfolio?',
        name: 'PortfolioPage',
        component: PortfolioPage,
        meta: { scrollToTop: true }
      },
      {
        path: '/blog',
        name: 'BlogListPage',
        component: BlogListPage,
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
        path: '/login',
        name: 'LoginPage',
        component: LoginPage
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
    path: '/dashboard',
    name: 'DashBoardPage',
    component: SystemBodyPage,
    props: false,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/project',
    name: 'ProjectListPage',
    component: ProjectListPage,
    meta: { scrollToTop: true },
    props: false
  },
  {
    path: '/project/:slug',
    name: 'ProjectPage',
    component: ProjectPage,
    meta: { scrollToTop: true },
    async beforeEnter (to, from, next) {
      try {
        const hasSlugParam = to.params.slug.split(' ').join('-')
        if (!hasSlugParam || hasSlugParam === undefined) {
          next()
        } else {
          const slugData = await getProjectsBySlug(hasSlugParam)
          to.params.project = slugData
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
    path: '*',
    redirect: '/404'
  }
]
