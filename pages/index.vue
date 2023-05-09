<template>
  <div>
    <GridHero />

    <div class="w-full h-full px-4">
      <div ref="container">

        <p class="b-big-text">
          Descubra quem eu sou e o que eu posso fazer por você
        </p>

        <!-- sobre mim -->
        <div id="stage" class="overflow-hidden my-20">
          <div class="section lg:flex">
            <div class="w-full lg:w-6/12 h-full lg:h-1/2 rounded-lg">
              <NuxtImg format="webp" loading="lazy" class="rounded-full" src="contact.png" quality="80"
                alt="Imagem de Felipe" width="800" height="800" sizes="sm:100vw md:100vw lg:100vw" />
            </div>

            <div class="mt-10 lg:mt-0 lg:mx-6">
              <p class="mb-6 text-xl lg:text-3xl">
                👋🏼 Sou um eterno estudante, um engenheiro de software com Bacharelado em ciência da computação.
              </p>

              <p class="mb-6 text-xl lg:text-2xl">Professor, <span style="color: #9146ff">autodidata</span>
                e adoro aprender coisas novas, certamente não sem dificuldades, hehe, mas sempre consegui superar
                obstáculos e resolver os problemas que encontrava!</p>

              <p class="text-g1 text-xl font-bold">
                Tive a oportunidade de estar em várias posições e cenários de negócios. Uma variedade de campos que me
                ajudaram a aumentar ainda mais meu conhecimento 😊
              </p>
            </div>
          </div>
        </div>

        <div class="grid gap-6">
          <div class="grid grid-cols-2">
            <span v-for="competence in competences.array" :key="competence.index">
              <Donut :text="competence.text" value="100%" />
            </span>

            <span v-for="competence in competences.array2" :key="competence.index">
              <Donut :text="competence.text" value="100%" />
            </span>
          </div>
        </div>

        <section class="horizontal">
          <div class="intro bg-white">
            <h1 class="font-bold text-3xl mb-6 text-g1">Clique no icone para ir num determinado link social</h1>
            <p>Aqui estão meus links sociais. Caso queira ter um contato maior comigo escolha a plataforma. Por favor aproveite.</p>
          </div>

          <div class="pin-wrap">
            <div class="animation-wrap to-right">
              <div v-for="(icon, index) in profileIcons" class="item-social">
                <NuxtLink :key="index" :to="icon.url" target="_blank" :alt="icon.alt" :title="icon.alt"
                  class="transition-transform duration-300 ease-in-out transform hover:scale-110">
                  <NuxtImg :src="icon.imgUrl" loading="lazy" height="100" width="100" format="webp" quality="80"
                    class="box" style="margin-right: 5vw;" :alt="icon.alt" sizes="sm:100vw md:100vw lg:100vw" />
                </NuxtLink>
                <span class="italic font-extralight text-lg ml-3">{{ icon.description }}</span>
              </div>
            </div>
          </div>
        </section>

        <div class="animation-aviator relative block lg:flex" style="height: 92vh; overflow: hidden;">
          <div class="relative w-full z-50 h-full" style="overflow: hidden;">
            <img class="paper-plane absolute"
              src="https://static.indigoimages.ca/2016/shop/114450_img01_blueAirplane_45deg.png" width="70" height="70"
              alt="aviao" />

            <div class="aviator-text block w-full md:w-2/3 lg:w-1/2 lg:absolute top-80">
              <p class="text-3xl xl:text-6xl my-10 lg:my-0 font-normal">
                Eu moro no Brasil que é conhecida pelo seu clima quente, praias paradisíacas e um cenário de
                desenvolvimento acelerado.
              </p>
            </div>

            <NuxtImg format="webp" src="brazil.png" quality="80" alt="Brasil" loading="lazy"
              class="absolute right-0 xl:w-1/3 lg:bottom-40" width="500" height="500"
              sizes="sm:100vw md:100vw lg:100vw" />
          </div>
        </div>

        <div class="inner-container my-0">
          <div class="grid-t grid-cols-3 gap-y-8 justify-items-center stack-item">
            <SwatchCard v-for="(stack, index) in stacks" :key="index" :id="`switch-${index}`" :class="`switch-${index}`"
              :color="stack.color" :name="stack.name" :img-url="stack.imgUrl" />
          </div>
        </div>

        <div class="my-20">
          <h2 class="experiences" style="line-height: 100%; margin: 0;">
            <span class="block text-8xl md:text-9xl" style="backface-visibility: hidden;">Inovar</span>
            <span class="block text-8xl md:text-9xl" style="backface-visibility: hidden;">Criar</span>
            <span class="block text-8xl md:text-9xl text-g1" style="backface-visibility: hidden;">Crescer junto</span>
            <span class="block text-8xl md:text-9xl" style="backface-visibility: hidden;">Liderar</span>
          </h2>
        </div>

        <div class="pinContainer" id="pin">
          <section class="panel-card" id="panel-card">
            <div class="intro">
              <h1 class="text-5xl text-g1 font-bold mb-10">Confira algumas das minhas ultimas postagens.</h1>
              <p class="drop-shadow-md">Aqui é onde compartilho minhas paixões.
                Então, prepare-se para mergulhar em um mundo de linhas de código e aventuras de jogo enquanto exploramos o
                emocionante universo da tecnologia juntos!
              </p>
            </div>

            <div v-for="(post, index) in postData" :key="index" class="panel-box my-8 lg:my-0 relative"
              @mouseenter="hoverPostInfo(index)" @mouseleave="resetPostInfo">
              <NuxtImg class="w-full h-full object-cover" loading="lazy" format="webp" :src="post.img" :alt="post.title"
                width="800" height="800" quality="80" sizes="sm:100vw md:100vw lg:100vw" />
              <div class="absolute inset-0 bg-gray-900 opacity-50 w-full h-full"></div>

              <div
                class="z-50 flex items-center flex-col justify-center colum hover:bg-g1 hover:opacity-75 top-0 left-0 right-0 bottom-0 absolute">
                <h2 class="text-xl uppercase mb-10">
                  {{ post.title }}
                </h2>
                <NuxtLink v-if="showPostInfo === index" :to="`/post/${post.slug}`"
                  class="button-read-more hover:cursor-pointer">
                  Leia mais
                </NuxtLink>
              </div>
            </div>
          </section>
        </div>

        <div>
          <h1 class="title text-8xl">
            <span class="brand-project-title block text-left first">
              Meus
            </span>

            <span class="brand-project-title block text-right second">
              projetos
            </span>

            <span class="brand-project-title block text-center third">recentes</span>
          </h1>
        </div>

        <div class="container-project">
          <div class="stackingcards">
            <ProjectCard v-for="(project, index) in projectData" :key="index" class="stackingcard" :data="project" />
          </div>
          <div class="end-element h-80"></div>
        </div>

        <p class="about-play b-big-text" style="height: 70vh;">
          Fora da minha vida profissional, amo jogar <span style="color: #fa4454"> Valorant</span> e <span
            style="color: #2cb49c">Sea of Thieves</span>.
        </p>

        <div id="contact-form mt-20">
          <div class="mt-20">
            <h2 class="contacts" style="line-height: 100%; margin: 0;">
              <span class="block text-8xl md:text-9xl" style="backface-visibility: hidden;">Contato</span>
              <span class="block text-8xl md:text-9xl" style="backface-visibility: hidden;">Contato</span>
              <span class="block text-8xl md:text-9xl text-g1 gradient" style="backface-visibility: hidden;">Falar
                comigo</span>
              <span class="block text-8xl md:text-9xl" style="backface-visibility: hidden;">Contato</span>
            </h2>
          </div>

          <div class="py-14">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div id="contact-area" class="order-2 lg:order-1">
                <ContactForm @contact="sendContact" />
              </div>

              <div class="order-1 lg:order-2 md:hidden">
                <NuxtImg quality="80" loading="lazy" format="webp" class="w-full bg-center" src="/about.png"
                  alt="Imagem de Felipe" width="300" height="295" sizes="sm:100vw md:100vw lg:100vw" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  script: [
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/gsap.min.js',
      crossorigin: 'anonymous',
    },
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/ScrollTrigger.min.js',
      crossorigin: 'anonymous',
    },
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/ScrollMagic.min.js',
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

const {
  iconsScrollMagic,
  experiencesScrollMagic,
  swithesScrollMagic,
  paperPlane,
  contactScrollMagic,
  socialScrollMagic,
  postScrollMagic,
  projectScrollMagic
} = useScrollAnimation()
const { stacks, profileIcons } = useEnums()
const { hash } = useRoute()

//data
let isMobile = ref(0)
let showPostInfo = ref(null)
const competences = ref({
  title: 'Competências',
  array: [
    { index: 1, text: 'criatividade' },
    { index: 2, text: 'trabalho em equipe' }
  ],
  array2: [
    { index: 1, text: 'solucionador de problemas' },
    { index: 2, text: 'autodidata' }
  ]
})

let gsap = null

onBeforeMount(async () => {
  if (process.client) {
    isMobile.value = window.innerWidth <= 768
    gsap = await window.gsap
  }
})

onMounted(async () => {
  scrollToElement(hash)

  if (process.client) {
    gsap.registerPlugin(MotionPathPlugin)

    // executa as funções de scrollMagic
    swithesScrollMagic()
    iconsScrollMagic()
    experiencesScrollMagic()
    paperPlane()
    contactScrollMagic()
    socialScrollMagic()
    postScrollMagic()
    projectScrollMagic()
    if (gsap) {
      // gsap.registerPlugin(MotionPathPlugin)

      // // executa as funções de scrollMagic
      // swithesScrollMagic()
      // iconsScrollMagic()
      // experiencesScrollMagic()
      // paperPlane()
      // contactScrollMagic()
      // postScrollMagic()
      // projectScrollMagic()
    }

    window.addEventListener('resize', handleResize)
  }
})

const { data: postData } = await useLazyFetch('/api/posts/latest')
const { data: projectData } = await useLazyFetch('/api/projects/latest')

// methods
const handleResize = () => {
  isMobile.value = window.innerWidth <= 768;
}

const sendContact = async (body) => {
  const { error } = useFetch('http://localhost:5000/contact', {
    method: 'POST',
    body
  })

  if (error.value !== null) {
    useNuxtApp().$toast.error('Falha ao fazer login, tente novamente', {
      theme: 'dark'
    })
  } else {
    useNuxtApp().$toast.success('Mensagem enviada com Sucesso!', {
      theme: 'dark'
    })
  }
}

const hoverPostInfo = (index) => {
  showPostInfo.value = index
}

const resetPostInfo = () => {
  showPostInfo.value = null
}

const scrollToElement = (element) => {
  if (element) {
    setTimeout(() => {
      const contactArea = document.querySelector('#contact-area')
      if (contactArea) {
        contactArea.scrollIntoView({
          block: 'start',
          behavior: 'smooth'
        })
      }
    }, 800)
  }
}

</script>

<style lang="scss">
.container-project {
  padding: 5rem 0rem 20rem 0rem;
  width: 100%;
  box-sizing: border-box;
}

.stackingcards {
  position: relative;
}

.paper-plane {
  z-index: 1;
  position: absolute;
  top: 0;
  left: -100px;
  /* mudança aqui */
}

html,
body {
  background-color: #000000;
  height: 100vh;
}

.b-big-text {
  font-weight: 500;
  font-size: 10vw;
  line-height: 100%;
  letter-spacing: -0.006em;
  @apply py-14;
}

.grid-t {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-row-gap: 60px;
  justify-items: center;
}

.item {
  position: relative;
  width: 38px;
  height: 38px;
  margin: calc((100% - (38px * 4)) / 8);
  transition: transform 0.3s ease;
}

.item:hover {
  width: 98px;
  height: 98px;
  margin: calc((100% - (100px * 4)) / 8);
  transform-origin: center;
  transform: scale(1.6);
}

.color {
  position: relative;
  width: 100%;
  height: 100%;
}

.color>* {
  position: absolute;
}

.panel-box {
  width: 120vw;
  height: 35vh;
  max-width: 800px;
  margin-right: 3vw;
  transition: transform 0.33s;

  &:hover {
    transform: scale(1.03);
    transition: transform 0.33s;
  }
}

@media (max-width: 767px) {
  .item:hover {
    width: 68px;
    height: 68px;
    margin: calc((100% - (68px * 4)) / 8);
    transform-origin: center;
    transform: scale(1.6);
  }
}

@media (min-width: 768px) {
  .grid-t {
    grid-template-columns: repeat(6, 1fr);
  }

  .panel-box {
    width: 80vw;
    max-width: 800px;
    height: 60vh;
  }
}

@media (min-width: 1024px) {

  .experiences span,
  .contacts span {
    font-size: 200px;
  }

  .about {
    &__text-one {
      top: 6vh;
      left: 45vw;
    }

    &__text-two {
      bottom: 40vh;
      left: 45vw
    }

    &__text-three {
      bottom: 2vh;
      left: 45vw
    }
  }

  .project-container {
    .inner {
      .title {
        font-size: 274px;
      }
    }
  }

  .stackingcards {
    width: 90%;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
  }

  .container-project {
    padding: 10rem 3rem 20rem 3rem;
  }
}

.brand-project-title {
  font-size: 19.0277777778vw;
}

.color span {
  position: absolute;
  width: 100%;
  opacity: 0;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.color span:first-child {
  top: 13px;
  padding-left: 10px;
  opacity: 0;
}

.color span:last-child {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: top 0.3s ease, opacity 0.3s ease;
}

.item:hover .color span:first-child {
  opacity: 1;
}

.item:hover .color span:last-child {
  top: 76%;
  opacity: 1;
}

.experiences span,
.contacts span {
  line-height: 100%;
  letter-spacing: -.02em;
  margin: 0;
}

.pinContainer {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.panel-card {
  padding: 3em 1em;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.intro {
  width: 600px;
  max-width: 80vw;
  color: #FFFFFF;
  font-size: 1.5rem;
  margin-right: 3em;

  p {
    line-height: 1.6;
  }
}

.contacts {
  font-weight: 500;
  //font-size: 200px;
  line-height: 100%;
  letter-spacing: -.02em;
  margin: 0;
}

.gradient {
  background: linear-gradient(180deg, #9146FF 21.09%, #00FAFA 64.08%, #FAFA1A 91.34%);
  -webkit-background-clip: text;
  color: transparent;
}

.feedback-input {
  color: white;
  font-family: Helvetica, Arial, sans-serif;
  font-weight: 500;
  font-size: 18px;
  border-radius: 5px;
  line-height: 22px;
  background-color: transparent;
  border: 2px solid #CC6666;
  transition: all 0.3s;
  padding: 13px;
  margin-bottom: 15px;
  width: 100%;
  box-sizing: border-box;
  outline: 0;
}

.feedback-input:focus {
  border: 2px solid #CC4949;
}

textarea {
  height: 150px;
  line-height: 150%;
  resize: vertical;
}

.horizontal .intro {
  width: 80vw;
  max-width: 800px;
  padding: 2em;
  border: 1px solid #ccc;
  color: #333;
  display: block;
  margin: auto;
  line-height: 1.6;
}

section.horizontal {
  width: 100%;
  height: 100%;
  position: relative;
}

section.horizontal {
  overflow-x: hidden;
}

section.horizontal .pin-wrap,
section.horizontal .animation-wrap {
  display: flex;
  position: relative;
  z-index: 1;
  height: 100vh;
}

section.horizontal .item-social {
  position: relative;
  padding: 150px 80px;
  flex: 0 0 500px;
  height: calc(100vh - 300px);
  display: flex;
  align-items: center;
  line-height: 1.7;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border-right: 1px solid rgba(0, 0, 0, 0.06);
  background-color: transparent;
}

section.horizontal .item-social:before {
  position: absolute;
  font-size: 100px;
  opacity: .5;
  font-weight: bold;
  z-index: -1;
  -webkit-transform: translate(-50px, -30px);
  transform: translate(-50px, -30px);
  line-height: 1;
  color: #41b883;
}

section.horizontal .animation-wrap.to-right {
  counter-reset: item;
  float: left;
}

section.horizontal .animation-wrap.to-left {
  counter-reset: item 11;
  float: right;
}

section.horizontal .animation-wrap.to-right .item-social:before {
  counter-increment: item;
  content: counter(item);
}

section.horizontal .animation-wrap.to-left .item-social:before {
  counter-increment: item -1;
  content: counter(item);
}

section.horizontal .animation-wrap .item-social:nth-child(2n+2) {
  align-items: flex-start;
}

section.horizontal .animation-wrap .item-social:nth-child(4n+4) {
  align-items: flex-end;
}
</style>
