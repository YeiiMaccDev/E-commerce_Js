import '../../css/components/Alert.css';


const icons = {
  success: 'check',
  warning: 'exclamation',
  error: 'xmark'
}

const eventListenerBtnAlert = (alertContainerHTML, typeError, timeInSeconds) => {
  const btnClose = alertContainerHTML.querySelector('.close-btn-top');
  const btnAccept = alertContainerHTML.querySelector('.alert-ok-btn');
  const alertContent = alertContainerHTML.querySelector('.alert-content');

  const closeAlert = (response = false) => {
    alertContent.classList.add('alert-content-close');
    setTimeout(() => alertContainerHTML.remove(), 500);
    return response;
  }

  return new Promise((resolve, reject) => {
    if (typeError === 'warning') {
      const btnCancel = alertContainerHTML.querySelector('.alert-cancel-btn');
      btnCancel.addEventListener('click', () => resolve(closeAlert(false)));
    }

    btnClose.addEventListener('click', () => resolve(closeAlert(false)));
    btnAccept.addEventListener('click', () => resolve(closeAlert(true)));

    setTimeout(() => resolve(closeAlert(false)), (timeInSeconds * 1000));
  })
}

const alertBtnsHtml = (typeError = 'success') => {
  return (typeError === "success" || typeError === "error")
    ? `<button class="btn alert-ok-btn">Aceptar</button>`
    : `<button class="btn alert-ok-btn">Aceptar</button> <button class="btn alert-cancel-btn">Cancelar</button>`
}

export const CreateAlert = async (typeError, title = 'Alerta', message, timeInSeconds = 5) => {
  const mainHtml = document.querySelector("main");

  const alertContainerHTML = document.createElement("div");
  const contenido = `
            <div class="alert-content alert-content-open">
            <button class="close-btn-top">X</button>
            <div class="alert-header">
              <i class="fa-solid fa-${icons[typeError] ?? icons.warning} icon-fa-${icons[typeError] ?? icons.warning} icon-alert"></i>
              <h3 class="alert-title">${title}</h3>
            </div>
            <div class="alert-body">
              <p>${message}</p>
            </div>
            <div class="alert-footer">
              ${alertBtnsHtml(typeError)}
            </div>
          </div>
          `;

  alertContainerHTML.classList.add('alert-container');
  alertContainerHTML.setAttribute('id', 'alert_container');
  alertContainerHTML.innerHTML = contenido;
  mainHtml.appendChild(alertContainerHTML);

  return await eventListenerBtnAlert(alertContainerHTML, typeError, timeInSeconds);
}

export const AlertToConfirmDelete = async () => {
  return await CreateAlert(
    'warning',
    'Alerta!',
    `¿Desea eliminar este producto?`,
    10
  );
}

export const AlertToConfirmUpdate = async (quantity) =>
  await CreateAlert(
    'warning',
    'Alerta!',
    `¿Desea actualizar el producto a ${quantity} unidad(es)?`,
    10
  );

export const AlertForExceededQuantity = (quantityLimit = 10) =>
  CreateAlert(
    'warning',
    'Cantidad excedida',
    `La cantidad máxima de un producto por pedido es de ${quantityLimit} unidades.`,
    10
  );

export const AlertForMinimumQuantity = (quantityMin = 1) =>
  CreateAlert(
    'warning',
    'Cantidad mínima',
    `La cantidad mínima de un producto es de ${quantityMin} unidad(es).`,
    10
  );


export const AlertSuccess = (message) =>
  CreateAlert(
    'success',
    'Operacion Exitosa.',
    `${message}.`,
    3
  );


