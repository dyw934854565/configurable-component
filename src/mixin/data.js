import makeRequest from '../utils/makeRequest'
export function createMixin (propKey = 'data', getData = () => {}) {
  const propKeyCamelCase = propKey.replace(/^([a-z])/, item => item.toLocaleUpperCase())
  const innerKey = `remote${propKeyCamelCase}`
  const trueKey = `true${propKeyCamelCase}`
  const fetchKey = `fetch${propKeyCamelCase}`
  return {
    props: {
      [propKey]: {
        type: [Array, Object, Function],
        required: true
      }
    },
    data: () => ({
      [innerKey]: [],
      loading: false,
      fetchError: false
    }),
    created () {
      if (this.preventFirstFetch && this.preventFirstFetch()) {
        return
      }
      if (this.useRemote) {
        this[fetchKey]()
      }
    },
    computed: {
      [trueKey] () {
        if (this.useRemote) {
          return this[innerKey]
        }
        return this[propKey]
      },
      useRemote () {
        return typeof this[propKey] === 'function' || (this[propKey] && this[propKey].axios)
      }
    },
    methods: {
      async [fetchKey] () {
        if (!this.useRemote) {
          return this.$emit('refresh')
        }
        this.loading = true
        this.fetchError = false
        try {
          const data = getData(this)
          if (typeof this[propKey] === 'function') {
            this[innerKey] = await this[propKey](data)
          } else {
            this[innerKey] = await makeRequest(data, this[propKey])
          }
        } catch (e) {
          this.fetchError = true
          this[innerKey] = []
          this.$handleError && this.$handleError(e)
        }
        this.loading = false
      }
    }
  }
}

export default createMixin()
