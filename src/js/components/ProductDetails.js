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


/**
 * The function returns HTML code for displaying product prices with or without a discount.
 * @param price - The original price of a product.
 * @param discount - The discount of a product.
 * @returns returns a string of HTML code that displays the original price,
 * discounted price, and discount percentage of a product. 
 */
const pricesHtml = (price, discount) => {
    const discountedPrices = `
        <div class="product-details__prices-previous-current">
            <p class="previous-price"> Antes: ${formatPrice(price)} </p>
            <p class="current-price current-price-red">
                <strong> Ahora: ${formatPrice(calculatePriceWithDiscount(price, discount))} </strong>
            </p>
            <p class="discount"> Descuento de: ${formatPrice(calculatePriceDiscount(price, discount))} </p>
        </div>
        <p>Descuento: <strong> - ${discount}</strong><i class="fa-sharp fa-solid fa-percent"> </i> </p>
                        
    `;

    const pricesWithoutDiscount = `
        <div class="product-details__prices-previous-current">
            <p class="current-price current-price-red">
                <strong> Ahora: ${formatPrice(price)} </strong>
            </p>
        </div>                 
    `;

    return discount > 0 ? discountedPrices : pricesWithoutDiscount
}


/**
 * The function calculates and formats the final price of a product with or without a discount.
 * @param price - The original price of a product or service.
 * @param discount - The discount of a product.
 * @returns returns a formatted price with or without a discount applied.
 */
const finalPricesHtml = (price, discount) => {
    return discount > 0
        ? formatPrice(calculatePriceWithDiscount(price, discount))
        : formatPrice(price)
}

/**
 * The function checks if a quantity is greater than zero and returns a boolean value.
 * @param quantity - It represents the quantity of  a certain item that is being checked for availability.
 * @returns returns a boolean value.
 */
const isAvailable = (quantity) => quantity > 0


/**
 * The function returns a string indicating whether a product is available or not, and if there are
 * more units on the way.
 * @param quantity - The quantity parameter represents the number of units of a product that are
 * currently available in stock.
 * @returns The function `isAvailableHtml` returns an HTML string that displays whether a product is
 * available or not based on the quantity parameter passed to it.
 */
const isAvailableHtml = (quantity) => {
    return isAvailable(quantity)
        ? `<p> <i class="fa-solid fa-check"></i> Disponible. </p>`
        : `<p> <i class="fa-solid fa-xmark"></i> No disponible. </p>
            <p> <i class="fa-solid fa-truck-fast"></i> Hay más unidades en camino. </p> `
}


/**
 * This function generates HTML code for a select element with options for selecting a quantity,
 * limited by a maximum value.
 * @param quantity - The available quantity of a product.
 * @param [limit=10] - The limit parameter is an optional parameter that sets the maximum quantity that
 * can be selected in the dropdown menu.
 * @returns The function `quantitySelectHtml` returns an HTML string that creates a select element with
 * options for selecting a quantity of a product. 
 */
const quantitySelectHtml = (quantity, limit = 10) => {
    if (!isAvailable(quantity)) {
        return '0';
    }

    const select = document.createElement('select');
    select.id = 'form-quantity-select';
    select.classList.add('product-details__form-quantity-select');
    select.name = 'quantity';

    const qty = Math.min(quantity, limit);

    for (let i = 1; i <= qty; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        select.appendChild(option);
    }

    return select.outerHTML;
};


const ProductDetailsCardHtml = ({ id, category, reference, name, imageUrl, images, price, quantity, discount, description }) => {
    const sectionProductDetailsHtml = document.querySelector(".product-details");

    const productDetailsCardHTML = document.createElement("div");
    const contenido = `
        <div class="back-details">
            <button class="btn back-details-close btn-close-card" title="Volver a productos." aria-label="Volver a productos">
                <i class="fa-solid fa-arrow-left"></i> Volver
            </button>
            <strong>Detalles del producto</strong>
            <button class="btn back-details-close btn-close-card" title="Cerrar detalles del producto."
                aria-label="Cerrar detalles del producto">
                <i class="fa-solid fa-xmark"></i>
            </button>
        </div>

        <div class="product-details__banner">
            <div class="product-details__images">
                <img src="assets/img/productos/${imageUrl}/${images[0]}" class="product-details__image-primary"
                width="350" height="350" alt="Imagen principal producto ${name}.">
                <div class="product-details__images-secondary">
                    <img src="assets/img/productos/${imageUrl}/${images[0]}" class="product-details__image-secondary"
                        width="100" height="100" alt="Imagen producto ${name}.">
                    <img src="assets/img/productos/${imageUrl}/${images[1]}" class="product-details__image-secondary"
                        width="100" height="100" alt="Imagen producto ${name}.">
                    <img src="assets/img/productos/${imageUrl}/${images[2]}" class="product-details__image-secondary"
                        width="100" height="100" alt="Imagen producto ${name}.">
                </div>
            </div>

            <div class="product-details__content">
                <h2 class="product-details__title"> ${name} </h2>

                <div class="product-detail-data">
                    <div class="product-details__price-quantity">
                        <hr>
                        <div class="product-details__prices">
                            ${pricesHtml(price, discount)}
                        </div>
                        <hr>
                        <p> - Categoria: <strong> ${category} </strong></p>
                        <p> - Referencia: <strong> ${reference} </strong></p>
                        <p> - Cantidad disponible: <strong>  ${quantity}  </strong> unidades </p>

                    </div>

                    <div class="product-details__form">
                        <p>Precio final: <strong> ${finalPricesHtml(price, discount)} </strong></p>
                        <p> <i class="fa-solid fa-truck"></i> Costo de envío: <strong> ${formatPrice(25000)} </strong> </p>
                        <p> <i class="fa-solid fa-truck-fast"></i> Envío rápido: <strong> ${formatPrice(40000)} </strong> </p>

                       ${isAvailableHtml(quantity)}

                        <div class="product-details__form-quantity">
                            <label for="quantity" class="product-details__form-quantity-label">
                                <i class="fa-solid fa-hashtag"></i>
                                Cantidad:
                            </label>
                            ${quantitySelectHtml(quantity)}
                        </div>

                        <div class="product-details__buttons">
                            <button class="btn-favorite" title="Añadir a favoritos." data-product-id=${id}>
                                <i class="fa-regular fa-star icon-favorite"></i>
                            </button>
                            <button class="btn btn-primary-color add-to-cart-button" data-product-id=${id} 
                                ${!isAvailable(quantity) ? 'disabled' : ''}>
                                Añadir al carrito
                            </button>
                        </div>
                        <p>
                        <i class="fa-solid fa-location-dot"></i>
                        ¡Recibe tu pedido en tiempo récord! Entrega garantizada en 24 a 48 horas con envío rápido!
                        </p>
                    </div>
                </div>
            </div>
        </div>


        <div class="product-details__content-description">
            <h3>Description</h3>
            <p class="product-details__description">
                ${description}
            </p>
        </div>
    `;
    productDetailsCardHTML.classList.add('product-details__card');
    productDetailsCardHTML.innerHTML = contenido;

    sectionProductDetailsHtml.innerHTML = '';
    sectionProductDetailsHtml.appendChild(productDetailsCardHTML);

    addFunctionality(sectionProductDetailsHtml);
}



export const renderProductDetails = async (productId) => {
    const dataProduct = await getProductById(productId);
    ProductDetailsCardHtml(dataProduct);
}