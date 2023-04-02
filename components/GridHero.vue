<template>
  <div class="hero-content">
    <div id="tiles" ref="tilesRef" :style="border"></div>
    
    <div v-show="!toggled">
      <h1 id="title" ref="title" class="font-medium sm:text-2xl centered">
        Bem vindo ao site do
        <span class="fancy">Felipecss</span>
      </h1>
      <!-- <div class="click vertical-text absolute top-4 md:top-1/4 left-6 md:left-20 font-thin whitespace-no-wrap text-sm uppercase">
        Clique aqui
      </div> -->
    </div>


    <div v-show="toggled" id="title" ref="title" class="centered items-center">
      <span class="font-bold inline">
        Eu <span class="font-bold inline">
          <VueWriter 
            :typeSpeed="70"
            :array="array"
          />
        </span>
      </span>
    </div>
  </div>
</template>

<script setup>
import anime from 'animejs/lib/anime.es.js'

// data
let columns = ref(0)
let rows = ref(0)
let toggled = ref(false)
const tilesRef = ref(null)
const array = ref([
  'sou um criatvo desenvolvedor Front End',
  'sou desenvolvedor de game',
  'amo Vuejs 💚',
  'amo jogar video game 🕹️', 
  'sou auto didata'
])

const border = computed(() => {
  if (!toggled.value) {
    return {
      animation: 'background-pan 10s linear infinite',
      borderBottom: '1px solid red',
      borderImage: 'linear-gradient( to right, var(--g1), var(--g2), var(--g1) ) 1'
    }
  } else return {}
})

// methods
const handleOnClick = (index) => {
  toggled.value = !toggled.value;

  document.body.classList.toggle("toggled");

  anime({
    targets: ".tile",
    opacity: toggled.value ? 0 : 1,
    delay: anime.stagger(50, {
      grid: [columns.value, rows.value],
      from: index,
    }),
  });
};

const createTile = index => {
  const tile = document.createElement("div")

  tile.classList.add("tile");

  tile.style.opacity = toggled.value ? 0 : 1

  tile.onclick = e => handleOnClick(index)

  return tile
}

const createTiles = quantity => {
  Array.from(Array(quantity)).map((tile, index) => {
    tilesRef.value.appendChild(createTile(index))
  })
}

const createGrid = () => {
  if (tilesRef.value !== null) {
    tilesRef.value.innerHTML = ''

    const size = document.body.clientWidth > 800 ? 100 : 50;

    columns.value = Math.floor(document.body.clientWidth / size)
    rows.value = Math.floor(document.body.clientHeight / size)

    tilesRef.value.style.setProperty("--columns", columns.value)
    tilesRef.value.style.setProperty("--rows", rows.value)

    createTiles(columns.value * rows.value)
  }
};

onMounted(() => {
  createGrid();
  window.onresize = () => createGrid();
});

createGrid();
</script>

<style lang="scss">
@keyframes background-pan {
  from {
    background-position: 0% center;
  }
  
  to {
    background-position: -200% center;
  }
}

.hero-content {
  animation: background-pan 10s linear infinite;
  background: linear-gradient(
    to right,
    var(--g1),
    var(--g2),
    var(--g1)
  );
  background-size: 200%;
  height: 100vh;
  overflow: hidden;
  margin: 0px;
}

.toggled {
  animation: none;
}

.toggled > #title {
  opacity: 0;
}

.toggled > #icon {
  opacity: 1;
}

#tiles > .tile:hover {
  opacity: 0.1 !important;
}

.centered {
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
}

#tiles {
  height: calc(100vh - 1px);
  width: calc(100vw - 1px);
  position: relative;
  z-index: 2;
  
  display: grid;
  grid-template-columns: repeat(var(--columns), 1fr);
  grid-template-rows: repeat(var(--rows), 1fr);
}

.tile {
  cursor: pointer;
  position: relative;
}

.tile:hover:before {
  background-color: rgb(0, 0, 0);
}

.tile:before {
  background-color: rgb(0, 0, 0);
  content: "";
  inset: 0.5px;
  position: absolute;
}

#title {
  color: white;
  font-size: 6vw;
  margin: 0px;
  pointer-events: none;
  transition: opacity 1200ms ease;
  width: 50vw;
  z-index: 3;
}

#title > .fancy {
  color: var(--g1);
  font-size: 1.5em;
  line-height: 1em;
  font-weight: 700;
}


// .click:hover {

//   padding: 10px;
//   border-image: linear-gradient( to right, #35495e, var(--g1) ) 1;
//   box-shadow: 10px 6px 2px #ffffff;
//   border: 2px solid #3d9477;
//   transition: all 0.3s ease;
// }
</style>
