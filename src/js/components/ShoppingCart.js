import '../../css/components/ShoppingCart.css';
import { getProductsCart, removeAllProductsFromCart, removeProductFromCart, updateProductToCart } from '../controllers/shoppingCart';
import { calculatePriceWithDiscount, calculatePriceWithQuantityDiscount, totalPrice } from '../utils/calculatePrice';

import { formatPrice } from "../utils/formatterPrices";
import { AlertForExceededQuantity, AlertForMinimumQuantity, AlertSuccess, AlertToConfirmDelete, AlertToConfirmUpdate } from './Alert';

// Btn Shopping cart in menu.
const btnCartHtml = document.querySelector('#cart-btn');


/**
 * The CartItemHTML function creates and returns an HTML element for a cart item. 
 * @param name - The name of the product.
 * @param price - The price of the item.
 * @param imageUrl - The URL path to the folder where the product images are stored.
 * @param images - The images parameter is an array of strings that contains the names of the images
 * associated with the product.
 * @param discount - The discount applied to the product, expressed in integers (e.g. 20 for a 20% discount).
 * @param quantity - The quantity represents the number of items of the product in the cart.
 * @param id - The unique identifier of the cart item.
 * @returns The function `CartItemHTML` returns an HTML element (`li`) that represents a product item
 * in a shopping cart.
 */
const CartItemHTML = (name, price, imageUrl, images, discount, quantity, id) => {
  const itemHTML = document.createElement("li");
  const contenido = `
        <img src="assets/img/productos/${imageUrl}/${images[0]} " class="cart__list-item-img" loading="lazy"  width="70" height="70" alt="Imagen producto ${name}.">
        <div class="cart__list-item-content">
          <h3 class="cart__list-item-title"> ${name} </h2>
            <div class="cart__list-item-datails">
              <div class="cart__list-item-quantity" id="cart-item-quantity">
              <p class="cart__list-item-quantity-p">Cantidad: <strong> ${quantity}</strong></p>
              </div>
              <p class="cart__list-item-price">
                ${formatPrice(
    calculatePriceWithQuantityDiscount(price, discount, quantity)
  )}
              </p>
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


/**
 * The function adds functionality buttons to a quantity div for updating the quantity of a product in
 * a cart.
 * @param quantityDiv - a Html element that contains the quantity input and buttons for a specific
 * product in a shopping cart.
 * @param productId - The ID of the product that the functionality buttons are associated with.
 */
const addFunctionalityQuantityBtns = (quantityDiv, productId) => {
  const quantityInput = quantityDiv.querySelector('.input-update-item');
  const btnMinus = quantityDiv.querySelector('.btn-minus-item');
  const btnPlus = quantityDiv.querySelector('.btn-plus-item');
  const btnUpdate = quantityDiv.querySelector('.btn-update-item');

  const quantityMin = 1;
  const quantityLimit = 10;

  const validateQuantity = (quantityTemp) => 
    (quantityTemp < quantityMin) 
      ? (AlertForMinimumQuantity(quantityMin), false)
      : (quantityTemp > quantityLimit) 
        ? (AlertForExceededQuantity(quantityLimit), false)
        : true;   
  

  const updateQuantityInput = (amount) => {
    const quantityTemp = parseInt(quantityInput.value) + amount;  
    if (validateQuantity(quantityTemp)) {
      quantityInput.value = quantityTemp;
    }
  };

  const validateUpdate = async () => {
    const quantityUpdate = parseInt(quantityInput.value);
    if ( validateQuantity(quantityUpdate)) {
      if (await AlertToConfirmUpdate(quantityUpdate)) {
        updateProductToCart(productId, quantityUpdate);
        AlertSuccess('Producto actualizado con éxito');
      }
    } else {
      quantityInput.value = quantityLimit;
    }
  };

  btnMinus.addEventListener('click', () => updateQuantityInput(-1));

  btnPlus.addEventListener('click', () => updateQuantityInput(1));

  btnUpdate.addEventListener('click', () => validateUpdate());
}

/**
 * The function edits the quantity of a product in the cart HTML and adds functionality to the
 * corresponding buttons.
 * @param cartItemHTML - A HTML element that represents a single item in the shopping cart.
 * @param productId - The ID of the product in the cart that needs its quantity updated.
 * @param quantity - The current quantity of products of that item in the cart.
 */
const editQuantityInCartHtml = (cartItemHTML, productId, quantity) => {
  const quantityDiv = cartItemHTML.querySelector('#cart-item-quantity');
  quantityDiv.innerHTML = '';
  const contenido = `
      <div class="cart__list-item-quantity-btns">
        <button class="cart__list-item-quantity-btn minus btn-minus-item" aria-label="Disminuir" title="Disminuir">
          <i class="fa-solid fa-minus"></i>
          </button>
        <input type="number" value="${quantity}"  data-product-id=${productId} step="1" min="1" max="10" 
        pattern="^[0-9]*$" title="Por favor, ingrese solo dígitos numéricos" aria-label="Cantidad producto."
        class="cart__list-item-quantity-input input-update-item">
        <button class="cart__list-item-quantity-btn plus btn-plus-item" aria-label="Aumentar" title="Aumentar">
          <i class="fa-solid fa-plus"></i>
        </button>
      </div>
      <button class="cart__list-item-quantity-btn check btn-update-item" data-product-id=${productId} aria-label="Actualizar" title="Actualizar">
        <i class="fa-solid fa-check"></i> <strong class="update-item-strong"> Actualizar </strong>
      </button>
  `;
  quantityDiv.innerHTML = contenido;

  addFunctionalityQuantityBtns(quantityDiv, productId);
}


/**
 * This function adds functionality to the edit and delete buttons in a cart item HTML element.
 * @param cartItemHTML - It is a reference to the HTML element that represents a single item in the
 * shopping cart.
 * @param quantity - The quantity parameter is a number that represents the quantity of a product in
 * the cart. 
 */
const addFunctionalityBtnsEditDelete = (cartItemHTML, quantity) => {
  const btnEdit = cartItemHTML.querySelector('.edit');
  const btnDelete = cartItemHTML.querySelector('.delete');

  const productId = parseInt(btnDelete.dataset.productId);

  const deleteItem = async (productId) => {
    if (await AlertToConfirmDelete('¿Desea eliminar este producto?')) {
      removeProductFromCart(productId);
      AlertSuccess('Producto eliminado con éxito');
    } 
  }

  btnEdit.addEventListener('click', () => editQuantityInCartHtml(cartItemHTML, productId, quantity));
  btnDelete.addEventListener('click', () => deleteItem(productId));
}



const addFunctionalityBtnCleanCart = () => {
  const btnCleanCart = document.querySelector('.cart__delete-all-items-btn');
  const cleanCart = async() => {
    const message = `¿Desea eliminar todos los productos del carrito de compras?`;
    if (await AlertToConfirmDelete(message)) {
      removeAllProductsFromCart();
    }
  }

  btnCleanCart.addEventListener('click', () => cleanCart());
}


/**
 * This function renders a list of items in a shopping cart and adds functionality to each item.
 * @param productsList - an array of objects containing information about the products to be displayed
 * in the shopping cart.
 * @param cartListHtml - An HTML element that represents the shopping cart list where the cart items
 * will be appended.
 */
const ListItemCart = (productsList, cartListHtml) => {
  try {
    productsList.forEach(({ name, price, imageUrl, images, discount, quantity, id }) => {
      const cartItemHTML = CartItemHTML(name, price, imageUrl, images, discount, quantity, id);
      cartListHtml.appendChild(cartItemHTML);

      addFunctionalityBtnsEditDelete(cartItemHTML, quantity);
    });
  } catch (error) {
    throw `Error en renderShoppingCart: ${error}`;
  }
}


/**
 * This function updates the icon for the number of items in the basket displayed on the web page.
 * @param productsList - an array of products that represents the items in the shopping cart. T
 */
const cartQuantity = (productsList) => {
  const cartContainerHTML = document.querySelector('#cart-count');
  cartContainerHTML.innerHTML = `${productsList.length}`;
}


/**
 * This function updates the HTML of a shopping cart's total price based on the products in the cart.
 * @param productsList - an array of objects the products in the cart.
 */
const totalPriceHtml = (productsList) => {
  const cartTotalHTML = document.querySelector('#cart_price_total');
  const total = totalPrice(productsList);
  cartTotalHTML.innerHTML = `Total:${formatPrice(total)}`;
}


/**
 * The function creates an HTML element for an empty shopping cart.
 * @returns returns an HTML element (`li`) that represents an empty cart item.
 */
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


/**
 * This function adds an event listener to the shopping cart button that changes the visibility of products 
 * in a shopping cart container.
 */
const eventListenerBtnCart = () => {
  const cartContainerHTML = document.querySelector('#cart_container');

  /**
   * The function sets a timeout to activate the 'cart-open' and 'cart-open-animation' classes in an HTML element, 
   * to show and hide the shopping cart with an animation.
   * @param timeInMilliseconds - The time in milliseconds that the function will wait before toggling
   * the 'cart-open' and 'cart-open-animation' classes on the cartContainerHTML element.
   */
  const setTimeCartOpen = (timeInMilliseconds) => {
    setTimeout(() => {
      cartContainerHTML.classList.toggle('cart-open');
      cartContainerHTML.classList.toggle('cart-open-animation');
    }, timeInMilliseconds);
  }

  btnCartHtml.addEventListener("click", () => {
    cartContainerHTML.classList.toggle('cart-close-animation'); 
    (cartContainerHTML.classList.contains('cart-open'))
      ? setTimeCartOpen(500)
      : setTimeCartOpen(0)
  });
}


/**
 * The function creates and appends a cart container with a title, list, total price, and a button to
 * pay.
 */
const CartHtml = () => {
  const mainHtml = document.querySelector("main");

  const cartContainerHTML = document.createElement("div");
  const contenido = `
      <h2 class="cart-title">Carrito de compras.</h2>
      <div class="cart__delete-all-items">
          <button class="btn cart__delete-all-items-btn " title="Borrar items del carrito de compras.">
          <i class="fa-solid fa-trash"></i>
              Limpiar carrito de compras.
          </button>
      </div>
      <ul class="cart__list" id="cart_list">
    
      </ul>
      <div class="cart__list-total" id="cart_price_total">
        Total: 0.00
      </div>
      <button class="btn btn-primary-color cart__list-comprar ">
        <i class="fa-solid fa-dollar-sign"></i>
        Pagar
      </button>
    `;
  cartContainerHTML.classList.add('cart');
  cartContainerHTML.classList.add('cart-close-animation');
  cartContainerHTML.setAttribute('id', 'cart_container');
  cartContainerHTML.innerHTML = contenido;

  mainHtml.appendChild(cartContainerHTML);

  addFunctionalityBtnCleanCart();
}


/**
 * This function renders a list of items in the shopping cart, 
 * including the quantity and total price.
 */
export const renderListItemCart = async () => {
  try {
    const cartListHtml = document.querySelector('#cart_list');
    const productsList = await getProductsCart();
    cartListHtml.innerHTML = '';

    if (!Array.isArray(productsList)) {
      throw new Error(`Error al consultar los datos, se esperaba una lista de productos.`);
    }

    productsList.length === 0
      ? cartListHtml.appendChild(EmptyCartHtml())
      : ListItemCart(productsList, cartListHtml)


    cartQuantity(productsList);
    totalPriceHtml(productsList);

  } catch (error) {
    throw new Error(`Error en renderListItemCart: ${error.message}`);
  }
}


/**
 * This function renders a shopping cart with event listeners and list items.
 */
export const renderShoppingCart = () => {
  CartHtml();
  eventListenerBtnCart();
  renderListItemCart();
}