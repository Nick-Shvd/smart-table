import {compare, createComparison, defaultRules} from "../lib/compare.js";

export function initFiltering(elements, indexes) {
  return (data, state, action) => {
    // @todo: #4.1 — заполнить выпадающие списки
    Object.keys(indexes).forEach(elementName => {
      const select = elements[elementName];
      
      // Опция "Все"
      const allOption = document.createElement('option');
      allOption.value = '';
      allOption.textContent = 'Все';
      select.appendChild(allOption);
      
      // Опции из индекса
      indexes[elementName].forEach(name => {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        select.appendChild(option);
      });
    });

    // @todo: #4.2 — обработать кнопку очистки
    if (action && action.name === 'clear') {
      const input = action.closest('[data-field]')?.querySelector('input');
      if (input) {
        input.value = '';
        const field = action.dataset.field;
        if (field && state[field] !== undefined) {
          state[field] = '';
        }
      }
    }

    // @todo: #4.3 — настроить функцию сравнения
    const compareFn = createComparison(defaultRules);

    // @todo: #4.5 — применить фильтрацию
    return data.filter(row => compareFn(row, state));
  }
}