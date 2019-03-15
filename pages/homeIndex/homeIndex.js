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
      showModal:true,
      index:1,
      imgUrls: [
        'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=198843797,3094335719&fm=26&gp=0.jpg',
        'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=198843797,3094335719&fm=26&gp=0.jpg',
      ]
    },

    selectMap(e){  //浏览模式选择
      console.log(e.target.dataset.index)
      this.setData({
        index:e.target.dataset.index,
        showModal:!this.data.showModal
      });


    },

    user() { //个人中心跳转
      const token = wx.getStorageSync('token');
      if (token == "") {
        wx.navigateTo({
          url: '/pages/my/register/register',
        })
      } else {
        wx.redirectTo({
          url: '/pages/my/my',
        })
      }

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
          if (res.data.status == 200) {
            this.setData({
              array: res.data.result,
            })
            wx.getLocation({ //获取地理位置
              type: 'wgs84',
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
                    if (res.data.status == 200) {
                      wx.hideLoading()
                      this.setData({
                        arrayT: res.data.result
                      })
                    } else {
                      method.tost(res.data.msg);
                    }
                  },
                  fail: (res) => {
                    method.tost('网络异常，请稍后重试！');
                  },
                  complete: function(res) {},
                })
              },
              fail: (res) => {
                method.tost('获取定位失败！')
                this.setData({
                  locationHide: true
                })
              }
            })
          } else {
            method.tost(res.data.msg)
          }

        },
        fail: (res) => {
          method.tost('网络异常，请稍后重试！');
        },
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
        },
        fail: (res) => {}
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
              fail: (res) => {
                method.tost('网络异常，请稍后重试！ gde0');
              }
            })
          }
        }
      })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
      wx.getSystemInfo({
        success: (res) => {
          this.setData({
            Height: res.windowHeight
          })
        },
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
    onPullDownRefresh: function() {},

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