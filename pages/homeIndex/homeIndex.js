// pages/homeIndex/homeIndex.js
import method from '../template/tabbar.js'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    location: '广州市黄埔区麦普科技',
    array: '',
    longitude: '',
    latitude: '',
  },

  user() { //个人中心跳转
    wx.redirectTo({
      url: '/pages/my/my',
    })
  },

  Ewn() { //扫码
    method.Ewn()
  },

  btnSelect(e) { //table选项
    this.setData({
      index: e.currentTarget.dataset.index
    })



  },

  initial() { //获取设备类型
    wx.request({
      url: app.globalData.url + '/wx/device/type',
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        this.setData({
          array: res.data.result,
        })
        wx.getLocation({ //获取地理位置
          success: (res) => {
            this.setData({
              longitude: res.longitude,
              latitude: res.latitude,
              loactionHide: true
            })
            wx.request({
              url: app.globalData.url + '/wx/circle/list',
              data: {
                deviceType: 1,
                lng: this.data.longitude,
                lat: this.data.latitude
              },
              method: 'GET',
              dataType: 'json',
              responseType: 'text',
              success: (res) => {
                this.setData({
                  arrayT: res.data.result
                })
              },
              fail: (res) => {},
              complete: function(res) {},
            })
          },
          fail: (res) => {
            this.setData({
              locationHide: true
            })
          }
        })
      },
      fail: (res) => {},
      complete: function(res) {},
    })
  },

  selectLocation() { //选择位置
    let that = this;
    wx.chooseLocation({
      type: 'gcj02', // 返回可以用于wx.openLocation的经纬度
      success(res) {
        that.setData({
          location: res.address,
          longitude: res.longitude,
          latitude: res.latitude
        })
        that.initial();
      }
    })
  },

  anewLocation() { //重新定位
    wx.openSetting({
      success: (res) => {
        if (res.authSetting["scope.userLocation"]) {
          wx.getLocation({
            type: 'wgs84',
            success: (res) => {
              this.setData({
                longitude: res.longitude,
                latitude: res.latitude,
                locationHide: false
              })
              this.initial()
            },
            fail: (res) => {}
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // method.loginCheck(); //登录验证
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