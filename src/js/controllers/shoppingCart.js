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


export const addProductToCart = async (id) => {
    try {
        const product = await getProductById(id);
        addProductToCartLocalStorage(product);
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
