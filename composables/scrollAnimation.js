export const useScrollAnimation = () => {

  const iconsScrollMagic = () => {
    TweenLite.defaultEase = Linear.easeNone
    const controller = new window.ScrollMagic.Controller()
    const tl = new TimelineMax()

    tl.staggerFrom('.box', 5, {
      scale: 0,
      stagger: {
        from: 'center',
        amount: 0.85
      }
    })

    new window.ScrollMagic.Scene({
      triggerElement: '#stage',
      duration: '20%',
      triggerHook: 0.25
    })
      .setTween(tl)
      .addTo(controller)

    var pinIntroScene = new window.ScrollMagic.Scene({
      triggerElement: '.section-2',
      triggerHook: 0.2,
      duration: '150%'
    })
      .setPin('.section-2')
      .addTo(controller)
  }

  const experiencesScrollMagic = () => {
    const experiences = document.querySelectorAll('.experiences')

    //  Percorre todas as spans de experiência e cria uma cena para cada uma
    experiences.forEach((experience) => {
      const spans = experience.querySelectorAll('span')
      spans.forEach((span, index) => {
        const delay = index * 0.2 // Adiciona um delay de 0.2s para cada span
        createSceneForSpan(
          span,
          'onBegin', // Gatilho aumenta em 0.2 a cada span
          '25%', // Duração da cena é metade do tamanho do elemento
          delay // Adiciona o atraso na criação da timeline
        )
      })
    })
  }

  const createSceneForSpan = (span, triggerHook, duration, delay) => {
    const controller = new window.ScrollMagic.Controller()
    const tl = gsap.timeline()

    tl.fromTo(span, { opacity: 0 }, { opacity: 1, duration: 1, delay: delay })

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
        triggerHook: 'onEnter',
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
      .addTo(controller3)

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
    const tween = new TimelineLite()
    const plane = document.querySelector('.paper-plane')
    const div = document.querySelector('.animation-aviator')

    let divWidth, divHeight

    const updatePlanePosition = () => {
      if (div) {
        divWidth = div.offsetWidth
        divHeight = div.offsetHeight

        tween.progress(0).kill()
        tween.clear()

        tween.add(
          gsap.to('.paper-plane', 2, {
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
        )
      }
    }


    if (div) {
      divWidth = div.offsetWidth
      divHeight = div.offsetHeight

      const controller = new window.ScrollMagic.Controller()

      tween.add(
        gsap.to('.paper-plane', 2, {
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
      )
      new window.ScrollMagic.Scene({
        triggerElement: '.animation-aviator',
        duration: 2000,
        triggerHook: 0
      })
        .on('update', function (e) {
          const st = e.target.controller().info('scrollDirection')
          if (st === 'FORWARD') {
            plane.src = 'https://static.indigoimages.ca/2016/shop/114450_img01_blueAirplane_45deg.png'
          } else if (st === 'REVERSE') {
            plane.src = 'https://static.indigoimages.ca/114450_img01_blueAirplane_45deg__REVERSED.png'
          }
        })
        .setPin('.animation-aviator')
        .setTween(tween)
        .addTo(controller)

      const textTween = new TimelineLite()

      textTween.fromTo('.aviator-text', 1, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1 })

      new window.ScrollMagic.Scene({
        triggerElement: '.animation-aviator',
        duration: 1000,
        triggerHook: 0.9,
      })
        .setTween(textTween)
        .addTo(controller)

      window.addEventListener('resize', updatePlanePosition)
    }
  }

  const contactScrollMagic = () => {
    const contacts = document.querySelectorAll('.contacts')

    //  Percorre todas as spans de experiência e cria uma cena para cada uma
    contacts.forEach((experience) => {
      const spans = experience.querySelectorAll('span')
      spans.forEach((span, index) => {
        const delay = index * 0.2 // Adiciona um delay de 0.2s para cada span
        createSceneForSpan(
          span,
          'onBegin', // Gatilho aumenta em 0.2 a cada span
          '25%', // Duração da cena é metade do tamanho do elemento
          delay // Adiciona o atraso na criação da timeline
        )
      })
    })
  }

  const socialScrollMagic = () => {
    const horizontalSections = gsap.utils.toArray('section.horizontal')

    horizontalSections.forEach(function (sec, i) {

      var thisPinWrap = sec.querySelector('.pin-wrap');
      var thisAnimWrap = thisPinWrap.querySelector('.animation-wrap');

      var getToValue = () => -(thisAnimWrap.scrollWidth - window.innerWidth);

      gsap.fromTo(thisAnimWrap, {
        x: () => thisAnimWrap.classList.contains('to-right') ? 0 : getToValue()
      }, {
        x: () => thisAnimWrap.classList.contains('to-right') ? getToValue() : 0,
        ease: "none",
        scrollTrigger: {
          trigger: sec,
          start: "center center",
          end: () => "+=" + (thisAnimWrap.scrollWidth - window.innerWidth),
          pin: thisPinWrap,
          //invalidateOnRefresh: true,
          //anticipatePin: 1,
          scrub: true,
          //markers: true,
        }
      });

    });
  }

  const postScrollMagic = () => {
    const controller9 = new window.ScrollMagic.Controller()
    let animFrom = { left: '0' }
    let scrollDistance = null
    const element = document.querySelector('#pin')
    const panel = document.querySelector('#panel-card')

    const adjustSceneDuration = () => {
      if (element && scene4) {
        scrollDistance = element.scrollWidth
        scene4.duration(scrollDistance)
      }
    }

    // Adiciona listener de resize antes de atualizar o scrollDistance
    window.addEventListener('resize', adjustSceneDuration)

    //scrollDistance = element ? element.scrollWidth : 0
    //scrollDistance = panel.clientWidth - element.clientWidth
    // scrollDistance = 3020

    // Atualiza scrollDistance no carregamento da página
    scrollDistance = element ? element.scrollWidth - 300 : 0

    const tl5 = gsap.timeline()
    tl5.fromTo('section.panel-card', 4, animFrom, {
      left: -scrollDistance,
      ease: Linear.easeNone
    })

    // Cria a cena ScrollMagic após definir o valor de scrollDistance
    const scene4 = new window.ScrollMagic.Scene({
      triggerElement: '.pinContainer',
      triggerHook: 0,
      duration: scrollDistance
    })
      .setPin('.pinContainer')
      .setTween(tl5)
      .addTo(controller9)
  }

  const projectScrollMagic = () => {
    gsap.registerPlugin(ScrollTrigger)
    //const cards = gsap.utils.toArray(".project-card")

    const cards = document.querySelectorAll('.project-card')

    cards.forEach((card, i) => {
      gsap.to(card, {
        scale: () => 0.8 + i * 0.035,
        ease: "none",
        scrollTrigger: {
          trigger: card,
          start: "center-=" + 40 * i + " 40%",
          end: "center 20%",
          scrub: true
        }
      })

      ScrollTrigger.create({
        trigger: card,
        start: "center-=" + 40 * i + " 40%",
        end: "center center",
        endTrigger: ".end-element",
        pin: true,
        pinSpacing: false,
        id: "card-" + i
      })
    })
  }

  return {
    iconsScrollMagic,
    experiencesScrollMagic,
    swithesScrollMagic,
    projetTitleScrollMagic,
    paperPlane,
    contactScrollMagic,
    socialScrollMagic,
    postScrollMagic,
    projectScrollMagic
  }
}
