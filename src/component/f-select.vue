<template>
  <el-select
    v-bind="$attrs"
    @input="onInput"
    :value="idValue"
    :multiple="multiple"
    :loading="loading"
    :remote-method="remoteMethod"
    @focus="onFocus"
  >
    <template v-for="(option, index) in trueOptions">
      <el-option-group v-if="option.children" :key="option.label" :label="option.label" :disabled="option.disabled">
        <el-option v-for="(optionItem, optionIndex) in option.children || []" :key="typeof optionItem.value === 'object' ? optionIndex : optionItem.value" v-bind="optionItem"></el-option>
      </el-option-group>
      <el-option v-else :key="typeof option.value === 'object' ? index : option.value" v-bind="option"></el-option>
    </template>
    <div class="el-select-dropdown__empty" slot="empty">
      {{showText}}
    </div>
  </el-select>
</template>

<script>
import optionsMixin from '../mixin/options'
export default {
  name: 'fSelect',
  inheritAttrs: false,
  props: {
    value: {
      type: [Object, String, Number, Array]
    },
    multiple: {
      type: Boolean,
      default: false
    },
    noDataText: {
      type: String,
      default: '无数据'
    },
    noMatchText: {
      type: String,
      default: '无匹配数据'
    },
    loadingText: {
      type: String,
      default: '加载中'
    },
    valueKey: {
      type: String,
      default: ''
    },
    errorText: {
      type: String,
      default: '加载失败'
    }
  },
  mixins: [optionsMixin],
  methods: {
    onFocus () {
      if (this.fetchError) {
        this.fetchOptions()
      }
    },
    onInput (val) {
      let res
      if (!this.valueKey) {
        res = val
      } else {
        if (this.multiple) {
          res = (val || []).map(item => ({ [this.valueKey]: item }))
        } else {
          res = { [this.valueKey]: val }
        }
      }
      return this.$emit('input', res)
    },
    preventFirstFetch () {
      return this.$attrs.remote && this.$attrs.filterable
    }
  },
  computed: {
    idValue () {
      if (!this.valueKey) {
        return this.value
      } else {
        if (!this.multiple) {
          if (!this.value) return undefined
          return this.value[this.valueKey]
        } else {
          if (!this.value || !Array.isArray(this.value)) return []
          return this.value.map(item => item[this.valueKey])
        }
      }
    },
    showText () {
      if (this.loading) {
        return this.loadingText
      }
      if (this.fetchError) {
        return this.errorText
      }
      if (this.$attrs.remote && this.$attrs.filterable) {
        return this.noMatchText
      }
      return this.noDataText
    },
    remoteMethod () {
      return this.fetchOptions.bind(this)
    }
  }
}
</script>
