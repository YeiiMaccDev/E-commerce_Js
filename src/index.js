// fontawesome
import './assets/fontawesome/css/all.min.css';

import './styles.css';
import './css/Menu.css';
import './css/components/ShoppingCart.css';
import './css/index.css';
import './css/Products.css';

import './js/utils/menuResponsive.js';
import './js/home.js';

import { createFooter } from './js/components/Footer';
import { renderShoppingCart } from './js/components/ShoppingCart';


renderShoppingCart();
createFooter();