import '../../css/components/ProductDetails.css'

import { getProductById } from "../controllers/products";
import { addEventListenerAddToCart } from "../utils/addToCart";
import { addEventListenerFavoriteIcon } from "../utils/favoriteIcon";
import { formatPrice } from "../utils/formatterPrices";




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




const ProductDetailsCardHtml = ({id, category, reference, name, imageUrl, images, price, quantity, discount, description}) => {
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
                            <div class="product-details__prices-previous-current">
                                <p class="previous-price"> Antes: ${formatPrice(price)} </p>
                                <p class="current-price current-price-red">
                                <strong> Ahora: ${formatPrice(price)} </strong>
                                </p>
                                <p class="previous-price"> Descuento: ${formatPrice(price)} </p>
                            </div>
                            <p>Descuento: <strong> - ${discount}</strong><i class="fa-sharp fa-solid fa-percent"> </i> </p>
                        </div>
                        <hr>
                        <p> - Categoria: <strong> ${category} </strong></p>
                        <p> - Referencia: <strong> ${reference} </strong></p>
                        <p> - Cantidad disponible: <strong>  ${quantity}  </strong> unidades </p>

                    </div>

                    <div class="product-details__form">
                        <p>Precio final: <strong> ${formatPrice(price)} </strong></p>
                        <p> <i class="fa-solid fa-truck"></i> Costo de envío: <strong> ${formatPrice(25000)} </strong> </p>
                        <p> <i class="fa-solid fa-truck-fast"></i> Envío rápido: <strong> ${formatPrice(40000)} </strong> </p>

                        <p> <i class="fa-solid fa-check"></i> Disponible </p>
                        <div class="product-details__form-quantity">
                            <label for="cantidad" class="product-details__form-quantity-label">
                                <i class="fa-solid fa-hashtag"></i>
                                Cantidad:
                            </label>
                            <select id="cantidad" class="product-details__form-quantity-select" name="cantidad">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                            </select>
                        </div>

                        <div class="product-details__buttons">
                            <button class="btn-favorite" title="Añadir a favoritos." data-product-id=${id}>
                                <i class="fa-regular fa-star icon-favorite"></i>
                            </button>
                            <button class="btn btn-primary-color add-to-cart-button" data-product-id=${id}>
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



export const renderProductDetails = async(productId) => {
    const dataProduct = await getProductById(productId);
    ProductDetailsCardHtml(dataProduct);
}