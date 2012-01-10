var Money = {
  DOLLAR : {name : "Dollar", value : 1.00},
  SILVER_DOLLAR : {name : "Silver Dollar", value : 1.00},
  HALF_DOLLAR : {name : "Half Dollar", value : 0.50},
  QUARTER : {name : "Quarter", value : 0.25},
  DIME : {name : "Dime", value : 0.10},
  NICKEL : {name : "Nickel", value : 0.05},
  PENNY : {name : "Penny", value : 0.01}
}

var Product = {
  CHIPS : {name : "Chips", cost : 0.75},
  SODA : {name : "Soda", cost : 1.25},
  CANDY : {name : "Candy", cost : 0.85}
}

function VendingMachine() {
  this.display = 'INSERT COIN';
  this.coinsAccepted = [Money.DOLLAR, Money.QUARTER, Money.DIME, Money.NICKEL];
  this.coinReturn = [];
  this.coinsAdded = [];
  this.amountInserted = 0;
  this.cashArray = this.coinsAccepted.map(function(coin) {
    return {value : coin, count : 0};
  });

  this.products = [Product.CHIPS, Product.SODA, Product.CANDY];
  this.inventory = this.products.map(function() {
    return 0;
  });
  this.itemBin = [];


  this.cash = function(coin) {
    var coinIndex = this.coinsAccepted.indexOf(coin);
    if (coinIndex > 0) {
      return this.cashArray[coinIndex].count;
    } else {
      return 0;
    }
  }

  this.updateDisplay = function() {
    this.updateTotal();

    if (this.amountInserted > 0) {
      this.display = '$' + this.amountInserted.toFixed(2);
    } else {
      this.display = 'INSERT COIN';
    }
  };

  this.updateTotal = function() {
    var total = 0;
    for (var i = 0; i < this.coinsAdded.length; i++) {
      total += this.coinsAdded[i].value;
    }

    this.amountInserted = total;

  };

  this.insertCoin = function(coin) {
    var coinIndex = this.coinsAccepted.indexOf(coin)
    if (coinIndex > -1) {
      this.coinsAdded.push(coin);
      this.cashArray[coinIndex].count++;
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

  this.addInventory = function(product, number) {
    var idx = this.products.indexOf(product);
    if (idx > -1) {
      if (number == null || typeof number == 'undefined') {
        number = 1;
      }
      this.inventory[idx] = this.inventory[idx] + number;
    }
  };

  this.getInventory = function(product) {
    var idx = this.products.indexOf(product);
    if (idx > -1) {
      return this.inventory[idx];
    } else {
      return 0;
    }

  };

  this.purchaseProduct = function(product) {
    this.amountInserted = this.amountInserted - product.cost;
    this.coinsAdded = [];
  };

  this.vend = function(product) {
    var idx = this.products.indexOf(product);
    if (idx > -1) {
      this.purchaseProduct(product);

      this.inventory[idx]--;

      this.itemBin.push(product);

      this.updateDisplay();
    }
  }
}
