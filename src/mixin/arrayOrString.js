export default {
  props: {
    forceType: {
      type: String
    },
    value: {
      type: [String, Array]
    },
    separator: {
      type: String,
      default: ','
    }
  },
  methods: {
    onInput (val) {
      if (this.forceType === 'array') {
        return this.$emit('input', val)
      }
      if (this.forceType === 'string') {
        return this.$emit('input', val.join(this.separator))
      }
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
