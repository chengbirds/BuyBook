// pages/articleDetail/articleDetail.js
import Toast from '@vant/weapp/toast/toast';
let app = getApp()
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		article: {},
		userInfo: {},
		show:false,
		value:1,
		address: ''
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		const that = this
		wx.setStorageSync('optionsid',options.id)
		var articleId
		if(options.id==undefined){
			articleId=wx.getStorageSync('optionsid');
		}else{
			articleId = options.id
		}
		

		console.log('articleId:666', articleId);
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
	// 弹框的出现与消失
	isShow(){
		console.log(111);
this.setData({
	show:true
})

// wx.navigateBack('/pages/index/index')


	},
	onClose(){
		this.setData({
			show:false
		})
	},
	buy(){
		const that = this;
		var address_id = that.data.address.id
		
			var seller_id
			var book_id
			var quantity
			seller_id = that.data.userInfo.id
			book_id =that.data.article.id
			quantity =that.data.value
			wx.request({
				url: 'http://127.0.0.1:8000/api/order/',
				method: 'POST',
				data: {
					address_id: address_id,
					seller_id: seller_id,
					book_id: book_id,
					quantity: quantity,
					status: 1
				},
				header: {
					"token": wx.getStorageSync('token')
				},
				success: ((res) => {
					console.log(res.data.code, 445);
					// 加入订单成功
					if (res.data.code == 0) {
				Toast('付款成功！')
					}
				})
			})
	},
	addCart(){
		const that=this;
wx.request({
	url: 'http://127.0.0.1:8000/api/cart/',
	method:"POST",
	data:{
		book_id:that.data.article.id,
    quantity:1//加入购物车默认为1
	},
	header:{
		"token":wx.getStorageSync('token')
	},
	success:(res)=>{
		Toast('成功加入购物车！')
console.log(res,6668885)

	}
})
	},
	onChange(event) {
		console.log(event.detail);
		this.data.value=event.detail
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

	},
	gochatview(){
const buyer=wx.getStorageSync('user').id
		wx.navigateTo({
			url: `../chatview/chatview?buyer=${buyer}&seller=${this.data.userInfo.id}`
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