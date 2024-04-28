// pages/myorder/myorder.js
const app = getApp()
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		orderindex: [],
		hasorderindex: false,
		seelList: [],
		hasSeelList: false,
		state: 0,
		buyed: [],
		hasbuyed:false
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	myOrder: function () {
		const that = this
		wx.request({
			url: 'http://127.0.0.1:8000/api/order/',
			method: 'GET',
			header: {
				"token": wx.getStorageSync('token')
			},
			success: (res) => {
				that.setData({
					state: 0
				})
				console.log(res, 69);
				var orderindex=[]
				var buyed=[]
				res.data.data.forEach((item) => {
					if (item.status_dict[0] == 0) {
						orderindex.push(item)
					} else {
						buyed.push(item)
					}
				})
				that.setData({
					orderindex: orderindex,
					buyed:buyed
				})
				if(this.data.buyed.length>0){
					this.setData({
						hasorderindex: true
					})
				}
			}
		})
	
	},
	mySeel: function () {
		const that = this;
		wx.request({
			url: 'http://127.0.0.1:8000/api/self/book/',
			method: 'GET',
			header: {
				"token": wx.getStorageSync('token')
			},
			success: (res) => {
				console.log(res.data.data.results, 558);

				that.setData({
					seelList: res.data.data.results
				})
				console.log(that.data.seelList.length);
				if (that.data.seelList.length > 0) {
					that.setData({
						hasSeelList: true,
						state: 2
					})
				}
			}
		})

	},
	myConfirm: function () {
		const that = this
		that.setData({
			state: 1
		})

		wx.request({
			url: 'http://127.0.0.1:8000/api/order/',
			method: 'GET',
			header: {
				"token": wx.getStorageSync('token')
			},
			success: (res) => {
			
				console.log(res, 69);
				var orderindex=[]
				var buyed=[]
				res.data.data.forEach((item) => {
					if (item.status_dict[0] == 0) {
						orderindex.push(item)
					} else {
						buyed.push(item)
					}
				})
				that.setData({
					orderindex: orderindex,
					buyed:buyed
				})
				if(that.data.buyed.length>0){
					that.setData({
						hasbuyed: true
					})
				}
			}
		})

	},
	onLoad: function (options) {
	
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
		this.myOrder()
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