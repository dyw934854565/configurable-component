<template>
  <el-input-number v-bind="$attrs" @focus="$emit('focus', $event)" @blur="$emit('blur', $event)" @change="$emit('change', $event)" :value="value" @input="onInput"></el-input-number>
</template>

<script>
export default {
  name: 'f-input-number',
  inheritAttrs: false,
  props: {
    value: {}
  },
  methods: {
    onInput (val) {
      if (val !== this.value) {
        this.$emit('input', val)
      }
    }
  }
}
</script>
