<template>
	<div class="swiper-container">
		<div class="swiper-wrapper">
			<div class="swiper-slide" v-for="(carousel, index) in list" :key="index">
				<img :src="carousel.imgUrl">
			</div>
		</div>
		<!-- 如果需要分页器 -->
		<div class="swiper-pagination"></div>

		<!-- 如果需要导航按钮 -->
		<div class="swiper-button-prev"></div>
		<div class="swiper-button-next"></div>
	</div>
</template>

<script>
import Swiper from 'swiper'

export default {
	name: 'Carousel',
	props: {
		list: {
			type: Array,
			default () {
				return []
			}
		}
	},
	watch: {
		list: {
			// 立即监听:上来直接监听一次,不管数据此时是否有没有变化
			immediate: true,
			handler () {
				this.$nextTick(() => {
					// $nextTick():在下次DOM更新，循环结束之后执行延迟回调，在修改数据之后立即使用这个方法，获取更新后的DOM
					var swiper = new Swiper(".swiper-container", {
						loop: true,
						// 左右按钮
						navigation: {
							nextEl: ".swiper-button-next",
							prevEl: ".swiper-button-prev",
						},
						// 分页器
						pagination: {
							el: ".swiper-pagination",
							// 小圆圈可点击
							clickable: true
						},
					});
				})
			}
		}
	}
}
</script>

<style>

</style>
