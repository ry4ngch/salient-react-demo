/**
 * Helper function assumed to extract the value from a table cell.
 * 
 * @param {HTMLElement} tr - The table row element (a or b).
 * @param {number} idx - The index of the cell within the row to extract the value from.
 * @returns {string|number} - The text content (or value) of the cell.
 */
const getCellValue = (tr, idx) => tr.children[idx].innerText || tr.children[idx].textContent;

/**
 /**
 * Generic comparer function optimized for larger datasets of any array type.
 * 
 * @param {Array} items - The array of items to be sorted.
 * @param {Function} getter - Function to retrieve the value for comparison from an item.
 * @param {boolean} ascending - True for ascending order, false for descending.
 */
 function comparer(items, getter = x => x, ascending = true) {
    // check if the array contains object
    const isObjectList = typeof items[0] === 'object' && items[0] !== null;
    
    // Create a shallow copy to avoid mutating original
    const copy = items.slice();

    // if the array contains object, we will cache the values
    if (isObjectList) {
        copy.forEach(item => {
            item._sortValue = getter(item);
        });
    }

    copy.sort((a, b) => {
        const v1 = isObjectList ? a._sortValue : getter(a);
        const v2 = isObjectList ? b._sortValue : getter(b);

        if (v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2)) {
            return ascending ? v1 - v2 : v2 - v1;
        } else {
            return ascending 
                ? v1.toString().localeCompare(v2.toString()) 
                : v2.toString().localeCompare(v1.toString());
        }
    });

    if (isObjectList) {
        copy.forEach(item => {
            delete item._sortValue;
        });
    }

    return copy; // return the new sorted list
}

// Container Function to Sort and Rebuild Table Automatically
function tableSorter(tableBody, columnIndex, ascending = true) {
    const rows = Array.from(tableBody.querySelectorAll('tr'));
    
    const sortedRows = comparer(
        rows, 
        row => {
            const val = getCellValue(row, columnIndex);
            return isNaN(val) ? val : Number(val);
        }, 
        ascending
    );
    
    sortedRows.forEach(row => tableBody.appendChild(row));
}

export {tableSorter, comparer};

/** Examples Usage **/
/** For Tables
 * Example: sort by column index 1, ascending
 * Here, row => getCellValue(row, 1) extracts the value from the 2nd column.
 * true means ascending order.
 * Now you have your rows sorted by column 1, ready to re-append them to the table.
 *
 * Code:
 * const rows = Array.from(document.querySelectorAll('tbody > tr'));
 * const sortedRows = comparer(
 *  rows, // pass the array
 *  row => { 
 *      const val = row.children[1].innerText.trim(); 
 *      return isNaN(val) ? val : Number(val);
 *  }, // getter function for column index 1
 *  true // ascending
 * );
 *
 * after this, 'rows' is sorted in memory. Now re-append if you want to update DOM.
 * sortedRows.forEach(row => tableBody.appendChild(row));
*/

/** For List
 * const fruits = [
 *   { name: 'Banana', price: 1.5 },
 *   { name: 'Apple', price: 1.2 },
 *   { name: 'Orange', price: 1.8 }
 * ];
 *
 * const sortedFruits = comparer(
 *    fruits, 
 *    fruit => fruit.price, 
 *    false // descending
 * );
 *
 * console.log(sortedFruits);
*/

/* 
const techs = ['PHP', 'Javascript', 'Angular'];
const sortedTechs = comparer(techs, items => items, true);
console.log(sortedTechs); // ['Angular', 'Javascript', 'PHP']
console.log(techs); // Original array NOT changed: ['PHP', 'Javascript', 'Angular']
*/
