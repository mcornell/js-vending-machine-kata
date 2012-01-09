# Vending Machine Kata

Instructions borrowed from @guyroyse's [Vending Machine Kata](http://files.guyroyse.com/slides/javascript-vending-machine-kata.odp)

## Interface

### Display

Shows the amounf of money inserted:

* $0.25
* $0.10
* $1.25
* INSERT COIN - In leiu of $0.00
* SOLD OUT - When no item available

### Coin Slot

Accepts:

* Nickels
* Dimes
* Quarters
* Dollar Coin (I added this)

Does Not Accept: (I also added this)

* Penny
* Half Dollar
* Silver Dollar

### Coin Return Button

Returns inserted coins

### Coin Return

Holds returned coins

### Product Buttons

Purchases a product. Producs include:

* Soda
* Chips
* Candy

### Item Bin

Holds purchased items

## Internal State

### Coin Bin

Contains coins sorted by type

### Product Inventory

Products sorted by type