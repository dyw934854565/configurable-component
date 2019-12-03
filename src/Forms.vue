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
  name: 'Forms',
  props: {
    forms: {
      type: [Array, Function],
      required: false,
      default: () => []
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
  data () {
    return {trueForms: []}
  },
  computed: {
    rules () {
      const rules = {}
      this.trueForms.forEach(form => {
        rules[form.key] = form.rules
      })
      return rules
    }
  },
  created () {
    this.setDefault()
    this.$watch('forms', this.setDefault.bind(this))
    this.$watch('model', () => {
      if (typeof this.forms === 'function') {
        this.trueForms = this.forms(this.model)
      }
    })
  },
  methods: {
    setTrueForms () {
      if (typeof this.forms === 'function') {
        this.trueForms = this.forms(this.model)
        return
      }
      this.trueForms = this.forms
    },
    setDefault () {
      this.setTrueForms()
      let changed = false
      const model = Object.assign({}, this.model)
      this.trueForms.forEach(form => {
        if (form.default) {
          if (this.model[form.key] === undefined) {
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
      this.$emit('change', model)
      this.$emit('update:model', model)
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
