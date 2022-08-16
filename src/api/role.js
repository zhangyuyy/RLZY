import request from '@/utils/request'

/**
 * 获取角色列表
 */
export function getRolesApi(params) {
  return request({
    url: '/sys/role',
    params,
  })
}

/**
 * 添加角色
 * @param {*} data {name, region}
 */
export function addRoleApi(data) {
  return request({
    url: '/sys/role',
    method: 'POST',
    data,
  })
}

/**
 * 通过角色id实现删除
 * @param {*} id 角色id
 */
export function removeRoleApi(id) {
  return request({
    url: '/sys/role/' + id,
    method: 'DELETE',
  })
}
