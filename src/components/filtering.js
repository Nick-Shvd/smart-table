export function initFiltering(elements) {
   
    const updateIndexes = (indexes) => {
        Object.keys(indexes).forEach(elementName => {
            elements[elementName].innerHTML = '';
            
            // Опция "Все"
            const allOption = document.createElement('option');
            allOption.value = '';
            allOption.textContent = 'Все';
            elements[elementName].appendChild(allOption);
            
            // Опции из индекса
            Object.values(indexes[elementName]).forEach(name => {
                const option = document.createElement('option');
                option.value = name;
                option.textContent = name;
                elements[elementName].appendChild(option);
            });
        });
    };

   
    const applyFiltering = (query, state, action) => {
       
        if (action && action.name === 'clear') {
            const field = action.dataset.field;
            if (field && state[field] !== undefined) {
                state[field] = '';
            }
        }
        
        
        const filter = {};
        Object.keys(elements).forEach(key => {
            const el = elements[key];
            if (['INPUT', 'SELECT'].includes(el.tagName) && el.value) {
                filter[`filter[${el.name}]`] = el.value;
            }
        });
        
        return Object.keys(filter).length 
            ? Object.assign({}, query, filter) 
            : query;
    };

    return {
        updateIndexes,
        applyFiltering
    };
}