import { mapActions, mapGetters } from 'vuex'

export const myMixins = {
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters('ModuleErrors', [
      'errorsList'
    ]),
    ...mapGetters([
      'blockUi'
    ])
  },
  methods: {
    ...mapActions([
      'changeBlockUi'
    ]),
    ...mapActions('ModuleErrors', [
      'clearErrorsStore',
      'changeErrors'
    ]),
    setBlockUi (value) {
      if (value) {
        this.changeBlockUi(value)
      } else {
        const timer = 200

        setTimeout(() => {
          this.changeBlockUi(value)
        }, timer)
      }
    },
    setErrors (value) {
      this.changeErrors(value)
    },
    clearErrors () {
      this.clearErrorsStore()
    }
  },
  filters: {
    textUpperCase (string) {
      return string.toUpperCase()
    },
    textCapitalizeFirstLetter (string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    }
  },
  watch: {}
}
