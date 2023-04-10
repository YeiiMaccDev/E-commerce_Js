/* Constant containing the API URL. */
// url local 'db.json' with 'npm run server'
const urlAPIlocal = `http://localhost:3000/products`;

// url server online 'db.json' with 'My JSON SERVER' - 'https://my-json-server.typicode.com'
const urlAPI = `https://my-json-server.typicode.com/YeiiMaccDev/ecommerce_data/products`;

/**
 * It returns a promise that resolves to the data returned from the API call after 5 seconds.
 * @returns A promise that will resolve to the data returned from the fetch call.
 */
export const getAllProducts = () => {
    return new Promise((resolve, reject) => {
        fetch(urlAPI)
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
        fetch(`${urlAPI}/${id}`)
            .then(response => response.json())
            .then(data => {
                data.length === 0
                    ? reject(new Error('No existe dato.'))
                    : resolve(data)
            })
            .catch(error => reject(error));
    });
};
