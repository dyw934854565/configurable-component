<template>
    <div class="edit-page">
        <div v-if="showFileter">
            <f-form
                ref="filterForm"
                inline
                :forms="filterForms"
                :model.sync="filter"
                @change="onChange"
                @set-default="setHasSetDefault"
                @submit="onSearch"
            >
                <el-button @click="onSearch" type="primary">搜索</el-button>
                <t-btn :label="download.label || '导出'" v-if="download" :handle="onDownload"></t-btn>
            </f-form>
        </div>
        <el-row style="margin-top: 10px;" v-if="showAdd">
            <el-button
                style="float: right;"
                type="primary"
                @click="addOrEditRowAction()"
            >
                添加{{ title }}
            </el-button>
        </el-row>
        <component
            v-bind="$attrs"
            :onUpdateRow="safeUpdateRow"
            :routerMode="routerMode"
            :is="table"
            ref="table"
            :cols="cols"
            :data="getDataWithFilter"
            :getData="getDataWithFilter"
            :pageInfo="pageInfo"
            @op="handleOp"
            style="width: 100%;"
        >
          <el-table-column v-if="showIndex" label="序号" type="index" slot="pre-column"></el-table-column>
          <el-table-column v-if="showEdit || showDelete" label="操作" width="160px">
              <template slot-scope="scope">
                  <el-button
                      v-if="showEdit"
                      size="small"
                      type="primary"
                      @click="addOrEditRowAction('编辑', scope.row)"
                      >编辑</el-button
                  >
                  <el-button
                      v-if="showDelete"
                      size="small"
                      type="danger"
                      @click="deleteRowAction(scope.row)"
                      >删除</el-button
                  >
              </template>
          </el-table-column>
        </component>
        <data-dialog
            ref="dataDialog"
            :title="dialogTitle"
            :visible.sync="visilbe"
            :model.sync="model"
            :close-on-click-modal="false"
            :forms="forms"
            :escBtn="escBtn"
            :formAttrs="formExtra"
            :onValidate="updateRow"
        ></data-dialog>
    </div>
</template>
<script>
import debounce from 'lodash/debounce'
import dataDialog from './data-dialog'
import fForm from './f-form'
import tTable from './t-table'
import dataTable from './data-table'
import resolveString from '../utils/resolveString'
import isEqual from 'lodash.isequal'
import tBtn from './t-btn'
import { saveAs } from 'file-saver'

import makeRequest from '../utils/makeRequest'
import getDefer from '../utils/getDefer'
export default {
  name: 'edit-page',
  components: {
    dataDialog,
    fForm,
    tTable,
    tBtn,
    dataTable
  },
  props: {
    showIndex: {
      type: Boolean,
      default: false
    },
    download: {
      type: Object,
      required: false
    },
    showAdd: {
      type: Boolean,
      default: true
    },
    showEdit: {
      type: Boolean,
      default: true
    },
    showDelete: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    },
    getData: {
      type: Function,
      required: true
    },
    addOrEditRow: {
      type: Function,
      required: true
    },
    deleteRow: {
      type: Function,
      required: true
    },
    settings: {
      type: Array,
      required: true
    },
    // 是否分页
    page: {
      type: Boolean,
      default: true
    },
    pageInfo: {
      type: Object,
      default: () => ({})
    },
    extendsMap: {
      type: Object,
      default: () => ({})
    },
    routerMode: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      visilbe: false,
      filter: {},
      dialogTitle: '',
      model: {},
      addCache: {},
      type: '',
      defer: getDefer(),
      hasSetDefault: false,
      formExtra: {
        'label-width': '140px'
      },
      escBtn: {
        onClick: () => {
          this.visilbe = false
          if (this.type === '添加') {
            this.addCache = this.model
          }
        }
      },
      getDataWithFilter: async params => {
        if (this.showFileter && !this.hasSetDefault) {
          await this.defer.promise
        }
        return this.getData({...params, filter: this.filter})
      }
    }
  },
  computed: {
    table () {
      return this.page ? 'data-table' : 't-table'
    },
    extendsSetting () {
      return this.settings.map(item => {
        if (typeof item === 'string') {
          return this.getExtends(item)
        }
        if (item.extends) {
          return Object.assign({}, this.getExtends(item.extends), item)
        }
        return item
      })
    },
    showFileter () {
      return this.extendsSetting.filter(item => item.canFilter).length
    },
    filterForms () {
      return model => this.extendsSetting.filter(item => item.canFilter).map(item => {
        const form = {
          ...item,
          ...(item.filterComponent || item.formComponent || {})
        }
        form.extra = this.handleForm(form.extra, model)
        return form
      })
    },
    cols () {
      return this.extendsSetting.filter(item => item.canShow !== false).map(item => ({
        ...item,
        ...(item.tableComponent || {})
      }))
    },
    forms () {
      const isAdd = this.type === '添加'
      return model => this.extendsSetting.filter(item => (item.canAdd !== false) && (isAdd || item.canEdit !== false)).map(item => {
        const form = {
          ...item,
          ...(item.formComponent || {})
        }
        form.extra = this.handleForm(form.extra, model)
        return form
      })
    }
  },
  created () {
    if (this.routerMode) {
      this.filter = this.getFilterFromQuery()
    }
  },
  watch: {
    settings () {
      this.filter = {}
      this.hasSetDefault = false
      this.defer = getDefer()
      if (this.routerMode && !isEqual({}, this.$route.query)) {
        this.$router.push({
          query: {}
        })
      }
    }
  },
  methods: {
    handleOp ({name, row} = {}) {
      if (name === 'edit') {
        this.addOrEditRowAction('编辑', row)
      } else if (name === 'delete') {
        this.deleteRowAction(row)
      } else if (name === 'add') {
        this.addOrEditRowAction()
      }
    },
    setHasSetDefault () {
      if (this.hasSetDefault) return
      this.hasSetDefault = true
      this.defer.resolve()
    },
    async onDownload () {
      try {
        await this.$refs.filterForm.validate()
      } catch (e) {
        return Promise.reject(new Error('请正确填写表单'))
      }
      if (this.download.handle) {
        const data = {filter: this.filter}
        const res = await (typeof this.download.handle === 'function' ? this.download.handle(data) : makeRequest(data, this.download.handle))
        return saveAs(res.data, res.fileName || '')
      }
      if (this.download.url) {
        window.open(this.download.url)
      }
      return Promise.reject(new Error('配置错误，下载失败'))
    },
    getFilterFromQuery () {
      const query = this.$route.query
      const res = {}
      Object.keys(query).forEach(key => {
        const item = this.extendsSetting.find(item => {
          return item.canFilter && item.key === key
        })
        if (item) {
          res[key] = item.resourceFieldType === 'INTEGER' && typeof query[key] === 'string' ? Number(query[key]) : query[key]
        }
      })
      return res
    },
    handleForm (item, model) {
      const ignoreKeys = {options: 1, lazyLoad: 1}
      const clone = {...item}
      Object.keys(clone).forEach(key => {
        if (!ignoreKeys[key]) {
          clone[key] = resolveString(clone[key], {model}, ignoreKeys)
        }
      })
      return clone
    },
    getExtends (key) {
      return this.extendsMap[key] || (this.$extendsMap && this.$extendsMap[key]) || {}
    },
    async onSearch () {
      try {
        if (this.$refs.filterForm) {
          await this.$refs.filterForm.validate()
        }
      } catch (e) {
        return
      }
      this.$refs.table && this.$refs.table.pageInfoInner && (this.$refs.table.pageInfoInner.currentPage = 1)
      this.fetchData()
    },
    onChange () {
      if (this.showFileter && !this.hasSetDefault) return
      this.debounceSearch()
    },
    debounceSearch: debounce(function () {
      this.onSearch()
    }, 300),
    async deleteRowAction (row = {}) {
      await this.$confirm('确认要删除吗？')
      try {
        this.updateRow(row, true)
      } catch (e) {
        this.$message({
          message: '删除失败',
          type: 'error'
        })
      }
    },
    fetchData () {
      if (this.showFileter && !this.hasSetDefault) return
      if (this.routerMode) {
        // const path = this.routerMode(this.pageInfoInner)
        const query = {
          ...this.$route.query,
          ...this.filter
        }
        Object.keys(query).forEach(key => {
          if (!query[key] && query[key] !== 0) {
            delete query[key]
          }
        })
        if (!isEqual(query, this.$route.query)) {
          this.$router.push({
            query
          })
        }
      }
      return this.$refs.table.refreshData()
    },
    async updateRow (model, isDelete = false) {
      if (isDelete) {
        await this.deleteRow(model)
      } else {
        await this.addOrEditRow(model)
      }
      if (this.type === '添加' && !isDelete) {
        await this.onSearch()
      } else {
        await this.fetchData()
      }
      this.addCache = {}
      this.$message.success('操作成功')
    },
    async safeUpdateRow (model) {
      try {
        await this.updateRow(model)
      } catch (e) {
        this.$handleError(e)
      }
    },
    addOrEditRowAction (type = '添加', row) {
      this.type = type
      this.dialogTitle = type + this.title
      this.model = row || this.addCache
      this.visilbe = true
      this.$nextTick(() => {
        this.$refs.dataDialog.$refs.form.setDefault()
      })
    }
  }
}
</script>

<style>
.el-message-box__wrapper {
  overflow: auto;
}
</style>
