let app = getApp()
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		article: []
	},
	articleDetail(e) {
		console.log(e)
		wx.navigateTo({
			// 传图书详情id
			url: '../articleDetail/articleDetail?id='+e.target.dataset.idd,
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
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
		const that = this;
		var arry
		wx.request({
			url: 'http://127.0.0.1:8000/api/book/?offset=0',
			header: {
				"token": wx.getStorageSync('token')
			},
			success: (res) => {
			res.data.data.results.map(item=>{
					item.image=`http://127.0.0.1:8000${item.image}`
				})
			
			that.setData({
				article:res.data.data.results
			})

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