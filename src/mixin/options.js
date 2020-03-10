export default {
  props: {
    options: {
      type: [Array, Function],
      required: true
    }
  },
  data: () => ({
    innerOptions: [],
    loading: false
  }),
  created () {
    if (this.preventFirstFetch && this.preventFirstFetch()) {
      return
    }
    this.fetchOption(true)
  },
  computed: {
    trueOptions () {
      if (typeof this.options === 'function') {
        return this.innerOptions || []
      }
      return this.options
    }
  },
  methods: {
    async fetchOption (isInit, ...rest) {
      if (typeof this.options !== 'function') {
        return
      }
      this.loading = true
      try {
        this.innerOptions = await this.options(isInit, ...rest)
      } catch (e) {
        this.$handleError && this.$handleError(e)
      }
      this.loading = false
    }
  }
}
