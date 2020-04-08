<template>
  <el-form v-on="$listeners" v-bind="$attrs" @submit.native.prevent :model="model" :rules="rules" ref="form">
    <el-form-item
      :class="`${form.type || 'el-input'}-form-item ${form.class}`"
      v-for="form in trueForms"
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
import fTags from './f-tags'
export default {
  inheritAttrs: false,
  name: 'f-form',
  props: {
    forms: {
      type: [Array, Function],
      required: false,
      default: () => []
    },
    filter: {
      type: Function,
      required: false,
      default: form => form.visible !== false
    },
    model: Object
  },
  components: {
    fSelect,
    fFile,
    fCascader,
    fCheckbox,
    fRadiobox,
    fTags
  },
  computed: {
    rules () {
      const rules = {}
      this.trueForms.forEach(form => {
        rules[form.key] = form.rules
      })
      return rules
    },
    trueForms () {
      if (typeof this.forms === 'function') {
        return this.forms(this.model).filter(this.filter)
      }
      return this.forms.filter(this.filter)
    }
  },
  watch: {
    trueForms () {
      this.setDefault()
    }
  },
  created () {
    this.setDefault()
  },
  methods: {
    setDefault () {
      let changed = false
      const model = Object.assign({}, this.model)
      this.trueForms.forEach(form => {
        if (typeof form.default !== 'undefined') {
          if (typeof this.model[form.key] === 'undefined') {
            changed = true
            model[form.key] = form.default
          }
        }
      })
      if (changed) {
        this.setModel(model)
      }
    },
    validate (...args) {
      return this.$refs['form'].validate(...args)
    },
    validateField (...args) {
      this.$refs['form'].validateField(...args)
    },
    resetFields () {
      this.$refs['form'].resetFields()
    },
    clearValidate (...args) {
      this.$refs['form'].clearValidate(...args)
    },
    onChange (key, value) {
      const newModel = {
        ...this.model,
        [key]: value
      }
      this.setModel(newModel)
    },
    setModel (model) {
      this.$emit('update:model', model)
      this.$emit('change', model)
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
