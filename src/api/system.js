import request from '@/utils/request'

// 获取系统用户列表
export function getUserList(data) {
  return request({
    url: '/platform/list/user',
    method: 'post',
    data
  })
}

// 创建系统用户
export function createUser(data) {
  return request({
    url: '/platform/create/user',
    method: 'post',
    data
  })
}

// 编辑系统用户
export function editUser(data) {
  return request({
    url: '/platform/edit/user',
    method: 'post',
    data
  })
}

// 禁用系统用户
export function disableUser(data) {
  return request({
    url: '/platform/disable/user',
    method: 'post',
    data
  })
}

// 启用系统用户
export function enableUser(data) {
  return request({
    url: '/platform/enable/user',
    method: 'post',
    data
  })
}

// 删除系统用户
export function deleteUser(data) {
  return request({
    url: '/platform/delete/user',
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
// 创建系统角色
export function createRole(data) {
  return request({
    url: '/platform/create/role',
    method: 'post',
    data
  })
}

// 编辑系统角色
export function editRole(data) {
  return request({
    url: '/platform/edit/role',
    method: 'post',
    data
  })
}

// 删除系统角色
export function deleteRole(data) {
  return request({
    url: '/platform/delete/role',
    method: 'post',
    data
  })
}

// 系统角色授权
export function roleAuthorization(data) {
  return request({
    url: '/platform/auth/role',
    method: 'post',
    data
  })
}

// 获取系统所有角色权限列表
export function getAllRoleAuthorizationList() {
  return request({
    url: '/platform/privilege/level',
    method: 'post',
    data: {}
  })
}

