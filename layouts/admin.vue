<template>
  <div class=" dark:text-white text-gray-600 h-screen flex overflow-hidden text-sm">
    <div class=" dark:border-g1 w-20 flex-shrink-0 border-r border-gray-200 flex-col hidden sm:flex">
      <div class="flex mx-auto flex-grow mt-4 flex-col text-gray-400 space-y-4">
        <button 
          class="h-10 w-12 dark:text-g1 rounded-md flex items-center justify-center"
          :class="activeRouteClass('dashboard')"
          @click="goTo('dashboard')"
        >
          <svg viewBox="0 0 24 24" class="h-5" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"
            stroke-linejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        </button>

        <button 
          class="h-10 w-12 dark:text-g1 rounded-md flex items-center justify-center"
          :class="activeRouteClass('dashboard-posts')"
           @click="goTo('dashboard-posts')"
        >
          <svg viewBox="0 0 24 24" class="h-5" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"
            stroke-linejoin="round">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
            <line x1="12" y1="11" x2="12" y2="17"></line>
            <line x1="9" y1="14" x2="15" y2="14"></line>
          </svg>
        </button>

        <button 
          class="h-10 w-12 dark:text-g1 rounded-md flex items-center justify-center"
          :class="activeRouteClass('dashboard-projects')"
          @click="goTo('dashboard-projects')"
        >
          <svg viewBox="0 0 24 24" class="h-5" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"
            stroke-linejoin="round">
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
          </svg>
        </button>
      </div>
    </div>

    <div class="flex-grow overflow-hidden h-full flex flex-col">
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

console.log('route', route.name)

const activeRouteClass = (routeName) => {
  return route.name === routeName ? 'dark:bg-g1 dark:text-white rounded-md' : ''
}

const goTo = (routeName) => {
  router.push({ name: routeName })
}
</script>

<style lang="scss" scoped>

</style>
