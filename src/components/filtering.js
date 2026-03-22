export function initFiltering(elements) {
   
   const updateIndexes = (elements, indexes) => {
        Object.keys(indexes).forEach((elementName) => {
            elements[elementName].append(...Object.values(indexes[elementName]).map(name => {
                const el = document.createElement('option');
                el.textContent = name;
                el.value = name;
                return el;
            }))
        })
    }

   
    const applyFiltering = (query, state, action) => {
       
        if (action && action.name === 'clear') {
            const field = action.dataset.field;
            if (field && state[field] !== undefined) {
                state[field] = '';

                const input = action.parentElement.querySelector('input');
                if (input) {
                    input.value = '';
                }
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