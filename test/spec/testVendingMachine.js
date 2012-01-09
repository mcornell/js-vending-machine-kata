describe("Vending Machine", function () {

  var vendingMachine;

  beforeEach(function () {
    vendingMachine = new VendingMachine();
  });

  describe("Construction", function () {
    it("Displays Insert Coin When Powered Up", function () {
      expect(vendingMachine.display).toEqual("INSERT COIN");
    });

  });

  describe("Inserting Coins", function () {
    it("Displays 0.25 when a Quarter is Entered", function () {
      vendingMachine.insertCoin(Money.QUARTER);
      expect(vendingMachine.display).toEqual("$0.25");
    });

    it("Displays 0.10 when a Dime is Entered", function () {
      vendingMachine.insertCoin(Money.DIME);
      expect(vendingMachine.display).toEqual("$0.10");
    });

    it("Displays 0.05 when a Nickel is Entered", function () {
      vendingMachine.insertCoin(Money.NICKEL);
      expect(vendingMachine.display).toEqual("$0.05");
    });

    it("Displays 1.00 when a Dollar is Entered", function () {
      vendingMachine.insertCoin(Money.DOLLAR);
      expect(vendingMachine.display).toEqual("$1.00");
    });

    it("Displays the added value of multiple coins", function () {
      vendingMachine.insertCoin(Money.NICKEL);
      vendingMachine.insertCoin(Money.QUARTER);
      expect(vendingMachine.display).toEqual("$0.30");
      vendingMachine.insertCoin(Money.DIME);
      vendingMachine.insertCoin(Money.DOLLAR);
      expect(vendingMachine.display).toEqual("$1.40");
    });


    it("Does not accept pennies", function () {
      vendingMachine.insertCoin(Money.PENNY);
      expect(vendingMachine.coinReturn).toContain(Money.PENNY);
      expect(vendingMachine.display).toEqual("INSERT COIN");
    });

  });

  describe("Coin Return", function () {

    it("returns a coin if the return coin button is pressed", function () {
      vendingMachine.insertCoin(Money.NICKEL);
      vendingMachine.returnCoins();
      expect(vendingMachine.coinReturn).toContain(Money.NICKEL);
      expect(vendingMachine.coinReturn.length).toBe(1);
    });

    it("it updates the display to show no money has been entered after coins are returned", function () {
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


});