let app = getApp()
// 在页面或组件的滚动事件中
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		article: [],
		num:10,
		images:[]
	},
	articleDetail(e) {
		console.log(e)
		wx.navigateTo({
			// 传图书详情id
			url: '../articleDetail/articleDetail?id='+e.target.dataset.idd,
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	// 在页面加载时初始化 num 为 10
onLoad: function () {
	const that=this
 wx.request({
	 url: 'http://127.0.0.1:8000/api/banner/',
	 method:"GET",
	 success:(res)=>{
		 console.log(res,774);
		 that.setData({
			 images:res.data.data
		 })
	 }
 })
},
lower(){
console.log(111);
const that =this
wx.request({
	url: `http://127.0.0.1:8000/api/book/?offset=${that.data.num}`,
	header: {
		"token": wx.getStorageSync('token')
	},
	success: (res) => {
		var article=[...that.data.article,...res.data.data.results]

		that.setData({
			article:article,
			num:that.data.num+10
		})
console.log(that.data.article,88);
	}
})
},
// onPageScroll: function (e) {
//   console.log(e);
//   const that = this;
//   var windowHeight = wx.getSystemInfoSync().windowHeight;
//   var num = this.data.num; // 获取当前 num 的数值

//   wx.createSelectorQuery().selectViewport().boundingClientRect(function(rect) {
//     if (e.scrollTop + windowHeight >= rect.height) {
//       // 滚动到底部时，num 加10
   

//       wx.request({
//         url: `http://127.0.0.1:8000/api/book/?offset=${num}`,
//         header: {
//           "token": wx.getStorageSync('token')
//         },
//         success: (res) => {

// 					num += 0.2;
//           res.data.data.results.map(item => {
//             item.image = `http://127.0.0.1:8000${item.image}`
//           })

//           that.setData({
//             article: res.data.data.results,
//             num: num // 更新 num 的数值
//           })

//         }
//       })
//     }
//   }).exec();
// },
	// 	onsSrollToLower(e){
	// console.log(222);
	// 		const scrollView=e.detail.scrollView;
	// 		const {scrollHeight,scrollTop,clientHeight }=scrollView

	// 		if(scrollTop+clientHeight>=scrollHeight){
	// 			console.log(1111);
	// 		}},
	
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
		var arry
		wx.request({
			url: 'http://127.0.0.1:8000/api/book/?offset=0',
			header: {
				"token": wx.getStorageSync('token')
			},
			success: (res) => {
				console.log(res,52);
			res.data.data.results.map(item=>{
					item.image=`http://127.0.0.1:8000${item.image}`
				})
			
			that.setData({
				article:res.data.data.results
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