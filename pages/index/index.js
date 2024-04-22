//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    hasUserInfo: false,
    hasAddress: false,
    address: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    avatarUrl: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
    show: false,
    userInfo:'',
    code:'',
    openid:'',
    session_key:'',
  },
 
  showPopup() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },
avatar:function() {
  wx.navigateTo({
    url: '/pages/login/login'
  })
},
log(){
  this.showPopup()
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    let user=wx.getStorageSync('user')
    console.log("进入小程序的index页面获取缓存",user)
    this.setData({
        userInfo:user
    })
    console.log(this.data.userInfo);
    if (this.data.userInfo !== null) {
      console.log(this.data.userInfo);
      this.setData({
        avatarUrl: this.data.userInfo.avatarUrl
      })
    }

  },
  login(){
    wx.getUserProfile({
        desc:'必须授权后才能继续使用',
        success:async (res)=>{
          await this.loginWithCode()
          this.sendCode()
          this.onClose()
            let user=res.userInfo
            console.log(user,888);
            //设置本地缓存,把用户信息缓存到本地
            wx.setStorageSync('user',user)
            console.log('用户信息',user)
       this.setData({
            userInfo: user
          })
            console.log(this.data.userInfo);
            if (this.data.userInfo !== '') {
              this.setData({
                avatarUrl: this.data.userInfo.avatarUrl
              })
            }
        
        }
    })

},
//退出登录
loginOut(){
    this.setData({
        userInfo:''
    })
    wx.setStorageSync('user',null)
    if (this.data.userInfo == '') {
      this.setData({
        avatarUrl: '/pages/image/avatar.png'
      })
    }
    this.sendBack()
    this.onClose()
},
 loginWithCode(){
 return new Promise((resolve,reject)=>{
    wx.login({
       success: (res)=>{
        console.log('code',res.code);
      
        this.setData({
          code:res.code
        })
        resolve();
      },
      fail:(error)=>{
        reject(error);
      }
    })
  })

},
sendCode:function () {
  console.log(this.data.code);
  wx.request({
    url: 'http://192.168.73.150:10001/wxlogin',
    data:{
      code:this.data.code,
    },
    method:"POST",
    success:  (res)=> {
      this.setData({
        openid:res.data.openid,
        session_key:res.data.session_key
      })
      console.log(res.data);
      wx.setStorageSync('openid',this.data.openid)
      wx.setStorageSync('session_key',this.data.session_key)
    },
    fail: function (error) {
      console.log(error);
    }
  })
},
sendBack:function () {
  wx.request({
    url: 'http://192.168.73.150:10001/wxlogout/',
    data:{
      method:2,
      openid:this.data.openid,
      session_key:this.data.session_key
    },
    method:"PUT",
    success:function (res) {
      console.log(res.data);
      this.onClose()
    },
    fail:function (error) {
      console.log(error);
    }
  })
},
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindViewTapAddress: function () {
    wx.navigateTo({
      url: '../address/address'
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  async getUserProfile(e) {
    wx.getUserProfile({
      desc: '用于获取用户个人信息',
      success: function (detail) {
        
        wx.login({
          success: res => {
            var code = res.code; //登录凭证
            wx.cloud.callFunction({
              name: "getCurrentUserInfo",
              data: {
                encryptedData: detail.encryptedData,
                iv: detail.iv,
                code: code,
                userInfo: detail.rawData
              }
            }).then(res => {
              console.log("res: ",res);
              var openid = res.result.openid;
              var status = res.result.status;
              var phone = res.result.phone;
              console.log("openid: ",openid);
              console.log("status: ",status);
              console.log("phone: ",phone);
              console.log("nickName: ",detail.userInfo.nickName);
              
              if(phone==undefined){
                console.log("需要绑定手机号");
              }else{
                console.log("授权成功");
              }
            }).catch(res => {
              console.log("res3: ",res);
            })
          }
        });
      },
      fail: function () {
       wx.showModal({
         content: '取消授权将会影响相关服务，您确定取消授权吗？',
         success (res) {
           if (res.confirm) {
             wx.showToast({
               title: '已取消授权',
               duration: 1500
             })
           } else if (res.cancel) {
             this.getUserProfile()
           }
         }
       })
      }
    })
  }
})
