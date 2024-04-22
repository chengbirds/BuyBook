// pages/register/register.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		username: '',
		password: '',
		confirmPassword: '',
		array: [],
		index: 0,
		value1:0,
		objectArray: []
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		wx.request({
			url: 'http://127.0.0.1:8000/api/campus/',
			success: (res) => {
				console.log(res, 888)
				if (res.data.code == 0) {
					// 请求成功
					this.data.objectArray=res.data.data;
						res.data.data.forEach(item=>{
					this.data.array.push(item.name)
					})
console.log(this.data.array,this.data.objectArray,8889)
				}
			}
		})

	},
	bindPickerChange: function(e) {
		console.log('picker发送选择改变，携带值为', e.detail.value)
		this.setData({
			index: e.detail.value
		})
	},
	
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow() {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh() {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom() {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage() {

	}
})