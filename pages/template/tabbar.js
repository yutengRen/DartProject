const method = {
  Ewn() { //扫码
    const token = wx.getStorageSync('token');
    if (token == "") {
      wx.navigateTo({
        url: '/pages/my/register/register',
      })
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

  tost(title) { //全局提示
    wx.showToast({
      title: title,
      icon: 'none',
      duration: 2000
    })
  },
}

export default method;