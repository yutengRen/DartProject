// pages/start/start.js
const app = getApp(

);
Page({
  /**
   * 页面的初始数据
   */
  data: {
    Array: '',
    checked: '',
  },

  checkboxChange(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    this.data.checked = e.detail.value
  },

  startGames() { //开始游戏
    const openid = wx.getStorageSync('Object').openid;
    console.log(openid)
    if (this.data.checked) {
      let ids = "";
      this.data.checked.forEach(item => {
        if (ids) {
          ids += "," + item
        } else {
          ids = item
        }
      });
      wx.request({ //开始游戏请求
        url: app.globalData.url + '/dist/Handler/managerDate.ashx?action=' + 'starGame',
        data: {
          id: ids,
          username: openid
        },
        success: (res) => {
          console.log(res)
          if (res.data.Msg == "操作成功") {
            wx.showToast({
              title: '操作成功',
            });
            setTimeout(() => {
              wx.reLaunch({
                url: '/pages/pay/pay?ids=' + ids,
              })
            }, 500)
          } else {
            wx.showToast({
              icon: 'none',
              title: res.data.Msg,
              duration: 2000,
            })
            setTimeout(() => {
              wx.redirectTo({
                url: '/pages/start/start'
              })
            }, 500)
          }
        },
        fail: function(res) {},
        complete: function(res) {},
      })
    } else {
      wx.showToast({
        icon: 'none',
        title: '请选择开始游戏',
        duration: 1000,
      })
    }
  },

  refresh(){ //刷新页面
    wx.showLoading({
      title:'刷新',
      success: (res) => {
        this.initial();

      }
    })
  },

  del() { //删除游戏
    if (this.data.checked != "" && this.data.checked != []) {
      let ids = "";
      this.data.checked.forEach(item => {
        if (ids) {
          ids += "," + item
        } else {
          ids = item
        }
      });
      wx.request({
        url: app.globalData.url + '/dist/Handler/managerDate.ashx?action=' + 'deleteChooseGame',
        data: {
          id: ids,
        },
        header: {},
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: (res) => {
          if (res.data.Success == false) {
            wx.showToast({
              icon: 'none',
              title: '只能删除未开始的记录',
              mask: true,
              duration: 1000,
            })
          } else {
            this.initial();
          }
        },
        fail: function(res) {},
        complete: function(res) {},
      })
    } else {
      wx.showToast({
        title: '请选择后删除',
        icon: 'none',
        duration: 1000,
      })
    }
  },

  initial() { //初始化数据
    wx.request({
      url: app.globalData.url + '/dist/Handler/managerDate.ashx?action=' + 'getChooseList',
      data:{
        flag:0
      },  
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        this.setData({
          Array: res.data.data
        })
        wx.hideLoading()
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '正在加载',
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