import '../../css/components/ListProducts.css';
import { addEventListenerShowDetails } from '../utils/ProductDetails';
import { addEventListenerAddToCart } from '../utils/addToCart';
import { addEventListenerFavoriteIcon } from '../utils/favoriteIcon';
import { truncateElementText } from '../utils/truncateTextByLines';

import { CardProductoHTML } from './CardProduct';

/**
 * This function adds functionality to the product html .
 * @param productHtml - The HTML element that contains the product information.
 */
const addFunctionality = (productHtml) => {
    truncateElementText(productHtml);
    addEventListenerFavoriteIcon(productHtml);
    addEventListenerAddToCart(productHtml);
    addEventListenerShowDetails(productHtml);
}  

/**
 * It take a list of products and a container div, and add a card for each product to the container div.
 * @param productsList - Array of objects.
 * @param productsDiv - the div where the products will be displayed.
 */
export const ListProducts = (productsList, productsDiv) => {
    try {
        productsDiv.innerHTML = '';
        productsList.forEach(({ name, description, price, images, discount, _id }) => {
            const productHtml = CardProductoHTML(name, description, price, images, discount, _id);
            productsDiv.appendChild(productHtml);
            
            addFunctionality(productHtml);

        });
    } catch (error) {
        throw `Error en ListProducts(): ${error}`;
    }
}