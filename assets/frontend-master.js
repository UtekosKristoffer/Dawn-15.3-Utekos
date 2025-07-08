// copyArrayAndManipulate
function copyArrayAndManipulate(array, instructions) {
  const output = [];
  for (let i = 0; i < array.length; i++) {
    output.push(instructions(array[i]));
  }
  return output;
}
function multiplyBy2(input) {
  return input * 2;
}
const results = copyArrayAndManipulate([1, 2, 3], multiplyBy2);

// generatedFunc
function createFunction() {
  function multiplyBy2(num) {
    return num * 2;
  }
  return multiplyBy2;
}

const generatedFunc = createFunction();
const result = generatedFunc(3);

// Object.create(null);
const user3 = Object.create(null);

user3.bane = 'Eva';
user3.score = 9;
user3.increment = function () {
  user3.score++;
};

// Solution 1. Generate objects using a function // userCreator
function userCreator(name, score) {
  const newUser = {};
  newUser.name = name;
  newUser.score = score;
  newUser.increment = function () {
    newUser.score++;
  };
  return newUser;
}

const user1 = userCreator('Will', 3);
const user2 = userCreator('Tim', 5);
user1.increment();

// Load memory = newUser Name = Will, Score = 3, then user1 Name = Will, Score = 3function storeCartData(name, id) {  const cartVariant = Object.create(variantFunctionStore);  cartVariant.name = name;  cartVariant.id = id;  return cartVariant;  };}const user1 = userCreator("Will", 3);const user2 = userCreator("Tim", 5);user1.increment();//Load memory = newUser Name = Will, Score = 3, then user1 Name = Will, Score = 3

//Solution 2. Usin a prototype chain example
function userCreator(name, score) {
  const newUser = Object.create(userFunctionStore);
  newUser.name = name;
  newUser.id = score;
  return newUser;
}

const userFunctionStore = {
  increment: function () {
    this.score++;
  },
  login: function () {
    console.log('login');
  },
};

const user1 = userCreator('Will', 3);
const user2 = userCreator('Tim', 5);
user1.increment();

//hasOwnProperty
function userCreator(name, score) {
  const newUser = Object.create(userFunctionStore);
  newUser.name = name;
  newUser.id = score;
  return newUser;
}

const userFunctionStore = {
  increment: function () {
    this.score++;
  },
  login: function () {
    console.log('login');
  },
};
const user1 = userCreator('Will', 3);
const user2 = userCreator('Tim', 5);
user1.hasOwnProperty('score');

//Deklaring & calling new function inside our "method" increment
function userCreator(name, score) {
  const newUser = Object.create(userFunctionStore);
  newUser.name = name;
  newUser.score = score;
  return newUser;
}

const userFunctionStore = {
  increment: function () {
    this.score++;
  },
};

const user1 = userCreator('Will', 3);
const user2 = userCreator('Tim', 5);
user1.increment();

//´Create & invoke a new function (add1) inside increment
function userCreator(name, score) {
  const newUser = Object.create(userFunctionStore);
  newUser.name = name;
  newUser.score = score;
  return newUser;
}

const userFunctionStore = {
  increment: function () {
    function add1() {
      this.score++;
    }
    add1();
  },
};

const user1 = userCreator('Will', 3);
const user2 = userCreator('Tim', 5);
user1.increment();

//´Arrow functions override the normal "this" rules
function userCreator(name, score) {
  const newUser = Object.create(userFunctionStore);
  newUser.name = name;
  newUser.score = score;
  return newUser;
}

const userFunctionStore = {
  increment: function () {
    const add1 = () => {
      this.score++;
    };
    add1();
  },
};

const user1 = userCreator('Will', 3);
const user2 = userCreator('Tim', 5);
user1.increment();

//´The "new" keyword automates a lot of work
function userCreator(name, score) {
  this.name = name;
  this.score = score;
}

userCreator.prototype.increment = function () {
  this.score++;
};
userCreator.prototype.login = function () {
  console.log('login');
};

const user1 = new userCreator('Will', 3);

user1.increment();

//´The class 'syntatic sugar'
class UserCreator {
  constructor(name, score) {
    this.name = name;
    this.score = score;
  }
  increment() {
    this.score++;
  }
  login() {
    console.log('login');
  }
}

const user1 = new UserCreator('Kristoffer', 9);
user1.increment();

//´The class 'syntatic sugar'
class CartVariants {
  constructor(name, score) {
    this.name = name;
    this.score = score;
  }
  increment() {
    this.score++;
  }
  login() {
    console.log('login');
  }
}

const user1 = new CartVariants('Kristoffer', 9);
user1.increment();

//
class CartVariant {
  constructor(id, title, price, available) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.available = available;
  }

  markSoldOut() {
    this.available = false;
  }

  increasePrice(amount) {
    this.price += amount;
  }
}

//
class CartProduct {
  constructor(title, id) {
    this.title = title;
    this.id = id;
  }

  increment() {
    this.id++;
  }
}

const product1 = new CartProduct('Product1 A', 1);
product1.increment();
