/**
 * Strategy Pattern
 */

interface DuckQuackable {
  quack();
}

interface DuckFlyable {
  fly();
}

interface DuckDisplayable   {
  display();
}

interface Duckable extends DuckQuackable, DuckFlyable, DuckDisplayable {}


class DuckSimpleQuack implements DuckQuackable {
  quack() {
    console.log(DuckSimpleQuack.name)
  }
}

class DuckSimpleFly implements DuckFlyable {
  fly() {
    console.log(DuckSimpleFly.name)
  }

}

class DuckSimpleDisplay implements DuckDisplayable {
  display() {
    console.log(DuckSimpleDisplay.name)
  }
}

class DuckStrangeQuack implements DuckQuackable {
  quack() {
    console.log(DuckStrangeQuack.name)
  }
}

class DuckStrangeFly implements DuckFlyable {
  fly() {
    console.log(DuckStrangeFly.name)
  }
}

class DuckStrangeDisplay implements DuckDisplayable {
  display() {
    console.log(DuckStrangeDisplay.name)
  }
}

class Duck implements Duckable {
  constructor(
    quackable: DuckQuackable,
    flyable: DuckFlyable,
    displayable: DuckDisplayable
  ) {
    this.#displayable = displayable;
    this.#flyable = flyable;
    this.#quackable = quackable
  }
  quack() {
    this.#quackable.quack()
  }
  fly() {
    this.#flyable.fly()
  }
  display() {
    this.#displayable.display()
  }


  #quackable: DuckQuackable;
  #flyable: DuckFlyable;
  #displayable: DuckDisplayable;
}



function duck(duck: Duckable) {
  console.log(duck)
  duck.display()
  duck.quack()
  duck.fly()
}





duck(new Duck(new DuckSimpleQuack, new DuckSimpleFly, new DuckSimpleDisplay))
duck(new Duck(new DuckStrangeQuack, new DuckStrangeFly, new DuckStrangeDisplay))
duck(new Duck(new DuckSimpleQuack, new DuckStrangeFly, new DuckStrangeDisplay))
