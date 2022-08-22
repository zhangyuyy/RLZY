// 获取权限
import request from '@/utils/request'
export function getPermissionList(params) {
    return request({
        url: '/sys/permission',
        params
    })
}
/**
 * 添加权限
 * enVisible	string	非必须			
  name	string	非必须			
  code	string	非必须			
   description	string	非必须			
   type	number	非必须			
    pid	string	非必须			
 * @param {*} data 
 * @returns 
 */
export function addPermission(data) {
    return request({
        url: '/sys/permission',
        method: 'post',
        data
    })
}