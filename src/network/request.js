import axios from "axios";

// 引入进度条
import nprogress from 'nprogress'

// 引入store
import store from '@/store'

// 引入进度条样式
import 'nprogress/nprogress.css'

let request = axios.create({
	baseURL: '/api',
	timeout: 5000
})

// 请求拦截器
request.interceptors.request.use(config => {
	if (store.state.detail.uuid_token) {
		// 给请求头添加字段
		config.headers.userTempId = store.state.detail.uuid_token
	}
	// 需要携带token带给服务器
	if (store.state.user.token) {
		config.headers.token = store.state.user.token
	}

	// 进度条开始
	nprogress.start()
	return config
})

// 响应拦截器
request.interceptors.response.use(res => {
	// 进度条结束
	nprogress.done()
	return res.data
}, err => {
	console.log(err);
})

export default request
