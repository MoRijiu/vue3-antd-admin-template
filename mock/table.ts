/**
 * 表格数据 Mock 接口
 * 用于演示表格、分页等功能
 */
import type { MockMethod } from 'vite-plugin-mock'
import Mock from 'mockjs'
import { successResult } from './_util'

// 生成模拟表格数据
const generateTableData = (count = 100) => {
  const data = []
  for (let i = 1; i <= count; i++) {
    data.push({
      id: i,
      name: Mock.Random.cname(),
      email: Mock.Random.email(),
      phone: /^1[3-9]\d{9}$/,
      age: Mock.Random.integer(18, 60),
      address: Mock.Random.county(true),
      department: Mock.Random.pick(['技术部', '产品部', '运营部', '市场部', '人事部']),
      position: Mock.Random.pick(['工程师', '经理', '主管', '专员', '总监']),
      status: Mock.Random.pick([1, 2, 3]), // 1: 在职, 2: 离职, 3: 休假
      createTime: Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
      updateTime: Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
    })
  }
  return data
}

// 生成 100 条数据
const tableData = generateTableData(100)

export default [
  // 获取表格数据（分页）
  {
    url: '/api/table/list',
    method: 'get',
    timeout: 0,
    response: ({ query }: any) => {
      const { page = 1, pageSize = 10, name = '', department = '', status = '' } = query

      // 过滤数据
      let filteredData = tableData
      if (name) {
        filteredData = filteredData.filter((item) => item.name.includes(name))
      }
      if (department) {
        filteredData = filteredData.filter((item) => item.department === department)
      }
      if (status) {
        filteredData = filteredData.filter((item) => item.status === Number(status))
      }

      // 分页
      const start = (Number(page) - 1) * Number(pageSize)
      const end = start + Number(pageSize)
      const list = filteredData.slice(start, end)

      return successResult({
        list,
        total: filteredData.length,
        page: Number(page),
        pageSize: Number(pageSize),
      })
    },
  },

  // 获取表格详情
  {
    url: '/api/table/:id',
    method: 'get',
    timeout: 0,
    response: ({ query }: any) => {
      const { id } = query
      const item = tableData.find((item) => item.id === Number(id))
      return successResult(item)
    },
  },

  // 创建表格数据
  {
    url: '/api/table/create',
    method: 'post',
    timeout: 0,
    response: ({ body }: any) => {
      const newItem = {
        id: tableData.length + 1,
        ...body,
        createTime: new Date().toISOString(),
        updateTime: new Date().toISOString(),
      }
      tableData.push(newItem)
      return successResult(newItem, '创建成功')
    },
  },

  // 更新表格数据
  {
    url: '/api/table/update',
    method: 'put',
    timeout: 0,
    response: ({ body }: any) => {
      const { id } = body
      const index = tableData.findIndex((item) => item.id === Number(id))
      if (index !== -1) {
        tableData[index] = {
          ...tableData[index],
          ...body,
          updateTime: new Date().toISOString(),
        }
        return successResult(tableData[index], '更新成功')
      }
      return successResult(null, '数据不存在')
    },
  },

  // 删除表格数据
  {
    url: '/api/table/delete/:id',
    method: 'delete',
    timeout: 0,
    response: ({ query }: any) => {
      const { id } = query
      const index = tableData.findIndex((item) => item.id === Number(id))
      if (index !== -1) {
        tableData.splice(index, 1)
        return successResult(null, '删除成功')
      }
      return successResult(null, '数据不存在')
    },
  },

  // 批量删除
  {
    url: '/api/table/batch-delete',
    method: 'post',
    timeout: 0,
    response: ({ body }: any) => {
      const { ids } = body
      const deletedCount = ids.reduce((count: number, id: number) => {
        const index = tableData.findIndex((item) => item.id === id)
        if (index !== -1) {
          tableData.splice(index, 1)
          return count + 1
        }
        return count
      }, 0)
      return successResult({ deletedCount }, `成功删除 ${deletedCount} 条数据`)
    },
  },
] as MockMethod[]
