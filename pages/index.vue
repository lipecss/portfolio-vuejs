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

        <div class="animation-aviator relative block lg:flex bg-red-400" style="height: 92vh; overflow: hidden;">
          <div class="relative  w-full z-50 h-full" style="overflow: hidden;">
            <img class="paper-plane absolute" src="http://static.indigoimages.ca/2016/shop/114450_img01_blueAirplane_45deg.png" width="70"
              alt="">

            <div class="aviator-text block w-full md:w-2/3 lg:w-1/2 lg:absolute top-80">
              <p class="text-3xl xl:text-6xl my-10 lg:my-0 font-normal">
                Eu moro no Brasil que é conhecida pelo seu clima quente, praias paradisíacas e um cenário de
                desenvolvimento acelerado.
              </p>
            </div>
            <img src="~/assets/img/brazil.png" alt="" class="absolute right-0 xl:w-1/3 lg:bottom-40">
          </div>
        </div>

        <div class="overflow-hidden my-50">
          <div data-aos="zoom-in" data-aos-offset="200" class="section lg:flex my-10">
            <div class="relative w-full h-full">
              <img src="~/assets/img/contact.png" class="w-full h-full" alt="">
            </div>
            
            <div class="content px-5">
              <p data-aos-anchor-placement="top-bottom" class="mb-10 md:text-5xl">
                👋🏼 Sou um eterno estudante, um engenheiro de software com Bacharelado em ciência da computação.
              </p>

              <p class="md:text-5xl">Professor, <span style="color: #9146ff">autodidata</span>
                e adoro aprender coisas novas, certamente não sem dificuldades, hehe, mas sempre consegui superar
                obstáculos e resolver os problemas que encontrava!</p>

                <p class="text-g1 md:text-5xl font-bold" style="padding: 5rem 3rem;">
                  Tive a oportunidade de estar em várias posições e cenários de negócios. Uma variedade de campos que me ajudaram a aumentar ainda mais meu conhecimento 😊
                </p>
            </div>
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
                <div v-for="(post, index) in posts" :key="index" :id="`post-card-${index}`" class="panel-box my-8 lg:my-0"
                  :style="postImage(post.img)">
                  <div class="absolute inset-0 bg-gray-900 opacity-50 w-full h-full"></div>
                  <h2
                    class="absolute inset-0 flex justify-center items-center px-10 hover:text-black hover:bg-g1 hover:opacity-70">
                    {{ post.title }}</h2>
                </div>
              </div>
            </section>
          </div>
          <p class="b-big-text">
            Fora da minha vida profissional, amo jogar <span style="color: #fa4454"> Valorant</span> e <span style="color: #2cb49c">Sea of Thieves</span>. 
          </p>
        </div>


        <div id="contact-form">
          <div class="mt-20">
            <h2 class="contacts" style="line-height: 100%; margin: 0;">
              <span class="block" style="backface-visibility: hidden;">Contato</span>
              <span class="block" style="backface-visibility: hidden;">Contato</span>
              <span class="block text-g1 gradient" style="backface-visibility: hidden;">Falar comigo</span>
              <span class="block" style="backface-visibility: hidden;">Contato</span>
            </h2>
          </div>

          <div class="my-80" style="height: 50vh;">
            <form>      
              <input name="name" type="text" class="feedback-input" placeholder="Name" />   
              <input name="email" type="text" class="feedback-input" placeholder="Email" />
              <textarea name="text" class="feedback-input" placeholder="Comment"></textarea>
              <input type="submit" value="SUBMIT"/>
            </form>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
const { stacks } = useEnums()

//data
const posts = ref([])
const isMobile = ref(0)

let gsap = null
let controller4 = null;
let scene4 = null;
let divWidth = 0
let divHeight = 0

const { data, error } = useLazyAsyncData('posts', () => $fetch('http://localhost:5000/posts/latest'))

if (!error.value) {
  posts.value = data.value
}

onMounted(() => {
  if (process.client) {
    isMobile.value = window.innerWidth <= 768
    gsap = window.gsap
    gsap.registerPlugin(MotionPathPlugin)

    // executa as funções de scrollMagic
    experiencesScrollMagic()
    swithesScrollMagic()
    paperPlane()
    contactScrollMagic()
    // if (!isMobile.value) teste()
    //projetTitleScrollMagic()

    window.addEventListener('resize', handleResize)
  }
})

// watch
watch(isMobile, (value) => {
  if (value && scene4 !== null) destroyScene4()
  if (!value && scene4 === null) createScene4()

  const div = document.querySelector('.animation-aviator');

  divWidth = div.offsetWidth
  divHeight = div.offsetHeight

  // if (!value && planeScene !== null) {
  //   console.log('destruir')
  // } else console.log('criar')
})

// methods
const handleResize = () => {
  isMobile.value = window.innerWidth <= 768;
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

const paperPlane = () => {
  const tween = new TimelineLite();
  const plane = document.querySelector('.paper-plane')
  const div = document.querySelector('.animation-aviator');

  if (div) {
    divWidth = div.offsetWidth
    divHeight = div.offsetHeight

    const controller = new window.ScrollMagic.Controller()

    tween.add(
      gsap.to(".paper-plane", 2, {
        motionPath: {
          curviness: 1.25,
          autoRotate: true,
          path: [
          { x: 0, y: 0 },
          { x: 0, y: 0 },
          { x: divWidth * 0.1, y: divHeight * 0.1 },
          { x: divWidth * 0.2, y: divHeight * 0.4, bezier: [{x: divWidth * 0.2 + 20, y: divHeight * 0.4 - 20}, {x: divWidth * 0.2 + 40, y: divHeight * 0.4 - 40}]},
          // { x: divWidth * 0.7, y: divHeight * 0.5, rotation: 720, bezier: [{x: divWidth * 0.45, y: divHeight * 0.5 + 20}, {x: divWidth * 0.45, y: divHeight * 0.5 + 40}]},
          { x: divWidth * 0.85, y: divHeight * 0.2 }
          ]
        }
      })
    )

    new ScrollMagic.Scene({
      triggerElement: ".animation-aviator",
      duration: 2000,
      triggerHook: 0
    })
      .on("update", function (e) {
        const st = e.target.controller().info("scrollDirection")
        // stDiv.text(st); 
        if (st === 'FORWARD') {
          plane.src = 'http://static.indigoimages.ca/2016/shop/114450_img01_blueAirplane_45deg.png';
        } else if (st === 'REVERSE') {
          plane.src = 'http://static.indigoimages.ca/114450_img01_blueAirplane_45deg__REVERSED.png';
        };
      })
      .setTween(tween)
      .setPin(".animation-aviator")
      .addTo(controller)

    const textTween = new TimelineLite();

    textTween.fromTo('.aviator-text', 1, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1 });

    new ScrollMagic.Scene({
      triggerElement: ".animation-aviator",
      duration: 1000,
      triggerHook: 0.9,
    })
      .setTween(textTween)
      .addTo(controller);
  }

}

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




// const teste = () => {
//   const controller4 = new ScrollMagic.Controller()
//   let animFrom = { left: "0" };
//   let scrollDistance = null;
//   const element = document.querySelector('#pin');

//   if (element) {
//     scrollDistance = element.scrollWidth;
//   }

//   const tl5 = gsap.timeline();
//   tl5.fromTo('section.panel-card', 2, animFrom, {
//     left: -scrollDistance,
//     ease: Linear.easeNone
//   });

//   new ScrollMagic.Scene({
//     triggerElement: '.pinContainer',
//     triggerHook: 0,
//     duration: scrollDistance
//   })
//     .setPin(".pinContainer")
//     .setTween(tl5)
//     .addTo(controller4);
// }

const createScene4 = () => {
  controller4 = new ScrollMagic.Controller();
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

  scene4 = new ScrollMagic.Scene({
    triggerElement: '.pinContainer',
    triggerHook: 0,
    duration: scrollDistance
  })
    .setPin(".pinContainer")
    .setTween(tl5)
    .addTo(controller4);
};

const destroyScene4 = () => {
  if (scene4 || planeScene) {
    scene4.destroy(true);
    scene4 = null;
  }
  if (controller4 || planeScene) {
    controller4.destroy(true);
    controller4 = null;
  }
};

const teste = () => {
  destroyScene4();
  createScene4();
};

// const postHover = (event, type) => {
//   const { id } = event.target
//   if (type === 'enter') {
//     gsap.to(`#${id}`, {
//       duration: 0.3,
//       scale: 1.1,
//       ease: 'power2.out',
//       transformOrigin: 'center'
//     })
//   } else {
//     gsap.to(`#${id}`, {
//       duration: 0.3,
//       scale: 1,
//       ease: 'power2.out',
//       transformOrigin: 'center'
//     });
//   }
// }


const postImage = (image) => {
  return {
    backgroundImage: `url(${image})`,
  }
}
</script>

<style lang="scss">
.path {
  position: absolute;
  top: 50%;
  left: 0;
  z-index: 0;
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
  font-size: 200px;
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
  color:white;
  font-family: Helvetica, Arial, sans-serif;
  font-weight:500;
  font-size: 18px;
  border-radius: 5px;
  line-height: 22px;
  background-color: transparent;
  border:2px solid #CC6666;
  transition: all 0.3s;
  padding: 13px;
  margin-bottom: 15px;
  width:100%;
  box-sizing: border-box;
  outline:0;
}

.feedback-input:focus { border:2px solid #CC4949; }

textarea {
  height: 150px;
  line-height: 150%;
  resize:vertical;
}

[type="submit"] {
  font-family: 'Montserrat', Arial, Helvetica, sans-serif;
  width: 100%;
  background:#CC6666;
  border-radius:5px;
  border:0;
  cursor:pointer;
  color:white;
  font-size:24px;
  padding-top:10px;
  padding-bottom:10px;
  transition: all 0.3s;
  margin-top:-4px;
  font-weight:700;
}
[type="submit"]:hover { background:#CC4949; }
</style>
