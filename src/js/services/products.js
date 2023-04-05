/* Constant containing the API URL. */
const urlAPI = `http://localhost:3000/products`;

/**
 * It returns a promise that resolves to the data returned from the API call after 5 seconds.
 * @returns A promise that will resolve to the data returned from the fetch call.
 */
export const getAllProducts = () => {
    return new Promise((resolve, reject) => {
        /* The fetch call will be executed after 5 seconds simulating the server response time. */
        setTimeout(() => {
            fetch(urlAPI)
                .then(response => response.json())
                .then(data => {
                    data.length === 0 
                        ? reject(new Error('No existen datos.'))
                        : resolve(data)
                })
                .catch(error => reject(error));
        }, 1000);
    });
};
