/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(str, limit) {
    if (limit === undefined) {
        return str;
    }
    let result = '';
    let previousSymbol = '';
    let count = 0;
  
    for (const symbol of str) {
        if (symbol === previousSymbol) {
            count++;
        } else {
            previousSymbol = symbol;
            count = 1;
        }
  
      if (count <= limit) {
        result += symbol;
      }
    }
  
    return result;
  }