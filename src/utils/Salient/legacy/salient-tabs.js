
var resizeTimer;
window.addEventListener('resize', function(e) {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        tabControl();
    }, 250);
});


const tabControl = () => {
    var tabs = document.querySelectorAll('.tabbed-content .tabs');

    tabs.forEach(function(tab) {
        if (tab.offsetParent !== null) { // Check if tabs are visible
            var links = tab.querySelectorAll('a');
            
            links.forEach(function(link) {
                link.addEventListener('click', function(event) {
                    event.preventDefault();
                    
                    const target = document.querySelector(link.getAttribute('href'));
                    const buttons = tab.querySelectorAll('a');
                    const items = tab.closest('.tabbed-content').querySelectorAll('.item');
                    
                    // Remove active class from buttons and items
                    buttons.forEach(function(button) {
                        button.classList.remove('active');
                    });
                    items.forEach(function(item) {
                        item.classList.remove('active');
                    });
                    
                    // Add active class to clicked link and target tab
                    link.classList.add('active');
                    target.classList.add('active');
                });
            });
        } else {
            const items = document.querySelectorAll('.tabbed-content .item');

            items.forEach(function(item) {
                item.addEventListener('click', function() {
                    var container = item.closest('.tabbed-content'),
                        currId = item.id,
                        itemElements = container.querySelectorAll('.item');

                    container.querySelectorAll('.tabs a').forEach(function(tabLink) {
                        tabLink.classList.remove('active');
                    });
                    itemElements.forEach(function(itemElement) {
                        itemElement.classList.remove('active');
                    });

                    // Set the clicked item and corresponding tab link to active
                    item.classList.add('active');
                    container.querySelector('.tabs a[href="#' + currId + '"]').classList.add('active');
                });
            });
        }
    });
}

export default tabControl;

//document.addEventListener('DOMContentLoaded', tabControl);