// ----- Favorite icon - btn.

/**
 * When the user clicks on the icon, 
 * toggle the class of the icon between 'fa-regular' and 'fa-solid'.
 * @param icon - the icon element that you want to toggle.
 */
const toggleFavorite = (icon) => {
    icon.classList.toggle('fa-regular');
    icon.classList.toggle('fa-solid');
}


/**
 * When the user clicks on the favorite icon, toggle the favorite icon.
 * @param productoHTML - is the HTML element that contains the product information.
 */
export const addEventListenerFavoriteIcon = (productoHTML) => {
    const btnFavorite = productoHTML.querySelector('.btn-favorite');
    const iconFavorite = productoHTML.querySelector('.icon-favorite');
    btnFavorite.addEventListener('click', () => toggleFavorite(iconFavorite));
}
