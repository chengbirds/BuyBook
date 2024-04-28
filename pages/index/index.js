//index.js
//获取应用实例
const app = getApp()

Page({
	data: {
		motto: 'Hello World',
		hasUserInfo: false,
		hasAddress: false,
		address: {},
		canIUse: wx.canIUse('button.open-type.getUserInfo'),
		fileList: [],
		avatarUrl: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
		show: false,
		userInfo: '',
		code: '',
		openid: '',
		session_key: '',
	},

	showPopup() {
		this.setData({
			show: true
		});
	},

	onClose() {
		this.setData({
			show: false
		});
	},
	avatar: function () {
		this.setData({
			show: false
		})
		wx.navigateTo({
			url: '/pages/login/login'
		})
	},
	log() {
		this.showPopup()
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {


	},

	chooseImage: function () {
		var that = this
		// 选择图片
		wx.chooseMedia({
			count: 1, // 只能选择一张图片
			sizeType: ['original', 'compressed'],
			sourceType: ['album', 'camera'],
			success: function (res) {
				// 选择成功，上传图片
				console.log(res, 55)
				var tempFilePaths = res.tempFiles
				var path=''
				wx.uploadFile({
					url: 'http://127.0.0.1:8000/upload/avatar/',
					filePath: tempFilePaths[0].tempFilePath,
					name: 'file',
					formData: {
						'user': 'test'
					},
					header: {
						token: wx.getStorageSync('token')
					},
					success: function (res) {
						console.log("res", res.data)
						var data = res.data
						// path=JSON.parse(res.data.data).data.path
						// 上传成功后，更新头像显示
						console.log(tempFilePaths[0].tempFilePath, 888,res.data,res.data.data,JSON.parse(res.data),777);
						that.setData({
							avatarUrl: JSON.parse(res.data).data.path
						})
						// 保存头像后更新用户信息（注册接口）
						let result = wx.request({
							url: 'http://127.0.0.1:8000/api/edited/user/',
							method: 'PUT',
							data: {
								nickname: wx.getStorageSync('user').nickname,
								username: wx.getStorageSync('user').username,
								campus: wx.getStorageSync('user').campus.id,
								avatar: JSON.parse(res.data).data.path
							},
							header: {
								token: wx.getStorageSync('token')
							},
							success: (res) => {

								if (res.data.code == 0) {
									// 登录成功，可以在这里处理后端返回的数据
									wx.setStorageSync('user', res.data.data);
								} else if (res.data.code == -1) {
									console.log('修改失败')
								}

							},

						});
					}
				})
			}
		})
	},

	bindViewTapAddress: function () {
		wx.navigateTo({
			url: '../address/address'
		})
	},
	loginOut: function () {
		this.setData({
			show: false,
			avatarUrl: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
		})
		wx.removeStorageSync('token');
		wx.removeStorageSync('user');

		this.onShow()
	},
	onShow() {
		const that = this;
		var user = wx.getStorageSync('user');
		console.log("从存储中获取到的用户信息:", user);

		that.setData({
			userInfo: user
		});

		console.log("数据中 userInfo 的值:", that.data.userInfo);

		if (that.data.userInfo !== null) {
			console.log("用户信息不为 null。正在更新 avatarUrl。");
			that.setData({
				avatarUrl: that.data.userInfo.avatar
			});
			console.log("已更新的 avatarUrl:", that.data.avatarUrl);
		} else {
			console.log("用户信息为 null。跳过更新 avatarUrl。");
		}
	}


})