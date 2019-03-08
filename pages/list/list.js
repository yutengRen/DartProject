// pages/list/list.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    indexT: 0,
    indexThird: 0,
    indexF: 0,
    array: '',
    arrayT: '',
    arrayThird: '',
    data: '',
    flag: false
  },

  bindPickerChange: function(e) { //请选择种类
    this.setData({
      index: e.detail.value
    })

    if (this.data.array[this.data.index].ID == 2) {
      this.setData({
        indexT: 0
      })
    }
    this.gamesList(); //选择游戏
  },

  bindPickerChangeT: function(e) { //请选择游戏
    this.setData({
      indexT: e.detail.value
    })
  },

  bindPickerChangeThird: function(e) { //请选择机器
    console.log(e)
    this.setData({
      indexThird: e.detail.value
    })

  },

  formSubmit: function(e) {
    wx.showLoading({
      mask: true,
      title: '正在提交',
    });

    const machine_ID = this.data.arrayThird[this.data.indexThird].machineNum;
    wx.setStorageSync('machine_ID', machine_ID);
    const openid = wx.getStorageSync('Object').openid;
    const name = wx.getStorageSync('Object').name;
    wx.request({
      url: app.globalData.url + '/dist/Handler/managerDate.ashx?action=addGame',
      data: {
        TypeIdss: this.data.arrayT[this.data.indexT].id, //游戏名
        machineids: this.data.arrayThird[this.data.indexThird].id, //机器id
        username: openid, //openid
        nickName: name, //微信昵称
      },
      success: (res) => {
        if (res.data.Success == true) { //添加成功
          wx.showToast({
            icon: 'none',
            title: res.data.Msg,
            mask: true
          })
          wx.navigateTo({
            url: '/pages/start/start',
          })
        } else if (res.data.Success == false) { //添加失败
          wx.showToast({
            icon: 'none',
            title: res.data.Msg,
          })
          this.setData({
            flag: true,
          })
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  formReset: function() {}, //重置表单

  initial() {
    wx.request({ //获取游戏种类
      url: app.globalData.url + '/dist/Handler/managerDate.ashx?action=' + 'GetType',
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        this.setData({
          array: res.data.Result
        })
        this.gamesList();
      },
      fail: function(res) {},
      complete: function(res) {},
    });


    wx.request({ //获取机器列表
      url: app.globalData.url + '/dist/Handler/managerDate.ashx?action=' + 'GetMachine',
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        this.setData({
          arrayThird: res.data.data
        })
        wx.hideLoading()
      },
      fail: function(res) {},
      complete: function(res) {},
    });
  },

  gamesList() { //获取游戏列表
    wx.request({
      url: app.globalData.url + '/dist/Handler/managerDate.ashx?action=' + 'GetTypeName',
      data: {
        id: this.data.array[this.data.index].ID
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        this.setData({
          arrayT: res.data.Result
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