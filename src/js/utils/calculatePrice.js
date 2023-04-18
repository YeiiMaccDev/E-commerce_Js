/**
 * The function calculates the discount amount based on the given price and discount percentage.
 * @param price - The original price of a product or service.
 * @param discount - The discount of a product.
 */
export const calculatePriceDiscount = (price, discount) => (price * discount / 100);

/**
 * The function calculates the price after applying a discount to the original price.
 * @param price - The original price of a product.
 * @param discount - The discount of a product.
 */
export const calculatePriceWithDiscount = (price, discount) => (price * (100 - discount) / 100);


/**
 * This function calculates the total price with quantity discount based on the original price.
 * @param price - The original price of a product.
 * @param discount - The discount of a product.
 * @param quantity - The quantity represents the number of items being purchased.
 */
export const calculatePriceWithQuantityDiscount = ( price, discount, quantity ) =>
    calculatePriceWithDiscount(price, discount) * quantity;


/**
 * The function calculates the total price of a list of products.
 * @param productsList - an array of objects representing a list of products.
 */
export const totalPrice = (productsList) => 
    productsList.reduce((totalPrice, { price, discount, quantity} ) => 
        totalPrice + calculatePriceWithQuantityDiscount(price, discount, quantity), 0);
