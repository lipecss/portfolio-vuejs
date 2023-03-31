<template>
  <div class="nav w-full relative">
    <button class="card" :class="{ expandido: expand }" @click="toggle">
      <ClientOnly>
        <font-awesome-icon v-if="!expand" icon="fa-solid fa-bars" color="black" />
      </ClientOnly>
    </button>

    <div v-if="expand" class="content">
      <button class="card-close" @click="expand = false">
        <ClientOnly>
          <font-awesome-icon :icon="['fas', 'x']" />
        </ClientOnly>  
      </button>

      <div class="flex flex-row min-h-screen justify-center items-center">
        <ul>
          <li 
            v-for="(option, index) in optionList"
            :key="index"
            class="hover:cursor-pointer"
            @click="gotTo(option.path)"
          >
            <span :data-text="option.dataText">{{ option.text }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
const router = useRouter()

let expand = ref(false)

const optionList = ref([
  { path: '/', dataText: 'Inicio', text: 'Inicio' },
  { path: 'about', dataText: 'Sobre', text: 'Sobre' },
  { path: '', dataText: 'Projetos', text: 'Projetos' }
])

const toggle = () => {
  if (!expand.value) expand.value = true
}

const gotTo = (path) => {
  if (path) {
    expand.value = false
    router.push({ path })
  }
}
</script>


<style lang="scss" scoped>
.nav {
  position: fixed;
  z-index: 90;
}
.card {
  position: fixed;
  top: 2%;
  right: 2%;
  width: 38px;
  height: 38px;
  background: #ffffff;
  transition: all 0.3s ease-out;
  z-index: 9;
}

.card.expandido {
  transition: all 0.3s ease-out;
  position: fixed;
  top: 0;
  right: 0;
  background: #000000;
  width: 100%;
  height: 100%;
  z-index: 90;
}
.content {
  z-index: 999;
  height: 100vh;
  position: relative;
  transition: all 0.3s ease-out;
  background-image: radial-gradient( rgba(255, 255, 255, 0.2) 8%, transparent 8% );
  background-position: 0% 0%;
  background-size: 14vmin 14vmin;
}
.card-close {
  position: fixed;
  top: 2%;
  right: 2%;
  width: 38px;
  height: 38px;
  background: var(--g1);
  transition: all 0.3s ease-out;
  z-index: 9;
}

ul {
  position: relative;
}

ul li {
  list-style: none;
  text-align: center;
}

ul li span {
  color: #333;
  text-decoration: none;
  font-size: 3em;
  padding: 5px 20px;
  display: inline-flex;
  font-weight: 700;
  transition: 0.5s;
}

ul li:hover span {
  color: #000;
  background: #ffffff;
}

ul li span:before {
  content: '';
  position: absolute;
  top: 50%;
  left: 40%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 77%;
  color: rgba(0, 0, 0, .1);
  border-radius: 50%;
  z-index: -1;
  opacity: 0;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 500px;
  transition: letter-spacing 0.5s, left 0.5s;
}

ul li span:hover:before {
  content: attr(data-text);
  opacity: 1;
  left: 50%;
  letter-spacing: 10px;
  width: 1800px;
  height: 1800px;
  color: var(--g1)
}

@media (min-width: 768px) {
  .content {  background-size: 5vmin 5vmin; };

}

@media (min-width: 1024px) {
  ul li span:before {
    font-size: 3em;
  }
}

</style>
