//app.js

App({
  imageHost: "http://image.app.funning.top/",
  appName: "饭宁杂货铺",
  phoneNum: "18620552310",
  shopId:8,
  isLogin: false,
  shopList: [],
  cookie: {},
  onLaunch: function() {
    this.cookie = new Map();
  }
})