// pages/rule/rule.js
import method from '../template/tabbar.js';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsId: '',
    array: '',
  },

  initial() {
    const token = wx.getStorageSync('token');
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
        if (res.data.status == 200) {
          wx.hideLoading();
          this.setData({
            array: res.data.result
          })
        } else {
          method.tost('网络异常，请稍后重试');
        }
      },
      fail: (res) => {
        method.tost('网络异常，请稍后重试');
      },
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

    wx.showLoading({
      title: '正在加载...',
      success: (res) => {
        this.initial();
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