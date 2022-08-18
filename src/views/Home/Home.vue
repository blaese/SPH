<template>
	<div>
		<type-nav></type-nav>
		<list-container></list-container>
		<recommend></recommend>
		<rank></rank>
		<like></like>
		<floor v-for="floor in floorList" :key="floor.id" :list="floor"></floor>
		<brand></brand>
	</div>
</template>

<script>
import ListContainer from './ListContainer/ListContainer.vue'
import Recommend from './Recommend/Recommend.vue'
import Rank from './Rank/Rank.vue'
import Like from './Like/Like.vue'
import Floor from './Floor/Floor.vue'
import Brand from './Brand/Brand.vue'

import { mapState } from 'vuex'

export default {
	name: "Home",
	components: {
		ListContainer,
		Recommend,
		Rank,
		Like,
		Floor,
		Brand
	},
	mounted () {
		this.$store.dispatch('getFloorList')
	},
	computed: {
		...mapState({
			floorList (state) {
				return state.home.floorList
			}
		})
	}
}
</script>

<style scoped>
</style>
