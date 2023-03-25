import { getCurrentMonth } from "./utils/getCurrentMonth";


const currentMonthNameHtml = document.getElementById('current-month');
currentMonthNameHtml.textContent = getCurrentMonth();