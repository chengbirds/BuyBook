Page({
	data: {
		message: '',
		buyer: '',
		seller: '',
		ws: '',
		infoList: [],
		userid: '',
		session_id: ''
	},
	onLoad: function (options) {
		console.log(1111,this.data.ws);

			wx.closeSocket({
				success: () => {
					console.log('WebSocket连接已关闭');
				},
				fail: (error) => {
					console.error('关闭WebSocket连接时出错:', error);
				}
			});
		
		const that = this
		var a = ''
		console.log(options, 88877);
		this.setData({
			userid: wx.getStorageSync('user').id
		})
		console.log(options, 77777);
		this.setData({
			buyer: options.buyer,
			seller: options.seller
		})
		this.createSocketServer(options.buyer, options.seller)
		wx.onSocketMessage((e) => {
			var msg = JSON.parse(e.data)

			var infoList = [...this.data.infoList, msg]
			console.log(222, msg, infoList);
			this.setData({
				infoList: infoList
			})

		})
		wx.request({
			url: `http://127.0.0.1:8000/api/session/?buyer=${options.buyer}&seller=${options.seller}`,
			method: 'GET',
			header: {
				"token": wx.getStorageSync('token')
			},
			success: (res) => {
				console.log(res.data);
				that.setData({
					session_id: res.data.data.id
				})
				wx.request({
					url: `http://127.0.0.1:8000/api/message/?session_id=${res.data.data.id}&offset=0`,
					method: "GET",
					header: {
						"token": wx.getStorageSync('token')
					},
					success: (res) => {
						console.log(res.data, 10000);
						var info = [...that.data.infoList, ...res.data.data.results]
						var in1 = info.map(item => {
							return {
								...item,
								user_id: item.senderID.id,
								msg: item.content,
								avatar: item.senderID.avatar
							};
						});
						that.setData({
							infoList: in1
						})
					}
				})
			}
		})

	},
	// 创建服务器连接
	createSocketServer(a, b) {
	
		console.log(222250,a,b);
		var ws = wx.connectSocket({
			url: `ws://127.0.0.1:8000/chat/${a}/${b}/`
		})
		console.log(wx,9999);
		this.setData({
			ws: ws
		})
		// 监控接入
		wx.onSocketOpen(() => {
			wx.showToast({
				title: 'Socket接入成功',
				icon: 'success'
			})
			// 接入问候语
			this.message = '你好'
			this.handleSend()
			this.message = ''
		})


	},
	// 发送消息
	handleSend() {

		console.log(1111, this.data.message);
		// 发送的内容不为空
		if (this.data.message) {
			// 发送
			var data = JSON.stringify({
				"sender": wx.getStorageSync('user').id,
				"data": this.data.message
			})
			console.log(222, this.data.message);
			this.data.ws.send({
				data: data
			})
			this.setData({
				message:''
			})
		
		}

		console.log(11111,this.data.message);
	},
	onShow() {

	}

})