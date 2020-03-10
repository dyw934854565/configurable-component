
import fForm from './f-form'

export default {
  install (Vue) {
    const fFormWrapper = Vue.extend({
      props: ['model', 'forms'],
      components: {fForm},
      data () {
        return {innerModel: {}}
      },
      render (h) {
        return h('f-form', {
          props: {
            model: this.innerModel,
            forms: this.forms
          },
          on: {
            'update:model': $event => {
              this.innerModel = $event
            }
          },
          attrs: this.$attrs,
          ref: 'form'
        })
      },
      created () {
        this.innerModel = this.model
      }
    })
    let dialogCounter = 0
    Vue.prototype.$dataDialog = async function $dataDialog (onValidate, forms = [], initialData = {}, {key = '', formExtra = {}, msgBox = {}} = {}) {
      const h = this.$createElement
      const props = {
        forms,
        model: initialData
      }
      const formKey = `dialogFormKey_${key || dialogCounter++}`
      const message = h(fFormWrapper, {
        props,
        key: formKey,
        attrs: formExtra
      })
      return this.$msgbox({
        title: '数据修改',
        showCancelButton: true,
        confirmButtonText: '保存',
        cancelButtonText: '取消',
        ...msgBox,
        message,
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            message.componentInstance.$refs.form.validate()
              .then(() => {
                instance.confirmButtonLoading = true
                return onValidate(message.componentInstance.$refs.form.model)
              }).then(() => {
                instance.confirmButtonLoading = false
                message.componentInstance.$refs.form.$emit('update:model', initialData)
                done()
              })
              .catch(e => {
                instance.confirmButtonLoading = false
                this.$handleError && this.$handleError(e)
              })
          } else {
            done()
          }
        }
      })
    }
  }
}
