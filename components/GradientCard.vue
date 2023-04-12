<template>
  <div class="gradient-card">
    <div class="gradient-card-content">
      <h3 class="gradient-card-title">{{ title }}</h3>
      <h4 class="gradient-card-subtitle" ref="subtitle"></h4>
    </div>
  </div>
</template>

<script setup>
// props
const props = defineProps({
  title: { type: String },
  text: { type: String, required: true }
})
const subtitle = ref(null)

onMounted(() => {

  const createWord = (text, index) => {
    const word = document.createElement("span")

    word.innerHTML = `${text} `;

    word.classList.add("gradient-card-subtitle-word");
    word.style.transitionDelay = `${index * 40}ms`;

    return word
  }

  if (subtitle) {
    const addWord = (text, index) => subtitle.value.appendChild(createWord(text, index));

    const createSubtitle = text => text.split(" ").map(addWord);

    createSubtitle(props.text);
  }
})

</script>



<style lang="scss">
.gradient-card {
  --border: rgb(3, 169, 244);
  
  --g1e: rgb(98, 0, 234);
  --g2e: rgb(236, 64, 122);
  --g3e: rgb(253, 216, 53);
}


.gradient-card {
  aspect-ratio: 1 / 1.6;
  border: 0.5vmin solid var(--g1);
  cursor: pointer;
  position: relative;
  width: 56vmin;
  background-color: rgb(10, 10, 10);
  display: grid;
  height: 40vh;
  margin: 0px;
  padding: 0px;
  place-items: center;
}

.gradient-card:hover:before {
  background-position: 100% 100%;
  transform: scale(1.08, 1.03);
}

.gradient-card:hover > .gradient-card-content {
  background-position: -10% 0%;
}

.gradient-card:hover > .gradient-card-icon {
  color: white; 
}

.gradient-card:hover > .gradient-card-content > .gradient-card-subtitle > .gradient-card-subtitle-word {  
  opacity: 1;
  transform: translateY(0%);
  transition: opacity 0ms, transform 200ms cubic-bezier(.90, .06, .15, .90);
}

.gradient-card:before {
  background: linear-gradient(
    130deg, 
    transparent 0% 33%, 
    var(--g1e) 66%, 
    var(--g2e) 83.5%, 
    var(--g3e) 100%
  );
  background-position: 0% 0%;
  background-size: 300% 300%;
  content: "";
  height: 100%;
  left: 0px;
  pointer-events: none;
  position: absolute;
  top: 0px;
  transition: background-position 350ms ease, transform 350ms ease;
  width: 100%;
  z-index: 1;
}

.gradient-card-content {
  background-image: radial-gradient(
    rgba(255, 255, 255, 0.2) 8%, 
    transparent 8%
  );
  background-position: 0% 0%;
  background-size: 5vmin 5vmin;
  height: calc(100% - 0vmin);
  padding: 5vmin;
  position: relative;
  transition: background-position 350ms ease;
  width: calc(100% - 0vmin);
  z-index: 2;
}

.gradient-card-title,
.gradient-card-subtitle {
  color: white;
  font-family: "Anek Latin", sans-serif;
  font-weight: 400;
  margin: 0px;
}

.gradient-card-title {
  font-size: 6vmin;
}

.gradient-card-subtitle {
  font-size: 3vmin;
  margin-top: 2vmin;
}

.gradient-card-subtitle-word {
  display: inline-block;
  margin: 0vmin 0.3vmin;
  opacity: 0;
  position: relative;  
  transform: translateY(40%);
  transition: none;
}
</style>
