import { AlertForExceededQuantity, AlertToConfirmExceededQuantity } from "../components/Alert";
import { renderListItemCart } from "../components/ShoppingCart";
import {
    addProductToCartLocalStorage,
    getProductCartLocalStorage,
    removeAllProductsFromCartLocalStorage,
    removeProductFromCartLocalStorage,
    updateProductToCartLocalStorage
} from "./LocalStorage";
import { getProductById } from "./products";


export const getProductsCart = async () => {
    try {
        return await getProductCartLocalStorage();
    } catch (error) {
        throw new Error(`Error getProductsCart: ${error.message}`);
    }
}


export const addProductToCart = async (id, quantity = 1, limit = 10) => {
    try {
        const {name, price, images, discount, stock} = await getProductById(id);
        const tempProduct = await findCartProduct(id);

        if (tempProduct) {
            const currentQuantity = tempProduct.quantity;
            const remainingQuantity = limit - currentQuantity;

            if (currentQuantity == limit) {
                const message = `${currentQuantity} unidades del producto ya se encuentran en el carrito. La cantidad máxima de un producto por pedido es de ${limit} unidades.`;
                AlertToConfirmExceededQuantity(message);
                return false;
            } else if (currentQuantity + quantity > limit) {
                const message = `La cantidad máxima de un producto por pedido es de ${limit} unidades. 
                                En el carrito ya se encuentran ${currentQuantity} unidades del producto.  
                                ¿Desea agregar ${remainingQuantity} unidades más al carrito? `;

                const confirmed = await AlertToConfirmExceededQuantity(message);

                return (confirmed)
                    ? updateProductToCartLocalStorage(id, currentQuantity + remainingQuantity)
                    : false

            }

            return updateProductToCartLocalStorage(id, currentQuantity + quantity);

        }
        return addProductToCartLocalStorage({id, name, price, images, discount, stock, quantity });

    } catch (error) {
        throw new Error(`Error addProductToCart: ${error.message}`);
    }
};


export const updateProductToCart = (id, quantity) => {
    try {
        updateProductToCartLocalStorage(id, quantity);
        renderListItemCart();
    } catch (error) {
        throw new Error(`Error updateProductToCart: ${error.message}`);
    }
};


export const removeProductFromCart = (id) => {
    try {
        removeProductFromCartLocalStorage(id);
        renderListItemCart();
    } catch (error) {
        throw new Error(`Error removeProductFromCart: ${error.message}`);
    }
}


/**
 * The function finds a product in a cart by its ID.
 * @param productId - The ID of the product to find in the cart.
 * @returns The function is returning a promise that resolves to the product object
 * from the cart with the specified `productId`. If no product is found with the specified `productId`,
 * the function will return `undefined`.
 */
const findCartProduct = async (productId) => {
    const productList = await getProductsCart();
    return productList.find(product => product.id === productId);
}



/**
 * This function removes all products from the cart and updates the cart display.
 */
export const removeAllProductsFromCart = () => {
    try {
        removeAllProductsFromCartLocalStorage();
        renderListItemCart();
    } catch (error) {
        throw new Error(`Error removeAllProductsFromCart: ${error.message}`);
    }
}