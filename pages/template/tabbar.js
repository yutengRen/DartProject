const method = {
  Ewn() { //扫码
    const token = wx.getStorageSync('token');
    if (token == "") {
      method.showModal()
    } else {
      wx.scanCode({
        onlyFromCamera: true,
        success: (res) => {
          wx.navigateTo({
            url: '/pages/index/index?code=' + res.result,
          })
        },
        fail: (res) => {

        }
      })
    }
  },

  

  login() {
    console.log(123)
  },

  tost(title) { //全局提示
    wx.showToast({
      title: title,
      icon: 'none',
      duration: 2000
    })
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
  fadeIn: function () {
    this.animation.translateY(0).step()
    this.setData({
      animationData: this.animation.export() //动画实例的export方法导出动画数据传递给组件的animation属性
    })
  },

  fadeDown: function () {
    this.animation.translateY(100).step()
    this.setData({
      animationData: this.animation.export(),
    })
  },

  opacity: function () {
    this.animation.opacity(1).step()
    this.setData({
      ani: this.animation.export() //动画实例的export方法导出动画数据传递给组件的animation属性
    })
  },
  opacitys: function () {
    this.animation.opacity(0).step()
    this.setData({
      ani: this.animation.export(), //动画实例的export方法导出动画数据传递给组件的animation属性
    })
  },
}



export default method;