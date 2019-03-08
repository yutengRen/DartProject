// pages/home/home.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    openid: '',
  },

  bindGetUserInfo(e) { //开始游戏
    if (e.detail.errMsg == "getUserInfo:ok") { //授权成功
    console.log(e)
      const obj = {} //存储本地缓存
      obj.name = e.detail.userInfo.nickName
      obj.imgUrl = e.detail.userInfo.avatarUrl
      obj.openid = this.data.openid;
      wx.setStorageSync('Object', obj);
      wx.navigateTo({
        url: '/pages/list/list',
      })
    } else { //授权失败
      wx.showToast({
        icon: 'none',
        title: '授权开始游戏',
      })
    }
  },

  bindGetUserInfos(e) { //查看历史记录
    if (e.detail.errMsg == "getUserInfo:ok") { //授权成功
      console.log(e)
      const obj = {} //存储本地缓存
      obj.name = e.detail.userInfo.nickName
      obj.imgUrl = e.detail.userInfo.avatarUrl
      obj.openid = this.data.openid;
      wx.setStorageSync('Object', obj);
      wx.navigateTo({
        url: '/pages/history/history',
      })
    } else { //授权失败
      wx.showToast({
        icon: 'none',
        title: '授权开始游戏',
      })
    }
  },

  login() { //静默登录
    var that = this
    wx.login({
      success: (res) => {
        wx.request({
          url: app.globalData.url + '/dist/Handler/weChatPay.ashx?action=getOpenid',
          data: {
            code: res.code
          },
          method: 'GET',
          dataType: 'json',
          responseType: 'text',
          success: (res) => {
            that.data.openid = res.data
            wx.hideLoading();
          },

          fail: function(res) {},
          complete: function(res) {},
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中...',
      icon: "none",
      mask: true,
      success: (res) => {
        this.login() //静默登录
      }
    })
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