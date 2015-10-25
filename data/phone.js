/**
 * Created by Xiaolong on 10/24/15.
 */
// Constructor
function Phone(modelNumber, phoneName, storeName, storeId) {
    // always initialize all instance properties
    this.modelNumber = modelNumber;
    this.storeId = storeId;
    this.phoneName = phoneName;
    this.storeName = storeName;
    this.url = "https://reserve.cdn-apple.com/US/en_US/reserve/iPhone/availability?channel=1&returnURL=http%3A%2F%2Fwww.apple.com%2Fshop%2Fbuy-iphone%2Fiphone6s%2F5.5-inch-display-64gb-gold-verizon&store=R039&partNumber=" + modelNumber + "%2FA";
    //this.url = "":
}

// export the class
module.exports.Phone = Phone;