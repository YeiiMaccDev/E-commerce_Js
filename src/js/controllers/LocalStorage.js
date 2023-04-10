// ------------------------- Products
/**
 * This function saves a list of products to the browser's local storage.
 * @param productsList - an array of objects representing a list of products. 
 */
export const saveProductsLocalStorage = (productsList) => {
    localStorage.setItem("products", JSON.stringify(productsList) );
}


/**
 * This function retrieves products from local storage or returns an empty array if there are none.
 */
export const getProductsLocalStorage = () => JSON.parse( localStorage.getItem("products")) || [];




// ------------------------- Shopping cart

/**
 * This function retrieves the product cart from local storage and returns it as a parsed JSON object
 * or an empty array if it doesn't exist.
 */
export const getProductCartLocalStorage = () => JSON.parse(localStorage.getItem("cart")) || [];

/**
 * This function adds a product to the cart in local storage.
 * @param product - The product parameter is an object.
 */
export const addProductToCartLocalStorage = (product) => {
    const cart = getProductCartLocalStorage();
    localStorage.setItem("cart", JSON.stringify([...cart, product]));
};


/**
 * This function updates the quantity of a product in the cart stored in local storage.
 * @param id - The id of the product that needs to be updated in the cart.
 * @param quantity - The updated quantity of a product in the cart.
 */
export const updateProductToCartLocalStorage = (id, quantity) => {
    const cart = getProductCartLocalStorage();
    const updatedCart = cart.map(item => {
        if (item.id === id) {
            return { ...item, quantity };
        }
        return item;
    });
    localStorage.setItem("cart", JSON.stringify(updatedCart));
};

/**
 * This function removes a product from the cart stored in local storage based on its ID.
 * @param id - The id parameter is the identifier of the product.
 */
export const removeProductFromCartLocalStorage = (id) => {
    const cart = getProductCartLocalStorage().filter(item => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
};