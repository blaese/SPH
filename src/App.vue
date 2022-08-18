<template>
	<div id="app">
		<Header></Header>
		<router-view></router-view>
		<!-- Footer组件不在登录注册时显示 -->
		<Footer v-show="$route.meta.show"></Footer>
	</div>
</template>

<script>
import Header from './components/Header/Header.vue'
import Footer from './components/Footer/Footer.vue'

export default {
	name: 'app',
	components: {
		Header,
		Footer
	},
	mounted () {
		// 通知vuex发请求，获取数据，存储于仓库中
		this.$store.dispatch('getCategoryList')
	}
}
</script>

<style>
</style>
