// pages/pinlun/pinlun.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
pinlunList:[],
show:false,
article_id:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
console.log(options.article_id);
wx.request({
	url: `http://127.0.0.1:8000/api/article/comment/?article_id=${options.article_id}`,
	header:{
		"token":wx.getStorageSync('token')
	},
	success:(res)=>{
		console.log(res,888);
		this.setData({
			pinlunList:res.data.data,
			article_id:options.article_id
		})
	}
})
  },
	fapinlun(){
		this.setData({
			show:true
		})
	},
	getUser() {
		console.log(111111);
		wx.request({
			url: 'http://127.0.0.1:8000/api/article/comment/',
			data:{
				article_id:this.data.article_id,
				sender_id:wx.getStorageSync('user').id,
				content:this.data.content
			},
			header: {
				"token": wx.getStorageSync('token')
			},
			method:"POST",
			success:(res)=>{
console.log(res,8888);

			}
		})

	},
	onClose(){
		wx.request({
			url: `http://127.0.0.1:8000/api/article/comment/?article_id=${this.data.article_id}`,
			header:{
				"token":wx.getStorageSync('token')
			},
			success:(res)=>{
				console.log(res,888);
				this.setData({
					pinlunList:res.data.data
				})
			}
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