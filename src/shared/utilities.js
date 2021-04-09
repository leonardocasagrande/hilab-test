export const formatDate = (date) => {
    return `${addLeftZero(date.getDate())}/${addLeftZero(date.getMonth() + 1)}/${date.getFullYear()}`;
}

export const formatDateToSave = (date) => {
    return `${date.getFullYear()}/${addLeftZero(date.getMonth() + 1)}/${addLeftZero(date.getDate())}`
}

export const addLeftZero = (number) => {
    if(number <= 9) {
        return `0${number.toString()}`;
    }
    return number.toString();
}