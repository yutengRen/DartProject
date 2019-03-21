// pages/index/index.js
import method from '../template/tabbar.js'
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
        code: this.data.code,
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        if (res.data.status == 200) {
          wx.hideLoading();
          wx.stopPullDownRefresh();
          this.setData({
            array: res.data.result.dartGoodsList,
            userInfo: res.data.result.userInfo,
            code: res.data.result.dartDevice
          });

        } else {
          method.tost(res.data.msg)
        }
      },
      fail: (res) => {
        method.tost('网络异常，请稍后再试');
      },
      complete: function(res) {},
    })
  },


  start(e) { //游戏下单
  console.log(e)
    const token = wx.getStorageSync('token')
    wx.request({
      url: app.globalData.url + '/wx/dartGame/createOrder',
      data: {
        goodsId: e.currentTarget.dataset.id,
        deviceId: e.currentTarget.dataset.device,
      },
      header: {
        'Content-Type': 'application/json',
        Authorization: token
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        if (res.data.status == 200) {
          app.globalData.data = res.data;
          wx.navigateTo({
            url: '/pages/index/order/order',
          })
        } else {
          method.tost(res.data.msg);
        }
      },
      fail: (res) => {
        method.tost('')
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
    wx.showLoading({
      title: '正在加载...',
      success: (res) => {
        this.initial();
      }
    })
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