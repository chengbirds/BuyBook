// pages/tiezi/tiezi.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
		tieziList:[],
		show:false,
		content:'',
		title:'',
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
wx.request({
	url: 'http://127.0.0.1:8000/api/article/',
	header:{
		"token":wx.getStorageSync('token')
	},
	success:(res)=>{
console.log(res.data.data.results,999);
this.setData({
	tieziList:res.data.data.results
})
	}
})
	},
	fatiezi(){
		console.log(111);
this.setData({
	show:true
})
	},
	getUser() {
		console.log(111111);
		wx.request({
			url: 'http://127.0.0.1:8000/api/article/',
			data:{
				title:this.data.title,
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
	gopinglun(e){
console.log(e,88888888);
wx.navigateTo({
	url: `../pinlun/pinlun?article_id=${e.currentTarget.dataset.id}`
})
	},

  onClose() {
		
		this.setData({ show: false });
		this.onShow()
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