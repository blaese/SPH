import { reqGetSearchInfo } from '@/network'

let state = {
	searchList: {}
}
let mutations = {
	GETSEARCHLIST (state, searchList) {
		state.searchList = searchList
	}
}
let actions = {
	// 获取搜索商品信息
	async getSearchInfo ({ commit }, params = {}) {
		let result = await reqGetSearchInfo(params)
		if (result.code === 200) {
			commit('GETSEARCHLIST', result.data)
		}
	}
}
let getters = {
	goodsList (state) {
		// 当网络问题导致请求数据为undefined时,给数据一个空数组的值
		return state.searchList.goodsList || []
	},
	trademarkList (state) {
		return state.searchList.trademarkList
	},
	attrsList (state) {
		return state.searchList.attrsList
	}
}

export default {
	state,
	mutations,
	actions,
	getters
}