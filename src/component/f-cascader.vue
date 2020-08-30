<template>
  <el-cascader
    v-bind="$attrs"
    v-on="$listeners"
    :options="trueOptions"
    :props="handledProps"
    :loading="loading"
  >
  </el-cascader>
</template>

<script>
import optionsMixin from '../mixin/options'
import makeRequest from '../utils/makeRequest'
export default {
  name: 'fCascader',
  props: {
    props: {
      type: Object,
      default: () => ({})
    },
    options: {
      type: [Array, Object, Function],
      required: false
    }
  },
  computed: {
    handledProps () {
      if (!this.props) { return {} }
      if (!this.props.lazyLoad) {
        return this.props
      }
      return {
        ...this.props,
        // eslint-disable-next-line vue/no-async-in-computed-properties
        lazyLoad: async (node, resolve) => {
          let res
          if (typeof this.props.lazyLoad === 'function') {
            if (this.props.lazyLoad.length === 2) {
              this.props.lazyLoad(node, resolve)
              return
            }
            // eslint-disable-next-line vue/no-async-in-computed-properties
            res = await this.props.lazyLoad({node})
          } else {
            // eslint-disable-next-line vue/no-async-in-computed-properties
            res = await makeRequest({node}, this.props.lazyLoad)
          }
          resolve(res)
        }
      }
    }
  },
  inheritAttrs: false,
  mixins: [optionsMixin]
}
</script>
