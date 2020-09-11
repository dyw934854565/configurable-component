<template>
  <div class="data-table">
    <t-table page @sort-change="onSortChange" @refresh="refreshData" :error="fetchError" v-loading="loading" v-bind="$attrs" :cols="cols" :data="list" @filter-change="onFilterChange" v-on="$listeners">
      <template slot="pre-column"><slot name="pre-column"></slot></template>
      <slot></slot>
    </t-table>
    <div class="clearfix">
      <el-pagination
        class="pull-right"
        v-bind="pageInfoInner"
        @size-change="onSizeChange"
        @current-change="onCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import tTable from './t-table'
const defaultInner = {
  currentPage: 1,
  total: 0,
  pageSize: 10,
  pageSizes: [10, 20, 50, 100],
  layout: 'total, prev, pager, next, jumper'
}
export default {
  props: {
    cols: {
      type: Array,
      required: false,
      default: () => []
    },
    pageInfo: {
      type: Object,
      required: false,
      default: () => ({})
    },
    routerMode: {
      type: Boolean,
      default: false
    },
    getData: {
      type: Function,
      required: true
    },
    autoGet: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      loading: false,
      fetchError: false,
      list: [],
      filterOption: {},
      sortOption: {},
      pageInfoInner: {...defaultInner}
    }
  },
  watch: {
    cols () {
      this.pageInfoInner = {...defaultInner}
    }
  },
  created () {
    const defaultSort = this.$attrs['default-sort'] || this.$attrs['defaultSort']
    if (defaultSort && defaultSort.prop) {
      this.sortOption = {[defaultSort.prop]: defaultSort.order || 'ascending'}
    }
    this.mergePageInfo()
    if (!this.autoGet) return
    this.getDataInner()
    // if (this.routerMode) {
    //   this.$watch('$route', () => {
    //     this.mergePageInfo()
    //     this.getDataInner()
    //   })
    // }
  },
  components: {
    tTable
  },
  methods: {
    onChange () {
      if (this.routerMode) {
        // const path = this.routerMode(this.pageInfoInner)
        this.$router.push({
          query: {
            ...this.$route.query,
            pageSize: this.pageInfoInner.pageSize,
            currentPage: this.pageInfoInner.currentPage
          }
        })
      }
      this.getDataInner()
    },
    onSizeChange (pageSize) {
      this.pageInfoInner.currentPage = 1
      this.pageInfoInner.pageSize = pageSize
      this.onChange()
    },
    onCurrentChange (currentPage) {
      this.pageInfoInner.currentPage = currentPage
      this.onChange()
    },
    refreshData () {
      return this.getDataInner()
    },
    mergePageInfo () {
      this.pageInfoInner = Object.assign({}, this.pageInfoInner, this.pageInfo)
      if (this.routerMode) {
        this.pageInfoInner = Object.assign({}, this.pageInfoInner, {
          currentPage: Number(this.$route.query.currentPage) || this.pageInfoInner.currentPage,
          pageSize: Number(this.$route.query.pageSize) || this.pageInfoInner.pageSize
        })
      }
    },
    async getDataInner () {
      this.loading = true
      this.fetchError = false
      try {
        const res = await this.getData({pageInfo: this.pageInfoInner, filterOption: this.filterOption, sortOption: this.sortOption})
        this.list = res.data
        this.pageInfoInner.total = res.total
      } catch (e) {
        this.list = []
        this.fetchError = true
        this.$handleError && this.$handleError(e)
      }
      this.loading = false
    },
    onSortChange ({order, prop}) {
      const sortOption = {}
      if (order) {
        sortOption[prop] = order
      }
      this.sortOption = sortOption
      this.pageInfoInner.currentPage = 1
      return this.getDataInner()
    },
    onFilterChange (filterOption) {
      this.filterOption = filterOption
      this.pageInfoInner.currentPage = 1
      return this.getDataInner()
    },
    onSearch () {
      this.pageInfoInner.currentPage = 1
      return this.getDataInner()
    }
  }
}
</script>
