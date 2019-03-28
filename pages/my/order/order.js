// pages/my/order/order.js
import method from '../../template/tabbar.js'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: '',
    cursor: 1,
    loading: true,
    flag: true,
  },

  cancel(e) { //取消订单
    const token = wx.getStorageSync('token')
    wx.request({
      url: app.globalData.url + '/wx/sysOrder/' + e.currentTarget.dataset.id,
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: token
      },
      method: 'PUT',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        if (res.data.status == 200) {

        } else {
          method.tost(res.data.msg)
        }
      },
      fail: (res) => {
        method.tost('网络异常，请稍后再试')
      },
      complete: function(res) {},
    })
  },

  initial() { //获取订单信息
    const token = wx.getStorageSync('token')
    wx.request({
      url: app.globalData.url + '/wx/home/order',
      header: {
        Authorization: token
      },
      data: {
        cursor: 1,
        limit: 5,
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        if (res.data.status == 200) {
          wx.hideLoading();
         var v = '[]';
         console.log(v.length == null)
          this.setData({
            array: res.data.result.records
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
    wx.showLoading({
      title: '',
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
    const token = wx.getStorageSync('token');
    if (!this.data.flag) {
      this.setData({
        loading: true
      })
    } else {
      this.setData({
        loading: false
      })
    }
    wx.request({
      url: app.globalData.url + '/wx/home/order',
      header: {
        Authorization: token
      },
      data: {
        cursor: this.data.cursor,
        limit: 5,
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        if (res.data.status == 200) {
          wx.hideLoading();
          this.setData({
            array: this.data.array.concat(res.data.result.records),
            cursor: this.data.cursor + 1,
            loading: true
          })

          if (res.data.result.records.length == "0") {
            this.setData({
              flag: false
            });
          }
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})