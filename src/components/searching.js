import {createComparison, rules} from "../lib/compare.js";

export function initSearching(searchField) {
  return (data, state, action) => {
    // Получаем текст поиска (в нижнем регистре для регистронезависимости)
    const query = state[searchField]?.toLowerCase() || '';
    
    // Если поиск пустой — возвращаем все данные
    if (!query) {
      return data;
    }
    
    // Создаём функцию сравнения:
    // Ищем текст из поля 'search' в полях date, customer, seller
    const compareFn = createComparison(
      [], // не используем стандартные правила
      [
        // Кастомное правило: поиск по нескольким полям
        rules.searchMultipleFields(searchField, ['date', 'customer', 'seller'], false)
      ]
    );
    
    // Фильтруем данные
    return data.filter(row => compareFn(row, state));
  }
}