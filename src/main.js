import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

import '@/mock/mockServe'

import TypeNav from '@/components/TypeNav/TypeNav.vue'
import Carousel from '@/components/Carousel/Carousel.vue'
import Pagination from '@/components/Pagination/Pagination.vue'

// 引入轮播图样式
import 'swiper/css/swiper.css';
// 将TypeNav注册为全局组件
// 注册组件：调用Vue.component(参数1：注册组件的标签名，参数2：组件)
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)

// 配置全局事件总线
Vue.prototype.$bus = new Vue()

Vue.config.productionTip = false

new Vue({
	render: h => h(App),
	router,
	store
}).$mount('#app')
