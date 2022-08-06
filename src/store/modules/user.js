import { getUserDetail, getUserInfoApi, login } from '@/api/user.js'
import { setTokenTime } from '@/utils/auth'
export default {
  namespaced: true,
  state: {
    token: '',
    userInfo: {},
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload
    },
    setUserInfo(state, payload) {
      state.userInfo = payload
    },
  },
  actions: {
    // 登录获取token
    async getToken(context, payload) {
      // 发送请求得来的
      const res = await login(payload)
      context.commit('setToken', res)
      setTokenTime()
    },
    // 获取用户信息
    async getUserInfo(context) {
      const userBaseInfo = await getUserInfoApi()
      const userInfo = await getUserDetail(userBaseInfo.userId)
      context.commit('setUserInfo', { ...userBaseInfo, ...userInfo })
    },
    // 退出
    logout(context) {
      context.commit('setToken', '')
      context.commit('setUserInfo', {})
    },
  },
}
