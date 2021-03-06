var express = require('express');
var router = express.Router();
var request = require('request');
var phone = require('../data/phone');
var modelToName = {
  "MKTR2LL": "ATT Silver 64G",
  "MKTW2LL": "ATT Silver 128G",
  "MKTM2LL": "ATT Silver 16G",
  "MKTT2LL": "ATT Gold 64G",
  "MKTX2LL": "ATT Gold 128G",
  "MKTN2LL": "ATT Gold 16G",
  "MKTQ2LL": "ATT Black 64G",
  "MKTV2LL": "ATT Black 128G",
  "MKTL2LL": "ATT Black 16G",
  "MKTU2LL": "ATT Rose Gold 64G",
  "MKTY2LL": "ATT Rose Gold 128G",
  "MKTP2LL": "ATT Rose Gold 16G",
  "MKVW2LL": "Sprint Silver 64G",
  "MKW12LL": "Sprint Silver 128G",
  "MKVP2LL": "Sprint Silver 16G",
  "MKVX2LL": "Sprint Gold 64G",
  "MKW22LL": "Sprint Gold 128G",
  "MKVQ2LL": "Sprint Gold 16G",
  "MKVV2LL": "Sprint Black 64G",
  "MKW02LL": "Sprint Black 128G",
  "MKVN2LL": "Sprint Black 16G",
  "MKVY2LL": "Sprint Rose Gold 64G",
  "MKW32LL": "Sprint Rose Gold 128G",
  "MKVU2LL": "Sprint Rose Gold 16G",
  "MKUU2LL": "T-Mobile Silver 64G",
  "MKUY2LL": "T-Mobile Silver 128G",
  "MKUJ2LL": "T-Mobile Silver 16G",
  "MKUV2LL": "T-Mobile Gold 64G",
  "MKV12LL": "T-Mobile Gold 128G",
  "MKUN2LL": "T-Mobile Gold 16G",
  "MKUQ2LL": "T-Mobile Black 64G",
  "MKUX2LL": "T-Mobile Black 128G",
  "MKUH2LL": "T-Mobile Black 16G",
  "MKUW2LL": "T-Mobile Rose Gold 64G",
  "MKV22LL": "T-Mobile Rose Gold 128G",
  "MKUP2LL": "T-Mobile Rose Gold 16G",
  "MKV92LL": "Verizon Silver 64G",
  "MKVG2LL": "Verizon Silver 128G",
  "MKV52LL": "Verizon Silver 16G",
  "MKVD2LL": "Verizon Gold 64G",
  "MKVH2LL": "Verizon Gold 128G",
  "MKV62LL": "Verizon Gold 16G",
  "MKV82LL": "Verizon Black 64G",
  "MKVF2LL": "Verizon Black 128G",
  "MKV32LL": "Verizon Black 16G",
  "MKVE2LL": "Verizon Rose Gold 64G",
  "MKVJ2LL": "Verizon Rose Gold 128G",
  "MKV72LL": "Verizon Rose Gold 16G",
  "MKWC2LL": "SIM-free Silver 64G",
  "MKWG2LL": "SIM-free Silver 128G",
  "MKW62LL": "SIM-free Silver 16G",
  "MKWD2LL": "SIM-free Gold 64G",
  "MKWH2LL": "SIM-free Gold 128G",
  "MKW72LL": "SIM-free Gold 16G",
  "MKW92LL": "SIM-free Black 64G",
  "MKWF2LL": "SIM-free Black 128G",
  "MKW52LL": "SIM-free Black 16G",
  "MKWE2LL": "SIM-free Rose Gold 64G",
  "MKWJ2LL": "SIM-free Rose Gold 128G",
  "MKW82LL": "SIM-free Rose Gold 16G"
};

var storeIdArr = ["R631", "R027", "R354"];
var storeIdToStoreName = {
  "R631": "Manchester",
  "R027": "Salem",
  "R354": "Nashua"
};

/* GET home page. */
router.get('/', function(req, res, next) {
  var availableList = [];
  var sixtyFourList = [];
  var oneTwentyEightList = [];
  var sixteenList = [];
  request("https://reserve.cdn-apple.com/US/en_US/reserve/iPhone/availability.json", function(error, response, body) {
    for (var i in storeIdArr) {
      var storeId = storeIdArr[i];
      var data = JSON.parse(body)[storeId];
      for (var modelNumber in data) {
        if (data[modelNumber] == "ALL") {
          var stripedModelNumber = modelNumber.substring(0, modelNumber.length - 2);
          if (stripedModelNumber in modelToName) {
            var filteredPhone = new phone.Phone(stripedModelNumber, modelToName[stripedModelNumber], storeIdToStoreName[storeId], storeId);
            if (filteredPhone.phoneName.indexOf("64G") > -1) {
              sixtyFourList.push(filteredPhone);
            }
            if (filteredPhone.phoneName.indexOf("128G") > -1) {
              oneTwentyEightList.push(filteredPhone);
            }
            if (filteredPhone.phoneName.indexOf("16G") > -1) {
              sixteenList.push(filteredPhone);
            }
          }
        }
      }
    }

    // prepare list for sixtyFourList
    for (var sixtyFourPhone in sixtyFourList) {
      availableList.push(sixtyFourList[sixtyFourPhone]);
    }
    for (var oneTwentyEightPhone in oneTwentyEightList) {
      availableList.push(oneTwentyEightList[oneTwentyEightPhone]);
    }
    for (var sixteenPhone in sixteenList) {
      availableList.push(sixteenList[sixteenPhone]);
    }

    for (var i in availableList) {
      console.log(availableList[i].storeName + ": " + availableList[i].phoneName + ": " + availableList[i].url + "\n");
    }
    res.render('index', {
      data: availableList
    })
  });
});

module.exports = router;
