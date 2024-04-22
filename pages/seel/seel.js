// // pages/seel/seel.js
// var app = getApp()
// Page({
//   /**
//    * 页面的初始数据
//    */
//   data: {
//     search: false,
//     BookName: '',
//     TotalPrice: 0,
//     SearchList: [],
//     SeelBookList: [],
//     complete: false,
//   },
//   search: function () {
//     this.setData({
//       search: true
//     })
//   },
//   back: function () {
//     this.setData({
//       search: false
//     })
//   },
//   addSeelBookList: function (e) {
//     const index = e.currentTarget.dataset.index;
//     console.log(index);
//     let SearchList = this.data.SearchList;
//     let SeelBookList = this.data.SeelBookList;
//     SeelBookList.push(SearchList[index]);
//     this.setData({
//       SeelBookList: SeelBookList,
//       search: false
//     });
//     this.getTotalPrice();
//   },
//   getTotalPrice: function () {
//     let carts = this.data.SeelBookList;
//     let total = 0;
//     for (let i = 0; i < carts.length; i++) {
//         total = total + carts[i].price 
//     }
//     this.setData({
//       TotalPrice: total.toFixed(2)
//     })
//   },
//   confirmseel: function () {
//     wx.showModal({
//       title: '确认卖出所选课本?',
//       content: '',
//       success: (res) => {
//         if (res.confirm) {
//           console.log('用户点击确定')
//           app.globalData.seelList.push(this.data.SeelBookList);
//           this.setData({
//             SeelBookList: []
//           });
//           wx.showModal({
//             title: '售单成功，快去看看您的售卖吧',
//             content: '',
//             success: () => {
//               wx.navigateTo({
//                 url: '../myorder/myorder',
//               })
//             }
//           })
          
//         }
//       }
//     })
//   },
//   SearchBook: function (e) {
//     this.setData({
//       complete: true
//     })
//     const value = e.detail.value;
//     console.log(value);
//     wx.request({
//       url: '',
//       data: {
//         bookname: value
//       },
//       method: 'POST',
//       success: (res) => {
//         console.log(res.data.bookList);
//         this.setData({
//           SearchList: res.data.bookList,
//           complete: false
//         });
//       },
//       fail: (res) => {
//         console.log('error')
//       }
//     })
//   },
//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function (options) {
  
//   },

//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function () {
  
//   },

//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function () {
  
//   },

//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function () {
  
//   },

//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload: function () {
  
//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function () {
  
//   },

//   /**
//    * 页面上拉触底事件的处理函数s
//    */
//   onReachBottom: function () {
  
//   },

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function () {
  
//   }
// })
Page({
  data: {
    fileList: [
		],
		array: ['全新未使用', '几乎全新', '良好使用状态', '一般使用状态','破损或损坏'],

		value1:0,
	objectArray: [
		{
			id: 0,
			name: '全新未使用'
		},
		{
			id: 1,
			name: '几乎全新'
		},
		{
			id: 2,
			name: '良好使用状态'
		},
		{
			id: 3,
			name: '一般使用状态'
		},
		{
			id:4,
			name:'破损或损坏'
		}
	],
	index: 0
},
bindPickerChange: function(e) {
	console.log('picker发送选择改变，携带值为', e.detail.value)
	this.setData({
		index: e.detail.value
	})
},
});

