// pages/chat/chat.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
		chatList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
wx.request({
	url: 'http://127.0.0.1:8000/api/session/list/',
	header:{
		"token":wx.getStorageSync('token')
	},
	success:(res)=>{

		this.setData({
			chatList:res.data.data
		})

		this.data.chatList.forEach((item)=>{
			if(item.buyerid.nickname!==wx.getStorageSync('user').nickname){
				item.chatpeople=item.buyerid
			}else{
				item.chatpeople=item.sellerid
			}
		})
		console.log(res,555,this.data.chatList)	

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
		wx.request({
			url: 'http://127.0.0.1:8000/api/session/list/',
			header:{
				"token":wx.getStorageSync('token')
			},
			success:(res)=>{
		
			
		
				res.data.data.forEach((item)=>{
					if(item.buyerid.username!==wx.getStorageSync('user').username){
						item.chatpeople=item.buyerid
						item.duifang=item.sellerid
					}else{
						item.chatpeople=item.sellerid
						item.duifang=item.buyerid
					}
				})
				this.setData({
					chatList:res.data.data
				})
				console.log(res,555,this.data.chatList)	
		
					}
		})
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

	},
 gochat(e) {
	 console.log(1111,e.currentTarget.dataset);
	 wx.navigateTo({
		url: `../chatview/chatview?buyer=${e.currentTarget.dataset.my}&seller=${e.currentTarget.dataset.your}`
})
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