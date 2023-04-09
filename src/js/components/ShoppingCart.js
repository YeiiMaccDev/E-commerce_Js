import '../../css/components/ShoppingCart.css';
import { getProductsCart } from '../controllers/shoppingCart';

import { formatPrice } from "../utils/formatterPrices";

// BTN Shopping cart.
const btnCartHtml = document.querySelector('#cart-btn');


const CartItemHTML = (name, price, imageUrl, images, quantity, id) => {
  const itemHTML = document.createElement("li");
  const contenido = `
        <img src="assets/img/productos/${imageUrl}/${images[0]}" class="cart__list-item-img" loading="lazy"  width="70" height="70" alt="Imagen producto ${name}.">
        <div class="cart__list-item-content">
          <h3 class="cart__list-item-title"> ${name} </h2>
            <div class="cart__list-item-datails">
              <div class="cart__list-item-quantity">
                <button class="cart__list-item-quantity-btn minus" aria-label="Disminuir" title="Disminuir">
                  <i class="fa-solid fa-minus"></i>
                  </button>
                <input type="number" value="${quantity}" class="cart__list-item-quantity-input" aria-label="Cantidad producto.">
                <button class="cart__list-item-quantity-btn plus" aria-label="Aumentar" title="Aumentar">
                  <i class="fa-solid fa-plus"></i>
                </button>
              </div>
              <p class="cart__list-item-price">${formatPrice(price)}</p>
            </div>
        </div>
        <div class="cart__list-item-actions">
          <button data-product-id=${id} class="cart__list-item-actions-btn edit" aria-label="Editar producto." 
          title="Editar producto.">
              <i class="fa-solid fa-pen-to-square"></i>
          </button>
          <button data-product-id=${id} class="cart__list-item-actions-btn delete" aria-label="Eliminar producto."
            title="Eliminar producto.">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
        `;

  itemHTML.classList.add('cart__list-item');
  itemHTML.innerHTML = contenido;
  itemHTML.dataset.id = id;
  return itemHTML;
};


const addFunctionality = (cartItemHTML) => {
  console.log(cartItemHTML);
}


const ListItemCart = (productsList, cartListHtml) => {
  try {
    productsList.forEach(({ name, price, imageUrl, images, quantity, id }) => {
      const cartItemHTML = CartItemHTML(name, price, imageUrl, images, quantity, id);
      cartListHtml.appendChild(cartItemHTML);

      addFunctionality(cartItemHTML);
    });
  } catch (error) {
    throw `Error en renderShoppingCart: ${error}`;
  }
}

const cartQuantity = (productsList) => {
  const cartContainerHTML = document.querySelector('#cart-count');
  cartContainerHTML.innerHTML = `${productsList.length}`;
}

const EmptyCartHtml = () => {
  const itemHTML = document.createElement("li");
  const contenido = `
    <img src="assets/img/logo.png" class="cart__list-item-img" loading="lazy"  width="70" height="70" alt="Imagen producto ${name}.">
    <div class="cart__list-item-content">
      <h3 class="cart__list-item-title"> Carrito de la compra vacío. </h2>
    </div>
        `;
  itemHTML.classList.add('cart__list-item');
  itemHTML.innerHTML = contenido;
  return itemHTML;
};

const eventListenerBtnCart = () => {
  const cartContainerHTML = document.querySelector('#cart_container');
  /** 
   * Add an event listener to trigger the visibility of products in the cart 
   * when a button in the cart is clicked. 
   * */
  btnCartHtml.addEventListener("click", () => {
    cartContainerHTML.classList.toggle('cart-open');
    // if (cartContainerHTML.classList.contains('cart-open')) {
    //   renderListItemCart();
    // }
  });
}

const CartHtml = () => {
  const mainHtml = document.querySelector("main");

  const cartContainerHTML = document.createElement("div");
  const contenido = `
      <h2 class="cart-title">Carrito de compras.</h2>
      <ul class="cart__list" id="cart_list">
    
      </ul>
      <div class="cart__list-total">
        Total: $11.509.678.00
      </div>
      <button class="btn btn-primary-color cart__list-comprar ">
        <i class="fa-solid fa-dollar-sign"></i>
        Pagar
      </button>
    `;
  cartContainerHTML.classList.add('cart');
  cartContainerHTML.setAttribute('id', 'cart_container');
  cartContainerHTML.innerHTML = contenido;

  mainHtml.appendChild(cartContainerHTML);
}


export const renderListItemCart = async () => {
  try {
    const cartListHtml = document.querySelector('#cart_list');
    cartListHtml.innerHTML = '';
    const productsList = await getProductsCart();

    if (!Array.isArray(productsList)) {
      throw new Error(`Error al consultar los datos, se esperaba una lista de productos.`);
    }

    if (productsList.length === 0) {
      console.log("Carritooooo vacio :( ")
      cartListHtml.appendChild(EmptyCartHtml());
    }

    cartQuantity(productsList);

    ListItemCart(productsList, cartListHtml);
  } catch (error) {
    throw new Error(`Error en renderShoppingCart: ${error.message}`);
  }
}



export const renderShoppingCart = () => {
  CartHtml();
  eventListenerBtnCart();
  renderListItemCart();
}