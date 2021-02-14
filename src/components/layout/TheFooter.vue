<template>
  <div class="footer">
    <div class="footer-inner">
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
                <a href="https://github.com/lipecss" target="_blank"><font-awesome-icon :icon="['fab', 'github']" /></a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/felipecss/" target="_blank"><font-awesome-icon :icon="['fab', 'linkedin-in']" /></a>
              </li>
              <li>
                <a href="https://www.instagram.com/felipecss/" target="_blank"><font-awesome-icon :icon="['fab', 'instagram']" /></a>
              </li>
            </ul>
          </div>
        </b-col>
        <b-col cols="12" sm="12" lg="4" md="12">
          <div class="copyright">
            <p>Copyright © 2021 Felipecss. All Rights Reserved.</p>
          </div>
        </b-col>
      </b-row>
    </div>
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
    return {}
  },
  props: {},
  computed: {},
  methods: {},
  filters: {},
  watch: {}
}
</script>

<style lang="scss" scoped>
$--heading-size: 90px;

.footer {
  padding: 30px 0;
  background: $default-gray;
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

ul li a {
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

// Compyright
.copyright {
  margin-top: 20px;
}
p {
  color: $clean-gray;
}
</style>
