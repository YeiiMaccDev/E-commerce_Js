import { getProductByCartegory, getProductList } from "../controllers/products";
import { ListProducts } from "./ListProducts";


const SearchProducts = async (query) => {
    const productsList = getProductList();

    const nombresFiltrados = productsList.filter(({ name }) => name.toLowerCase().includes(query.toLowerCase()));
    console.log(nombresFiltrados);
}

const rendersearchProductsMenu = async (categoryProducts) => {
    const productsDiv = document.querySelector("[data-products]")
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
}