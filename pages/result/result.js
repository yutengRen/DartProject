// pages/result/result.js
import method from '../template/tabbar.js';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array:'',
  },

  initial() { //获取个人信息
    const token = wx.getStorageSync('token');
    wx.request({
      url: app.globalData.url + "/wx/home/me",
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
          method.tost(res.data.msg);
        }
      },
      fail: (res) => {
        method.tost('网络异常，请稍后再试!');
      },
      complete: function (res) { },
    })
  },

  backHome() {
    wx.reLaunch({
      url: '/pages/homeIndex/homeIndex',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中...',
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