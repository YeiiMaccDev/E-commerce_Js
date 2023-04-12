import { AlertSuccess } from "../components/Alert";
import { addProductToCart } from "../controllers/shoppingCart";

/**
 * The function adds a product to the cart when the "Add to Cart" button is clicked.
 * @param btnAddToCart - a button element that triggers the addToCart function when clicked 
 * and contains a dataset attribute called "productId".
 */
const addToCart = (btnAddToCart) => {
    const { productId } = btnAddToCart.dataset;
    addProductToCart(parseInt(productId));
    AlertSuccess('Producto añadido al carrito de compras.');
}


/**
 * This function adds an event listener to the "add-to-cart-button" 
 * and calls the addToCart function when clicked.
 * @param productoHTML - An HTML element that contains a product. 
 * The function adds an event listener to the "Add to Cart" button.
 */
export const addEventListenerAddToCart = (productoHTML) => {
    const btnAddToCart = productoHTML.querySelector('.add-to-cart-button');
    btnAddToCart.addEventListener('click', () => addToCart(btnAddToCart));
}