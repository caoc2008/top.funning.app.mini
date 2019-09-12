//app.js

App({
  imageHost: "http://image.app.funning.top/",
  appName: "噼里啪啦小铺",
  phoneNum: "18620552310",
  shopId:6,
  isLogin: false,
  shopList: [],
  cookie: {},
  onLaunch: function() {
    this.cookie = new Map();
  }
})