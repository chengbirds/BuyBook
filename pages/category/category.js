// pages/category/category.js

const app = getApp();
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		bookname: '',
		bookList: [],
		msg: '',
		complete: false,
		category: {},
		id: 0
	},
	
	formSubmit: function (e) {
		console.log(e,777);
		const that=this
		wx.request({
			url: `http://127.0.0.1:8000/api/book/search/?wd=${this.data.bookname}`,
			header:{
				"token":wx.getStorageSync('token')
			},
			success:(res)=>{
		console.log(res,555)
		that.setData({
			bookList:res.data.data
		})
		
			}
		})
	},
	addcart: function (e) {
		var index = e.currentTarget.dataset.index;
		console.log(index)
		let book = this.data.bookList[index];
		console.log(book)
		app.globalData.book = book;
		app.globalData.book.selected = true;
		app.globalData.book.num = 1;
		if (app.globalData.carts.length == 0) {
			app.globalData.carts.push(app.globalData.book);
		} else {
			for (let i = 0; i < app.globalData.carts.length; i++) {
				if (bookList[index].id == app.globalData.carts[i].id) {
					app.globalData.carts[i].num = app.globalData.carts[i].num + 1;
					i = 1000;
				} else {
					app.globalData.carts.push(app.globalData.book);
					i = 1000;
				}
			}
		}
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		const that = this
		wx.request({
			url: 'http://127.0.0.1:8000/api/type/',
			method: 'GET',
			success: (res) => {
				console.log(res, 55);
				that.setData({
					category: res.data.data
				})
			}
		})
		wx.request({
			url: `http://127.0.0.1:8000/api/book/?offset=0&type=${that.data.id}`,
			method: "GET",
			header: {
				"token": wx.getStorageSync('token')
			},
			success: (res) => {
				console.log(res);
				that.setData({
					bookList: res.data.data.results,
					complete: true
				})
			}
		})
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},
	bookdetail: function (e) {
		console.log(e, 666)
		wx.navigateTo({
			// 传图书详情id
			url: '../articleDetail/articleDetail?id=' + e.currentTarget.dataset.idd,
		})

	},
	clickView(e) {
		const that = this
		console.log(e.currentTarget.dataset.id, 668);
		this.setData({
			id: e.currentTarget.dataset.id
		})
		wx.request({
			url: `http://127.0.0.1:8000/api/book/?offset=0&type=${that.data.id}`,
			method: "GET",
			header: {
				"token": wx.getStorageSync('token')
			},
			success: (res) => {
				console.log(res);
				that.setData({
					bookList: res.data.data.results,
					complete: true
				})
			}
		})

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
		this.onLoad()
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