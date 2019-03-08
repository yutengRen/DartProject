// pages/my/price/recharge/recharge.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: ''
  },

  btnIndex(e) { //选择价格
    this.setData({
      index: e.currentTarget.dataset.index
    })
  },

  btnMake() { //支付
    const token = wx.getStorageSync('token');
    wx.request({
      data: {
        code: "0231HaNc0Q8zEB1lMmNc00M6Nc01HaN4",
        nickName: 'LeeNi Fe',
        avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/mgrcFX0XiaQSTENQL85XO80ONqsP6EOVbqhL9rGunmiaakLEbEbmpfARPRZcAkRcbAyw0DItVib5nsWpa81J4rcEA/132'
      },
      url: app.globalData.url + '/wx/test/pay',
      header: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        console.log(res)
      },
      fail: (res) => {},
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