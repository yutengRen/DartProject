// pages/return/return.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  btn() {
    let openid = wx.getStorageSync('Object').openid;
    console.log(openid)
    wx.request({
      url: app.globalData.url + '/dist/Handler/managerDate.ashx?action=getUserRefundState',
      data: {
        openid: openid,
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        console.log(res)
        if (res.data.flag == "0" || res.data.flag == "1") { //未结束
          wx.showToast({
            title: '游戏结束后再还镖',
            icon: 'none'
          })
        } else if (res.data.biaoState == "0") { //未还
          wx.showToast({
            title: '请归还飞镖',
            icon: 'none'
          })
        } else if (res.data.biaoState == "2") {
          wx.showToast({
            title: '有部分飞镖未还，退还部分押金',
            icon: 'none',
            duration: 1500,
          })
          setTimeout(() => {
            wx.reLaunch({
              url: '/pages/home/home',
            })
          }, 1500)
        } else {
          wx.showToast({
            title: '飞镖全部归还',
            icon: 'none',
            duration: 1500,
          })
          setTimeout(() => {
            wx.reLaunch({
              url: '/pages/home/home',
            })
          }, 1500)
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