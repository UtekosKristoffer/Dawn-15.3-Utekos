function collectCartData('variant', quantity ) {
  const cartContent = {},
  dataContent.variant = 'variant';
  dataContent.quantity = 'quantity';
  cartContent.increment = function () {
    cartContent.QuantityInput++;
  };
  return cartContent;
};

const transferCartData = collectCartData('variant', 1) 
const cartContentquantity = collectCartData('variant', 3) 
transferCartData.increment()
 //