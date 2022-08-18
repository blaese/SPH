import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from '@/network'
import { setToken, getToken, removeToken } from '@/utils/token'

const state = {
	code: '',
	token: getToken(),
	userInfo: {}
}
const mutations = {
	GETCODE (state, code) {
		state.code = code
	},
	USERLOGIN (state, token) {
		state.token = token
	},
	// 提交用户信息
	USERINFO (state, userInfo) {
		state.userInfo = userInfo
	},
	CLEAR (state) {
		state.token = ''
		state.userInfo = {}
		removeToken()
	}
}
const actions = {
	async getCode ({ commit }, phone) {
		let result = await reqGetCode(phone)
		if (result.code == 200) {
			commit('GETCODE', result.data)
		}
	},
	async UserRegister ({ commit }, user) {
		let result = await reqUserRegister(user)
		if (result.code == 200) {
			return 'ok'
		} else {
			return Promise.reject(new Error('failed'))
		}
	},
	async UserLogin ({ commit }, user) {
		let result = await reqUserLogin(user)
		if (result.code == 200) {
			// 用户登录成功且获取到token
			commit('USERLOGIN', result.data.token)
			// 本地持久化存储token
			setToken(result.data.token)
		} else {
			return Promise.reject(new Error('failed'))
		}
	},
	// 获取用户信息
	async UserInfo ({ commit }) {
		let result = await reqUserInfo()
		if (result.code == 200) {
			commit('USERINFO', result.data)
		} else {
			return Promise.reject(new Error('failed'))
		}
	},
	// 退出登录
	async userLogout ({ commit }) {
		// 1.通知服务器清除token
		let result = await reqLogout()
		// 2.清除仓库+本地存储数据
		if (result.code == 200) {
			commit('CLEAR')
		} else {
			return Promise.reject(new Error('failed'))
		}
	}
}
const getters = {}

export default {
	state,
	mutations,
	actions,
	getters
}