/* Constant containing the API URL. */
// url server API - 'https://github.com/YeiiMaccDev/API_Eccomerce_Node.git'
const urlAPI = `https://api-eccomerce-node.vercel.app/api`;

/**
 * It returns a promise that resolves to the data returned from the API call after 5 seconds.
 * @returns A promise that will resolve to the data returned from the fetch call.
 */
export const getAllProducts = () => {
    return new Promise((resolve, reject) => {
        fetch(`${urlAPI}/products`)
            .then(response => response.json())
            .then(data => {
                data.length === 0
                    ? reject(new Error('No existen datos.'))
                    : resolve(data)
            })
            .catch(error => reject(error));
    });
};


export const findProductById = (id) => {
    return new Promise((resolve, reject) => {
        fetch(`${urlAPI}/products/${id}`)
            .then(response => response.json())
            .then(data => {
                data.length === 0
                    ? reject(new Error('No existe dato.'))
                    : resolve(data)
            })
            .catch(error => reject(error));
    });
};


export const findProductsByQuery = (query = '') => {
    let urlSearch = (query !== '') ? `${urlAPI}/search/products/${query}` : `${urlAPI}/products`
    return new Promise((resolve, reject) => {
        fetch(`${urlSearch}`)
            .then(response => response.json())
            .then(data => {
                data.length === 0
                    ? reject(new Error('No existen datos.'))
                    : resolve(data)
            })
            .catch(error => reject(error));
    });
};

export const findProductByCategory = (category = '') => {
    let urlCategory = (category !== '') ? `${urlAPI}/search/productsByCategory/${category}` : `${urlAPI}/products`
    return new Promise((resolve, reject) => {
        fetch(`${urlCategory}`)
            .then(response => response.json())
            .then(data => {
                data.length === 0
                    ? reject(new Error('No existe dato.'))
                    : resolve(data)
            })
            .catch(error => reject(error));
    });
};