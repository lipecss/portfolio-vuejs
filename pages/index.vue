<template>
  <div>
    <GridHero />

    <div class="w-full h-full px-4">
      <div ref="container">

        <p class="b-big-text panel">
          Descubra quem eu sou e o que eu posso fazer por você
        </p>

        <!-- sobre mim -->
        <div id="stage" class="overflow-hidden my-20">
          <div class="section lg:flex">
            <div class="w-full lg:w-6/12 h-full lg:h-1/2 rounded-lg">
              <NuxtImg 
                format="webp"
                loading="lazy"
                class="rounded-full"
                src="/contact.png"
                quality="80"
                alt="Imagem de Felipe"
                width="800"
                height="800" 
                sizes="sm:100vw md:100vw lg:100vw"
              />
            </div>

            <div class="content mt-10 lg:mt-0 lg:mx-6">
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

              <!-- <div class="my-8 flex justify-between">
                <NuxtImg 
                  v-for="(icon, index) in profileIcons"
                  :key="index"
                  :src="icon.imgUrl"
                  loading="lazy"
                  height="100"
                  width="100"
                  format="webp"
                  quality="80"
                  class="box w-10"
                  style="margin-right: 5vw;"
                  alt="Imagem de contato"
                  sizes="sm:100vw md:100vw lg:100vw"
                />
              </div> -->
            </div>
          </div>
        </div>

        <div class="animation-aviator relative block lg:flex" style="height: 92vh; overflow: hidden;">
          <div class="relative w-full z-50 h-full" style="overflow: hidden;">
            <NuxtImg format="webp" quality="80" loading="lazy" class="paper-plane absolute"
              src="https://static.indigoimages.ca/2016/shop/114450_img01_blueAirplane_45deg.png" width="70" height="70"
              alt="aviao" sizes="sm:100vw md:100vw lg:100vw" />

            <div class="aviator-text block w-full md:w-2/3 lg:w-1/2 lg:absolute top-80">
              <p class="text-3xl xl:text-6xl my-10 lg:my-0 font-normal">
                Eu moro no Brasil que é conhecida pelo seu clima quente, praias paradisíacas e um cenário de
                desenvolvimento acelerado.
              </p>
            </div>
            <NuxtImg 
              format="webp"
              src="brazil.png"
              quality="80"
              alt="Brasil"
              loading="lazy"
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
          <section class="panel-card h-4/5" id="panel-card">

            <div class="intro">
              <h1 class="text-5xl text-g1 font-bold mb-10">Confira algumas das minhas ultimas postagens.</h1>

              <p class="drop-shadow-md">Aqui é onde compartilho minhas paixões.
                Então, prepare-se para mergulhar em um mundo de linhas de código e aventuras de jogo enquanto exploramos
                o emocionante universo da tecnologia juntos!
              </p>
            </div>

            <div class="lg:flex">

              <div v-for="(post, index) in postData" :key="index" :id="`post-card-${index}`"
                class="panel-box my-8 lg:my-0">
                <NuxtImg class="w-full h-full object-cover" loading="lazy" format="webp" :src="post.img" :alt="post.title"
                  width="800" height="800" quality="80" sizes="sm:100vw md:100vw lg:100vw" />
                <div class="absolute inset-0 bg-gray-900 opacity-50 w-full h-full"></div>
                <h2
                  class="absolute inset-0 flex justify-center items-center px-10 hover:text-black hover:bg-g1 hover:opacity-70">
                  {{ post.title }}</h2>
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
          <div class="end-element"></div>
        </div>

        <p class="about-play b-big-text">
          Fora da minha vida profissional, amo jogar <span style="color: #fa4454"> Valorant</span> e <span
            style="color: #2cb49c">Sea of Thieves</span>.
        </p>

        <div id="contact-form">
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
              <div class="order-2 lg:order-1">
                <ContactForm @contact="sendContact" />
              </div>
              <div class="order-1 lg:order-2">
                <NuxtImg quality="80" loading="lazy" format="webp" class="w-full bg-center" src="/about.png" alt="Imagem de Felipe"
                  width="300" height="295" sizes="sm:100vw md:100vw lg:100vw" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// useHead({
//   script: [
//     {
//       src: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/gsap.min.js',
//       async: true,
//       crossorigin: 'anonymous',
//     },
//     {
//       src: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/ScrollTrigger.min.js',
//       async: true,
//       crossorigin: 'anonymous',
//     },
//     {
//       src: 'https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/ScrollMagic.min.js',
//       async: true,
//       crossorigin: 'anonymous',
//     },
//     {
//       src: 'https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.8/plugins/animation.gsap.min.js',
//       async: true,
//       crossorigin: 'anonymous',
//     },
//     {
//       src: 'https://unpkg.com/gsap@3/dist/MotionPathPlugin.min.js',
//       async: true,
//       crossorigin: 'anonymous',
//     }
//   ]
// })

const { stacks, profileIcons } = useEnums()

//data
const isMobile = ref(0)

let gsap = null
let controller4 = null;
let scene4 = null;

// onMounted(async () => {
//   if (process.client) {
//     isMobile.value = window.innerWidth <= 768
//     gsap = window.gsap
//     gsap.registerPlugin(MotionPathPlugin)

//     // executa as funções de scrollMagic
//     swithesScrollMagic()
//     iconsScrollMagic()
//     experiencesScrollMagic()
//     paperPlane()
//     contactScrollMagic()
//     //createScene44()

//     const cards = gsap.utils.toArray(".project-card");

//     cards.forEach((card, i) => {
//       gsap.to(card, {
//         scale: () => 0.8 + i * 0.035,
//         ease: "none",
//         scrollTrigger: {
//           trigger: card,
//           start: "top-=" + 40 * i + " 40%",
//           end: "center 20%",
//           scrub: true
//         }
//       });
//       ScrollTrigger.create({
//         trigger: card,
//         start: "center-=" + 40 * i + " 40%",
//         end: "top center",
//         endTrigger: ".end-element",
//         pin: true,
//         pinSpacing: false,
//         id: "card-" + i
//       });
//     })


//     // if (!isMobile.value) teste()
//     //projetTitleScrollMagic()

//     window.addEventListener('resize', handleResize)
//   }
// })

const { data: postData } = await useLazyAsyncData('postData', () => $fetch('/api/posts/latest', { initialCache: false }))
const { data: projectData } = await useFetch('/api/projects/latest', { initialCache: false })

// watch
watch(isMobile, (value) => {
  if (value && scene4 !== null) destroyScene4()
  if (!value && scene4 === null) createScene4()

  // if (!value && planeScene !== null) {
  //   console.log('destruir')
  // } else console.log('criar')
})

// methods
const handleResize = () => {
  isMobile.value = window.innerWidth <= 768;
}

const iconsScrollMagic = () => {
  TweenLite.defaultEase = Linear.easeNone;
  const controller = new window.ScrollMagic.Controller();
  const tl = new TimelineMax();

  tl.staggerFrom(".box", 5, {
    scale: 0,
    stagger: {
      from: "center",
      amount: 0.85
    }
  });

  new window.ScrollMagic.Scene({
    triggerElement: "#stage",
    duration: "20%",
    triggerHook: 0.25
  })
    .setTween(tl)
    .addTo(controller);

  var pinIntroScene = new window.ScrollMagic.Scene({
    triggerElement: '.section-2',
    triggerHook: 0.2,
    duration: '150%'
  })
    .setPin('.section-2')
    .addTo(controller);
}

const experiencesScrollMagic = () => {
  const experiences = document.querySelectorAll(".experiences")

  //  Percorre todas as spans de experiência e cria uma cena para cada uma
  experiences.forEach((experience) => {
    const spans = experience.querySelectorAll("span");
    spans.forEach((span, index) => {
      const delay = index * 0.2; // Adiciona um delay de 0.2s para cada span
      createSceneForSpan(
        span,
        'onBegin', // Gatilho aumenta em 0.2 a cada span
        "25%", // Duração da cena é metade do tamanho do elemento
        delay // Adiciona o atraso na criação da timeline
      )
    })
  })
}

const createSceneForSpan = (span, triggerHook, duration, delay) => {
  const controller = new window.ScrollMagic.Controller()
  const tl = gsap.timeline()

  tl.fromTo(span, { opacity: 0 }, { opacity: 1, duration: 1, delay: delay });

  new window.ScrollMagic.Scene({
    triggerElement: span,
    triggerHook: triggerHook,
    duration: duration,
    reverse: true,
  })
    .setTween(tl)
    .addTo(controller)
}

const swithesScrollMagic = () => {
  const switches = document.querySelectorAll('.switch')
  let element = document.querySelector('.stack-item')
  let containerHeight = null

  const controllers = []

  if (element) containerHeight = element.offsetHeight

  switches.forEach((stack, index) => {
    const controller2 = new window.ScrollMagic.Controller()
    controllers.push(controller2)

    // Cria uma cena para o elemento atual
    new window.ScrollMagic.Scene({
      triggerElement: `#switch-${index}`,
      triggerHook: "onEnter",
      duration: containerHeight * 0.8, // Define a duração com base na altura do container
    })
      .setTween(
        gsap.fromTo(
          `#switch-${index}`,
          { y: containerHeight }, // Posição inicial
          { y: 0, opacity: 1 } // Posição final
        )
      )
      .addTo(controller2)
  })
}

const projetTitleScrollMagic = () => {
  const controller3 = new window.ScrollMagic.Controller()

  const tl2 = gsap.timeline()
  tl2.fromTo('.first', { opacity: 0, y: '100%' }, { opacity: 1, y: '0%', duration: 0.5 })

  new window.ScrollMagic.Scene({
    triggerElement: '.first',
    offset: -10,
    triggerHook: 'onCenter',
    reverse: true
  })
    .setTween(tl2)
    .addTo(controller3);

  const tl3 = gsap.timeline()
  tl3.fromTo('.second', { opacity: 0, x: '100%' }, { opacity: 1, x: '0%', duration: 0.5 })

  new window.ScrollMagic.Scene({
    triggerElement: '.second',
    offset: -10,
    triggerHook: 'onCenter',
    reverse: true
  })
    .setTween(tl3)
    .addTo(controller3)

  const tl4 = gsap.timeline()
  tl4.fromTo('.third', { opacity: 0, y: '100%' }, { opacity: 1, y: '0%', duration: 0.5 })

  new window.ScrollMagic.Scene({
    triggerElement: '.third',
    offset: 20,
    triggerHook: 'onEnter',
    reverse: true
  })
    .setTween(tl4)
    .addTo(controller3)
}

const paperPlane = () => {
  const tween = new TimelineLite();
  const plane = document.querySelector('.paper-plane')
  const div = document.querySelector('.animation-aviator');

  let divWidth, divHeight;

  const updatePlanePosition = () => {
    if (div) {
      divWidth = div.offsetWidth;
      divHeight = div.offsetHeight;

      tween.progress(0).kill();
      tween.clear();

      tween.add(
        gsap.to(".paper-plane", 2, {
          motionPath: {
            curviness: 1.25,
            autoRotate: true,
            path: [
              { x: 0, y: 0 },
              { x: divWidth * 0.1, y: divHeight * 0.1 },
              { x: divWidth * 0.2, y: divHeight * 0.4, bezier: [{ x: divWidth * 0.2 + 20, y: divHeight * 0.4 - 20 }, { x: divWidth * 0.2 + 40, y: divHeight * 0.4 - 40 }] },
              { x: divWidth * 0.92, y: divHeight * 0.25 },
              { x: divWidth * 0.92, y: divHeight * 0.45 }
            ]
          }
        })
      );
    }
  };


  if (div) {
    divWidth = div.offsetWidth;
    divHeight = div.offsetHeight;

    const controller = new window.ScrollMagic.Controller();

    tween.add(
      gsap.to(".paper-plane", 2, {
        motionPath: {
          curviness: 1.25,
          autoRotate: true,
          path: [
            { x: 0, y: 0 },
            { x: divWidth * 0.1, y: divHeight * 0.1 },
            { x: divWidth * 0.2, y: divHeight * 0.4, bezier: [{ x: divWidth * 0.2 + 20, y: divHeight * 0.4 - 20 }, { x: divWidth * 0.2 + 40, y: divHeight * 0.4 - 40 }] },
            { x: divWidth * 0.92, y: divHeight * 0.25 },
            { x: divWidth * 0.92, y: divHeight * 0.45 }
          ]
        }
      })
    );
    new window.ScrollMagic.Scene({
      triggerElement: ".animation-aviator",
      duration: 2000,
      triggerHook: 0
    })
      .on("update", function (e) {
        const st = e.target.controller().info("scrollDirection");
        if (st === 'FORWARD') {
          plane.src = 'https://static.indigoimages.ca/2016/shop/114450_img01_blueAirplane_45deg.png';
        } else if (st === 'REVERSE') {
          plane.src = 'https://static.indigoimages.ca/114450_img01_blueAirplane_45deg__REVERSED.png';
        }
      })
      .setPin(".animation-aviator")
      .setTween(tween)
      .addTo(controller)

    const textTween = new TimelineLite();

    textTween.fromTo('.aviator-text', 1, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1 });

    new window.ScrollMagic.Scene({
      triggerElement: ".animation-aviator",
      duration: 1000,
      triggerHook: 0.9,
    })
      .setTween(textTween)
      .addTo(controller);

    window.addEventListener("resize", updatePlanePosition);
  }
};

const contactScrollMagic = () => {
  const contacts = document.querySelectorAll(".contacts")

  //  Percorre todas as spans de experiência e cria uma cena para cada uma
  contacts.forEach((experience) => {
    const spans = experience.querySelectorAll("span");
    spans.forEach((span, index) => {
      const delay = index * 0.2; // Adiciona um delay de 0.2s para cada span
      createSceneForSpan(
        span,
        'onBegin', // Gatilho aumenta em 0.2 a cada span
        "25%", // Duração da cena é metade do tamanho do elemento
        delay // Adiciona o atraso na criação da timeline
      )
    })
  })
}

const createScene4 = () => {
  controller4 = new window.ScrollMagic.Controller();
  let animFrom = { left: "0" };
  let scrollDistance = null;
  const element = document.querySelector('#pin');

  if (element) {
    scrollDistance = element.scrollWidth;
  }

  const tl5 = gsap.timeline();
  tl5.fromTo('section.panel-card', 2, animFrom, {
    left: -scrollDistance,
    ease: Linear.easeNone
  });

  scene4 = new window.ScrollMagic.Scene({
    triggerElement: '.pinContainer',
    triggerHook: 0,
    duration: scrollDistance
  })
    .setPin(".pinContainer")
    .setTween(tl5)
    .addTo(controller4);
};

const createScene44 = () => {
  controller4 = new window.ScrollMagic.Controller();
  let animFrom = { left: "0" };
  let scrollDistance = null;
  const element = document.querySelector('#pin2');

  if (element) {
    scrollDistance = element.scrollWidth;
  }

  const tl5 = gsap.timeline();
  tl5.fromTo('section.panel-card2', 2, animFrom, {
    left: -scrollDistance,
    ease: Linear.easeNone
  });

  scene4 = new window.ScrollMagic.Scene({
    triggerElement: '.pinContainer2',
    triggerHook: 0,
    duration: scrollDistance
  })
    .setPin(".pinContainer2")
    .setTween(tl5)
    .addTo(controller4);
}

const destroyScene4 = () => {
  if (scene4 || planeScene) {
    scene4.destroy(true);
    scene4 = null;
  }
  if (controller4 || planeScene) {
    controller4.destroy(true);
    controller4 = null;
  }
}

const postImage = (image) => {
  return {
    backgroundImage: `url(${image})`,
  }
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

// const teste = () => {
//   var controller = new window.ScrollMagic.Controller();

//   var pinIntroScene = new window.ScrollMagic.Scene({
//     triggerElement: '.section-1',
//     triggerHook: 0.2,
//     duration: '150%'
//   })
//     .setPin('.section-1')
//     .addTo(controller);
// }
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

  .panel-box {
    width: 80vw;
    height: 60vh !important;
    max-width: 800px;
    margin-right: 3vw;
    transition: transform 0.33s;

    &:hover {
      cursor: pointer;
      transform: scale(1.03);
      transition: transform 0.33s;
    }
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

.panel-card {
  color: white;
  font-size: 3rem;
  transform: translate3d(0, 0, 0);
  z-index: 2;
}

.panel-box {
  height: 30vh;
  position: relative;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
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

[type="submit"] {
  font-family: 'Montserrat', Arial, Helvetica, sans-serif;
  width: 100%;
  background: #CC6666;
  border-radius: 5px;
  border: 0;
  cursor: pointer;
  color: white;
  font-size: 24px;
  padding-top: 10px;
  padding-bottom: 10px;
  transition: all 0.3s;
  margin-top: -4px;
  font-weight: 700;
}

[type="submit"]:hover {
  background: #CC4949;
}
</style>
