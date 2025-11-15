/**
 * ESLint 和 Prettier 示例文件
 * 展示代码规范和格式化效果
 */

// ==================== 类型定义 ====================
interface User {
  id: number
  name: string
  email: string
  age?: number
}

interface ApiResponse<T> {
  code: number
  message: string
  data: T
}

// ==================== 常量定义 ====================
const API_BASE_URL = 'https://api.example.com'
const DEFAULT_TIMEOUT = 5000

// ==================== 工具函数 ====================
/**
 * 格式化用户名
 * @param user 用户对象
 * @returns 格式化后的用户名
 */
export function formatUserName(user: User): string {
  return `${user.name} (${user.email})`
}

/**
 * 获取用户列表
 * @returns 用户列表
 */
export async function getUserList(): Promise<ApiResponse<User[]>> {
  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(DEFAULT_TIMEOUT),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('获取用户列表失败:', error)
    throw error
  }
}

/**
 * 创建用户
 * @param user 用户信息
 * @returns 创建结果
 */
export async function createUser(user: Omit<User, 'id'>): Promise<ApiResponse<User>> {
  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })

    const data = await response.json()
    return data
  } catch (error) {
    console.error('创建用户失败:', error)
    throw error
  }
}

// ==================== 数组操作 ====================
/**
 * 过滤成年用户
 * @param users 用户列表
 * @returns 成年用户列表
 */
export function filterAdultUsers(users: User[]): User[] {
  return users.filter((user) => user.age && user.age >= 18)
}

/**
 * 按年龄排序
 * @param users 用户列表
 * @param order 排序方式
 * @returns 排序后的用户列表
 */
export function sortUsersByAge(users: User[], order: 'asc' | 'desc' = 'asc'): User[] {
  return [...users].sort((a, b) => {
    const ageA = a.age || 0
    const ageB = b.age || 0
    return order === 'asc' ? ageA - ageB : ageB - ageA
  })
}

// ==================== 对象操作 ====================
/**
 * 合并用户信息
 * @param user 原用户信息
 * @param updates 更新的信息
 * @returns 合并后的用户信息
 */
export function mergeUserInfo(user: User, updates: Partial<User>): User {
  return {
    ...user,
    ...updates,
  }
}

// ==================== 类定义 ====================
/**
 * 用户管理类
 */
export class UserManager {
  private users: User[] = []

  /**
   * 添加用户
   * @param user 用户信息
   */
  addUser(user: User): void {
    this.users.push(user)
  }

  /**
   * 获取所有用户
   * @returns 用户列表
   */
  getAllUsers(): User[] {
    return [...this.users]
  }

  /**
   * 根据 ID 查找用户
   * @param id 用户 ID
   * @returns 用户信息或 undefined
   */
  findUserById(id: number): User | undefined {
    return this.users.find((user) => user.id === id)
  }

  /**
   * 删除用户
   * @param id 用户 ID
   * @returns 是否删除成功
   */
  removeUser(id: number): boolean {
    const index = this.users.findIndex((user) => user.id === id)
    if (index !== -1) {
      this.users.splice(index, 1)
      return true
    }
    return false
  }
}
