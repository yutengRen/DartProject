const method = {
  Ewn() { //扫码
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        wx.navigateTo({
          url: '/pages/index/index?code=' + res.result,
        })
      },
      fail: (res) => {}
    })

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