import { reqGetCategoryList, reqGetBannerList, reqGetFloorList } from "@/network"

const state = {
	categoryList: [],
	bannerList: [],
	floorList: []
}
const mutations = {
	GETCATEGTORYLIST (state, categoryList) {
		state.categoryList = categoryList
	},
	GETBANNERLIST (state, bannerList) {
		state.bannerList = bannerList
	},
	GETFLOORLIST (state, floorList) {
		state.floorList = floorList
	}
}
const actions = {
	// {commit}解构语法，来自context.commit
	async getCategoryList ({ commit }) {
		// async和await共生，等待await后的promise对象resolve后继续执行async函数
		let result = await reqGetCategoryList()
		if (result.code === 200) {
			commit('GETCATEGTORYLIST', result.data)
		}
	},
	// 获取轮播图数据
	async getBannerList ({ commit }) {
		let result = await reqGetBannerList()
		if (result.code === 200) {
			commit('GETBANNERLIST', result.data)
		}
	},
	// 
	async getFloorList ({ commit }) {
		let result = await reqGetFloorList()
		if (result.code === 200) {
			commit('GETFLOORLIST', result.data)
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