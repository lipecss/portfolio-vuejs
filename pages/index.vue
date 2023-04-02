<template>
  <div>
    <GridHero />

    <div class="w-full h-full z-50 px-4">
      <div class="z-50" ref="container">
        <div>
          <p class="b-big-text panel">
            Descubra quem eu sou e o que eu posso fazer por você
          </p>
        </div>

        <div class="inner-container my-20">
          <div class="grid-t grid-cols-3 gap-y-8 justify-items-center stack-item">
            <SwatchCard v-for="(stack, index) in stacks" :key="index" :id="`switch-${index}`" :class="`switch-${index}`"
              :color="stack.color" :name="stack.name" :img-url="stack.imgRul" />
          </div>
        </div>

        <div class="mt-20">
          <h2 class="experiences text-6xl md:text-9xl" style="line-height: 100%; margin: 0;">
            <span class="block" style="backface-visibility: hidden;">Inovar</span>
            <span class="block" style="backface-visibility: hidden;">Criar</span>
            <span class="block text-g1" style="backface-visibility: hidden;">Crescer junto</span>
            <span class="block" style="backface-visibility: hidden;">Liderar</span>
          </h2>
        </div>

        <div class="project-container overflow-hidden">
<!-- 
          <div class="inner">
            <h1 class="title text-8xl">
              <span class="block text-left first">
                Meus
              </span>

              <span class="block text-right second">
                projetos
              </span>

              <span class="block text-center third">recentes</span>
            </h1>
          </div> -->

          <div class="section mt-14">
            <div class="content">
              <h1>Scroll to experience the magic.</h1>
              <p class="mb-6">Sou um eterno estudante, Desenvolvedor Full-Stack. Bacharelado em ciência da computação.</p>

              <p>Professor, <span style="color: #9146ff">autodidata</span>
                  e adoro aprender coisas novas, certamente não sem dificuldades, hehe, mas sempre consegui superar
                  obstáculos e resolver os problemas que encontrava!</p>
            </div>
          </div>

        <div class="pinContainer" id="pin">
          <section class="panel-card" id="panel-card">
            <div class="intro">
              <h1>Confira algumas das minhas ultimas postagens.</h1>
              <p>Aqui é onde compartilho minhas paixões. 
                Então, prepare-se para mergulhar em um mundo de linhas de código e aventuras de jogo enquanto exploramos o emocionante universo da tecnologia juntos!
              </p>
            </div>
            <div v-for="(post, index) in posts" :key="index" class="panel-box">
              <h1>{{ post.title }}</h1>
            </div>
          </section>
        </div>
        <div class="section">
          <div class="content">
            <h1>How delightful.</h1>
            <p>Braid’s heart is in Charlottesville, VA, a charming city surrounded by beautiful country and mountainscape.
              Charlottesville punches far above its weight class for food and culture and was named the happiest place to
              live by the U.S. National Bureau of Economic Research (NBER) in 2014. In 2016, entrepreneur.com named
              Charlottesville the 4th best city for entrepreneurs.</p>
            <p>a <a target="_blank" href="https://wearebraid.com/">Braid</a> experiment</p>

          </div>
        </div>

          <!-- <div v-if="!pending" class="grid grid-cols-1 md:grid-cols-2 md:gap-5 md:mx-20 panel">
            <PostThumb v-for="(post, index) in posts" :key="index" :data="post" class="my-4 md:my-0" />
          </div> -->
        </div>

        <div>
          <p class="b-big-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>

          <p class="b-big-text">
            Fuga similique hic tempora blanditiis ad! Repellendus, nobis deleniti! Inventore, atque recusandae?
          </p>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
onMounted(() => {
  if (process.client) {
    gsap = window.gsap
    // executa as funções de scrollMagic
    experiencesScrollMagic()
    swithesScrollMagic()
    teste()
    //projetTitleScrollMagic()
  }
})

//data
const stacks = reactive([
  { color: '#e34c26', name: 'Html', imgRul: 'https://cdn.iconscout.com/icon/free/png-256/html-2752158-2284975.png?f=webp&w=256' },
  { color: '#f0db4f', name: 'Javascript', imgRul: 'https://cdn.iconscout.com/icon/free/png-256/javascript-2038874-1720087.png?f=webp&w=256' },
  { color: '#264de4', name: 'Css', imgRul: 'https://cdn.iconscout.com/icon/free/png-256/css3-8-1175200.png?f=webp&w=256' },
  { color: '#41b883', name: 'Vuejs', imgRul: 'https://cdn.iconscout.com/icon/free/png-256/vuejs-3-1175070.png?f=webp&w=256' },
  { color: '#3b8070', name: 'Nuxt', imgRul: 'https://cdn.iconscout.com/icon/free/png-256/nuxt-dot-js-3628959-3030184.png?f=webp&w=256' },
  { color: '#94704e', name: 'Cypress', imgRul: '' },
  { color: '#563d7c', name: 'Boostrap', imgRul: 'https://cdn.iconscout.com/icon/free/png-256/bootstrap-2038880-1720093.png?f=webp&w=256' },
  { color: '#ddd6fe', name: 'Talwind', imgRul: 'https://cdn.iconscout.com/icon/free/png-256/tailwind-css-5285308-4406745.png?f=webp&w=256' },
  { color: '#68a063', name: 'Nodejs', imgRul: 'https://cdn.iconscout.com/icon/free/png-256/node-js-1-1174935.png?f=webp&w=256' },
  { color: '#FFFFFF', name: 'Express', imgRul: 'https://cdn.iconscout.com/icon/free/png-256/express-9-1175170.png?f=webp&w=256' },
  { color: '#3E2C00', name: 'Git', imgRul: 'https://cdn.iconscout.com/icon/free/png-256/git-18-1175219.png?f=webp&w=256' },
  { color: '#034f84', name: 'SQL', imgRul: 'https://cdn.iconscout.com/icon/premium/png-256-thumb/sql-file-2694551-2246328.png?f=webp&w=256' },
  { color: '#E8E7D5', name: 'Mongo DB', imgRul: 'https://cdn.iconscout.com/icon/free/png-256/mongodb-4-1175139.png?f=webp&w=256' },
  { color: '#9b4993', name: 'C# (unity)', imgRul: 'https://cdn.iconscout.com/icon/free/png-256/c-57-1175191.png?f=webp&w=256' },
  { color: '#00cccc', name: 'Unity', imgRul: 'https://cdn.iconscout.com/icon/free/png-256/unity-2749374-2284764.png?f=webp&w=256' },
  { color: '#0040AD', name: 'Linux', imgRul: 'https://cdn.iconscout.com/icon/free/png-256/linux-21-1174928.png?f=webp&w=256' },
  { color: '#61DBFB', name: 'React', imgRul: 'https://cdn.iconscout.com/icon/free/png-256/react-226053.png?f=webp&w=256' },
  { color: '#20232A', name: 'React native', imgRul: 'https://cdn.iconscout.com/icon/premium/png-256-thumb/react-js-5379349-4492471.png?f=webp&w=256' },
])
const posts = ref([])

let gsap = null


const { data, error, pending } = await useLazyFetch('http://localhost:5000/posts/latest')

if (!error.value) {
  posts.value = data.value
}

// methods
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

  new ScrollMagic.Scene({
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
    const controller2 = new ScrollMagic.Controller()
    controllers.push(controller2)

    // Cria uma cena para o elemento atual
    new ScrollMagic.Scene({
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
  const controller3 = new ScrollMagic.Controller()

  const tl2 = gsap.timeline()
  tl2.fromTo('.first', { opacity: 0, y: '100%' }, { opacity: 1, y: '0%', duration: 0.5 })

  new ScrollMagic.Scene({
    triggerElement: '.first',
    offset: -10,
    triggerHook: 'onCenter',
    reverse: true
  })
    .setTween(tl2)
    .addTo(controller3);

  const tl3 = gsap.timeline()
  tl3.fromTo('.second', { opacity: 0, x: '100%' }, { opacity: 1, x: '0%', duration: 0.5 })

  new ScrollMagic.Scene({
    triggerElement: '.second',
    offset: -10,
    triggerHook: 'onCenter',
    reverse: true
  })
    .setTween(tl3)
    .addTo(controller3)

  const tl4 = gsap.timeline()
  tl4.fromTo('.third', { opacity: 0, y: '100%' }, { opacity: 1, y: '0%', duration: 0.5 })

  new ScrollMagic.Scene({
    triggerElement: '.third',
    offset: 20,
    triggerHook: 'onEnter',
    reverse: true
  })
    .setTween(tl4)
    .addTo(controller3)
}

const teste = () => {
  const controller4 = new ScrollMagic.Controller();
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

  new ScrollMagic.Scene({
    triggerElement: '.pinContainer',
    triggerHook: 0,
    duration: scrollDistance
  })
    .addIndicators()
    .setPin(".pinContainer")
    .setTween(tl5)
    .addTo(controller4);
};

</script>

<style lang="scss">
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
  .experiences {
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

.exprience-item {
  font-size: 22px;
  height: 100%;
  font-weight: 500;
  letter-spacing: 0;
  text-align: center;
  border: solid 3px #41b883;
}


.section {
  padding: 3em 0;
  display: flex;

  .content {
    width: 80vw;
    max-width: 800px;
    padding: 2em;
    border: 1px solid #ccc;
    background-color: #fff;
    color: #333;
    display: block;
    margin: auto;
    line-height: 1.6;

    p {
      font-size: 1.2em;
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
  height: 100vh;
  padding: 3em 1em;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 3rem;
  transform: translate3d(0, 0, 0);
  z-index: 2;
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

.panel-box {
  width: 80vw;
  max-width: 800px;
  height: 60vh;
  margin-right: 10vw;
  background: radial-gradient(ellipse, #fff 50%, #fafafa);
  border: 1px solid #ccc;
  display: flex;
  box-shadow: 0 0 1em 0 rgba(#000, 0);
  transition: transform 0.33s, box-shadow 0.33s;
  cursor: pointer;

  &:hover {
    transform: scale(1.01) transform3d(0, 0, 0);
    box-shadow: 0 0 1em 0 rgba(#000, 0.1);
  }

  &:last-child {
    margin-right: 0;
  }

  h1 {
    color: #333;
    display: block;
    margin: auto;
  }
}
</style>
