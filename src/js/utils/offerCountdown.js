/**
 * Countdown to expiration of the offer
 * @param countdownOfferHTML - The HTML element where the countdown will be displayed.
 * @param deadlineDate - es la fecha límite en la que expira la oferta.
 */
export const offerCountdown = (countdownOfferHTML, deadlineDate) => {
    const offerCountdownInterval = setInterval(() => {
        const currentTime = new Date();
        let restingTime = deadlineDate - currentTime;

        // if (restingTime < 0) {
        //     deadlineDate.setDate(deadlineDate.getDate() + 1);
        //     restingTime = deadlineDate - currentTime;
        // }

        if (restingTime < 0) {
            countdownOfferHTML.innerHTML = `Tiempo agotado 00h:00m:00s`;
            clearInterval(offerCountdownInterval);
        } else {
            const hours = restingTime / (1000 * 60 * 60);
            const minutes = (hours % 1) * 60;
            const seconds = (minutes % 1) * 60;

            countdownOfferHTML.innerHTML = `Tiempo restante: ${Math.floor(hours)}h ${Math.floor(minutes)}m ${Math.floor(seconds)}s`;
        }
    }, 1000)
};