import { findProductByCategory, findProductById, findProductsByQuery, getAllProducts } from "../services/products";

/**
 * This function returns a list of products, or rejects with an error message.
 * @returns returns a list of products.
 */
export const getProductList = async () => {
    try {
        const data = await getAllProducts();
        const productsList = data.products;
        return productsList;
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

export const getProductsByQuery = async (query) => {
    try {
        let data = await findProductsByQuery(query);
        if (data.results.length === 0) {
            data = await findProductByCategory(query);
        }
        return data.results;
    } catch (error) {
        throw new Error(`Error getProductByCartegory: ${error.message}`);
    }
}

export const getProductByCartegory = async (category) => {
    try {
        const data = await findProductByCategory(category);
        const productsList = (category !== '') ? data.results : data.products;
        return productsList;
    } catch (error) {
        throw new Error(`Error getProductByCartegory: ${error.message}`);
    }
}