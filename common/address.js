const xygLocation = {
  lng: 113.33717442876233,
  lat: 23.091333102548455
};

const web = require("web.js");

function computer(parameter) {
  let tem = parameter.address;
  let address = tem.provinceName + tem.provinceName + tem.cityName + tem.detailInfo
  web.request("C1013", {
    countryName: "中国",
    provinceName: tem.provinceName,
    cityName: tem.cityName,
    detailInfo: tem.detailInfo
  }, {
    success: function(d) {
      parameter.onSuccess(d.poster);
    },
    fail: function(code, msg) {
      parameter.onFail(msg);
    }
  });
}

module.exports = {
  computer: computer,
}