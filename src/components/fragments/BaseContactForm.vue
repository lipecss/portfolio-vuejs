<template>
  <div class="contact-form">
    <div class="section-title text-left">
      <h2 class="title">{{ $t('components.fragments.contactForm.title') }}</h2>
      <p class="description">{{ $t('components.fragments.contactForm.subtitle') }}</p>
    </div>
    <form
      @submit.prevent="sendValues"
    >
      <label for="name">
        <input id="name" v-model="name"  type="text" name="name" :placeholder="$t('inputs.name.placeholder')" required autocomplete="off" :disabled="blockUi">
      </label>
      <label for="email">
        <input id="email" v-model="email" type="email"  name="email" :placeholder="$t('inputs.email.placeholder')" required autocomplete="new-password" :disabled="blockUi">
      </label>
      <label for="subject">
        <input id="subject" v-model="subject" type="text"  name="subject" :placeholder="$t('inputs.subject.placeholder')" required autocomplete="new-password" :disabled="blockUi">
      </label>
      <label for="">
        <textarea type="text" v-model="message" name="message" :placeholder="$t('inputs.message.placeholder')" :disabled="blockUi"></textarea>
      </label>
      <button type="submit" value="submit" name="submit" :disabled="blockUi">{{ $t('buttons.send') }}</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'BaseContactForm',
  beforeCreate () {},
  created () {},
  beforeMount () {},
  mounted () {
  },
  beforeUpdate () {},
  updated () {},
  destroyed () {},
  data () {
    return {
      name: null,
      email: null,
      subject: null,
      message: null

    }
  },
  props: {},
  computed: {},
  methods: {
    resetInputs () {
      this.name = ''
      this.email = ''
      this.subject = ''
      this.message = ''
    },
    sendValues () {
      const data = {
        name: this.name,
        from: this.email,
        subject: this.subject,
        message: this.message
      }
      this.$emit('contact', data)
      this.resetInputs()
    }
  },
  filters: {},
  watch: {}
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
  border: 1px solid $clean-gray;
  border-radius: 5px;
  height: 50px;
  line-height: 46px;
  margin-bottom: 20px;
  outline: none;
  color: $vue-green;
  font-size: 15px;
  letter-spacing: .1px;
  transition: 0.8s;

  &:focus {
    border-color: $vue-green;
  }
}

textarea {
  margin-top: 0px;
  margin-bottom: 20px;
  height: 153px;
  resize: none;
}

button {
  background: $vue-green;
  font-size: 16px;
  text-transform: uppercase;
  letter-spacing: 2px;
  padding: 15px 40px;
  border: 2px solid $vue-green;
  border-radius: 6px;
  display: inline-block;
  font-weight: 500;
  transition: .3s;

  &:hover {
    background: transparent;
    color: $vue-green;
    box-shadow: 0 10px 15px 0 rgb(0 0 0 / 10%);
    transform: translateY(-5px);
  }
}

img {
  border-radius: 5px;
  box-shadow: 0 25px 65px rgb(0 0 0 / 10%);
}

.section-title {
  margin-bottom: 50px;
  color: #fff;

  h2 {
    font-size: 60px;
    margin-bottom: 8px;
    color: $vue-green;
    font-weight: 700;
  }

  p {
    font-size: 18px;
    line-height: 30px;
  }
}
</style>
