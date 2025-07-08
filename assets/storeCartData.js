function storeCartData(name, id) {
  const cartVariant = Object.create(variantFunctionStore);
  cartVariant.name = name;
  cartVariant.id = id;
  return cartVariant;
}
const user1 = userCreator('Will', 3);
const user2 = userCreator('Tim', 5);
user1.increment();

//Load memory = newUser Name = Will, Score = 3, then user1 Name = Will, Score = 3

//this.score++
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
    console.log('Logged in');
  },
};

const user1 = userCreator('Will', 3);
const user2 = userCreator('Tim', 5);
user1.increment();

//Protochain example
function storeCartData(name, id) {
  const cartVariant = Object.create(variantFunctionStore);
  cartVariant.name = name;
  cartVariant.id = id;
  return cartVariant;
}

const variantFunctionStore = {
  increment: function () {
    this.score++;
  },
  addToCart: function () {
    console.log('added to cart');
  },
};

const variantDataTransferedToCart = userCreator('Will', 3);
const variantDataTransferedToClickCollect = userCreator('Tim', 5);
variantDataTransferedToCart.increment();

// Global memory {
// VariantFunctionStore (increment og addtocart)
// userCreator

//Execution context
//Local memory
//Parameter-name: name: 'Will' Argumentname: id: 3,
//cartVariant {name: 'Will' Argumentname: id: 3, }
//return cartVariant

// variantDataTransferedToCart = userCreator('Will', 3); med link til variantFunctionStore
// variantDataTransferedToClickCollect = userCreator('Tim', 5);  med link til variantFunctionStore
// user1.increment() -
//const customerChoseShippng = userCreator('Will', 3);
//const customerChoseClickAndCollect = userCreator('Tim', 5);
//user1.increment();
