<template>
  <div :id="id" class="breadcrumb overflow-hidden">
    <ol class="breadcrumb__list">
      <li v-for="(item, index) in breadcrumbList" :key="index" class="inline-block">
        <span v-if="emptyLink(item.link)" class="font-bold text-g1">
          {{ item.name }}
        </span>

        <NuxtLink v-else :to="mountLink(item.link)" class="hover:text-g1 font-bold">
          {{ item.name }}
        </NuxtLink>

        <span v-if="noLastChild(index)" class="text-g1 px-3 font-bold">
          {{ separator }}
        </span>
      </li>
    </ol>
  </div>
</template>

<script setup>
const props = defineProps({
  id: {
    type: String,
    required: true,
    validator: (value) => {
      if (!value) return false
      return value
    }
  },
  separator: {
    type: String,
    default: '/'
  },
  breadcrumbList: {
    type: Array
  }
})

const emptyLink = (linkObject) => {
  return !!(Object.keys(linkObject).length === 0 && linkObject.constructor === Object)
}

const mountLink = (linkObject) => {
  const route = {}

  if (linkObject.type === 'route-path') route.path = linkObject.path
  else route.name = linkObject.name

  return route
}

const noLastChild = (currentIndex) => {
  const realCurrentItem = currentIndex + 1

  return realCurrentItem < props.breadcrumbList.length
}
</script>

<style lang="scss" scoped>
.breadcrumb {
  &__list {
    padding: 0 15px;
    text-overflow: ellipsis;
  }
}
</style>
