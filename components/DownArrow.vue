<template>
  <div class="arrow-container w-full m-auto mt-10 mb-20">
    <div class="arrow-down"></div>
  </div>
</template>

<style scoped>
html, body {
    height: 100%;
}
body {
    height: 100%;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}

.arrow-container {
  width: 70px;
  /* cubic-bezier-easing = sine / mehr Beispiele: https://easings.net/ */
  animation: bounce 1600ms infinite cubic-bezier(0.445, 0.05, 0.55, 0.95);
  cursor: pointer;
  height: 20px;
}

.arrow-down {
  height: 23px;
  background: white;
  transform: rotate(45deg);
  transform-origin: 0% 0%;
  border-radius: 5px;
}
.arrow-down:after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  bottom: 0;
  left: 100%;
  border-radius: 5px;
  background: white;
  transform: rotate(-90deg);
  transform-origin: 0% 100%;
}

@keyframes bounce {
50% {
    transform: translateY(-15px);
  }
}

</style>
