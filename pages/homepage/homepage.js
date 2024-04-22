let app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    article: []
  },
  articleDetail: function (e) {
    const index = e.currentTarget.dataset.index;
    let article = this.data.article[index];
    app.globalData.articleDetail = article;
    wx.navigateTo({
      url: '../articleDetail/articleDetail',
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
    wx.request({
      url: 'http://192.168.73.150:10001/clientHomeProduct',
        method: 'GET',
        success: (res) => {
  console.log(res.data.result)
          this.setData({
            article:res.data.result
          });
          console.log(this.data.article)

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