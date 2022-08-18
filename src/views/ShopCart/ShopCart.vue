<template>
	<div class="cart">
		<h4>全部商品</h4>
		<div class="cart-main">
			<div class="cart-th">
				<div class="cart-th1">全部</div>
				<div class="cart-th2">商品</div>
				<div class="cart-th3">单价（元）</div>
				<div class="cart-th4">数量</div>
				<div class="cart-th5">小计（元）</div>
				<div class="cart-th6">操作</div>
			</div>
			<div class="cart-body">
				<ul class="cart-list" v-for="cart in cartInfoList" :key="cart.id">
					<li class="cart-list-con1">
						<input type="checkbox" name="chk_list" :checked="cart.isChecked" @change="updateChecked(cart, $event)">
					</li>
					<li class="cart-list-con2">
						<img :src="cart.imgUrl">
						<div class="item-msg">{{ cart.skuName }}</div>
					</li>
					<li class="cart-list-con4">
						<span class="price">{{ cart.skuPrice }}.00</span>
					</li>
					<li class="cart-list-con5">
						<a href="javascript:void(0)" class="mins" @click="handler('minus', -1, cart)">-</a>
						<input autocomplete="off" type="text" :value="cart.skuNum" minnum="1" class="itxt"
							@change="handler('change', $event.target.value * 1, cart)">
						<a href="javascript:void(0)" class="plus" @click="handler('add', 1, cart)">+</a>
					</li>
					<li class="cart-list-con6">
						<span class="sum">{{ cart.skuPrice * cart.skuNum }}</span>
					</li>
					<li class="cart-list-con7">
						<a class="sindelet" @click="deleteCartById(cart)">删除</a>
						<br>
						<a href="#none">移到收藏</a>
					</li>
				</ul>
			</div>
		</div>
		<div class="cart-tool">
			<div class="select-all">
				<input class="chooseAll" type="checkbox" :checked="isAllChecked && cartInfoList.length > 0"
					@change="updateAllChecked">
				<span>全选</span>
			</div>
			<div class="option">
				<a @click="deleteAllCheckedCart">删除选中的商品</a>
				<a href="#none">移到我的关注</a>
				<a href="#none">清除下柜商品</a>
			</div>
			<div class="money-box">
				<div class="chosed">已选择
					<span>0</span>件商品
				</div>
				<div class="sumprice">
					<em>总价（不含运费） ：</em>
					<i class="summoney">{{ totalPrice }}</i>
				</div>
				<div class="sumbtn">
					<router-link class="sum-btn" to="/trade">结算</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import throttle from 'lodash/throttle';

export default {
	name: 'ShopCart',
	computed: {
		...mapGetters(['cartList']),
		cartInfoList () {
			return this.cartList.cartInfoList || []
		},
		// 总价
		totalPrice () {
			let sum = 0
			this.cartInfoList.forEach(item => {
				sum += item.skuPrice * item.skuNum
			});
			return sum
		},
		// 是否全选
		isAllChecked () {
			return this.cartInfoList.every(item => item.isChecked == 1)
		}
	},
	mounted () {
		this.getData()
	},
	methods: {
		getData () {
			this.$store.dispatch('getCartList')
		},
		// 修改购物车产品个数
		// 进行节流，当用户点击太频繁时规定时间只记一次
		handler: throttle(async function (type, disNum, cart) {
			// 注意：派发的请求传递给服务器的数量是改变的产品数量，而非改变后的数量
			// 注意：传入的disNum并非最终的disNum，只是用来占位，因为需要监听input元素change事件后的对象值
			switch (type) {
				case 'minus':
					disNum = cart.skuNum > 1 ? -1 : 0
					break
				case 'add':
					disNum = 1
					break
				case 'change':
					if (isNaN(disNum) || disNum < 1) {
						disNum = 0
					} else {
						disNum = parseInt(disNum) - cart.skuNum
					}
			}
			// 派发action
			try {
				// 注意此处必须设置为await语句，等待传送服务器后才能重新获取数据
				await this.$store.dispatch('AddToCart', { skuId: cart.skuId, skuNum: disNum })
				this.getData()
			} catch (err) {
				console.log(err);
			}
		}, 500),
		async deleteCartById (cart) {
			try {
				await this.$store.dispatch('deleteCartById', cart.skuId)
				// 删除成功后获取新的请求
				this.getData()
			} catch (error) {
				console.log(error.message);
			}
		},
		async updateChecked (cart, event) {
			try {
				let checked = event.target.checked ? '1' : '0'
				await this.$store.dispatch('updateCheckedById', { skuId: cart.skuId, isChecked: checked })
				this.getData()
			}
			catch (error) {
				console.log(error.message);
			}
		},
		async deleteAllCheckedCart () {
			try {
				await this.$store.dispatch('deleteAllCheckedCart')
				this.getData()
			} catch (error) {
				console.log(err.message);
			}
		},
		updateAllChecked: throttle(async function (event) {
			try {
				let isChecked = event.target.checked ? '1' : '0'
				// 派发action
				await this.$store.dispatch('updateAllChecked', isChecked)
				this.getData()
			} catch (error) {
				console.log(error.message);
			}
		}, 200)
	},
}
</script>

<style lang="less" scoped>
.cart {
	width: 1200px;
	margin: 0 auto;

	h4 {
		margin: 9px 0;
		font-size: 14px;
		line-height: 21px;
	}

	.cart-main {
		.cart-th {
			background: #f5f5f5;
			border: 1px solid #ddd;
			padding: 10px;
			overflow: hidden;

			&>div {
				float: left;
			}

			.cart-th1 {
				width: 25%;

				input {
					vertical-align: middle;
				}

				span {
					vertical-align: middle;
				}
			}

			.cart-th2 {
				width: 25%;
			}

			.cart-th3,
			.cart-th4,
			.cart-th5,
			.cart-th6 {
				width: 12.5%;

			}
		}

		.cart-body {
			margin: 15px 0;
			border: 1px solid #ddd;

			.cart-list {
				padding: 10px;
				border-bottom: 1px solid #ddd;
				overflow: hidden;

				&>li {
					float: left;
				}

				.cart-list-con1 {
					width: 15%;
				}

				.cart-list-con2 {
					width: 35%;

					img {
						width: 82px;
						height: 82px;
						float: left;
					}

					.item-msg {
						float: left;
						width: 150px;
						margin: 0 10px;
						line-height: 18px;
					}
				}

				.cart-list-con4 {
					width: 10%;
				}

				.cart-list-con5 {
					width: 15%;

					.mins {
						border: 1px solid #ddd;
						border-right: 0;
						float: left;
						color: #666;
						width: 6px;
						text-align: center;
						padding: 8px;
						text-decoration: none;
					}

					input {
						border: 1px solid #ddd;
						width: 40px;
						height: 33px;
						float: left;
						text-align: center;
						font-size: 14px;
					}

					.plus {
						border: 1px solid #ddd;
						border-left: 0;
						float: left;
						color: #666;
						width: 6px;
						text-align: center;
						padding: 8px;
						text-decoration: none;
					}
				}

				.cart-list-con6 {
					width: 12%;

					.sum {
						font-size: 16px;
					}
				}

				.cart-list-con7 {
					width: 13%;

					a {
						color: #666;
						cursor: pointer;
					}
				}
			}
		}
	}

	.cart-tool {
		overflow: hidden;
		border: 1px solid #ddd;

		.select-all {
			padding: 10px;
			overflow: hidden;
			float: left;

			span {
				vertical-align: middle;
			}

			input {
				vertical-align: middle;
			}
		}

		.option {
			padding: 10px;
			overflow: hidden;
			float: left;

			a {
				float: left;
				padding: 0 10px;
				color: #666;
				cursor: pointer;
			}
		}

		.money-box {
			float: right;

			.chosed {
				line-height: 26px;
				float: left;
				padding: 0 10px;
			}

			.sumprice {
				width: 200px;
				line-height: 22px;
				float: left;
				padding: 0 10px;

				.summoney {
					color: #c81623;
					font-size: 16px;
				}
			}

			.sumbtn {
				float: right;

				a {
					display: block;
					position: relative;
					width: 96px;
					height: 52px;
					line-height: 52px;
					color: #fff;
					text-align: center;
					font-size: 18px;
					font-family: "Microsoft YaHei";
					background: #e1251b;
					overflow: hidden;
				}
			}
		}
	}
}
</style>