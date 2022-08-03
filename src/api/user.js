import request from '@/utils/request'

export function login(data) {
    return request({
        url: '/sys/login',
        method: 'POST',
        data
    })

}
// 用户信息
export function getUserInfoApi() {
    return request({
        url: '/sys/profile',
        method: 'post'
    })
}
// 用户Id
export function getUserDetail(id) {
    return request({
        url: "/sys/user/" + id,

    })
}