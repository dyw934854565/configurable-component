<template>
  <el-dialog :append-to-body="true" v-bind="$attrs" v-on="$listeners">
    <slot></slot>
    <f-form ref="form" @submit="onOkClick" v-bind="formAttrs" :forms="forms" :model="model" @update:model="onChange"></f-form>
    <div class="op-wrap">
      <el-button v-if="okBtnInner.visible" :loading="loading" @click="onOkClick" type="primary" v-bind="okBtnInner.attr || {}">{{okBtnInner.text}}</el-button>
      <el-button v-if="escBtnInner.visible"  @click="onEscClick" type="text" v-bind="escBtnInner.attr || {}">{{escBtnInner.text}}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import fForm from './f-form'
export default {
  props: {
    formAttrs: {
      type: Object,
      required: false,
      default: () => ({})
    },
    forms: {
      type: [Array, Function],
      required: false,
      default: () => []
    },
    model: Object,
    okBtn: {
      type: [Object, Boolean],
      required: false,
      default: () => ({})
    },
    escBtn: {
      type: [Object, Boolean],
      required: false,
      default: () => ({})
    },
    onValidate: Function
  },
  data () {
    return {loading: false}
  },
  components: {
    fForm
  },
  computed: {
    okBtnInner () {
      return this.getBtnConfig('okBtn', {
        text: '保存'
      })
    },
    escBtnInner () {
      return this.getBtnConfig('escBtn', {
        text: '取消'
      })
    }
  },
  methods: {
    getBtnConfig (btnKey, defaultVal = {}) {
      return {
        visible: this[btnKey] !== false,
        ...defaultVal,
        ...(this[btnKey] || {})
      }
    },
    async onOkClick () {
      if (this.okBtnInner.onClick) {
        return this.okBtnInner.onClick(this)
      }
      try {
        await this.$refs.form.validate()
        if (this.onValidate) {
          this.loading = true
          await this.onValidate(this.model)
        }
        this.$emit('update:visible', false)
      } catch (e) {
        this.$handleError && this.$handleError(e)
      }
      this.loading = false
    },
    onEscClick () {
      if (this.escBtnInner.onClick) {
        return this.escBtnInner.onClick(this)
      }
      this.$emit('update:visible', false)
    },
    onChange (model) {
      this.$emit('update:model', model)
    }
  }
}
</script>
