import '../../css/components/CardProduct.css'

import { formatPrice } from "../utils/formatterPrices";

/**
 * If the discount is greater than 0, return a string with the discount and a percent symbol.
 * Otherwise, return an empty string.
 * @param discount - The discount amount.
 * @returns A string HTML.
 */
const discountComponentHTML = (discount) => {
    return (discount > 0)
        ? `<strong> - ${discount} </strong><i class="fa-sharp fa-solid fa-percent"></i>`
        : ``;
}

/**
 * If the discount is greater than 0, return the HTML for the discounted price, otherwise return the
 * HTML for the regular price.
 * @param discount - The discount amount.
 * @param price - The price of the product
 * @returns A string HTML.
 */
const priceComponentHTML = (discount, price) => {
    return (discount > 0)
        ? `<p class="previous-price"> Antes: ${formatPrice(price)} </p>
        <p class="current-price current-price-red">
          <strong> Ahora: ${formatPrice(price * (100 - discount) / 100)} </strong> 
        </p>`
        : `<p class="current-price">
          <strong> Ahora: ${formatPrice(price)} </strong> 
        </p>`;
}

/**
 * Creates a div element, adds a product class to it, 
 * adds the HTML product structure to it and returns it.
 * @param name - "Product name" - string.
 * @param description - string.
 * @param price - number.
 * @param images - Array - url images products
 * @param discount - The discount amount - number.
 * @param id - number.
 * @returns Un elemento div con la clase product-card y la estructura HTML product.
 */
export const CardProductoHTML = (name, description, price, images, discount, id) => {
    const cardProduct = document.createElement("div");
    const contenido = `
    <div class="product__image product__link show__product-details" data-product-id=${id} title="Ver detalles del producto.">
        <img src="${images[0]}" loading="lazy"  width="250" height="250" alt="Imagen producto ${name}.">
    </div>
    <div class="product__content">
        <h2 class="product__title product__link show__product-details" data-product-id=${id} title="Ver detalles del producto.">
            ${name} 
        </h2>
        <p class="product__description"> ${description} </p>
        <div class="product__prices">
            <div class="product__btn-discount">
                ${discountComponentHTML(discount)}
            </div>
            <div class="product__prices-previous-current">
                ${priceComponentHTML(discount, price)}
            </div>
        </div>
        <div class="product__buttons" >
            <button class="btn-favorite" title="Añadir a favoritos." data-product-id=${id}>
                <i class="fa-regular fa-star icon-favorite"></i>
            </button>
            <button class="btn btn-primary-color add-to-cart-button" data-product-id=${id}>
                Añadir al carrito
            </button>
        </div>
    </div>`;

    cardProduct.classList.add('product-card');
    cardProduct.innerHTML = contenido;
    // cardProduct.dataset.id = id;
    return cardProduct;
};