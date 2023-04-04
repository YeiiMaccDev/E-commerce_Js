import '../../css/components/Footer.css';

import logo from '../../assets/img/logoWhite.png';


export const createFooter = () => {
    const footerDiv = document.querySelector('.footer');
    const contenido = `
        <div class="footer__content">
            <div class="footer__logo">
                <img src="${logo}" alt="Logo YeiiMaccDev" loading="lazy"  width="250" height="250">
            </div>
            <div class="footer__menu">
                <hr class="footer__divider">
                <a class="footer__link" href="#ofertas">
                    <i class="fa-solid fa-percent"></i>
                     Ofertas
                </a>
                <a class="footer__link" href="#productos">
                    <i class="fa-solid fa-laptop"></i>
                     Productos
                </a>
                <a class="footer__link" href="#nosotros">
                    <i class="fa-solid fa-users"></i>
                     Nosotros
                </a>
                <a class="footer__link" href="login.html">
                    <i class="fa-solid fa-right-to-bracket"></i>
                     Login
                </a>
            </div>
            <div class="footer__networks">
                <hr class="footer__divider">
                <a href="#" class="footer__link footer__networks-facebook">
                    <i class="fa-brands fa-facebook"></i>
                    Facebook
                </a>
                <a href="#" class="footer__link footer__networks-whatsapp">
                    <i class="fa-brands fa-whatsapp"></i>
                    Whatsapp
                </a>

                <a href="#" class="footer__link footer__networks-instagram">
                    <i class="fa-brands fa-instagram"></i>
                    Instagram
                </a>

                <a href="#" class="footer__link footer__networks-twitter">
                    <i class="fa-brands fa-twitter"></i>
                    Twitter
                </a>
            </div>
        </div>`;

    footerDiv.innerHTML = contenido;
};