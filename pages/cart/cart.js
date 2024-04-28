// pages/cart/cart.js
import Toast from '@vant/weapp/toast/toast';
const app = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		carts: [],
		hasList: false,
		totalPrice: 0,
		selectAll: false,
		address: ''
	},

	bindViewTOrder: function () {
		var success1 = 0
		const that = this;
		var addlist = that.data.carts.filter((item) => {
			if (item.selected == true) {
				return true
			}
		})

		if (that.data.address == undefined) {
			Toast('请设置默认地址！')
		} else {
			var address_id = that.data.address.id
var carts=[]
			that.data.carts.forEach((item) => {
				var seller_id
				var book_id
				var quantity
				if (item.selected) {
					if (item.selected == true) {
						carts.push(item)
						seller_id = item.user.id
						book_id = item.book.id
						quantity = item.quantity
						wx.request({
							url: 'http://127.0.0.1:8000/api/order/',
							method: 'POST',
							data: {
								address_id: address_id,
								seller_id: seller_id,
								book_id: book_id,
								quantity: quantity,
								status: 0

							},
							header: {
								"token": wx.getStorageSync('token')
							},
							success: ((res) => {
								console.log(res.data.code, 445);
								// 加入订单成功
								if (res.data.code == 0) {


									wx.navigateTo({
										url: `../orderdetail/orderdetail?carts=${JSON.stringify(carts)}&address=${JSON.stringify(that.data.address)}`
								})

								}
							})
						})
					}
				}
			})


		}
		console.log(success1, 1022);


	},
	onChange(event) {
		console.log(event.detail, event.currentTarget.dataset.id);
		const that = this
		wx.request({
			url: `http://127.0.0.1:8000/api/cart/${event.currentTarget.dataset.id}/`,
			method: "PUT",
			data: {
				book_id: event.currentTarget.dataset.book_id,
				quantity: event.detail
			},
			header: {
				"token": wx.getStorageSync('token')
			},
			success: (res) => {
				console.log(res, 888);
				this.data.carts.forEach((item) => {
					if (item.id == res.data.data.id) {
						item.quantity = res.data.data.quantity
					}
				})
			}
		})

	},


	selectList: function (e) {

		const index = e.currentTarget.dataset.index;
		let carts = this.data.carts;
		const selected = carts[index].selected;
		carts[index].selected = !selected;
		console.log(e, carts[index].selected);
		if (selected == true) {
			this.setData({
				selectAll: false
			});
		}
		this.setData({
			carts: carts,
		});
		console.log(carts, 666);
		var totalPrice = 0
		this.data.carts.forEach(item => {
			if (item.selected) {
				if (item.selected == true) {
					totalPrice = totalPrice + item.quantity * item.book.price
				}
			}
		})
		this.setData({
			totalPrice: totalPrice
		})
	},

	selectListAll: function () {

		let carts = this.data.carts;
		if (this.data.selectAll != true) {
			for (let i = 0; i < carts.length; i++) {
				carts[i].selected = true;
			}
			this.setData({
				carts: carts,
				selectAll: true
			});
		} else {
			for (let i = 0; i < carts.length; i++) {
				carts[i].selected = false;
			}
			this.setData({
				carts: carts,
				selectAll: false
			});
		}
		var totalPrice = 0
		this.data.carts.forEach(item => {
			if (item.selected) {
				if (item.selected == true) {
					totalPrice = totalPrice + item.quantity * item.book.price
				}
			}
		})
		this.setData({
			totalPrice: totalPrice
		})
		console.log(this.data.carts);
	},


	subnumber: function (e) {

		const index = e.currentTarget.dataset.index;
		let carts = this.data.carts;
		let num = carts[index].num;
		num = num - 1;
		carts[index].num = num;
		this.setData({
			carts: carts
		});
		this.getTotalPrice();
	},

	deleteitem: function (e) {
		const that = this
		const index = e.currentTarget.dataset.index;
		const id = e.currentTarget.dataset.id;
		let carts = that.data.carts;
		wx.request({
			url: `http://127.0.0.1:8000/api/cart/${id}/`,
			method: "DELETE",
			header: {
				"token": wx.getStorageSync('token')
			},
			success: async (res) => {
				wx.request({
					url: 'http://127.0.0.1:8000/api/cart/',
					header: {
						"token": wx.getStorageSync('token')
					},
					success: (res) => {
						console.log(res, 889, res.data.data.results.length);
						
							this.setData({
								hasList: true,
								carts: res.data.data.results,
								selectAll: false,
								totalPrice: 0
							});
						if(this.data.carts.length==0){
							this.setData({
								hasList:false
							})
						}
		
					}
				})

			}
		})



	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
this.onShow()
	},
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},
	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
		wx.request({
			url: 'http://127.0.0.1:8000/api/cart/',
			header: {
				"token": wx.getStorageSync('token')
			},
			success: (res) => {
				console.log(res, 889, res.data.data.results.length);
				if (res.data.data.results.length !== 0) {
					this.setData({
						hasList: true,
						carts: res.data.data.results,
						selectAll: false,
						totalPrice: 0
					});
				}

			}
		})
		const that = this
		wx.request({
			url: 'http://127.0.0.1:8000/api/address/',
			header: {
				"token": wx.getStorageSync('token')
			},
			success: (res) => {
				console.log(res.data.data.results, 32);
				var address
				res.data.data.results.forEach((item) => {
					if (item.is_default == true) {
						address = item
					}
				})
				that.setData({
					address: address
				})
				console.log(that.data.address, 888);
			}
		})
	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})