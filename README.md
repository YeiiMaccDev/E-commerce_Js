# Ecommerce_js 

## 🚀 Para ver el proyecto:
https://yeiimaccdev.github.io/E-commerce_Js/
## Instalar dependencias.
Para usar este repositorio, deberán ejecutar el comando de 
```npm install```


## Iniciar proyecto.
Para iniciar el proyecto en el navegador.
```npm start```


## Levantar server con data(API O FAKE API).
- src/services/products:
```
    // url local 'db.json' with 'npm run server'
    const urlAPIlocal = `http://localhost:3000/products`;

    // url server online 'db.json' with 'My JSON SERVER' - 'https://my-json-server.typicode.com'
    const urlAPI = `https://my-json-server.typicode.com/YeiiMaccDev/ecommerce_data/products`;
```

Para consultar los datos(API) reemplazar **urlAPI** o **urlAPIlocal**:

- Opción 1: Utilizar **'db.json'** en **local** simulando los datos recibidos.
(NO poder mostrar el proyecto completo online).
Ejecutar el comando para levantar server: 
```npm run server```

- Opción 2: Utilizar fake online server  **'db.json'** con **'My JSON SERVER'**.
(Igual a la Opción 1, pero esto permite ver el proyecto sin levantar ningun server. 
    Poder mostrar el proyecto online ).
Modificar constante **urlAPI** por su propia url.
```
    // url server online 'db.json' with 'My JSON SERVER' - 'https://my-json-server.typicode.com'
    const urlAPI = `https://my-json-server.typicode.com/YeiiMaccDev/ecommerce_data/products`;
```

- Opción : Utilizar **API real**.
Modificar constante **urlAPI** por la url de su servidor API(local o online).
```
    // url of your API Server'
    const urlAPI = `https://my-json-server.typicode.com/YeiiMaccDev/ecommerce_data/products`;
```



## Construir el proyecto final (Producción).
Para  iniciar la construcción del proyecto a produccion.
```npm run build```
