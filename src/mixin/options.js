export function createMixin (propKey = 'options') {
  const propKeyCamelCase = propKey.replace(/^([a-z])/, item => item.toLocaleUpperCase())
  const innerKey = `remote${propKeyCamelCase}`
  const trueKey = `true${propKeyCamelCase}`
  const fetchKey = `fetch${propKeyCamelCase}`
  return {
    props: {
      [propKey]: {
        type: [Array, Function],
        required: true
      }
    },
    data: () => ({
      [innerKey]: [],
      loading: false
    }),
    created () {
      if (this.preventFirstFetch && this.preventFirstFetch()) {
        return
      }
      this[fetchKey](true)
    },
    computed: {
      [trueKey] () {
        if (typeof this[propKey] === 'function') {
          return this[innerKey] || []
        }
        return this[propKey]
      }
    },
    methods: {
      async [fetchKey] (isInit, ...rest) {
        if (typeof this[propKey] !== 'function') {
          return
        }
        this.loading = true
        try {
          this[innerKey] = await this[propKey](isInit, ...rest)
        } catch (e) {
          this.$handleError && this.$handleError(e)
        }
        this.loading = false
      }
    }
  }
}

export default createMixin()
