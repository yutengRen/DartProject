// pages/gamestar/gamestar.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsId: '',
    deviceId: ''
  },

  over() { //结束比赛
    wx.redirectTo({
      url: '/pages/result/result',
    })
  },

  // initial() { //开始游戏
  //   wx.request({
  //     url: app.globalData.url + '/wx/dartGame/start',
  //     data: {
  //       goodsId: this.data.goodsId,
  //       deviceId: 1,
  //     },
  //     header: {
  //       'Content-Type': 'application/json',
  //       Authorization: token
  //     },
  //     method: 'POST',
  //     dataType: 'json',
  //     responseType: 'text',
  //     success: (res) => {
  //       console.log(res)
  //     },
  //     fail: (res) => {},
  //     complete: function(res) {},
  //   })
  // },


  initial() { //开始游戏
    const token = wx.getStorageSync('token')
    wx.request({
      url: app.globalData.url + '/wx/dartGame/createOrder',
      data: {
        goodsId: this.data.goodsId,
        deviceId: this.data.deviceId,
      },
      header: {
        'Content-Type': 'application/json',
        Authorization: token
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        console.log(res)
      },
      fail: (res) => {},
      complete: function(res) {},
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.setData({
      goodsId: options.goodsId,
      deviceId: options.deviceId
    })
    this.initial();

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