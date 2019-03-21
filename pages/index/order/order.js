// pages/index/order/order.js
import method from '../../template/tabbar.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    s: '',
    array: '',
    flag: true,
  },

  cancelPay() { //取消支付

  },

  pay() { //确认支付
    const token = wx.getStorageSync('token')
    wx.request({
      url: app.globalData.url + '/wx/payOrder/unifiedOrder',
      data: {
        sysOrderId: app.globalData.data.result.id
      },
      header: {
        'Content-Type': 'application/json',
        Authorization: token
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        if (res.data.status == 200) {
          wx.requestPayment({
            timeStamp: res.data.result.timeStamp,
            nonceStr: res.data.result.nonceStr,
            package: res.data.result.packageValue,
            signType: res.data.result.signType,
            paySign: res.data.result.paySign,
            success: (res) => {
              wx.redirectTo({
                url: '/pages/gamestar/gamestar?code=' + this.data.code.code,
              })
            },
            fail: (res) => {
              method.tost('支付失败');
            }
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
    console.log(app.globalData.data.result.expireTime)
    this.setData({
      array: app.globalData.data.result,
      s: app.globalData.data.result.expireTime
    })

    let checks = setInterval(() => {
      this.data.s--
        this.setData({
          s: this.data.s
        })
      if (this.data.s == 0) {
        this.setData({
          flag: false
        })
        clearInterval(checks)
      }
    }, 1000)
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