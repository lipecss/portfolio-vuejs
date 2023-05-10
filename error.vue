<template>
  <section class="flex items-center min-h-screen h-full lg:p-16">
    <div class="container flex flex-col items-center justify-center px-5 mx-auto my-8">
      <div class="max-w-md text-center">
        <h2 class="mb-8 font-extrabold text-9xl text-white inline-flex items-center">
          4
          <NuxtImg
            src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Face%20with%20Crossed-Out%20Eyes.png" alt="Face with Crossed-Out Eyes"
            width="100" 
            height="100"
            format="webp"
            quality="80"
            sizes="sm:100vw md:100vw lg:100vw"
          />
          4
        </h2>

        <p class="mt-4 mb-8 dark:text-white">A página que você está procurando não foi encontrada.</p>
      </div>
    </div>
  </section>
</template>

<script setup>
useHead({
  script: [
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/gsap.min.js',
      crossorigin: 'anonymous'
    },
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/ScrollMagic.min.js',
    },
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/ScrollTrigger.min.js',
    },
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.8/plugins/animation.gsap.min.js',
    },
    {
      src: 'https://unpkg.com/gsap@3/dist/MotionPathPlugin.min.js',
      crossorigin: 'anonymous'
    }
  ]
})

const router = useRouter()

const gotTo = (path) => { router.push({ path }) }
</script>
