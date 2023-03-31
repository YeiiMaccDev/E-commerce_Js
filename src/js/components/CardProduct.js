import '../../css/components/CardProduct.css'

import { formatPrice } from "../utils/formatterPrices";



const discountComponentHTML = (discount) => {
    return (discount > 0)
        ? `<strong> - ${discount} </strong><i class="fa-sharp fa-solid fa-percent"></i>`
        : ``;
}

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

export const cardProductoHTML = ({name, description, price, imageUrl, images, discount, id}) => {
    const cardProduct = document.createElement("div");
    const contenido = `
    <a class="product__link" href="./producto.html?id=${id}" title="Ver detalles.">
        <div class="product__image">
            <img src="assets/img/productos/${imageUrl}/${images[0]}" loading="lazy"  width="250" height="250" alt="Imagen producto ${name}.">
        </div>
    </a>
    <div class="product__content">
        <a class="product__link" href="./producto.html?id=${id}" title="Ver detalles.">
            <h2 class="product__title"> ${name} </h2>
            <p class="product__description"> ${description} </p>
        </a>
        <div class="product__prices">
            <div class="product__btn-discount">
                ${discountComponentHTML(discount)}
            </div>
            <div class="product__prices-previous-current">
                ${priceComponentHTML(discount, price)}
            </div>
        </div>
        <div class="product__buttons" >
            <button class="btn-favorite" title="Añadir a favoritos." data-addfavorite=${id}>
                <i class="fa-regular fa-star icon-favorite"></i>
            </button>
            <button class="btn btn-primary-color" data-addcart=${id}>
                Añadir al carrito
            </button>
        </div>
    </div>`;

    cardProduct.classList.add('product-card');
    cardProduct.innerHTML = contenido;
    cardProduct.dataset.id = id;
    return cardProduct;
};