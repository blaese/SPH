import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '@/store'

Vue.use(VueRouter)

const Home = () => import('@/views/Home/Home.vue')
const Search = () => import('@/views/Search/Search.vue')
const Login = () => import('@/views/Login/Login.vue')
const Register = () => import('@/views/Register/Register.vue')
const Detail = () => import('@/views/Detail/Detail.vue')
const AddCartSuccess = () => import('@/views/AddCartSuccess/AddCartSuccess.vue')
const ShopCart = () => import('@/views/ShopCart/ShopCart.vue')
const Trade = () => import('@/views/Trade/Trade.vue')

// 解决编程式导航抛出NavigationDuplicated的警告错误
// 1.先把VueRouter原型对象的push方法保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace
// 2.重写push|replace，(参数1：跳转路径和参数；参数2：成功回调；参数3：失败回调)
// 重写思路：有回调调用回调，没有回调自己手写回调
VueRouter.prototype.push = function (location, reslove, reject) {
	if (reslove && reject) {
		originPush.call(this, location, reslove, reject)
	} else {
		originPush.call(this, location, () => { }, () => { })
	}
}
VueRouter.prototype.replace = function (location, reslove, reject) {
	if (reslove && reject) {
		originReplace.call(this, location, reslove, reject)
	} else {
		originReplace.call(this, location, () => { }, () => { })
	}
}

const routes = [
	{
		path: '',
		redirect: '/home',
		meta: { show: true }
	},
	{
		path: '/home',
		component: Home,
		meta: { show: true }
	},
	{
		path: '/search/:keyword?',
		component: Search,
		meta: { show: true },
		name: 'search',
		// 1.boolean写法，只能传递params参数
		// props: true
		// 2.对象写法：用来额外地给路由组件传递一些props
		// props: { a: 1, b: 2 }
		// // 3.函数写法(最常用):可以将params参数和query参数通过props传递给路由组件
		// props: ($route) => {
		// 	return { keyword: $route.params.keyword, k: $route.query.k }
		// }
	},
	{
		path: '/login',
		component: Login,
		meta: { show: false }
	},
	{
		path: '/register',
		component: Register,
		meta: { show: false }
	},
	{
		path: '/detail/:id',
		component: Detail,
		meta: { show: true }
	},
	{
		path: '/addcartsuccess',
		component: AddCartSuccess,
		meta: { show: true },
		name: 'addcartsuccess'
	},
	{
		path: '/shopcart',
		component: ShopCart,
		meta: { show: true }
	},
	{
		path: '/trade',
		component: Trade,
		meta: { show: true }
	}
]

const router = new VueRouter({
	routes,
	mode: 'history',
	// 滚动行为，x水平滚动条，y垂直滚动条
	scrollBehavior (to, from, savedPosition) {
		// y=0代表滚动条在顶部
		return { y: 0 }
	}
})

// 全局前置守卫
router.beforeEach(async (to, from, next) => {
	// 从from路由跳转到to路由
	// next()是放行函数，next(path)放行到指定路由 next(false)自动不跳转，回到from路由
	let token = store.state.user.token
	let name = store.state.user.userInfo.name
	if (token) {
		// 登录了就不能跳转到登录页面
		if (to.path == '/login') {
			next('/home')
		} else {
			if (name) {
				next()
			} else {
				// 登陆后没有用户信息，需要派发action获取
				// 保证登录后每个页面刷新都会自动获取用户信息
				try {
					await store.dispatch('UserInfo')
					next()
				} catch (error) {
					// token过期失效，需要清除token，并重新登录
					await store.dispatch('userLogout')
					next('/login')
				}
			}
		}
	} else {
		// 未登录
		next()
	}
})

export default router