// 请求模拟数据
import axios from "axios";

// 引入进度条
import nprogress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'

let mockRequest = axios.create({
	baseURL: '/mock',
	timeout: 5000
})

// 请求拦截器
mockRequest.interceptors.request.use(config => {
	// 进度条开始
	nprogress.start()
	return config
})

// 响应拦截器
mockRequest.interceptors.response.use(res => {
	// 进度条结束
	nprogress.done()
	return res.data
}, err => {
	console.log(err);
})

export default mockRequest
