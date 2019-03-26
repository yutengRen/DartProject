// pages/venue/venue.js
import method from '../template/tabbar.js'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    lng: '',
    lat: '',
    array: '',
    stroe_name: ''
  },

  dial() { //导航
    var that = this
    wx.openLocation({
      longitude: Number(that.data.lng),
      latitude: Number(that.data.lat),
      address: this.data.stroe_name
    })
  },


  btn() {
    const token = wx.getStorageSync('token');
    if (token == '') {
      wx.navigateTo({
        url: '/pages/my/register/register',
      })
    } else {
      method.Ewn()
    }
  },

  initial() { //初始化
    wx.request({
      url: app.globalData.url + '/wx/circle/' + this.data.id + '?lng=' + this.data.lng + '&lat=' + this.data.lat,
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        if (res.data.status == 200) {
          this.setData({
            array: res.data.result,
            stroe_name: res.data.result.address
          })
          wx.hideLoading()
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
      id: options.id,
      lng: options.lng,
      lat: options.lat
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