import request from '@/utils/request'

// 获取项目列表
export function getProjectList(data) {
  return request({
    url: '/project/list',
    method: 'post',
    data
  })
}

// 创建项目
export function createProject(data) {
  return request({
    url: '/project/create',
    method: 'post',
    data
  })
}

// 编辑项目
export function editProject(data) {
  return request({
    url: '/project/edit',
    method: 'post',
    data
  })
}

// 删除项目
export function deleteProject(data) {
  return request({
    url: '/project/delete',
    method: 'post',
    data
  })
}
