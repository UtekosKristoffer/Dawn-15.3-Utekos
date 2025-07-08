//´The class 'syntatic sugar'
class CartVariants {
  constructor(name, id) {
    this.name = name;
    this.id = id;
  }
  increment() {
    this.id++;
  }
  login() {
    console.log('login');
  }
}

const products = new CartVariants('Kristoffer', 9);
product1.increment();
