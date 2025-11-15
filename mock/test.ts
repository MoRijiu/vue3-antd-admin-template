/**
 * Mock 测试接口
 * 用于验证 Mock 是否正常工作
 */
import type { MockMethod } from 'vite-plugin-mock'

export default [
  // 简单测试接口
  {
    url: '/api/test/hello',
    method: 'GET',
    response: () => {
      return {
        code: 200,
        data: {
          message: 'Hello from Mock!',
          timestamp: Date.now(),
        },
        success: true,
      }
    },
  },

  // 测试 POST 接口
  {
    url: '/api/test/echo',
    method: 'POST',
    response: ({ body }: any) => {
      return {
        code: 200,
        data: {
          echo: body,
          timestamp: Date.now(),
        },
        success: true,
      }
    },
  },
] as MockMethod[]
