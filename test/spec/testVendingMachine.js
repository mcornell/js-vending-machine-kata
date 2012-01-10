describe("Vending Machine", function() {

  var vendingMachine;

  beforeEach(function() {
    vendingMachine = new VendingMachine();
  });

  describe("Construction", function() {
    it("Displays Insert Coin When Powered Up", function() {
      expect(vendingMachine.display).toEqual("INSERT COIN");
    });

  });

  describe("Inserting Coins", function() {
    it("Displays 0.25 when a Quarter is Entered", function() {
      vendingMachine.insertCoin(Money.QUARTER);
      expect(vendingMachine.display).toEqual("$0.25");
    });

    it("Displays 0.10 when a Dime is Entered", function() {
      vendingMachine.insertCoin(Money.DIME);
      expect(vendingMachine.display).toEqual("$0.10");
    });

    it("Displays 0.05 when a Nickel is Entered", function() {
      vendingMachine.insertCoin(Money.NICKEL);
      expect(vendingMachine.display).toEqual("$0.05");
    });

    it("Displays 1.00 when a Dollar is Entered", function() {
      vendingMachine.insertCoin(Money.DOLLAR);
      expect(vendingMachine.display).toEqual("$1.00");
    });

    it("Displays the added value of multiple coins", function() {
      vendingMachine.insertCoin(Money.NICKEL);
      vendingMachine.insertCoin(Money.QUARTER);
      expect(vendingMachine.display).toEqual("$0.30");
      vendingMachine.insertCoin(Money.DIME);
      vendingMachine.insertCoin(Money.DOLLAR);
      expect(vendingMachine.display).toEqual("$1.40");
    });

    it("Does not accept pennies", function() {
      vendingMachine.insertCoin(Money.PENNY);
      expect(vendingMachine.coinReturn).toContain(Money.PENNY);
      expect(vendingMachine.display).toEqual("INSERT COIN");
    });

    it("Does not accept silver dollars", function() {
      vendingMachine.insertCoin(Money.SILVER_DOLLAR);
      expect(vendingMachine.coinReturn).toContain(Money.SILVER_DOLLAR);
      expect(vendingMachine.display).toEqual("INSERT COIN");
    });

    it("Does not accept half dollars", function() {
      vendingMachine.insertCoin(Money.HALF_DOLLAR);
      expect(vendingMachine.coinReturn).toContain(Money.HALF_DOLLAR);
      expect(vendingMachine.display).toEqual("INSERT COIN");
    });

    it("Does not increment the amount entered when coins it does not accept are entered", function() {
      vendingMachine.insertCoin(Money.NICKEL);
      vendingMachine.insertCoin(Money.QUARTER);
      vendingMachine.insertCoin(Money.HALF_DOLLAR);
      vendingMachine.insertCoin(Money.SILVER_DOLLAR);
      expect(vendingMachine.display).toEqual("$0.30");
    });

    it("Returns multiple unaccepted coins to the coin return", function() {
      vendingMachine.insertCoin(Money.HALF_DOLLAR);
      vendingMachine.insertCoin(Money.SILVER_DOLLAR);
      expect(vendingMachine.coinReturn).toContain(Money.HALF_DOLLAR);
      expect(vendingMachine.coinReturn).toContain(Money.SILVER_DOLLAR);
    });

  });

  describe("Coin Return", function() {

    it("returns a coin if the return coin button is pressed", function() {
      vendingMachine.insertCoin(Money.NICKEL);
      vendingMachine.returnCoins();
      expect(vendingMachine.coinReturn).toContain(Money.NICKEL);
      expect(vendingMachine.coinReturn.length).toBe(1);
    });

    it("it updates the display to show no money has been entered after coins are returned", function() {
      vendingMachine.insertCoin(Money.NICKEL);
      vendingMachine.returnCoins();
      expect(vendingMachine.display).toEqual("INSERT COIN");
    });

    it("contains no coins if the return coin button is pressed", function() {
      vendingMachine.insertCoin(Money.NICKEL);
      vendingMachine.returnCoins();
      expect(vendingMachine.coinsAdded.length).toBe(0);
    });

    it("can return multiple coins", function() {
      vendingMachine.insertCoin(Money.NICKEL);
      vendingMachine.insertCoin(Money.DIME);
      vendingMachine.insertCoin(Money.QUARTER);
      vendingMachine.returnCoins();
      expect(vendingMachine.coinReturn).toContain(Money.NICKEL);
      expect(vendingMachine.coinReturn).toContain(Money.DIME);
      expect(vendingMachine.coinReturn).toContain(Money.QUARTER);
      expect(vendingMachine.coinReturn.length).toBe(3);
    });
  });

  describe("it holds coins sorted by type", function() {

    it("adds a coin to the bin when a valid coin is entered", function() {
      vendingMachine.insertCoin(Money.NICKEL);
      expect(vendingMachine.cash(Money.NICKEL)).toBe(1);
    });

    it("adds multiple coins to the same bin when a vlaid coin is entered", function() {
      vendingMachine.insertCoin(Money.DIME);
      vendingMachine.insertCoin(Money.DIME);
      expect(vendingMachine.cash(Money.DIME)).toBe(2);
    });

    it("does not add unaccepted coins to the bin", function() {
      vendingMachine.insertCoin(Money.HALF_DOLLAR);
      expect(vendingMachine.cash(Money.HALF_DOLLAR)).toBe(0);
    });
  });

  describe("it holds products sorted by type", function() {

    it("Holds products to be purchased", function() {
      expect(vendingMachine.products.length).toBe(3);
    });

    it("Can have more product added to inventory", function() {
      vendingMachine.addInventory(Product.CANDY);
      expect(vendingMachine.getInventory(Product.CANDY)).toBe(1);
    });

    it("Can add multiple product to inventory", function() {
      vendingMachine.addInventory(Product.CANDY);
      vendingMachine.addInventory(Product.CANDY);
      expect(vendingMachine.getInventory(Product.CANDY)).toBe(2);
    });

    it("Can add multiple product to inventory, easily", function() {
      vendingMachine.addInventory(Product.CHIPS, 10);
      expect(vendingMachine.getInventory(Product.CHIPS)).toBe(10);
    });

    it("Can vend items and reduce its inventory", function() {
      vendingMachine.addInventory(Product.CHIPS, 10);
      vendingMachine.vend(Product.CHIPS);
      expect(vendingMachine.getInventory(Product.CHIPS)).toBe(9);
    });

    it("Can vend items and place the item in the item bin", function() {
      vendingMachine.addInventory(Product.CHIPS, 10);
      vendingMachine.vend(Product.CHIPS);
      expect(vendingMachine.itemBin).toContain(Product.CHIPS);
    });

  });
  
  describe("it allows a user to purchase an item and retrieve it from the bin", function() {
    
    beforeEach(function(){
      vendingMachine.addInventory(Product.CHIPS, 10);
      vendingMachine.addInventory(Product.SODA, 1);
      vendingMachine.addInventory(Product.CANDY, 10);
    });    
    
    it("Allows a user to buy a product using exact change", function() {
      vendingMachine.insertCoin(Money.DOLLAR);
      vendingMachine.insertCoin(Money.QUARTER);
      vendingMachine.vend(Product.SODA);
      expect(vendingMachine.itemBin).toContain(Product.SODA);
      expect(vendingMachine.display).toBe("INSERT COIN");
    });
  });


});