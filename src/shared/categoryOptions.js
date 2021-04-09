export const categoryOptions = [
    { value: 1, label: 'Categoria 1' },
    { value: 2, label: 'Categoria 2' },
    { value: 3, label: 'Categoria 3' },
    { value: 4, label: 'Categoria 4' },
    { value: 5, label: 'Categoria 5' },
]

export const getCategoryById = (id) => {
    const list = categoryOptions.filter(el => el.value === id);
    if(list) {
        return list[0].label;
    }
    return null;
}