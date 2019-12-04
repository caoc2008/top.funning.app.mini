
function add(item) {
  let shopCar = getApp().shopCar;
  let shopList = shopCar.shopList;
  let good = shopList[item.id];
  if (good == null) {
    item.count = 1;
    shopList[item.id] = item;
    good = item;
  } else {
    good.count = good.count + 1;
  }

  shopCar.goodCount = shopCar.goodCount + 1;
  shopCar.moneyCount = shopCar.moneyCount + Number(good.price); 

  console.log(shopCar);
}

function reduce(id) {
  let shopCar = getApp().shopCar;
  let shopList = shopCar.shopList;
  let good = shopList[id];
  if (good == null) {
    return;
  }

  if (good.count < 2) {
    delete shopList[id];
  } else {
    good.count = good.count - 1;
  }

  shopCar.goodCount = shopCar.goodCount - 1;
  shopCar.moneyCount = shopCar.moneyCount - good.price;
}

function clear() {
  let shopCar = getApp().shopCar;
  shopCar.goodCount = 0;
  shopCar.moneyCount = 0;
  shopCar.shopList = {};
}


module.exports = { 
  add: add,
  reduce: reduce,
  clear: clear
}