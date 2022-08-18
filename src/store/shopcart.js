import { reqGetCartList, reqDeleteCartById, reqUpdateCheckedById } from "@/network"

const state = {
	cartList: []
}
const mutations = {
	GETCARTLIST (state, cartList) {
		state.cartList = cartList
	}
}
const actions = {
	async getCartList ({ commit }) {
		let result = await reqGetCartList()
		if (result.code == 200) {
			commit('GETCARTLIST', result.data)
		}
	},
	async deleteCartById ({ commit }, skuId) {
		let result = await reqDeleteCartById(skuId)
		if (result.code == 200) {
			return 'ok'
		} else {
			return Promise.reject(new Error('failed'))
		}
	},
	// 根据id切换某个产品的状态
	async updateCheckedById ({ commit }, { skuId, isChecked }) {
		let result = await reqUpdateCheckedById(skuId, isChecked)
		if (result.code == 200) {
			return 'ok'
		} else {
			return Promise.reject(new Error('failed'))
		}
	},
	// 删除选中的全部商品
	deleteAllCheckedCart ({ dispatch, getters }) {
		// context包括commit、getters、dispatch、state
		let PromiseAll = []
		getters.cartList.cartInfoList.forEach(item => {
			if (item.isChecked == 1) {
				let promise = dispatch('deleteCartById', item.skuId)
				// 将派发的每个接口返回的promise添加到数组中
				PromiseAll.push(promise)
			}
		});
		// Promise.all() 只有全部的promise都成功才能return成功
		return Promise.all(PromiseAll)
	},
	// 修改全选框状态
	updateAllChecked ({ dispatch, getters }, isChecked) {
		let PromiseAll = []
		getters.cartList.cartInfoList.forEach(item => {
			let promise = dispatch('updateCheckedById', { skuId: item.skuId, isChecked: isChecked })
			PromiseAll.push(promise)
		})
		return Promise.all(PromiseAll)
	}
}
const getters = {
	cartList (state) {
		return state.cartList[0] || {}
	}
}

export default {
	state,
	mutations,
	actions,
	getters
}