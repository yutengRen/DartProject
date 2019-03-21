// pages/gamestar/gamestar.js
import method from '../template/tabbar.js';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsId: '',
    deviceId: '',
    code: '' //机器码
  },

  over() { //结束比赛
    const token = wx.getStorageSync('token');
    wx.request({
      url: app.globalData.url + '/wx/dartGame/end/' + this.data.code,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: token
      },
      method: 'PUT',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        console.log(res)
        if (res.data.status == 200) {
          method.tost('返回失败');
          wx.redirectTo({
            url: '/pages/result/result',
          })
        } else {
          method.tost(res.data.msg);
        }
      },
      fail: (res) => {
        method.tost('网络异常，请稍后再试');
      },
      complete: function(res) {},
    })


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      code: options.code
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