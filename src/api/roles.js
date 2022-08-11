import request from '@/utils/request'

/**
 * 获取员工列表(简单)
 * @returns promise
 */
export function getRolesApi(params) {
    return request({
        url: '/sys/role',
        params
    })
}

export function gaddRolesApi(data) {
    return request({
        url: '/sys/role',
        method: 'POST',
        data
    })
}