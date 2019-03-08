// pages/index/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: '',
    userInfo: '',
    code: '',
  },

  initial() { //扫码成功
    const token = wx.getStorageSync('token')
    wx.request({
      url: app.globalData.url + '/wx/dartGame/model',
      header: {
        Authorization: token
      },
      data: {
        code: 'TY0001',
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        console.log(res);
        this.setData({
          array: res.data.result.dartGoodsList,
          userInfo: res.data.result.userInfo,
          code: res.data.result.dartDevice

        })
      },
      fail: (res) => {},
      complete: function(res) {},
    })



  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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