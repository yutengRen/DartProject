// pages/my/register/register.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    text: '获取验证码',
    s: 0,
    phone: '',
    password: '',
  },

  inputPhone(e) { //获取手机号码
    this.setData({
      phone: e.detail.value
    })
  },

  inputPassword(e) { //获取密码
    this.setData({
      password: e.detail.value
    })
  },

  // verifyCode() { //获取验证码
  //   const phoneReg = /^(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/;
  //   if (this.data.phone == "") {
  //     wx.showToast({
  //       title: '请输入手机号码',
  //       icon: 'none',
  //       duration: 1500
  //     })
  //     return
  //   } else if (!phoneReg.test(this.data.phone)) {
  //     wx.showToast({
  //       title: '请输入正确的手机号码',
  //       icon: 'none',
  //       duration: 1500
  //     })
  //     return
  //   } else {
  //     wx.showLoading({
  //       title: '正在发送...',
  //       mask: true
  //     })

  //     wx.request({
  //       url: app.globalData.url + "",
  //       data: {
  //         phone: this.data.phone
  //       },
  //       header: {},
  //       method: 'GET',
  //       dataType: 'json',
  //       responseType: 'text',
  //       success: (res) => {

  //         this.setData({
  //           s: 60
  //         })
  //         let checks = setInterval(() => {
  //           this.data.s--
  //             this.setData({
  //               s: this.data.s
  //             })
  //           if (this.data.s == 0) {
  //             this.setData({
  //               text: "重新发送",
  //             })
  //             clearInterval(checks)
  //           }
  //         }, 1000)
  //       },
  //       fail: (res) => {},
  //       complete: function(res) {},
  //     })
  //   }
  // },

  bindGetUserInfo(e) { //登录
    if (e.detail.errMsg == "getUserInfo:ok") { //授权成功
      wx.login({
        success: (res) => {
          wx.request({
            url: app.globalData.url + "/wx/login/token",
            data: {
              code: res.code,
              nickName: e.detail.userInfo.nickName,
              avatarUrl: e.detail.userInfo.avatarUrl,
            },
            header: {
              'Content-Type': 'application/json'
            },
            method: 'POST',
            dataType: 'json',
            responseType: 'text',
            success: (res) => {
              wx.setStorageSync('token', res.data.result.token);
              wx.redirectTo({
                url: '/pages/homeIndex/homeIndex',
              })
            },
            fail: (res) => {},
            complete: function(res) {},
          })
        },
        fail: (res) => {},
        complete: function(res) {},
      })
    } else { //授权失败
      wx.showToast({
        title: '登录失败，请重新授权',
        icon: 'none',
        duration: 2000
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})