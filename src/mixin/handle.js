import makeRequest from '../utils/makeRequest'
export default {
  props: {
    handle: {
      type: [Function, Object],
      required: true
    },
    confirm: {
      type: Boolean,
      default: false
    },
    row: {
      type: Object,
      default: () => ({})
    },
    col: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    async onHandle (val) {
      try {
        if (this.confirm) {
          await this.$confirm('确定继续操作', '提醒')
        }
        this.loading = true
        const data = {row: this.row, col: this.col}
        await (typeof this.handle === 'function' ? this.handle(val, data) : makeRequest(data, this.handle))
        this.$message.success('操作成功')
        this.$emit('refresh')
      } catch (e) {
        this.$handleError && this.$handleError(e, '操作失败')
      }
      this.loading = false
    }
  }
}
