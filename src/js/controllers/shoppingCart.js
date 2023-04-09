import { renderListItemCart } from "../components/ShoppingCart";
import {
    addProductToCartLocalStorage,
    getProductCartLocalStorage,
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


export const addProductToCart = async (id, quantity = 1) => {
    try {
        const product = await getProductById(id);
        const tempProduct = await isProductAlreadyInCart(id);
        
        if (tempProduct !== undefined) {
            updateProductToCart(id, tempProduct.quantity + quantity);
        } else {
            addProductToCartLocalStorage({ ...product, quantity });
        }
        renderListItemCart();
    } catch (error) {
        throw new Error(`Error addProductToCart: ${error.message}`);
    }
};


export const updateProductToCart = (id, quantity) => {
    try {
        updateProductToCartLocalStorage(id, quantity);
    } catch (error) {
        throw new Error(`Error updateProductToCart: ${error.message}`);
    }
};


export const removeProductFromCart = (id) => {
    try {
        removeProductFromCartLocalStorage(id);
    } catch (error) {
        throw new Error(`Error removeProductFromCart: ${error.message}`);
    }
};

const isProductAlreadyInCart = async (productId) => {
    const productList = await getProductsCart();
    return productList.find(product => product.id === productId);
};