import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

import '@/mock/mockServe'

import TypeNav from '@/components/TypeNav/TypeNav.vue'
import Carousel from '@/components/Carousel/Carousel.vue'
import Pagination from '@/components/Pagination/Pagination.vue'

// 按需引入element-ui
import { Button, MessageBox } from 'element-ui';

// 引入轮播图样式
import 'swiper/css/swiper.css';

// 统一接收所有network文件下所有请求函数
import * as API from '@/network'

// 将TypeNav注册为全局组件
// 注册组件：调用Vue.component(参数1：注册组件的标签名，参数2：组件)
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)

// 注册全局组件
Vue.component(Button.name, Button);
// 挂载在原型上的做法
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

Vue.config.productionTip = false

import VueLazyload from 'vue-lazyload'
import loadingGif from '@/assets/loading.gif'

// 直接调用表单验证
import '@/plugins/validate'

Vue.use(VueLazyload, {
	// 懒加载默认的图片
	loading: loadingGif
})

new Vue({
	render: h => h(App),
	beforeCreate () {
		// 配置全局事件总线
		Vue.prototype.$bus = this
		// 将所有接口挂载到Vue原型对象上，使用时不用引，可以直接使用
		Vue.prototype.$API = API
	},
	router,
	store
}).$mount('#app')
