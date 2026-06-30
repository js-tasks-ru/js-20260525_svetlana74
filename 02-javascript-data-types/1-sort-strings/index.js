/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
    const direction = {
      asc: 1, // обычная
      desc: -1, //обратная
    };
  
    if (!Object.prototype.hasOwnProperty.call(direction, param)) {
      throw new Error('Invalid sort direction');
    }

    return [...arr].sort((a, b) => {


        

      return a.localeCompare(b, ['ru', 'en'], {
        caseFirst: 'upper',
      }) * direction[param];
    });
  }