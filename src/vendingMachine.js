var Money = {
  DOLLAR : 1.00,
  QUARTER : 0.25,
  DIME : 0.10,
  NICKEL : 0.05,
  PENNY : 0.01
}

function VendingMachine() {
  this.display = 'INSERT COIN';
  this.coinsAccepted = [Money.DOLLAR, Money.QUARTER, Money.DIME, Money.NICKEL];
  this.coinReturn = [];
  this.coinsAdded = [];

  this.updateDisplay = function () {
    var total = 0;

    for (var i = 0; i < this.coinsAdded.length; i++) {
      total += this.coinsAdded[i];
    }

    if (total > 0) {
      this.display = '$' + total.toFixed(2);
    } else {
      this.display = 'INSERT COIN';
    }
  };

  this.insertCoin = function (coin) {
    if (this.coinsAccepted.indexOf(coin) > -1) {
      this.coinsAdded.push(coin);
    } else {
      this.coinReturn.push(coin);
    }

    this.updateDisplay();
  };

  this.returnCoins = function() {
    this.coinReturn = this.coinsAdded;
    this.coinsAdded = [];
    this.updateDisplay();
  };


}
