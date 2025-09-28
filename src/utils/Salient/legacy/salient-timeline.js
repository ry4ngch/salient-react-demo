const renderTimeline = () => {
    const timeline = document.querySelector('.timeline');
    const items = [...timeline.querySelectorAll('ul li')];
    const totalItems = items.length;  // Total number of list items
    const isHorz = timeline.classList.contains('timeline-horz');  // Check if timeline is horizontal
    const isSmallScreen = () => window.innerWidth < 768;
    const toggleBackBtn = document.querySelector('.toggle-back');
    const toggleForwardBtn = document.querySelector('.toggle-forward');


    // retrieve activeEvent from data-active-event attribute and if its value is not undefined then apply the active-event class to the list item where the index matches dataActiveIndex
    const dataActiveIndex = parseInt(timeline.dataset.activeId, 10) || undefined;
    if(dataActiveIndex) {
        if(!items[dataActiveIndex].classList.contains('active-event')){
            items[dataActiveIndex].classList.add('active-event')
        }
    }

    // Retrieve showCount from data-show-count attribute
    let showCount = parseInt(timeline.dataset.showCount, 10) || 3;  // Default to 3 if undefined
    let startIndex = 0;

    // Function to calculate the total height or width of the currently visible items
    const calculateItemSize = () => {
        let totalSize = 0;
        // Calculate the total width/height of the first 'showCount' items
        for (let i = startIndex; i < startIndex + showCount; i++) {
            if (!isHorz) {
                totalSize += items[i]?.offsetHeight || 0;  // Add height if vertical
            }
        }
        return totalSize;
    };

    // Update the size (height) of the ul element to match the visible items
    const updateUlSize = () => {
        if (!isHorz) {  // Only adjust height for vertical layout
            const ulSize = calculateItemSize();  // Get the total size of visible items (height)
            timeline.querySelector('ul').style.height = `${ulSize}px`;  // Update height for vertical
        }
    };

    // Update item visibility based on scroll or navigation
    const updateVisibleItems = () => {

        // set all items to be display none first for animation to take effect
        items.forEach(item => {
            item.style.display = 'none';
            item.style.opacity = 0;
            item.style.transform = isHorz && !isSmallScreen() ? 'translateX(200%)' : 'translateY(200%)';
        });

        // now set the items to be visible or invisible after timeout
        requestAnimationFrame(() => {
            items.forEach((item, index) => {
                if (index >= startIndex && index < startIndex + showCount) {
    
                    item.style.display = 'block';  // Make sure visible items are displayed
                    
                    // Force reflow to ensure browser registers display changes
                    //void item.offsetWidth; // Access a layout property to trigger reflow

                    requestAnimationFrame(() => {
                        item.style.transform = isHorz && !isSmallScreen() ? `translateX(0)` : `translateY(0)`; // Reset position for visible items
                        item.style.opacity = 1;
                    });  
                } else {
                    item.style.transform = isHorz && !isSmallScreen() ? `translateX(200%)` : `translateY(200%)`; // Shift invisible items
                    item.style.display = 'none';  // Hide invisible items
                    item.style.opacity = 0;
                }
            });
        });
        
    };

    const setToggleBtnState = () => {
        // Disable back button if at the start of the list
        if (startIndex === 0) {
            toggleBackBtn.setAttribute('disabled', true);
            toggleBackBtn.style.cursor = "not-allowed";
        } else {
            toggleBackBtn.removeAttribute('disabled');
            toggleBackBtn.style.removeProperty('cursor');
        }
    
        // Disable forward button if at the end of the list
        if (startIndex + showCount >= totalItems) {
            toggleForwardBtn.setAttribute('disabled', true);
            toggleForwardBtn.style.cursor = "not-allowed";
        } else {
            toggleForwardBtn.removeAttribute('disabled');
            toggleForwardBtn.style.removeProperty('cursor');
        }

        timeline.querySelector('ul').classList.add('rendering');

        requestAnimationFrame(() => {
            if(dataActiveIndex){
                const firstVisibleIndex = Array.from(items).findIndex(item => window.getComputedStyle(item).display !== 'none');
                if(firstVisibleIndex > dataActiveIndex){
                    setEventActiveState(false)
                } else {
                    setEventActiveState(true)
                }
            }
        })
        
        
    };

    const updateToggleBackwardRender = () => {
        if (startIndex - showCount < 0) {
            // Prevent moving before the start
            startIndex = 0;
        } else {
            // Move back by one batch
            startIndex -= showCount;
        }

        // Update everything
        setToggleBtnState();
        updateVisibleItems();
        updateUlSize(); // Adjust height for the new visible items
    }

    // Handle back button click
    if(toggleBackBtn){
        // reset event listener on toggleButton before adding again
        toggleBackBtn.removeEventListener('click', updateToggleBackwardRender);
        toggleBackBtn.addEventListener('click', updateToggleBackwardRender);
    }

    const updateToggleForwardRender = () => {
        const maxStartIndex = totalItems - showCount; // The last valid start index
        
            if (startIndex + showCount > maxStartIndex) {
                // Prevent moving beyond the end
                startIndex = maxStartIndex;
            } else {
                // Move forward by one batch
                startIndex += showCount;
            }
        
            // Update everything
            setToggleBtnState();
            updateVisibleItems();
            updateUlSize(); // Adjust height for the new visible items
            
    }

    
    if(toggleForwardBtn){
        // reset event listener on toggleButton before adding again
        toggleForwardBtn.removeEventListener('click', updateToggleForwardRender);
        toggleForwardBtn.addEventListener('click', updateToggleForwardRender);
    }
    

    // Initialize view
    toggleBackBtn && toggleForwardBtn && setToggleBtnState();
    updateUlSize();  // Set ul size based on the visible items
    updateVisibleItems();  // Adjust visibility and positions of items

}

/* Resize for Staggered Horizontal Timeline events layout */
//check if the timeline is horizontal and staggered and resize the Ul **/
const resizeTimelineUl = () => {
    requestAnimationFrame(() => {
        const timeline = document.querySelector('.timeline');
        const items = [...timeline.querySelectorAll('ul li')];
        const timeline__ul = timeline.querySelector('ul');
        if(['timeline-staggered', 'timeline-horz'].every(cls => timeline.classList.contains(cls)) && window.innerWidth >= 768){
        
            const maxHeight = Math.max(...Object.values(getMaxHeight(items)))
            if(maxHeight !== 0){
                timeline__ul.style.setProperty('height', `${maxHeight * 2 + 30}px`);
            };
            
        } else {
            timeline__ul.style.removeProperty('height');
        };
    })
    
}

const initializeSalientTimeline = () => {
    renderTimeline();

    // initialize the height of timeline horz staggered
    window.onload = () => {
        resizeTimelineUl();
    };
    
    // for fixing horizontal staggered timeline layout
    window.addEventListener('resize', resizeTimelineUl);

    // for removing ul::before animation
    const timeline_ul = document.querySelector('.timeline ul');
    
    timeline_ul.addEventListener('animationend', () => {
        timeline_ul.classList.remove('rendering');
    });

    timeline_ul.addEventListener('mouseenter', () => setEventActiveState(false));
    timeline_ul.addEventListener('mouseleave', () => setEventActiveState(true));

}

// function for setting timeline event active state
const setEventActiveState = (state) => {
    const timeline = document.querySelector('.timeline');
    const isTimelineActive = timeline.classList.contains('timeline-active');
    const dataActiveIndex = parseInt(timeline.dataset.activeId, 0) || undefined;
    const items = [...timeline.querySelectorAll('ul li')];
    const firstVisibleIndex = Array.from(items).findIndex(item => window.getComputedStyle(item).display !== 'none');
    if(dataActiveIndex){
        if(!state){
            if(isTimelineActive){
                timeline.classList.remove('timeline-active');
                items[dataActiveIndex].classList.remove('active-event');
            }
        } else {
            if(!isTimelineActive){
                if(dataActiveIndex >= firstVisibleIndex){
                    timeline.classList.add('timeline-active');
                    items[dataActiveIndex].classList.add('active-event');
                }
            }
        }
    }
}

const recomputeTimelineLayout = () => {
    renderTimeline();
    resizeTimelineUl();
}

function getMaxHeight(listItems) {  
    let maxOddHeight = 0; // To store the max child height for odd-indexed <li>
    let maxEvenHeight = 0; // To store the max child height for even-indexed <li>
    
    listItems.forEach((li, index) => {
        // Get all direct child elements of the <li> (excluding pseudo-elements)
        const children = Array.from(li.children);
    
        if(children.length === 0) return;
    
        // Calculate the maximum height of children
        const maxChildHeight = children.reduce((sum, child) => {
            return sum + child.offsetHeight;
        }, 0);
    
        if ((index + 1) % 2 !== 0) {
            // Odd-indexed <li>
            maxOddHeight = Math.max(maxOddHeight, maxChildHeight);
        } else {
            // Even-indexed <li>
            maxEvenHeight = Math.max(maxEvenHeight, maxChildHeight);
        }
        });
    
        return { maxOddHeight, maxEvenHeight }; // Return max heights for odd and even groups
    
    
  }
  

export {initializeSalientTimeline, recomputeTimelineLayout};

//window.addEventListener('DOMContentLoaded', initializeSalientTimeline);