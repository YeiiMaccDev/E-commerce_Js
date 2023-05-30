import { getProductByCartegory, getProductList, getProductsByQuery } from "../controllers/products";
import { ListProducts } from "./ListProducts";

const productsDiv = document.querySelector("[data-products]")
const productsSectionDiv = document.querySelector("#productos")

const renderSearchProductsForm = async (query = 'i5') => {
    productsSectionDiv.scrollIntoView();

    const productsList = await getProductsByQuery(query);
    ListProducts(productsList, productsDiv);
}

const searchProductsForm = async () => {
    const btnSearch = document.querySelector('#search-btn');
    const inputSearch = document.querySelector('#search-input');
    let timer;

    btnSearch.addEventListener('click', () => {
        clearTimeout(timer);
        renderSearchProductsForm(inputSearch.value)
    });

    inputSearch.addEventListener('keydown', (event) => {
        const query = inputSearch.value;
        if (event.keyCode === 13 && query.length > 0) {
            clearTimeout(timer);
            renderSearchProductsForm(query);
        }
    });

    inputSearch.addEventListener('input', () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            renderSearchProductsForm(inputSearch.value);
        }, 8000);
    });  

}


const rendersearchProductsMenu = async (categoryProducts) => {
    const productsList = await getProductByCartegory(categoryProducts)
    ListProducts(productsList, productsDiv)
}


const searchProductsMenu = () => {
    const menuLinks = document.querySelectorAll('.product-menu-enlace')
    menuLinks.forEach((link) => {
        const categoryProducts = link.dataset.category;
        link.addEventListener('click', () => {
            rendersearchProductsMenu(categoryProducts);
        });
    });
}

export const renderSearchProducts = async () => {
    searchProductsMenu();
    searchProductsForm();
}