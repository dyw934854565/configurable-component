<template>
    <f-select :value="idValue" v-bind="$attrs" @input="onInput"></f-select>
</template>

<script>
import fSelect from './f-select'
export default {
  name: 'fObjSelect',
  props: {
    value: {
      type: Object
    },
    valueKey: {
      type: String,
      default: 'id'
    }
  },
  computed: {
    idValue () {
      if (!this.value) return undefined
      return this.value[this.valueKey]
    }
  },
  components: {
    fSelect: fSelect
  },
  methods: {
    onInput (val) {
      return this.$emit('input', { [this.valueKey]: val })
    }
  }
}
</script>
