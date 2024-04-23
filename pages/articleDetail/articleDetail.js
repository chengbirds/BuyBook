// pages/articleDetail/articleDetail.js
let app = getApp()
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		article: {},
		userInfo: {},
		show:false
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		const that = this
		var articleId = options.id;
		console.log('articleId:', articleId);
		// 通过id获取详情信息
		wx.request({
			url: `http://127.0.0.1:8000/api/book/${articleId}`,
			header: {
				"token": wx.getStorageSync('token')
			},
			
			success: (res) => {
				console.log(res, 666);
				res.data.data.image=`http://127.0.0.1:8000${res.data.data.image}`;
				res.data.data.userinfo.avatar=`http://127.0.0.1:8000${res.data.data.userinfo.avatar}`
				that.setData({
					article:res.data.data,
					userInfo:res.data.data.userinfo
				})
				console.log(res, 667,that.data.userInfo);
			}
		})
	},
	// 弹框的出现与消失
	isShow(){
		console.log(111);
this.setData({
	show:true
})
	},
	onClose(){
		this.setData({
			show:false
		})
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
		this.setData({
			article: app.globalData.articleDetail
		});
		if (app.globalData.userInfo) {
			this.setData({
				userInfo: app.globalData.userInfo,
			});
		}
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