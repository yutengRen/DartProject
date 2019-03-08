const method = {
  Ewn() { //扫码
    const token = wx.getStorageSync('token')
    if (token == "") {
      wx.navigateTo({
        url: '/pages/my/register/register',
      })
    } else {
      wx.scanCode({
        onlyFromCamera: true,
        success: (res) => {
          console.log(res);
        }
      })
    }
  },

  loginCheck() { //登录验证
    const token = wx.getStorageSync('token');
    if (token == '') {
      wx.redirectTo({
        url: '/pages/my/register/register',
      })
      return
    }
  },

  tost() { //fail提示
    wx.showToast({
      title: '网络异常，请稍后再试！',
      icon: 'none',
      duration: 2000
    })
  },
}

export default method;