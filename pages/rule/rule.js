// pages/rule/rule.js
const app = getApp();
var token = wx.getStorageSync('token')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsId: '',
    array:'',
  },

  initial() { 
    wx.request({
      url: app.globalData.url + '/wx/dartGame/' + this.data.goodsId,
      data: {
        goodsId: this.data.goodsId,
      },
      header: {
        Authorization: token
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        this.setData({
          array:res.data.result
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

    this.setData({
      goodsId: options.goodsId
    });
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