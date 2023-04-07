
const addToCart = (btnAddToCart) => {
    const { productId } = btnAddToCart.dataset;
    console.log( {productId} );
};


export const addEventListenerAddToCart = (productoHTML) => {
    const btnAddToCart = productoHTML.querySelector('.add-to-cart-button');
    btnAddToCart.addEventListener('click', () =>addToCart(btnAddToCart));
}