// pages/orderdetail/orderdetail.js\
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: [],
    totalprice: 0,
		address: {},
		
  },
  confirm: function() {
  wx.request({
		url: 'http://127.0.0.1:8000/api/order/',
	})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	console.log(options,999);
	this.setData({
		order:JSON.parse(options.carts),
		address:JSON.parse(options.address)
	})
	var totalprice=0
this.data.order.forEach((item)=>{
	totalprice=item.book.price*item.quantity+totalprice
})
this.setData({
	totalprice:totalprice
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
    var self = this;
    /**
     * 获取本地缓存 地址信息
     */
   

   
     
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