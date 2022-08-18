// 1.引入Mock对象
import Mock from "mockjs";

// 2.引入json数据 (webpack默认对外暴露：图片、json)
import banners from './banners.json'
import floors from './floors.json'

// 3.mock()方法：参数1 请求地址；参数2 请求数据
Mock.mock('/mock/banners', { code: 200, data: banners })
Mock.mock('/mock/floors', { code: 200, data: floors })