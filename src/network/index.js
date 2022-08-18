import request from './request'
import mockRequest from './mockRequest'

// 获取三级联动接口数据
export const reqGetCategoryList = () => request.get('/product/getBaseCategoryList')

// 获取轮播图数据
export const reqGetBannerList = () => mockRequest.get('/banners')

// 获取floors数据
export const reqGetFloorList = () => mockRequest.get('/floors')

// 获取搜索商品数据
// get和params搭配,post和data搭配/传递参数至少是一个空对象
export const reqGetSearchInfo = (data) => request({
	url: '/list',
	method: 'post',
	data
})

// 获取详情页数据
export const reqGetGoodsInfo = (id) => request({
	url: `/item/${id}`,
	method: 'get'
})

// 将产品添加到购物车中
// /api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddToCart = (skuId, skuNum) => request({
	url: `/cart/addToCart/${skuId}/${skuNum}`,
	method: 'post'
})

// 获取购物车列表数据 
// /api/cart/cartList
export const reqGetCartList = () => request.get('/cart/cartList')

// 删除购物车产品的接口
export const reqDeleteCartById = (skuId) => request({
	url: `/cart/deleteCart/${skuId}`,
	method: 'delete'
})

// 切换商品选中状态  /api/cart/checkCart/{skuId}/{isChecked}
export const reqUpdateCheckedById = (skuId, isChecked) => request({
	url: `/cart/checkCart/${skuId}/${isChecked}`,
	method: 'get'
})

// 获取验证码 /api/user/passport/sendCode/{phone} get
export const reqGetCode = (phone) => request({ url: `/user/passport/sendCode/${phone}`, method: 'get' })

// 注册用户信息 /api/user/passport/register post phone/passport/code
export const reqUserRegister = (data) => request({ url: '/user/passport/register', data, method: 'post' })

// 登录用户信息  /api/user/passport/login POST phone/password
export const reqUserLogin = (data) => request({ url: '/user/passport/login', data, method: 'post' })

// 获取用户信息(需要带着用户的token向服务器请求用户信息) 
// /api/user/passport/auth/getUserInfo  token作为请求头 get
export const reqUserInfo = () => request({ url: '/user/passport/auth/getUserInfo', method: 'get' })

// 退出登录  /api/user/passport/logout get
export const reqLogout = () => request({ url: '/user/passport/logout', method: 'get' })

// 获取用户地址信息  /api/user/userAddress/auth/findUserAddressList
export const reqAddressInfo = () => request({ url: '/user/userAddress/auth/findUserAddressList', method: 'get' })

// 获取订单交易信息 /api/order/auth/trade
export const reqOrderInfo = () => request({ url: '/order/auth/trade', method: 'get' })