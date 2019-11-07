<template>
  <el-form v-on="$listeners" v-bind="$attrs" @submit.native.prevent :model="model" :rules="rules" ref="form">
    <el-form-item
      :class="`${form.type || 'el-input'}-form-item ${form.class}`"
      v-for="form in forms"
      :key="form.key"
      :label="form.label"
      :prop="form.key"
    >
      <component
        v-bind="form.extra || {}"
        @input="onChange(form.key, $event)"
        :is="form.type || 'el-input'"
        :value="model[form.key]"
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
      this.forms.forEach(form => {
        rules[form.key] = form.rules
      })
      return rules
    }
  },
  created () {
    this.setDefault()
    this.$watch('forms', this.setDefault.bind(this))
  },
  methods: {
    setDefault () {
      let changed = false
      const model = Object.assign({}, this.model)
      this.forms.forEach(form => {
        if (form.default) {
          if (this.model[form.key] === undefined) {
            changed = true
            model[form.key] = form.default
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
    onChange (key, value) {
      const newModel = {
        ...this.model,
        [key]: value
      }
      this.setModel(newModel)
    },
    setModel (model) {
      this.$emit('change', model)
      this.$emit('update:model', model)
    },
    resetForm () {
      this.$refs['form'].resetFields()
      this.setModel({})
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
