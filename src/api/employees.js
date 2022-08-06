import request from "@/utils/request"
export function getEmploApi() {
    return request({
        url: '/sys/user/simple'
    })
}
