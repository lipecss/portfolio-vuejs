<template>
  <b-container fluid class="footer-area">
    <div class="footer-wrapper" style="position: relative">
      <b-row class='align-items-end'>
        <b-col sm="12" lg="6">
          <div class="footer-left">
            <div class="inner">
              <span>{{ $t('components.layout.theAlternativeFooter.suptitle')}}</span>
              <h2>{{ $t('components.layout.theAlternativeFooter.text1')}}<br> {{ $t('components.layout.theAlternativeFooter.text2')}}</h2>
              <button @click="contactMe">{{ $t('buttons.talk')}}</button>
            </div>
          </div>
        </b-col>

        <b-col sm="12" lg="6" class="pl-0 pr-0">
          <div class="footer-right">
            <div class="brand">
              <p>Felipecss</p>
            </div>
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
                  <a
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
                  </a>
                </li>
              </ul>
            </div>
            <div class="copyright">
              <p>{{ $t('components.layout.theFooter.compyright') }}</p>
            </div>
          </div>
        </b-col>
      </b-row>
    </div>
  </b-container>
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
    },
    contactMe () {
      this.$router.push({ name: 'HomePage' })
    }
  },
  filters: {},
  watch: {}
}
</script>

<style lang="scss" scoped>
.footer-area {

  .footer-left {
    position: relative;
    background: linear-gradient(145deg, $vue-green, $vue-greenlight);
    padding: 60px 30px;
    z-index: 2;
    margin-right: -15px;
    margin-left: -15px;
    color: #fff;

    &:before {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      background-image: url('~@/assets/img/pattern.jpg');
      background-size: cover;
      content: "";
      z-index: 1;
      opacity: .1;
    }

    .inner {
      text-align: left;
      position: relative;
      z-index: 25;
      h2 {
        font-size: 45px;
        line-height: 51px;
        font-weight: 900;
      }

      button {
        padding: 0 23px;
        height: 40px;
        line-height: 34px;
        border: 2px solid #fff;
        background: transparent;
        border-radius: 4px;
        font-size: 14px;
        text-transform: uppercase;
        transition: .3s;
        color: #fff;

        &:hover {
          background: #fff;
          color: $default-green;
          box-shadow: 0 10px 15px 0 rgb(0 0 0 / 10%);
          transform: translateY(-5px);
          a {
            color: #fff;
          }
        }
      }
      &::after {
        content: url('~@/assets/img/felipecss.png');
        position: absolute;
        right: 0;
        top: 50%;
        z-index: -1;
        transform: translateY(-50%);
        width: 252px;
        height: 273px;
        opacity: 0.8;
      }
    }
  }

  .footer-right {
    position: relative;
    background: linear-gradient(145deg,#383838,#000000);
    padding: 100px 0;
    z-index: 2;
    color: #c6c9d8;

    // brand {
    .brand p {
      font-size: 40px;
      text-align: center;
      text-shadow: -0.1rem 0.1rem 0 black,
        -0.2rem 0.2rem 0 #42b883,
        -0.4rem 0.4rem 0 black,
        -0.5rem 0.5rem 0 #42b883;
    }

    // Social
    .social {
      display: flex;
      justify-content: center;
    }

    ul {
      display: inline-flex;
      list-style: none;
      padding: 0;
    }

    ul li {
      margin: 6px;
      transition: all .3s cubic-bezier(.645,.045,.355,1);

      &:hover{
        transform: translateY(-3px);
      }
    }

    ul li a {
      width: 35px;
      height: 35px;
      line-height: 35px;
      font-size: 16px;
      border: 2px solid rgba(198,201,216,.75);
      color: rgba(198,201,216,.75);
      border-radius: 100%;
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
        top: -34px;
        left: 35px;

        &-button {
          padding: 0 13px;
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

    // Copyright
    .copyright {
      text-align: center;
    }
  }

  @media screen and (min-width: 375px) {
    .footer-left {
      .inner {
        &::after {
          height: 276px;
        }
      }
    }
  }
  @media screen and (min-width: 768px) {
    .footer-left {
      padding: 120px 80px;
      .inner {
        h2 {
          font-size: 75px;
          line-height: 90px;
        }
        &::after {
          width: 358px;
          height: 280px;
        }
      }
    }

    .footer-right {
      ul li a {
        width: 50px;
        height: 50px;
        line-height: 50px;
      }

      .i18n {
        &__content {
          top: -38px;
          left: 53px;
        }
      }
    }
  }
  @media screen and (min-width: 1024px) {
    .footer-left {
      border-top-right-radius: 6px;
      .inner {
        &::after {
          width: auto;
        }
      }
    }
  }
  @media screen and (min-width: 1600px) {
    .footer-left {
      border-top-right-radius: 6px;
      .inner {
        &::after {
          width: 358px;
          height: 280px;
        }
      }
    }
  }
}
</style>
