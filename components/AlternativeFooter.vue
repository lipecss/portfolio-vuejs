<template>
  <div class="block lg:flex">
    <div class="w-full lg:w-1/2 text-center">
      <div class="footer-left h-full rounded-t-md">
        <div class="inner text-left relative z-20">
          <span class="text-lg">Estamos preparados</span>
          <h2 class="text-6xl font-extrabold pb-10">Vamos ao<br> trabalho</h2>
          <button class="button-read-more" @click="goToContact">Fale comigo</button>
        </div>
      </div>
    </div>

    <div class="w-full lg:w-1/2 text-center">
      <div class="relative h-full">
        <div class="footer-right absolute left-0 right-0 bottom-0 grid items-end">
          <div class="brand">
            <p>Felipecss</p>
          </div>
          <div class="copyright">
            <p>Copyright © {{ getCurrentYear }} Felipecss. Todos os direitos reservados.</p>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
const router = useRouter()

const getCurrentYear = computed(() => {
  return new Date().getFullYear()
})

const goToContact = () => {
  router.replace({ path: '/', hash: '#contact-area' })
}
</script>


<style lang="scss">
.footer-left {
  position: relative;
  background: linear-gradient(145deg, var(--g1), var(--g2));
  padding: 60px 30px;
  z-index: 2;
  color: #fff;
  height: 600px;

  &:before {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-image: url('~/assets/img/pattern.jpg');
    background-size: cover;
    content: "";
    z-index: 1;
    opacity: .1;
  }

  .inner {
    button {
      padding: 0 23px;
      height: 40px;
      line-height: 34px;
      border: 2px solid #fff;
      background: transparent;
      border-radius: 4px;
      font-size: 14px;
      text-transform: uppercase;
      transition: .3s;
      color: #fff;
    }

    &::after {
      content: url('~/assets/img/felipecss.png');
      position: absolute;
      top: 8%;
      left: 45%;
      z-index: -1;
      transform: translateY(-50%);
      width: 252px;
      height: 273px;
      opacity: 0.8;
      transform: scale(0.8);
    }
  }
}

.footer-right {
  height: 270px;
  background: linear-gradient(145deg, #383838, #000000);
  padding: 45px;
  z-index: 2;
  color: #c6c9d8;
}

@media (min-width: 1024px) {
  .footer-left {
    height: 360px;
    padding: 62px 76px;

    .inner {
      &::after {
        top: -4%;
        left: 60%;
        transform: scale(1);
      }
    }
  }
}
</style>
