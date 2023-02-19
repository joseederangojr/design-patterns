/**
 * Observer Pattern
 */


interface Observable<T> {
  subscribe(observer: Observer<T>);
  unsubscribe(observer: Observer<T>);
  notify(data: T);
}

interface Observer<T> {
  watch(data: T);
}

class Cart {
  private items: Item[] = [];

  add(item: Item) {
    this.items.push(item)
  }

  remove(item: Item) {
    this.items = this.items.filter($item => $item === item)
  }

  getItems() {
    return this.items;
  }

  getTotal() {
    return this.items.reduce((total, item) => total + item.price,0)
  }

  getItemCount() {
    return this.items.length
  }
}

class Item {
  public id: number;
  public name: string;
  public price: number;

  constructor(name: string, price: number) {
    this.id = Date.now()
    this.name = name;
    this.price = price;
  }
}

class CartObserver implements Observer<Cart> {
  private callback;
  constructor(callback: (data: Cart) => void) {
    this.callback = callback
  }

  watch(data: Cart) {
    this.callback(data)
  }
}

class CartObservable implements Observable<Cart> {
  private observers: Observer<Cart>[] = [];
  private cart: Cart = new Cart()

  subscribe(observer: Observer<Cart>) {
    this.observers.push(observer)
  }

  unsubscribe(observer: Observer<Cart>) {
    this.observers = this.observers.filter(obs => obs !== observer)
  }

  notify() {
    this.observers.forEach(observer => {
      observer.watch(this.cart);
    })
  }

  add(item: Item) {
    this.cart.add(item)
    this.notify()
  }

  remove(item: Item) {
    this.cart.remove(item)
    this.notify()
  }
}



const cartObservable = new CartObservable()

const totalPriceObserver = new CartObserver(cart => {
  console.log('Total Price:', cart.getTotal())
})
const totalCountObserver = new CartObserver(cart => {
  console.log('Total count: ', cart.getItemCount())
})
const listItemsObserver = new CartObserver(cart => {
  cart.getItems()
  .forEach(item => {
    console.log('Name:', item.name, '----', 'Price: ', item.price)
  })
})

// Subscribe
cartObservable.subscribe(listItemsObserver)
cartObservable.subscribe(totalCountObserver)
cartObservable.subscribe(totalPriceObserver)

cartObservable.add(new Item('Item 1', 10))
cartObservable.add(new Item('Item 2', 15))
cartObservable.add(new Item('Item 3', 25))

cartObservable.unsubscribe(totalCountObserver)
cartObservable.add(new Item('Item 4', 50))
