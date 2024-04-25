// pages/address/address.js
import Toast from '@vant/weapp/toast/toast';
let app = getApp();
var area = require('../../area/area');
var p = 0,
	c = 0,
	d = 0;
Page({
	data: {
		provinceName: [
			'北京市',
			'陕西省',
			'四川省'
		],
		provinceCode: [],
		provinceSelIndex: '',
		cityName: [],
		cityCode: [],
		citySelIndex: '',
		districtName: [],
		districtCode: [],
		districtSelIndex: '',
		cityEnabled: false,
		districtEnabled: false,
		showMessage: false,
		messageContent: '',
		address: {
			name: '',
			phone: '',
			campus_id: '',
			detail: ''
		},
		addresslist: {

		},
		array: [],
		index: 0,
		value1: 0,
		objectArray: [],
		switch1Checked: false
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var objectArray = [];
		var array = [];
		wx.request({
			url: 'http://127.0.0.1:8000/api/campus/',
			success: (res) => {
				console.log(res, 888)
				if (res.data.code == 0) {
					// 请求成功
					objectArray = res.data.data;
					res.data.data.forEach(item => {
						array.push(item.name)
					})

				}
				this.setData({
					objectArray: objectArray,
					array: array
				})
			}
		})
	},
	bindPickerChange: function (e) {
		console.log('picker发送选择改变，携带值为', e.detail.value)
		this.setData({
			index: e.detail.value
		})
	},

	bindViewTapindex: function () {
		wx.navigateTo({
			url: '../index/index'
		})
	},

	formSubmit(e) {
		const that = this;
		const value = e.detail.value;
		console.log(value, e, 6693);
		if (value.name && value.phone && value.detail) {
			wx.request({
				url: 'http://127.0.0.1:8000/api/address/',
				data: {
					campus_id: that.data.index + 1,
					receiver_name: value.name,
					phone_number: value.phone,
					is_default: true,
					detail: value.detail
				},
				method: "POST",
				header: {
					"token": wx.getStorageSync('token')
				},
				success: (res) => {
					if (res.data.code == 0) {
						Toast('保存成功')
						that.onShow()
					}
					console.log(res, 552);
				}
			})
		} else {
			wx.showModal({
				title: '提示',
				content: '请填写完整资料',
				showCancel: false
			})
		}
	},
	switchChange(e) {
		
		if(e.detail.value==true){
	// 设默认地址
	wx.request({
		url: `http://127.0.0.1:8000/api/address/default/${e.currentTarget.dataset.item}/`,
		method: "PUT",
		header: {
			"token": wx.getStorageSync('token')
		},
		success: (res) => {
			console.log(res, 889);
			this.onShow()
		}
	})
		}
		console.log(e, 555);
	
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
		wx.request({
			url: 'http://127.0.0.1:8000/api/address/',
			header: {
				"token": wx.getStorageSync('token')
			},
			success: (res) => {
				console.log(res.data.data.results, 32);
				that.setData({
					addresslist: res.data.data.results
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