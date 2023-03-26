/**
 * It returns the current month in Spanish
 */
export const getCurrentMonth = () => (new Date()).toLocaleString('es-ES', { month: 'long' });