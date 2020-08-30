export default function createModel ({
  initData = [],
  waitMsTime = 2000,
  randomErrRate = 10,
  page = true
} = {}) {
  const sleep = () => {
    if ((Math.random() * 100 | 0) < randomErrRate) {
      return Promise.reject(new Error('模拟错误，随机错误'))
    }
    return new Promise(resolve => setTimeout(resolve, Math.random() * waitMsTime))
  }
  const data = [...initData]
  let id = initData.length
  return {
    async getData ({pageInfo, tableFilter, filter}) {
      await sleep()
      if (!page) {
        filter = tableFilter
        tableFilter = pageInfo
      }
      let res
      if (!filter) {
        res = data
      } else {
        const keys = Object.keys({...tableFilter, ...filter})
        if (!keys.length) {
          res = data
        } else {
          res = data.filter(item => keys.some(key => {
            return String(item[key]).indexOf(filter[key]) > -1
          }))
        }
      }
      return page ? {
        data: res.slice((pageInfo.currentPage - 1) * pageInfo.pageSize, pageInfo.currentPage * pageInfo.pageSize),
        total: res.length
      } : res
    },
    async addOrEditRow (row) {
      await sleep()
      if (row.id !== undefined) {
        const index = data.findIndex(item => item.id === row.id)
        const oldRow = data[index]
        data.splice(index, 1, {
          ...row,
          createTime: oldRow.createTime,
          updateTime: Date.now()
        })
      } else {
        data.push({...row, id: ++id, createTime: Date.now(), updateTime: Date.now()})
      }
    },
    async deleteRow (row) {
      await sleep()
      if (row.id !== undefined) {
        data.splice(data.findIndex(item => item.id === row.id), 1)
      }
    }
  }
}
