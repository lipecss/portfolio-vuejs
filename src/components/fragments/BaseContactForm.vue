<template>
  <div class="contact-form">
    <div class="section-title text-left">
      <h2 class="title">Hire Me.</h2>
      <p class="description">I am available for freelance work. Connect with me</p>
    </div>
    <form
      @submit="checkForm"
      action=""
      method=""
    >
      <label for="name">
        <input id="name" v-model="name"  type="text" name="name" placeholder="Your Name" required autocomplete="off">
      </label>
      <label for="email">
        <input id="email" v-model="email" type="email"  name="email" placeholder="Your Email" required autocomplete="new-password">
      </label>
      <label for="subject">
        <input id="subject" v-model="subject" type="text"  name="subject" placeholder="Your Subject" required autocomplete="new-password">
      </label>
      <label for="">
        <textarea type="text" name="message" placeholder="Your Message"></textarea>
      </label>
      <button type="submit" value="submit" name="submit">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'BaseHeroImage',
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
      subject: null
    }
  },
  props: {},
  computed: {},
  methods: {
    checkForm: function (e) {
      if (this.name && this.email && this.subject) {
        return true
      }

      e.preventDefault()
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
  color: #fff;
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
