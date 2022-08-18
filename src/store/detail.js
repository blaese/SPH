import { reqGetGoodsInfo, reqAddToCart } from "@/network";
import { getUUID } from "@/utils/uuid_token";

const state = {
	goodsInfo: {},
	// 生成游客临时身份
	uuid_token: getUUID()
}
const mutations = {
	GETGOODSINFO (state, goodsInfo) {
		state.goodsInfo = goodsInfo
	},
}
const actions = {
	async getGoodsInfo ({ commit }, id) {
		let result = await reqGetGoodsInfo(id)
		if (result.code === 200) {
			commit('GETGOODSINFO', result.data)
		}
	},
	// 此时传入的参数要以对象解构的形式传入，因为dispatch只能传一个参数
	async AddToCart ({ commit }, { skuId, skuNum }) {
		let result = await reqAddToCart(skuId, skuNum)
		// 加入购物车以后，前台将参数传入服务器，服务器写入数据后，并没有返回其他数据，只是返回code=200，代表操作成功
		// 因为服务器没有返回数据，所以不需用到mutations
		if (result.code == 200) {
			return 'ok'
		} else {
			return Promise.reject()
		}
	}
}
const getters = {
	categoryView (state) {
		return state.goodsInfo.categoryView || {}
	},
	skuInfo (state) {
		return state.goodsInfo.skuInfo || {}
	},
	// 产品售卖属性
	spuSaleAttrList (state) {
		return state.goodsInfo.spuSaleAttrList || []
	}
}

export default {
	state,
	mutations,
	actions,
	getters
}