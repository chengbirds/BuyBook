// pages/category/category.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    bookname: '',
    bookList: [],
    msg: '',
		complete: false,
		category:{}
  },
  formSubmit: function(e) {
    const value = e.detail.value;
     console.log(value.bookname);
     if(value.bookname) {
       wx.request({
         url: '',
         data: {
           bookname: value.bookname
         },
         method: 'POST',
         success: (res) => {
           console.log(res.data.bookList);
           this.setData({
             bookList: res.data.bookList,
             bookname: ''
           });
         },
         fail: (res) => {
           console.log('error')
         }
       })
     }else {
       wx.showModal({
         title: '提示',
         content: '查询不能为空',
         showCancel: false
       })
     }
     
  },
  addcart: function (e) {
    var index = e.currentTarget.dataset.index;
    console.log(index)
    let book = this.data.bookList[index];
    console.log(book)
    app.globalData.book = book;
    app.globalData.book.selected = true;
    app.globalData.book.num = 1;
    if (app.globalData.carts.length == 0) {
      app.globalData.carts.push(app.globalData.book);
    } else {
      for (let i = 0; i < app.globalData.carts.length; i++) {
        if (bookList[index].id == app.globalData.carts[i].id) {
          app.globalData.carts[i].num = app.globalData.carts[i].num + 1;
            i = 1000;
          } else {
          app.globalData.carts.push(app.globalData.book);
            i = 1000;
          }
        }
      } 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		const that=this
		wx.request({
			url: 'http://127.0.0.1:8000/api/type/',
			method:'GET',
			success:(res)=>{
				console.log(res,55);
			that.setData({
			category:res.data.data
			})
			}
		})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  bookdetail: function (e) {
    const index = e.currentTarget.dataset.index; 
    let book = this.data.bookList[index];
    console.log(book);
    app.globalData.book = book;
    wx.navigateTo({
      url: '../bookdetail/bookdetail',
    })
  },
  clickViewKaoyan: function() {
    this.setData({
      complete: false
    });  
    wx.request({
      url: '',
      data: {
        booktype: '考研'
      },
      method: 'POST',
      success: (res) => {
        console.log(res.data.bookList);
        this.setData({
          bookList: res.data.bookList,
          complete: true
        });
      },
      fail: (res) => {
        console.log('error')
      }
    })

},  
clickView(){

},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.clickViewKaoyan();
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