import { renderProductDetails } from "../components/ProductDetails";

/**
 * The function takes a link element and extracts the productId from its dataset to render the details
 * of the corresponding product.
 * @param link - The `link` parameter is a reference to an HTML element that has a `data-product-id`
 * attribute. This attribute contains the ID of a product that needs to be rendered in more detail. 
 */
const showDetails = (link) => {
    const { productId } = link.dataset;
    renderProductDetails(parseInt(productId));
}


/**
 * This function adds event listeners to links with a specific class to show product details when
 * clicked.
 * @param productoHTML - It is a DOM element that represents a product in HTML format. The function
 * adds event listeners to the "show details" links within the product element.
 */
export const addEventListenerShowDetails = (productoHTML) => {
    const links = productoHTML.querySelectorAll('.show__product-details');
    links.forEach((link) => {
        link.addEventListener('click', () => showDetails(link));
    })
}