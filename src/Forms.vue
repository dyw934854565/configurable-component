<template>
  <el-form v-on="$listeners" v-bind="$attrs" @submit.native.prevent :model="model" :rules="rules" ref="form">
    <el-form-item
      :class="`${form.type || 'el-input'}-form-item ${form.class}`"
      v-for="(form, key) in forms"
      :key="key"
      :label="form.label"
      :prop="key"
    >
      <component
        v-bind="form.extra || {}"
        @input="$emit('change', key)"
        :is="form.type || 'el-input'"
        v-model="model[key]"
      ></component>
    </el-form-item>
    <slot></slot>
  </el-form>
</template>

<script>
import fSelect from './f-select'
import fFile from './f-file'
import fCascader from './f-cascader'
import fCheckbox from './f-checkbox'
import fRadiobox from './f-radiobox'
export default {
  inheritAttrs: false,
  name: 'Forms',
  props: ['forms', 'model'],
  components: {
    fSelect,
    fFile,
    fCascader,
    fCheckbox,
    fRadiobox
  },
  computed: {
    rules () {
      const rules = {}
      Object.keys(this.forms).forEach(key => {
        rules[key] = this.forms[key].rules
      })
      return rules
    }
  },
  created () {
    this.setDefault()
    this.$watch('model', this.setDefault.bind(this))
  },
  methods: {
    setDefault () {
      let changed = false
      const model = Object.assign({}, this.model)
      Object.keys(this.forms).forEach(key => {
        if (this.forms[key].default) {
          if (this.model[key] === undefined) {
            changed = true
            model[key] = this.forms[key].default
          }
        }
      })
      if (changed) {
        this.$emit('change', model)
      }
    },
    validate (...args) {
      return this.$refs['form'].validate(...args)
    },
    resetForm () {
      this.$refs['form'].resetFields()
    }
  }
}
</script>

<style>
  .el-form-item.is-required .el-form-item__label::before {
    content: "";
  }
  .el-form-item.is-required > .el-form-item__label::before {
    content: "*";
  }
  .el-form--label-left .el-form-item__label {
    text-align: right;
  }
  .el-form--label-left > .el-form-item > .el-form-item__label {
    text-align: left;
  }
</style>
