  // pages/pay/pay.js
  const app = getApp();
  Page({

    /**
     * 页面的初始数据
     */
    data: {
      quantity: 1,
      price: '', //单局费用
      allPrice: '', //总费用
      cash: '', //押金
    },

    initial() {
      const machine_ID = wx.getStorageSync('machine_ID');
      wx.request({
        url: app.globalData.url + '/dist/Handler/managerDate.ashx?action=' + 'getDeposit',
        data: {
          macNum: machine_ID
        },
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: (res) => {
          console.log(res)
          let allPrice = parseFloat(res.data.TotalMoney);
          let cash = parseFloat(res.data.DepositMoney);
          this.setData({
            price: res.data.GameMoney,
            cash: cash,
            allPrice: allPrice
          });

        },
        fail: function(res) {},
        complete: function(res) {},
      })
    },

    // 减少
    remove() {
      if (this.data.quantity == 1) {
        wx.showToast({
          title: '最低局数',
          icon: 'none',
        })
      } else {
        let count = this.data.quantity;
        count--;
        let price = count * this.data.price
        let allPrice = price + this.data.cash
        this.setData({
          quantity: count,
          allPrice: allPrice
        })
      }
    },

    // 增加
    add() {
      let count = this.data.quantity;
      count++;
      let price = count * this.data.price
      let allPrice = price + this.data.cash;
      this.setData({
        quantity: count,
        allPrice: allPrice
      })
    },

    pay() { //微信支付
      const openid = wx.getStorageSync('Object').openid
      wx.request({
        url: app.globalData.url + '/dist/Handler//weChatPay.ashx?action=' + 'pay',
        data: {
          openid: openid,
          ids: this.data.ids,
          quantity: this.data.quantity,
        },
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: (res) => {
          console.log(res)
          wx.requestPayment({
            'timeStamp': res.data.timeStamp,
            'nonceStr': res.data.nonceStr,
            'package': res.data.package,
            'signType': res.data.signType,
            'paySign': res.data.paySign,
            'success': (res) => { //支付成功回调
              wx.redirectTo({
                url: '/pages/continue/continue',
              })
            },
            'fail': function(res) {
              wx.showToast({
                title: '支付失败',
                icon: 'none',
              })
              setTimeout(() => {
                wx.reLaunch({
                  url: '/pages/start/start',
                })
              }, 1000)
            }, //支付失败回调
            'complete': function(res) {}
          })
        },
        fail: function(res) {},
        complete: function(res) {},
      })

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
      this.initial();
      console.log(options.ids)
      this.setData({
        ids: options.ids
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
      wx.checkSession({
        success: function(res) {
          return
        },
        fail: function(res) {
          wx.reLaunch({
            url: '/pages/home/home',
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
          })
        },
        complete: function(res) {},
      })
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