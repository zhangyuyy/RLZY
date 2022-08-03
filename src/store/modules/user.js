import { login, getUserInfoApi, getUserDetail } from '@/api/user'
import { setTokenTime } from '@/utils/auth'
export default {
  namespaced: true,
  state: {
    // 登陆页面
    token: '',
    // 获取用户信息
    userInfo: {}
  },
  mutations: {
    // 登陆页面
    setToken(state, payload) {
      state.token = payload

    },
    // 获取用户信息
    setUserInfo(state, payload) {
      state.userInfo = payload
      console.log(payload);

    }

  },
  actions: {
    // 登陆页面
    async getToken(context, payload) {
      console.log(payload);
      const res = await login(payload)
      // console.log(res);

      context.commit('setToken', res)
      setTokenTime()

    },
    // 获取用户信息
    async getUserInfo(context) {
      const userBaseInfo = await getUserInfoApi()
      const userInfo = await getUserDetail(userBaseInfo.userId)
      console.log(userBaseInfo);
      context.commit('setUserInfo', { ...userBaseInfo, ...userInfo })
      // setTimeout(() => {
      //   const res = { name: 'zhangyu' }
      //   context.commit('setUserInfo', res)
      // }, 1000);
    },
    logout(context) {
      context.commit("setToken", '')
      context.commit('setUserInfo', '')

    }

  },

}
