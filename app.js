//app.js

App({
  appName: "饭宁杂货铺",
  phoneNum: "18620552310",
  shopId:8,
  isLogin: false,
  shopList: [],
  cookie: {},
  shopCar:{
    goodCount:0,
    moneyCount:0,
    shopList:{}
  },
  onLaunch: function() {
    this.cookie = new Map();
  }
})