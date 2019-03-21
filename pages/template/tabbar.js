const method = {
  Ewn() { //扫码
    const token = wx.getStorageSync('token');
    if (token == "") {
      
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
}

export default method;