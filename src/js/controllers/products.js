import { findProductById, getAllProducts } from "../services/products";

/**
 * This function returns a list of products, or rejects with an error message.
 * @returns returns a list of products.
 */
export const getProductList = async () => {
    try {
        return await getAllProducts();
    } catch (error) {
        throw new Error(`Error al consultar productos: ${error.message}`);
    }
}

export const getProductById = async (id) => {
    try {
        return await findProductById(id);
    } catch (error) {
        throw new Error(`Error getProductById: ${error.message}`);
    }
}