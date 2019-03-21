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
      showModal: true,
      index: 1,
      Height: '',
      imgUrls: [
        'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=198843797,3094335719&fm=26&gp=0.jpg',
        'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=198843797,3094335719&fm=26&gp=0.jpg',
      ],
      hideModal: true,
    },

    bindGetUserInfo(e) { //微信一键登录
      this.hideModal()
      if (e.detail.errMsg == "getUserInfo:ok") { //授权成功
        wx.showLoading({
          title: '正在登录...',
        })
        wx.login({
          success: (res) => {
            wx.request({
              url: app.globalData.url + "/wx/login/token",
              data: {
                appId: app.globalData.appId,
                code: res.code,
                rawData: e.detail.rawData,
                signature: e.detail.signature,
                encryptedData: e.detail.encryptedData,
                iv: e.detail.iv,
              },
              header: {
                'Content-Type': 'application/json'
              },
              method: 'POST',
              dataType: 'json',
              responseType: 'text',
              success: (res) => {
                wx.hideLoading();
                if (res.data.status == 200) {
                  wx.setStorageSync('token', res.data.result.token);
                  method.tost('登录成功');
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
          fail: (res) => {
            method.tost('网络异常，请稍后重试');
          },
          complete: function(res) {},
        })
      } else { //授权失败
        method.tost('登录失败，请重新授权');
      }
    },

    hideModel() { //隐藏遮罩层
      this.hideModal()
    },

    // 显示遮罩层
    showModal() {
      var that = this;
      that.setData({
        hideModal: false
      })
      var animation = wx.createAnimation({
        duration: 500, //动画的持续时间 默认400ms   数值越大，动画越慢   数值越小，动画越快
        timingFunction: 'ease', //动画的效果 默认值是linear
      })
      this.animation = animation
      setTimeout(() => {
        that.opacity()
        that.fadeIn(); //调用显示动画
      }, 100)
    },

    // 隐藏遮罩层
    hideModal() {
      var that = this;
      var animation = wx.createAnimation({
        duration: 500, //动画的持续时间 默认400ms   数值越大，动画越慢   数值越小，动画越快
        timingFunction: 'ease', //动画的效果 默认值是linear
      })

      this.animation = animation
      that.opacitys();
      that.fadeDown(); //调用隐藏动画   
      setTimeout(() => {
        that.setData({
          hideModal: true,
        })
      }, 100) //先执行下滑动画，再隐藏模块

    },

    //动画集
    fadeIn: function() {
      this.animation.translateY(0).step()
      this.setData({
        animationData: this.animation.export() //动画实例的export方法导出动画数据传递给组件的animation属性
      })
    },

    fadeDown: function() {
      this.animation.translateY(100).step()
      this.setData({
        animationData: this.animation.export(),
      })
    },

    opacity: function() {
      this.animation.opacity(1).step()
      this.setData({
        ani: this.animation.export() //动画实例的export方法导出动画数据传递给组件的animation属性
      })
    },
    opacitys: function() {
      this.animation.opacity(0).step()
      this.setData({
        ani: this.animation.export(), //动画实例的export方法导出动画数据传递给组件的animation属性
      })
    },

    selectMap(e) { //浏览模式选择
      this.setData({
        index: e.target.dataset.index,
        showModal: !this.data.showModal
      });
    },

    user() { //个人中心跳转
      const token = wx.getStorageSync('token');
      if (token == "") {
        this.showModal() //显示登录弹窗
      } else {
        wx.redirectTo({
          url: '/pages/my/my',
        })
      }
    },

    Ewn() { //扫码
      const token = wx.getStorageSync('token');
      if (token == '') {
        this.showModal() //显示登录弹窗
      } else {
        method.Ewn()
      }
    },

    btnSelect(e) { //模式切换
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