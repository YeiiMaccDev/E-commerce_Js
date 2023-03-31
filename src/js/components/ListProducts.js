import '../../css/components/ListProducts.css';

import { CardProductoHTML } from './CardProduct';

/**
 * It take a list of products and a container div, and add a card for each product to the container div.
 * @param productsList - Array of objects.
 * @param productsDiv - the div where the products will be displayed.
 */
export const ListProducts = (productsList, productsDiv) => {
    try {
        productsList.forEach(({name, description, price, imageUrl, images, discount, id}) => {
            productsDiv.appendChild(
                CardProductoHTML(name, description, price, imageUrl, images, discount, id)
            )
        });
    } catch (error) {
        throw `Error en ListProducts(): ${error}`;
    }
}