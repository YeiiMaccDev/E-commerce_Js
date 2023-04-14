import { getProductByCartegory, getProductList } from "../controllers/products";
import { ListProducts } from "./ListProducts";

const productsDiv = document.querySelector("[data-products]")
const productsSectionDiv = document.querySelector("#productos")
let cont = 0;

const isMatch = (data, query) => {
    console.log(`${cont}:`, data, data.toLowerCase().includes(query.toLowerCase()))
    cont++
    return data.toLowerCase().includes(query.toLowerCase())
}

const renderSearchProductsForm = async (query = 'i5') => {
    productsSectionDiv.scrollIntoView();

    const productsList = await getProductList();

    const filteredProductsList = productsList.filter(({ name, description, category }) => {
        return (isMatch(name, query) || isMatch(description, query) || isMatch(category, query))
    });

    console.log('Lista final:', filteredProductsList);
    ListProducts(filteredProductsList, productsDiv);
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
        }, 5000);
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