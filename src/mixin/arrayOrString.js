export default {
  props: {
    value: {
      type: String | Array
    },
    separator: {
      type: String,
      default: ','
    }
  },
  methods: {
    onInput (val) {
      return this.$emit('input', typeof this.value === 'string' ? val.join(this.separator) : val)
    }
  },
  computed: {
    values () {
      if (!this.value) {
        return []
      }
      if (typeof this.value === 'string') {
        return this.value.split(this.separator)
      }
      return this.value
    }
  }
}
