import makeRequest from '../utils/makeRequest'
export function createMixin (propKey = 'options') {
  const propKeyCamelCase = propKey.replace(/^([a-z])/, item => item.toLocaleUpperCase())
  const innerKey = `remote${propKeyCamelCase}`
  const trueKey = `true${propKeyCamelCase}`
  const fetchKey = `fetch${propKeyCamelCase}`
  const fetchData = (op, model, args = []) => {
    if (typeof op === 'function') {
      return op(model, ...args)
    } else {
      return makeRequest({model, args}, op)
    }
  }
  return {
    props: {
      [propKey]: {
        type: [Array, Object, Function],
        required: true
      },
      model: {
        required: false
      },
      clearOnFetch: {
        type: Boolean,
        default: true
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
      this[fetchKey](true)
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
      async [fetchKey] (isInit = false, ...args) {
        console.log('args', {args}, this)
        if (!this.useRemote) {
          return
        }
        if (this.clearOnFetch && !isInit && typeof this.$attrs.remote === 'undefined') {
          console.log('clearOnFetch')
          this.$emit('input', null)
        }
        this.loading = true
        this.fetchError = false
        try {
          if (isInit && this.model && (typeof this[propKey] !== 'function' || this[propKey].length === 1)) {
            if (typeof Proxy === 'undefined') {
              this.$watch('model', () => {
                this[fetchKey]()
              })
              this[innerKey] = await fetchData(this[propKey], this.model, args)
            } else {
              const keys = []
              const model = new Proxy(this.model, {
                get: function (obj, prop) {
                  keys.push(prop)
                  return obj[prop]
                }
              })
              const dataPromise = fetchData(this[propKey], model, args)
              if (keys.length) {
                this.$watch('model', (newModel, oldModel) => {
                  if (keys.some(key => newModel[key] !== oldModel[key])) {
                    this[fetchKey]()
                  }
                })
              }
              this[innerKey] = await dataPromise
            }
          } else {
            this[innerKey] = await fetchData(this[propKey], this.model, args)
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
