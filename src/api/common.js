import request from '@/utils/request'

// 获取用户列表
export function getUserList(data) {
  return request({
    url: '/platform/list/user',
    method: 'post',
    data
  })
}

// 获取系统角色列表
export function getRoleList(data) {
  return request({
    url: '/platform/list/role',
    method: 'post',
    data
  })
}

