/**
 * Formata a data para exibição.
 * @param {Date} date Data a ser formatada para exibição
 * @returns String de data formatada para exibição
 */
export const formatDate = (date) => {
    return `${addLeftZero(date.getDate())}/${addLeftZero(date.getMonth() + 1)}/${date.getFullYear()}`;
}

/**
 * Formata a data para persistência.
 * @param {Date} date Data a ser formatada para persistência 
 * @returns String de data formatada para persistência.
 */
export const formatDateToSave = (date) => {
    return `${date.getFullYear()}/${addLeftZero(date.getMonth() + 1)}/${addLeftZero(date.getDate())}`
}

/**
 * Adiciona o zero à esquerda do dia/mês, caso seja de somente 1 dígito.
 * @param {Integer} number Número do mês/dia
 * @returns String formatado de dia/mês.
 */
export const addLeftZero = (number) => {
    if (number <= 9) {
        return `0${number.toString()}`;
    }
    return number.toString();
}