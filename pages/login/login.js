// pages/login/login.js
import Toast from '@vant/weapp/toast/toast';
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		username: '',
		password: ''
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {

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
	navigateToRegister() {
		// 导航到注册页面
		wx.navigateTo({
			url: '/pages/register/register' // 请根据实际情况更改 URL
		});
	},
	navigateToForgotPassword() {
		// 导航到忘记密码页面
		wx.navigateTo({
			url: '/pages/forgotPassword/forgotPassword' // 请根据实际情况更改 URL
		});
	},
	login() {
 wx.request({
			url: 'http://127.0.0.1:8000/api/login/',
			method: 'POST',
			data: {
				username: this.data.username,
				password: this.data.password
			},
			success: (res) => {

				if (res.data.code == 0) {
					// 登录成功，可以在这里处理后端返回的数据
					console.log( res.data.data.token,res.data.data.user,220)
					wx.setStorageSync('token', res.data.data.token);
					wx.setStorageSync('user', res.data.data.user);
					wx.switchTab({
						url: '/pages/index/index',
					})
					console.log('登录成功', this.data.username, res.data);
				} else if (res.data.code == -1) {
					Toast('用户名或者密码错误');

				}

			},

		});
	},
	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage() {

	}
})