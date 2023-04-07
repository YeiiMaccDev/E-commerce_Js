import { getAllProducts } from "../services/products";

/**
 * This function returns a list of products, or rejects with an error message.
 * @returns returns a list of products.
 */
export const getProductList = async () => {
    try {
        return await getAllProducts();
    } catch (error) {
        throw `Error al consultar productos: ${error.message}`;
    }
}