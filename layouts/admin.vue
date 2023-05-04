<template>
  <div class=" dark:text-white text-gray-600 h-screen flex overflow-hidden text-sm">
    <div class=" dark:border-g1 w-20 flex-shrink-0 border-r border-gray-200 flex-col hidden sm:flex">
      <div class="flex mx-auto flex-grow mt-4 flex-col text-gray-400 space-y-4">
        <button class="p-2 dark:text-g1 rounded-md grid items-center justify-items-center"
          :class="activeRouteClass('dashboard')" @click="goTo('dashboard')" alt="Home" title="Home">
          <svg viewBox="0 0 24 24" class="h-5 mb-2" stroke="currentColor" stroke-width="2" fill="none"
            stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <span>Home</span>
        </button>

        <button class="p-2 dark:text-g1 rounded-md grid items-center justify-items-center"
          :class="activeRouteClass('dashboard-posts')" @click="goTo('dashboard-posts')" alt="Posts" title="Posts">
          <svg viewBox="0 0 24 24" class="h-5 mb-2" stroke="currentColor" stroke-width="2" fill="none"
            stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
            <line x1="12" y1="11" x2="12" y2="17"></line>
            <line x1="9" y1="14" x2="15" y2="14"></line>
          </svg>

          <span>Posts</span>
        </button>

        <button class="p-2 dark:text-g1 rounded-md grid items-center justify-items-center"
          :class="activeRouteClass('dashboard-projects')" @click="goTo('dashboard-projects')" alt="Projetcs"
          title="Projetcs">
          <svg viewBox="0 0 24 24" class="h-5 mb-2" stroke="currentColor" stroke-width="2" fill="none"
            stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
          </svg>

          <span>Projects</span>
        </button>

        <button class="p-2 dark:text-g1 rounded-md grid items-center justify-items-center" alt="Logout" title="Logout"
          @click="signOut">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 mb-2" stroke="currentColor" stroke-width="2" fill="#41b883"
            viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
            <path
              d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
          </svg>

          <span>Logout</span>
        </button>
      </div>
    </div>

    <div class="flex-grow overflow-hidden h-full flex flex-col">
      <div class="h-16 lg:hidden w-full border-b border-gray-200 dark:border-gray-800 px-10">
        <div class="flex h-full text-gray-600 dark:text-gray-400">
          <button class="p-2 dark:text-g1 rounded-md flex items-center justify-items-center"
            :class="activeRouteClass('dashboard')" @click="goTo('dashboard')" alt="Home" title="Home">
            <svg viewBox="0 0 24 24" class="h-5 mb-2" stroke="currentColor" stroke-width="2" fill="none"
              stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            <span>Home</span>
          </button>

          <button class="p-2 dark:text-g1 rounded-md flex items-center justify-items-center"
            :class="activeRouteClass('dashboard-posts')" @click="goTo('dashboard-posts')" alt="Posts" title="Posts">
            <svg viewBox="0 0 24 24" class="h-5 mb-2" stroke="currentColor" stroke-width="2" fill="none"
              stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
              <line x1="12" y1="11" x2="12" y2="17"></line>
              <line x1="9" y1="14" x2="15" y2="14"></line>
            </svg>

            <span>Posts</span>
          </button>

          <button class="p-2 dark:text-g1 rounded-md flex items-center justify-center"
            :class="activeRouteClass('dashboard-projects')" @click="goTo('dashboard-projects')" alt="Projetcs"
            title="Projetcs">
            <svg viewBox="0 0 24 24" class="h-5 mb-2" stroke="currentColor" stroke-width="2" fill="none"
              stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>

            <span>Projects</span>
          </button>

          <button class="p-2 dark:text-g1 rounded-md flex items-center justify-items-center" alt="Logout" title="Logout"
            @click="signOut">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 mb-2" stroke="currentColor" stroke-width="2" fill="#41b883"
              viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
              <path
                d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
            </svg>

            <span>Logout</span>
          </button>
        </div>
      </div>

      <div class="flex-grow flex overflow-x-hidden">
        <div class="flex-grow overflow-y-auto">

          <div class="p-7 pr-20">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const router = useRouter()
const supabase = useSupabaseClient()

const activeRouteClass = (routeName) => {
  return route.name === routeName ? 'dark:bg-g1 dark:text-white rounded-md' : ''
}

const goTo = (routeName) => {
  router.push({ name: routeName })
}

const signOut = async () => {
  try {
    let { error } = await supabase.auth.signOut()
    if (error) throw error
  } catch (error) {
    alert(error.message)
  } finally {
    router.push('/')
  }
}
</script>

<style lang="scss" scoped>
</style>
