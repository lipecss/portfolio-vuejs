<template>
  <section class="flex items-center min-h-screen h-full lg:p-16">
    <div class="container flex flex-col items-center justify-center px-5 mx-auto my-8">
      <div class="max-w-md text-center">
        <h2 class="mb-8 font-extrabold text-9xl text-white inline-flex items-center">
          4
          <span aria-label="Face with Crossed-Out Eyes" role="img" class="text-8xl mx-2">😵</span>
          4
        </h2>

        <p class="mt-4 mb-8 dark:text-white">A página que você está procurando não foi encontrada.</p>
      </div>
    </div>
  </section>
</template>

<script setup>
const router = useRouter()

const gotTo = (path) => { router.push({ path }) }
</script>
