<template>
  <div class="contact-form">
    <div class="section-title text-left text-5xl mb-10">
      <p class="description text-g1 font-medium" style="line-height: 108%;">Estou disponível para trabalho autônomo</p>
    </div>
    <form
      @submit.prevent="sendValues"
    >
      <label for="name">
        <input id="name" v-model="name"  type="text" name="name" placeholder="Seu nome" required autocomplete="new-password">
      </label>
      <label for="email">
        <input id="email" v-model="email" type="email"  name="email" placeholder="Seu email" required autocomplete="new-password">
      </label>
      <label for="subject">
        <input id="subject" v-model="subject" type="text"  name="subject" placeholder="Seu assunto" required autocomplete="new-password">
      </label>
      <label for="">
        <textarea type="text" v-model="message" name="message" placeholder="Sua mensagem" required autocomplete="new-password"></textarea>
      </label>
      <button type="submit" value="submit" name="submit">Enviar</button>
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

input, textarea {
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

button {
  background: #42b883;
  font-size: 16px;
  text-transform: uppercase;
  letter-spacing: 2px;
  padding: 15px 40px;
  border: 2px solid #42b883;
  border-radius: 6px;
  display: inline-block;
  font-weight: 500;
  transition: .3s;

  &:hover {
    background: transparent;
    color: #42b883;
    box-shadow: 0 10px 15px 0 rgb(0 0 0 / 10%);
    transform: translateY(-5px);
  }
}

img {
  border-radius: 5px;
  box-shadow: 0 25px 65px rgb(0 0 0 / 10%);
}
</style>
