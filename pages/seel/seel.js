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
import Toast from '@vant/weapp/toast/toast';
Page({
	data: {
		fileList: [],
		array: ['全新未使用', '几乎全新', '良好使用状态', '一般使用状态', '破损或损坏'],
		value1: 0,
		objectArray: [{
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
				id: 4,
				name: '破损或损坏'
			}
		],
		index: 0,
		array1: [],
		objectArray1: [],
		index1: 0,
		name: "",
		author: "",
		detail: "",
		status: "",
		price: 1,
		type_id: 1,
	},
	onLoad() {
		const that = this
		var objectArray1 = [];
		var array1 = []
		wx.request({
			url: 'http://127.0.0.1:8000/api/type/',
			header: {
				token: wx.getStorageSync('token')
			},
			success: (res) => {
				console.log(res, 888)
				if (res.data.code == 0) {
					// 请求成功
					objectArray1 = res.data.data;
					res.data.data.forEach(item => {
						array1.push(item.title)
					})

				}
				that.setData({
					objectArray1: objectArray1,
					array1: array1
				})
			},
			fail: (error) => {
				console.log(error)
			}
		})
	},
	bindPickerChange: function (e) {
		console.log('picker发送选择改变，携带值为', e.detail.value)
		this.setData({
			index: e.detail.value
		})
	},
	bindPickerChange1: function (e) {
		console.log('picker发送选择改变，携带值为', e.detail.value)
		this.setData({
			index1: e.detail.value
		})
	},
	onChange(event) {
		this.setData({
			price: event.detail
		})
		console.log(event.detail);
	},
	afterRead: function (event) {
		const that = this;
		console.log(event, 77);
		const {
			file
		} = event.detail;
		// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
		wx.uploadFile({
			url: 'http://127.0.0.1:8000/upload/book_img/', // 仅为示例，非真实的接口地址
			filePath: file.url,
			name: 'file',
			formData: {
				user: 'test'
			},
			success(res) {
				console.log(JSON.parse(res.data).path,8880000);
				// 上传完成需要更新 fileList
				const {
					fileList = []
				} = that.data;
				fileList.push({
					...file,
					url: JSON.parse(res.data).path
				});
				that.setData({
					fileList
				});
			},
		});
	},
	sell: function () {
		const that = this;
		var data
		if (that.data.fileList[0]?.url !== undefined) {
		
			data = {
				name: that.data.name,
				author: that.data.author,
				detail: that.data.detail,
				status: that.data.array[that.data.index],
				price: that.data.price,
				type_id: Number(that.data.index1)+1,
				image: that.data.fileList[0]?.url
			}
		} else {
			data = {
				name: that.data.name,
				author: that.data.author,
				detail: that.data.detail,
				status: that.data.array[that.data.index],
				price: that.data.price,
				type_id:Number(that.data.index1)+1,
			}
		}
		wx.request({
			url: 'http://127.0.0.1:8000/api/book/?offset=0',
			method: 'POST',
			data: data,
			header: {
				"token": wx.getStorageSync('token')
			},
			success: (res) => {
				console.log(that.data.index1,888);
				if(res.data.code==0){
					// 发布成功
					Toast('发布成功~')
					wx.navigateBack({
						delta: 1  // 返回上一页
					});
				}else{
					Toast('发布失败~')
				}
				console.log(res, 996, wx.getStorageSync('token'));
			}
		})
	}
});