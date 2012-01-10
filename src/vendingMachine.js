var Money = {
  DOLLAR : {name : "Dollar", value : 1.00},
  SILVER_DOLLAR : {name : "Silver Dollar", value : 1.00},
  HALF_DOLLAR : {name : "Half Dollar", value : 0.50},
  QUARTER : {name : "Quarter", value : 0.25},
  DIME : {name : "Dime", value : 0.10},
  NICKEL : {name : "Nickel", value : 0.05},
  PENNY : {name : "Penny", value : 0.01}
}

function VendingMachine() {
  this.display = 'INSERT COIN';
  this.coinsAccepted = [Money.DOLLAR, Money.QUARTER, Money.DIME, Money.NICKEL];
  this.coinReturn = [];
  this.coinsAdded = [];

  this.updateDisplay = function () {
    var total = 0;

    for (var i = 0; i < this.coinsAdded.length; i++) {
      total += this.coinsAdded[i].value;
    }

    if (total > 0) {
      this.display = '$' + total.toFixed(2);
    } else {
      this.display = 'INSERT COIN';
    }
  };

  this.insertCoin = function (coin) {
    if (this.coinsAccepted.indexOf(coin) > -1) {
      console.log(coin);
      this.coinsAdded.push(coin);
    } else {
      this.coinReturn.push(coin);
    }

    this.updateDisplay();
  };

  this.returnCoins = function () {
    this.coinReturn = this.coinsAdded;
    this.coinsAdded = [];
    this.updateDisplay();
  };


}
