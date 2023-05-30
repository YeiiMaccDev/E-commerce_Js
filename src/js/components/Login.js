import '../../css/components/ProductDetails.css'

import { getProductById } from "../controllers/products";
import { addEventListenerAddToCart } from "../utils/addToCart";
import { calculatePriceDiscount, calculatePriceWithDiscount } from '../utils/calculatePrice';
import { addEventListenerFavoriteIcon } from "../utils/favoriteIcon";
import { formatPrice } from "../utils/formatterPrices";


/**
 * This function adds event listeners to close a product details card and resets the HTML content.
 * @param productHtml - a DOM element that represents a product card in HTML.
 */
const addEventListenerCloseCard = (productHtml) => {
    const btnsCerrarDetalles = productHtml.querySelectorAll('.btn-close-card');

    document.body.style.overflow = 'hidden';
    productHtml.classList.add('show-product-details');

    btnsCerrarDetalles.forEach((btn) => {
        btn.addEventListener('click', function () {
            productHtml.classList.remove('show-product-details');
            document.body.style.overflow = 'auto';
            productHtml.innerHTML = '';
        });
    });
}

/**
 * This function adds functionality to the product html .
 * @param productHtml - The HTML element that contains the product information.
 */
const addFunctionality = (productHtml) => {
    addEventListenerFavoriteIcon(productHtml);
    addEventListenerAddToCart(productHtml);
    addEventListenerCloseCard(productHtml);
}



const LoginHtml = () => {
    const mainHtml = document.querySelector("main");

    const loginHTML = document.createElement("section");
    const contenido = `
        <div class="login__container">
            <form class="login__form">
                
            </form>
        </div>


        <div class="product-details__content-description">
            <h3>Description</h3>
            <p class="product-details__description">
                ${description}
            </p>
        </div>
    `;
    loginHTML.classList.add('login');
    loginHTML.innerHTML = contenido;

    mainHtml.innerHTML = '';
    mainHtml.appendChild(loginHTML);

    addFunctionality(mainHtml);
}



export const renderProductDetails = async (productId) => {
    const dataProduct = await getProductById(productId);
    LoginHtml(dataProduct);
}