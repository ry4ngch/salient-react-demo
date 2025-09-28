const initAccordian = () => {
    const accordian = document.querySelector('.accordian');
    const accordian_cards = document.querySelectorAll('.accordian-card');
    const activeToggleOption = accordian.dataset.activeToggle || accordian.getAttribute("data-active-toggle") || 'multiple';

    const card_headings = document.querySelectorAll('.accordian-heading');

    const handleAccordianToggle = (event) => {
        const currentParent = event.target.closest('.accordian-card');
        const currentContentEl = currentParent.querySelector('.accordian-body');
        if(currentParent.classList.contains('open')){
            currentParent.classList.remove('open');
        } else {
            currentContentEl.style.display = 'block';
            requestAnimationFrame(() => {
                currentParent.classList.add('open');
            });
        }

        // handle single active toggle option and close others that are open
        if(activeToggleOption === 'single'){
            accordian_cards.forEach((item) => {
                if(!item.contains(event.target)){
                    if(item.classList.contains('open')){
                        item.classList.remove('open');
                    }
                }
            })
        }
    }

    
    card_headings.forEach((cardHeading) => {
        cardHeading.addEventListener('click', handleAccordianToggle);
        
        // handle for removal of display property when accordian is closing
        let cardBody;
        let currentParent;
        currentParent = cardHeading.closest('.accordian-card');
        cardBody = currentParent.querySelector('.accordian-body');
        cardBody.addEventListener('transitionend', () => {
            if(!currentParent.classList.contains('open')){
                cardBody.style.removeProperty('display');
            }
        })
    });
    
};

function isSafari() {
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}

export default initAccordian;

//document.addEventListener('DOMContentLoaded', initAccordian);

