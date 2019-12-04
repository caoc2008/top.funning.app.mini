//index.js
//获取应用实例

/**
 * 1. get good list from server
 * 2. 对比 app.shopList 和 good list
 * 3. 更新 good List 中的数量
 * 4. 生成 current type
 * 
 * 每一次更新 shop list 都要同步到 app.shopList
 */

const app = getApp()
const web = require("../../common/web.js");
const shopCarUtils = require("../shop_car.js");
Page({
  isTypeClick: false,
  data: {
    "state": "load", //show,error,
    "errorMsg": "",
    "scrollValue": 0,
    "shopCar": app.shopCar
  },
  onLoad: function() {
    this.getData();
  },
  getData: function() {
    let that = this;
    that.setData({
      "state": "load"
    });
    web.request("C1001", {}, {
      success: function(data) {
        let dataList = data.typeList;
        dataList[0].active = 'true';
        that.setData({
          "dataList": dataList,
          "currentType": dataList[0],
          "state": "show",
          "postImageUrl": data.postImageUrl
        });
      },
      fail: function(code, msg) {
        that.setData({
          "state": "error",
          "errorMsg": msg
        });
      }
    });
  },
  typeCLick: function(res) {
    let currentType = res.target.dataset.item;
    this.setData({
      "currentType": currentType,
      "scrollValue": 0
    });
  },
  addClick: function(res) {
    let item = res.target.dataset.item;
    shopCarUtils.add({
      "id": item.id,
      "name": item.name,
      "price": item.price
    });

    this.setData({
      "shopCar": app.shopCar
    });
  },

  reduceClick: function(res) {
    let item = res.target.dataset.item;
    shopCarUtils.reduce(item.id);

    this.setData({
      "shopCar": app.shopCar
    });
  },
  showShoplist: function() {
    this.setData({
      "shoplistVisibility": "show",
    });
  },
  hideShoplist: function() {
    this.setData({
      "shoplistVisibility": "hide",
    });
  },
  clearShopList: function() {
    shopCarUtils.clear();

    this.setData({
      "shopCar": app.shopCar,
      "shoplistVisibility": "hide"
    });
  },
  comfirm: function() {
    let shopCar = app.shopCar;
    if (shopCar.goodCount < 1) {
      wx.showToast({
        image: "/image/failure.png",
        title: '请选择商品',
      });
      return;
    }

    let data = [];
    let shopList = shopCar.shopList;
    for (let id in shopList) {
      let good = shopList[id];
      data.push({
        id: good.id,
        amount: good.count
      });
    }
    let that = this;
    wx.showLoading({
      title: '处理中...',
    })
    web.request("C1002", {
      goodList: data
    }, {
      success: function(data) {
        console.log(data);
        that.clearShopList();
        wx.navigateTo({
          url: '/pages/order/normal/confirm/index?id=' + data.id,
        });
        wx.hideLoading();
      },
      fail: function(code, msg) {
        wx.showToast({
          title: msg,
          image: "/image/failure.png"
        });
        wx.hideLoading();
      }
    });
  },
  toDetail: function(res) {
    wx.navigateTo({
      url: 'good/detail/index?id=' + res.currentTarget.dataset.id,
    })
  },
  search: function() {
    wx.navigateTo({
      url: 'good/search/index',
    })
  },
  onShareAppMessage: function() {
    return {
      title: getApp().appName,
      path: '/pages/delivery/index',
      imageUrl: '/image/logo.png'
    }
  },
  posterClose: function() {
    this.setData({
      postImageUrl: false
    });
  }
})