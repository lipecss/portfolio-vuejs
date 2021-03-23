<template>
  <div class="footer">
    <b-container>
      <b-row class="text-center">
        <b-col cols="12" sm="6" lg="4" md="6">
          <div class="brand">
            <p>Felipecss</p>
          </div>
        </b-col>
        <b-col cols="12" sm="6" lg="4" md="6">
          <div class="social text-center">
            <ul>
              <li>
                <a
                  href="https://github.com/lipecss"
                  aria-label="github" rel="noopener"
                  target="_blank"
                  alt="Github"
                >
                  <font-awesome-icon :icon="['fab', 'github']" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/felipecss/"
                  aria-label="linkedin" rel="noopener"
                  target="_blank"
                  alt="Linkedin"
                >
                  <font-awesome-icon :icon="['fab', 'linkedin-in']" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/felipecss/"
                  aria-label="instagram"
                  rel="noopener"
                  target="_blank"
                  alt="Instagram"
                >
                  <font-awesome-icon :icon="['fab', 'instagram']" />
                </a>
              </li>
              <li>
                <span
                  aria-label="instagram"
                  rel="noopener"
                  class="i18n"
                  alt="I18n"
                  @mouseenter="isHover = true"
                >
                  <font-awesome-icon :icon="['fa', 'globe-americas']"/>
                  <div class="i18n__content" v-if="isHover" @mouseleave="isHover = false">
                    <button
                      class="i18n__content-button"
                      v-for="lang in languages"
                      :key="lang.flag"
                      @click="changeLocale(lang.language)"
                    >
                      <flag :iso="lang.flag" v-bind:squared="false" />
                      <span>{{ lang.title }}</span>
                    </button>
                  </div>
                </span>
              </li>
            </ul>
          </div>
        </b-col>
        <b-col cols="12" sm="12" lg="4" md="12">
          <div class="copyright">
            <p>{{ $t('components.layout.theFooter.compyright') }}</p>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'TheFooter',
  beforeCreate () {},
  created () {},
  beforeMount () {},
  mounted () {},
  beforeUpdate () {},
  updated () {},
  destroyed () {},
  data () {
    return {
      isHover: false,
      languages: [
        { flag: 'br', language: 'pt-BR' },
        { flag: 'us', language: 'en' }
      ]
    }
  },
  props: {},
  computed: {},
  methods: {
    changeLocale (locale) {
      this.$i18n.locale = locale
      this.isHover = false
    }
  },
  filters: {},
  watch: {}
}
</script>

<style lang="scss" scoped>
$--heading-size: 90px;

.footer {
  padding: 22px 0;
  background: $default-black;
  color: #fff
}

// brand {
.brand p {
  font-size: 40px;
  text-shadow: -0.1rem 0.1rem 0 black,
    -0.2rem 0.2rem 0 #42b883,
    -0.4rem 0.4rem 0 black,
    -0.5rem 0.5rem 0 #42b883;
}

// Social
.social {
  margin-top: 20px;
}

ul {
  display: inline-flex;
  list-style: none;
}

ul li {
  margin: 6px;
  transition: all .3s cubic-bezier(.645,.045,.355,1);

  &:hover{
    transform: translateY(-3px);
  }
}

ul li a, .i18n {
  width: 53px;
  height: 50px;
  line-height: 44px;
  font-size: 16px;
  border: 2px solid rgba(198,201,216,.75);
  color: rgba(198,201,216,.75);
  border-radius: 100%;
  text-align: center;
  display: inline-block;
  transition: all .3s cubic-bezier(.645,.045,.355,1);

  &:hover{
    background: $vue-green;
    border-color: $vue-green;
    color: #fff;
    transform: translateY(-3px);
  }
}

// I18n
.i18n {
  position: relative;
 &__content {
   position: absolute;
   top: -25px;
   left: 52px;

   &-button {
    padding: 0 23px;
    line-height: 34px;
    border: 2px solid #42b883;
    background: transparent;
    border-radius: 4px;
    transition: 0.3s;
    color: #00dc82;

    &:hover {
      background: $vue-green;
      color: #fff;
      box-shadow: 0 10px 15px 0 rgb(0 0 0 / 10%);
      transform: translateY(-5px);
      a {
        color: #fff;
      }
    }
   }
 }
}
// Compyright
.copyright {
  margin-top: 20px;
}
p {
  color: $clean-gray;
}
</style>
