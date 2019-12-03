<template>
  <div class="data-table">
    <slot></slot>
    <Table v-loading="loading" v-bind="$attrs" v-on="$listeners" :cols="cols" :data="list" @filter-change="filterChange"/>
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
import Table from './Table'
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
      type: Function,
      required: false
    },
    getData: {
      type: Function,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      list: [],
      filterOption: {},
      pageInfoInner: {
        currentPage: 1,
        total: 0,
        pageSize: 10,
        pageSizes: [10, 20, 50, 100],
        layout: 'total, prev, pager, next, jumper'
      }
    }
  },
  created () {
    this.mergePageInfo()
    this.getDataInner()
    if (this.routerMode) {
      this.$watch('$route', () => {
        this.mergePageInfo()
        this.getDataInner()
      })
    }
  },
  components: {
    Table
  },
  methods: {
    onSizeChange (pageSize) {
      this.pageInfoInner.currentPage = 1
      this.pageInfoInner.pageSize = pageSize
      if (this.routerMode) {
        this.routerMode(this.pageInfoInner)
      } else {
        this.getDataInner()
      }
    },
    onCurrentChange (currentPage) {
      this.pageInfoInner.currentPage = currentPage
      if (this.routerMode) {
        this.routerMode(this.pageInfoInner)
      } else {
        this.getDataInner()
      }
    },
    mergePageInfo () {
      this.pageInfoInner = Object.assign({}, this.pageInfoInner, this.pageInfo)
      if (this.routerMode) {
        this.pageInfoInner = Object.assign({}, this.pageInfoInner, {
          currentPage: Number(this.$route.params.page) || 1
        })
      }
    },
    async getDataInner () {
      this.loading = true
      try {
        const res = await this.getData(this.pageInfoInner, this.filterOption)
        this.list = res.data
        this.pageInfoInner.total = res.total
      } catch (e) {
        this.$handleError && this.$handleError(e)
      }
      this.loading = false
    },
    filterChange (filterOption) {
      this.filterOption = filterOption
      this.getDataInner()
    }
  }
}
</script>
