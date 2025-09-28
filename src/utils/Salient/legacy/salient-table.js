const initDraggableTable = () => {
    // Get the table and its rows
    const table = document.querySelector('.sl-table');
    const rows = table.rows;

    // Initialize the drag source element to null
    let dragSrcEl = null;

    // Loop through each row (skipping the first row which contains the table headers)
    for (var i = 1; i < rows.length; i++) {
        var row = rows[i];
        // Make each row draggable
        row.draggable = true;

        // Add an event listener for when the drag starts
        row.addEventListener('dragstart', function (e) {
            // Set the drag source element to the current row
            dragSrcEl = this;

            // Set the drag effect to "move"
            e.dataTransfer.effectAllowed = 'move';

            // Set the drag data to the outer HTML of the current row
            e.dataTransfer.setData('text/html', this.outerHTML);
        });

        // Add an event listener for when the drag ends
        row.addEventListener('dragend', function (e) {
            // Remove the border classes from all table rows
            table.querySelectorAll('.row-insert-highlight').forEach(function (el) {
                el.classList.remove('row-insert-highlight');
            });
        });

        // Add an event listener for when the dragged row is over another row
        row.addEventListener('dragover', function (e) {
            // Prevent the default dragover behavior
            e.preventDefault();

            // Add border classes to the current row to indicate it is a drop target
            this.classList.add('row-insert-highlight');
        });

        // Add an event listener for when the dragged row enters another row
        row.addEventListener('dragenter', function (e) {
            // Prevent the default dragenter behavior
            e.preventDefault();

            // Add border classes to the current row to indicate it is a drop target
            this.classList.add('row-insert-highlight');
        });

        // Add an event listener for when the dragged row leaves another row
        row.addEventListener('dragleave', function (e) {
            // Remove the border classes from the current row
            this.classList.remove('row-insert-highlight');
        });

        // Add an event listener for when the dragged row is dropped onto another row
        row.addEventListener('drop', function (e) {
            // Prevent the default drop behavior
            e.preventDefault();

            // If the drag source element is not the current row
            if (dragSrcEl != this) {
                // Get the index of the drag source element
                var sourceIndex = dragSrcEl.rowIndex;

                // Get the index of the target row
                var targetIndex = this.rowIndex;

                // If the source index is less than the target index
                if (sourceIndex < targetIndex) {
                    // Insert the drag source element after the target row
                    table.tBodies[0].insertBefore(dragSrcEl, this.nextSibling);
                } else {
                    // Insert the drag source element before the target row
                    table.tBodies[0].insertBefore(dragSrcEl, this);
                }
            }

            // Remove the border classes from all table rows
            table.querySelectorAll('.row-insert-highlight').forEach(function (el) {
              el.classList.remove('row-insert-highlight');
            });
        });
    }
}

const setPagination = (table, maxRows) => {
    const pagination = document.querySelector('.pagination');
    
    // remove all the pagination first in between the two arrow
    pagination.querySelectorAll('li').forEach((li, index, list) => {
        if (index !== 0 && index !== list.length - 1) {
            li.remove();
        }
    });

    // get the number of rows of the table
    const rows = document.querySelectorAll(`${table} tbody tr`);
    const totalRows = rows.length;

    // for rows index greater than maxRows set the display style to none
    rows.forEach((row, index) => {
        row.style.display = index < maxRows ? '' : 'none';
    });

    // for those rows that exceed maxRows, calculate the page and assign a pagination
    if (totalRows > maxRows) {
        // calculate the total number of page
        const pageNum = Math.ceil(totalRows / maxRows);

        // for each page, create a pagination
        for (let i = 1; i <= pageNum; i++) {
            const li = document.createElement('li');
            li.setAttribute('data-page', i);
            li.innerHTML = `<span>${i}</span>`;
            pagination.insertBefore(li, pagination.querySelector('[data-page="next"]'));
        }
    }

    const allPaginationItems = pagination.querySelectorAll('li');
    
    // only apply the class and limit pagination if the li has more than 2 element
    // the original li has the < and > arrow
    if (allPaginationItems.length > 2) {
        // initialize the first page with active class
        document.querySelector('[data-page="1"]').classList.add('active');

        // initialize pagination click event listener
        addPaginationEventListeners(table, maxRows);

        limitPagging();
    }
    
}
  
const addPaginationEventListeners = (table, maxRows) => {
    const pagination = document.querySelector('.pagination');
    let lastPage = 1;

    const paginationFn = function(e) {
        if (e.target.tagName !== 'SPAN') return;

        let pageNum = e.target.parentElement.getAttribute('data-page');
        const pages = pagination.querySelectorAll('li');

        if (pageNum === 'prev') {
            if (lastPage === 1) return;
            pageNum = --lastPage;
        } else if (pageNum === 'next') {
            if (lastPage === pages.length - 2) return;
            pageNum = ++lastPage;
        } else {
            lastPage = pageNum = parseInt(pageNum);
        }

        pages.forEach(li => li.classList.remove('active'));
        pagination.querySelector(`[data-page="${pageNum}"]`).classList.add('active');

        const rows = document.querySelectorAll(`${table} tbody tr`);
        rows.forEach((row, index) => {
            row.style.display = (index >= maxRows * (pageNum - 1) && index < maxRows * pageNum) ? '' : 'none';
        });

        limitPagging();
    };

    pagination.removeEventListener('click', paginationFn)
    pagination.addEventListener('click', paginationFn)
        
   
}
  
const limitPagging = () => {
    const pages = document.querySelectorAll('.pagination li');
    const activePage = document.querySelector('.pagination li.active');

    // there is more than 7 pages, we will limit pagging
    if (pages.length > 7) {

        // set all pagging li to display none
        pages.forEach(li => li.style.display = 'none');

        // set the first li to be display,this is the left arrow 
        pages[0].style.display = '';

        // set the last li to be display, this is the right arrow
        pages[pages.length - 1].style.display = '';

        let start = Math.max(1, parseInt(activePage.getAttribute('data-page')) - 2);
        let end = Math.min(pages.length - 2, parseInt(activePage.getAttribute('data-page')) + 2);

        for (let i = start; i <= end; i++) {
            document.querySelector(`[data-page="${i}"]`).style.display = '';
        }
    }
}
  
const initPagination = (maxRows=5) => {
    const table = document.querySelector('.sl-table');
    const headerRow = table.querySelector('tr');

    // if(table.getAttribute('data-index') == 'true'){
    //     headerRow.insertAdjacentHTML('afterbegin', '<th>ID</th>');
  
    //     let id = 0;
    //     table.querySelectorAll('tr:has(td)').forEach(row => {
    //         id++;
    //         row.insertAdjacentHTML('afterbegin', `<td>${id}</td>`);
    //     });
    // }
  
    setPagination('.sl-table', maxRows);
};

// const filterTable = (keyword) => {
//     const table = document.querySelector('.sl-table');
//     const tr = table.querySelectorAll('tr:has(td)');
//     let td;
//     if(keyword){
//         for(let i = 0; i < tr.length; i++){
//             td = Array.from(tr[i].getElementsByTagName('td')).find((el) => el.textContent.toLowerCase().indexOf(keyword.toLowerCase()) > -1);
//             if(td){
//                 tr[i].style.display = "";
//             } else {
//                 tr[i].style.display = "none";
//             }
//         }
//     }
    
// }
  

export {initDraggableTable, initPagination};