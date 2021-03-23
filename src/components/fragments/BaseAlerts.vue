<template>
  <div v-if="propClearAlert" class="base-alerts">
      <ul v-if="propTypeAlert == 'success'" class="base-alerts__alerts-list success">
        <li v-for="(message, index) in errorsList" :key="index">
          {{message}}
        </li>
      </ul>
      <ul v-else class="base-alerts__alerts-list error">
        <li v-for="(message, index) in errorsList" :key="index">
          {{message}}
        </li>
      </ul>
      <p class="base-alerts__counter">{{countDown}}</p>
      <span @click="closeAlert" class="closebtn base-alerts__btn-close" >&times;</span>
  </div>
</template>

<script>
export default {
  name: 'BaseAlerts',
  beforeCreate () {},
  created () {},
  beforeMount () {},
  mounted () {},
  beforeUpdate () {},
  updated () {},
  beforeDestroy () {
    this.closeAlert()
  },
  destroyed () {},
  data () {
    return {
      countDown: 3
    }
  },
  props: {
    propClearAlert: {
      type: Boolean,
      default: false,
      validator: function (value) {
        return [true, false].indexOf(value) !== -1
      }
    },
    propTypeAlert: {
      type: String,
      default: 'error'
    }
  },
  computed: {},
  methods: {
    closeAlert () {
      const status = false
      this.countDown = 3
      this.clearErrors()
      this.setBlockUi(false)
      this.$emit('alert-is-close', status)
    },
    countDownTimer () {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1
          this.countDownTimer()
        }, 1000)
      } else {
        this.setBlockUi(false)
        this.closeAlert()
      }
    }
  },
  filters: {},
  watch: {
    blockUi (value) {
      if (value) {
        this.countDownTimer()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.base-alerts {
  text-align: center;
  margin-bottom: 20px;
  z-index: 10000;
  position: fixed;
  left: 50%;
  top: 5%;
  transform: translate(-50%, -50%);
  width: 80%;
}

.base-alerts__counter {
  position: absolute;
  font-size: 1.8em;
  font-weight: 900;
  color: #fff;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
}
.base-alerts .base-alerts__alerts-list {
  list-style-type: none;
  padding: 10px;
  text-align: center;
  font-weight: 900;
  border-radius: 10px;
  width: 100%;
  margin: 0 auto;
  color: #fff
}
.success {
  background: $vue-green;
}
.error {
  background: $red;
}
.base-alerts .base-alerts__btn-close {
  position: absolute;
  font-size: 1.8em;
  font-weight: 900;
  right: -23px;
  top: -18px;
  cursor: pointer;
  border-radius: 75%;
  color: #fff;
}
.base-alerts .base-alerts__btn-close:hover {
  color: $red;
}

@media screen and (min-width: 768px) {
  .base-alerts {
    width: 80%;
  }
}
</style>
