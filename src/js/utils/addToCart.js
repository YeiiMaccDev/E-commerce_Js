import { addProductToCart } from "../controllers/shoppingCart";

const addToCart = (btnAddToCart) => {
    const { productId } = btnAddToCart.dataset;
    addProductToCart(parseInt(productId));
};


export const addEventListenerAddToCart = (productoHTML) => {
    const btnAddToCart = productoHTML.querySelector('.add-to-cart-button');
    btnAddToCart.addEventListener('click', () =>addToCart(btnAddToCart));
}