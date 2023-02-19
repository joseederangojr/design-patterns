/**
 * Decorator Patter
 */

interface Costable {
  cost(): number;
}

interface Descriptionable {
  description(): string;
}

interface Beveragable extends Costable, Descriptionable {}

abstract class AddOn implements Beveragable {
  protected beverage: Beveragable;
  constructor(beverage: Beveragable) {
    this.beverage = beverage;
  }
  cost(): number {
    return this.beverage.cost();
  }
  description(): string {
    return this.beverage.description();
  }
}

abstract class Coffee implements Beveragable {
  cost(): number {
    return 80;
  }
  description(): string {
    return  Coffee.name;
  }
}

class Decaf extends Coffee {
  cost() {
    return 100;
  }
}

class Espresso extends Coffee {
  cost(): number {
      return 90;
  }
}


class Caramel extends AddOn {
  cost() {
    return this.beverage.cost() + 70;
  }

  description(): string {
      return this.beverage.description() + "\n" + Caramel.name
  }
}

class Milk extends AddOn {
  cost() {
    return this.beverage.cost() + 60;
  }

  description(): string {
      return this.beverage.description() + "\n" + Milk.name;
  }
}

class Ice extends AddOn {
  cost() {
    return this.beverage.cost() + 10;
  }

  description(): string {
      return this.beverage.description() + "\n" + Ice.name;
  }
}


const icedMachiatto = new Ice(new Milk(new Caramel(new Espresso())))
const decafIcedMachiatto = new Caramel(new Milk(new Decaf()))

console.log('Order: Iced Machiatto')
console.log('Ingredients ---')
console.log(icedMachiatto.description())
console.log('Total of Iced Machiatto:', icedMachiatto.cost())


console.log('Order: Decaf Machiatto')
console.log('Ingredients ---')
console.log(decafIcedMachiatto.description())
console.log('Total of Decaf Machiatto:', decafIcedMachiatto.cost())
