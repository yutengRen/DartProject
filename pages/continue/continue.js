// pages/continue/continue.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  over() {
    const openid = wx.getStorageSync('Object').openid
    wx.request({
      url: app.globalData.url + '/dist/Handler/managerDate.ashx?action=toEndGame',
      data: {
        username: openid
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        if (res.data.Success == true) {
          wx.showToast({
            title: '游戏结束',
            icon: 'none',
            duration: 2000
          })
        } else {
          wx.showToast({
            title: '游戏结束',
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showNavigationBarLoading()
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