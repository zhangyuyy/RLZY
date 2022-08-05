// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import axios from 'axios'
import { Message } from 'element-ui';
import store from '@/store';
import { getTokenTime } from '@/utils/auth'
import router from '@/router';
// 封装处理token过期
const tokenTimeout = () => {
    const currentTime = Date.now()
    const tokenTime = getTokenTime()
    const timeout = 2 * 60 * 60 * 1000
    return currentTime - tokenTime > timeout
}

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // 设置axios请求的基础的基础地址
    timeout: 5000,
}) // 创建一个axios的实例
service.interceptors.request.use(
    async (config) => {
        const token = store.state.user.token
        if (token) {

            if (tokenTimeout()) {
                await store.dispatch('user/logout')
                router.push('/login')
               
                return Promise.reject(new Error('登陆过期'))
            } else {
                config.headers.Authorization = `Bearer ${token}`
            }

        }
        return config
    }, (error) => {
        return Promise.reject(error)
    }
) // 请求拦截器
service.interceptors.response.use((res) => {
    console.log(res);
    // 把data里的数据结构success是否成功，message提示信息
    const { success, data, message } = res.data
    // 登录成功走data
    if (success) {
        return data
    }
    // 失败给个提示语
    Message.error(message)
    // 官网axios错误提示
    return Promise.reject(new Error(message))

    // return res.data.data
    // 请求成功的函数
},
    // 官网axios错误提示
    async function (error) {
        console.dir(error);
        if (error.response.status === 401) {
            await store.dispatch('user/logout')
            router.push('/login')
            Message.error('登陆过期')
        } else {
            Message.error(error.message)
        }

        return Promise.reject(error)

    }
) // 响应拦截器
export default service // 导出axios实例