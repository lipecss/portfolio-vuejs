<template>
  <div>
    <GridHero />
    <div class="w-full h-full z-50 px-4">
      <div class="z-50" ref="container">
        <div>
          <p class="b-big-text">
            Descubra quem eu sou e o que eu posso fazer por você
          </p>

          <nuxt-link to="/about">TESTE</nuxt-link>

          <p class="b-big-text">
            <span class="b-intro-arrow b-intro__accent">
              <span
                style="display: inline-block; backface-visibility: hidden; opacity: 0.996797; animation: fade 300ms ease 1 forwards, bounce 1200ms linear infinite;">↓</span>
            </span>
          </p>
        </div>

        <div class="inner-container">
          <div class="grid-t grid-cols-3 gap-y-8 justify-items-center">
            <div class="item">
              <div class="color1 color">
                <span class="text-sm">texto cima</span>
                <span class="text-sm">texto cima</span>
              </div>
            </div>
            <div class="item">
              <div class="color2 color">
                <span class="text-sm">texto cima</span>
                <span class="text-sm">texto cima</span>
              </div>
            </div>
            <div class="item">
              <div class="color3 color">
                <span class="text-sm">texto cima</span>
                <span class="text-sm">texto cima</span>
              </div>
            </div>
            <div class="item">
              <div class="color4 color">
                <span class="text-sm">texto cima</span>
                <span class="text-sm">texto cima</span>
              </div>
            </div>
            <div class="item">
              <div class="color5 color">
                <span class="text-sm">texto cima</span>
                <span class="text-sm">texto cima</span>
              </div>
            </div>
            <div class="item">
              <div class="color6 color">
                <span class="text-sm">texto cima</span>
                <span class="text-sm">texto cima</span>
              </div>
            </div>
            <div class="item">
              <div class="color7 color">
                <span class="text-sm">texto cima</span>
                <span class="text-sm">texto cima</span>
              </div>
            </div>
            <div class="item">
              <div class="color8 color">
                <span class="text-sm">texto cima</span>
                <span class="text-sm">texto cima</span>
              </div>
            </div>
            <div class="item">
              <div class="color9 color">
                <span class="text-sm">texto cima</span>
                <span class="text-sm">texto cima</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <p class="b-big-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>

          <p class="b-big-text">
            Fuga similique hic tempora blanditiis ad! Repellendus, nobis deleniti! Inventore, atque recusandae?
          </p>
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

</script>

<style>
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

@media (min-width: 768px) {
  .grid-t {
    grid-template-columns: repeat(6, 1fr);
  }

  .item:hover {
    width: 98px;
    height: 98px;
    transform: scale(1.6);
  }
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

.color > * {
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

</style>
