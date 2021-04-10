export const categoryOptions = [
    { value: 1, label: 'category.1' },
    { value: 2, label: 'category.2' },
    { value: 3, label: 'category.3' },
    { value: 4, label: 'category.4' },
    { value: 5, label: 'category.5' },
]

export const getCategoryById = (id) => {
    const list = categoryOptions.filter(el => el.value === id);
    if(list) {
        return list[0].label;
    }
    return null;
}