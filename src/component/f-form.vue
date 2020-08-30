<template>
  <el-form v-on="$listeners" v-bind="$attrs" @submit.native.prevent :model="model" :rules="rules" ref="form">
    <el-form-item
      :class="`${form.type || form.component || 'el-input'}-form-item ${form.class}`"
      v-for="form in filterForms"
      :key="form.key"
      :label="form.label"
      :prop="form.key"
    >
      <template v-if="form.labelComponent" slot="label">
        <component :label="form.label" :is="form.labelComponent" v-bind="form.labelExtra"></component>
      </template>
      <component
        v-bind="form.extra || {}"
        @keydown.native.enter="submit(form)"
        @input="onInput(form.key, $event)"
        :model="model"
        :is="form.type|| form.component || 'el-input'"
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
import resolveString from '../utils/resolveString'
export default {
  inheritAttrs: false,
  name: 'fForm',
  data () {
    return {
      modelAsync: {}
    }
  },
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
  computed: {
    rules () {
      const rules = {}
      this.filterForms.forEach(form => {
        rules[form.key] = form.rules
      })
      return rules
    },
    trueForms () {
      if (typeof this.forms === 'function') {
        return this.forms(this.model) || []
      }
      return this.forms || []
    },
    filterForms () {
      return this.trueForms.filter(this.getVisible)
    }
  },
  created () {
    // 部分组件会对初始值做格式化，导致在创建后有一次input事件。已知的有el-input-number
    // setDefault更新父组件值是异步的。会导致默认值失效。所以加了一个nextTick
    this.$nextTick(this.setDefault)
  },
  watch: {
    trueForms: {
      handler: 'setDefault'
    },
    model: {
      handler: function handler () {
        this.modelAsync = this.model
      },
      immediate: true
    }
  },
  methods: {
    getVisible (form) {
      const hidden = resolveString(form.hidden, {model: this.model})
      if (hidden) {
        return false
      }
      return true
    },
    setDefault () {
      let changed = false
      const model = Object.assign({}, this.model)
      this.trueForms.forEach(form => {
        if (typeof model[form.key] !== 'undefined' && !this.getVisible(form) && form.resetValWhenHidden !== false) {
          delete model[form.key]
          changed = true
        } else if (typeof form.default !== 'undefined') {
          if (typeof model[form.key] === 'undefined') {
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
      return this.$refs['form'].validateField(...args)
    },
    resetFields () {
      return this.$refs['form'].resetFields()
    },
    clearValidate (...args) {
      return this.$refs['form'].clearValidate(...args)
    },
    onInput (key, value) {
      // model的值更新是异步的，会导致，连续的值更新会导致前面的更新丢失。所以加了一个modelAsync
      const newModel = {
        ...this.modelAsync,
        [key]: value
      }
      this.setModel(newModel)
    },
    submit (form) {
      const type = form.type || form.component
      const isInput = type === 'el-input' || !type
      if (isInput && (!form.extra || form.extra.type !== 'textarea')) {
        this.$emit('submit')
      }
    },
    setModel (model) {
      this.modelAsync = model
      this.$emit('update:model', model)
      this.$emit('change', model)
    }
  }
}
</script>

<style>
div.el-form-item.is-required .el-form-item__label::before {
  content: "";
}
.el-form-item.is-required > .el-form-item__label::before {
  content: "*";
}
.el-form.el-form--label-left .el-form-item__label {
  text-align: right;
}
.el-form--label-left > .el-form-item > .el-form-item__label {
  text-align: left;
}
.el-form--inline .el-form-item__content {
  display: block;
  margin-right: 0;
  vertical-align: initial;
}

.el-form.el-form--inline .el-form-item__content {
  display: block;
  margin-right: 0;
  vertical-align: initial;
}

.el-form.el-form--inline > .el-form-item > .el-form-item__content {
  display: inline-block;
  margin-right: 10px;
  vertical-align: top;
}

.el-form.el-form--inline .el-form-item__label {
  float: left;
  display: initial;
}
.el-form.el-form--inline > .el-form-item > .el-form-item__label {
  float: left;
  display: initial;
}
</style>
