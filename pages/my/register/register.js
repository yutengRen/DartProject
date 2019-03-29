// pages/my/register/register.js
import method from '../../template/tabbar.js';
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
    flag: true,
    flags: true
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


  getPhoneNumber(e) { //获取用户手机号码
    const token = wx.getStorageSync('token')
    if (e.detail.errMsg == 'getPhoneNumber:ok') {
      wx.showLoading({
        title: '',
      })
      wx.request({
        url: app.globalData.url + '/wx/login/phone',
        data: {
          appId: app.globalData.appId,
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv,
        },
        header: {
          'Content-Type': 'application/json',
          Authorization: token
        },
        method: 'POST',
        dataType: 'json',
        responseType: 'text',
        success: (res) => {
          wx.hideLoading()
          if (res.data.status == 401) {
            method.tost('请先完成第一步授权~')
          } else if (res.data.status == 200) {
            this.setData({
              flags: false
            })
            method.tost('登陆成功');
            setTimeout((res) => {
              wx.reLaunch({
                url: '/pages/homeIndex/homeIndex',
              })
            }, 1000)
          } else {
            method.tost(res.data.msg);
          }
        },
        fail: (res) => {
          method.tost('授权取消')
        },
        complete: function(res) {},
      })

    } else {
      wx.showToast({
        title: "取消授权",
        icon: 'none',
        duration: 1500,
      })
    }
  },



  bindGetUserInfo(e) { //登录
    if (e.detail.errMsg == "getUserInfo:ok") { //授权成功
      wx.showLoading({
        title: '',
      })
      wx.login({
        success: (res) => {
          wx.request({
            url: app.globalData.url + "/wx/login/token",
            data: {
              appId: app.globalData.appId,
              code: res.code,
              rawData: e.detail.rawData,
              signature: e.detail.signature,
              encryptedData: e.detail.encryptedData,
              iv: e.detail.iv,
            },
            header: {
              'Content-Type': 'application/json'
            },
            method: 'POST',
            dataType: 'json',
            responseType: 'text',
            success: (res) => {
              console.log(res.data.result.phone)
              wx.hideLoading();

              if (res.data.status == 200) {
                wx.setStorageSync('token', res.data.result.token);
                method.tost('成功授权');
                this.setData({
                  flag: false
                })

                const tost = res.data.result.phone
                if (tost == '' || tost != undefined || tost != null) {
                  this.setData({
                    flags: false,
                  })
                  method.tost('登录成功');
                  setTimeout((res) => {
                    wx.reLaunch({
                      url: '/pages/homeIndex/homeIndex',
                    })
                  }, 1000)
                  return;
                }
              } else {
                method.tost(res.data.msg)
              }
            },
            fail: (res) => {
              method.tost('网络异常，请稍后重试');
            },
            complete: function(res) {},
          })
        },
        fail: (res) => {
          method.tost('网络异常，请稍后重试');
        },
        complete: function(res) {},
      })
    } else { //授权失败
      method.tost('登录失败，请重新授权');
    }
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