<template>
  <div class="contact-form">
    <div class="section-title text-left text-5xl mb-10">
      <p class="description text-g1 font-medium" style="line-height: 108%;">Estou disponível para trabalho autônomo</p>
    </div>
    <form @submit.prevent="sendValues">
      <label for="name">
        <input id="name" v-model="name" type="text" name="name" placeholder="Seu nome" required
          autocomplete="new-password">
      </label>
      <label for="email">
        <input id="email" v-model="email" type="email" name="email" placeholder="Seu email" required
          autocomplete="new-password">
      </label>
      <label for="subject">
        <input id="subject" v-model="subject" type="text" name="subject" placeholder="Seu assunto" required
          autocomplete="new-password">
      </label>
      <label for="">
        <textarea type="text" v-model="message" name="message" placeholder="Sua mensagem" required
          autocomplete="new-password"></textarea>
      </label>
      <button 
        class="disabled:opacity-75 w-full h-12 p-2 disabled:cursor-not-allowed button border-2 border-g1 text-g1 mr-3 hover:border-g3 active:border-g3"
        type="submit"
        name="submit"
        value="submit"
      >
      Enviar
      </button>
    </form>
  </div>
</template>

<script setup>
// datas
let name = ref('')
let email = ref('')
let subject = ref('')
let message = ref('')

// emits
const emit = defineEmits(['contact'])

// methods
const resetInputs = () => {
  name.value = ''
  email.value = ''
  subject.value = ''
  message.value = ''
}
const sendValues = () => {
  const data = {
    name: name.value,
    from: email.value,
    subject: subject.value,
    message: message.value
  }

  emit('contact', data)
  resetInputs()
}
</script>

<style lang="scss" scoped>
label {
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  padding: 0 20px;
  background: transparent;
  border: 1px solid #c6c9d8;
  border-radius: 5px;
  height: 50px;
  line-height: 46px;
  margin-bottom: 20px;
  outline: none;
  color: #42b883;
  font-size: 15px;
  letter-spacing: .1px;
  transition: 0.8s;

  &:focus {
    border-color: #42b883;
  }
}

textarea {
  margin-top: 0px;
  margin-bottom: 20px;
  height: 153px;
  resize: none;
}

img {
  border-radius: 5px;
  box-shadow: 0 25px 65px rgb(0 0 0 / 10%);
}
</style>
