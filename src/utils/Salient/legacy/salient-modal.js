const initModal = () => {
    const modalBody = document.querySelector('.modal-body');
    if(modalBody){
        const sections = modalBody.querySelectorAll('section');
        const modalContent = document.querySelector('.modal-content');
        modalContent.focus();
        //initialize the first section with active class
        if(sections && sections.length > 0) {
            sections[0].classList.add('active');
        }
    }
    
}

const toggleSection = (action) => {
    const modalBody = document.querySelector('.modal-body');
    if(modalBody){
        const sections = modalBody.querySelectorAll('section');
        const modalIndicators = document.querySelectorAll('.modal-indicators li');
        if(sections && sections.length > 0) {
            //find the current index of the section with an active class
            const activeSectionIndex = Array.from(sections).findIndex((el) => el.classList.contains('active'));
            let newIndex;
            if(action == 'prev'){
                if(activeSectionIndex > 0){
                    newIndex = activeSectionIndex - 1;
                }
            } else {
                if(activeSectionIndex < sections.length - 1) {
                    // set new index 
                    newIndex = activeSectionIndex + 1;
                }
            }
            if(newIndex !== undefined){
                 // remove active class from current section
                sections[activeSectionIndex].classList.remove('active');

                // assign the next section with active class
                sections[newIndex].classList.add('active')

                // assign the modal indicators
                if(modalIndicators){
                    modalIndicators[activeSectionIndex].classList.remove('active');
                    modalIndicators[newIndex].classList.add('active');
                }
            }
        }
    }
}

const selectSection = (index) => {
    const modalBody = document.querySelector('.modal-body');
    if(modalBody){
        const sections = modalBody.querySelectorAll('section');
        const modalIndicators = document.querySelectorAll('.modal-indicators li');
        const activeSectionIndex = Array.from(sections).findIndex((el) => el.classList.contains('active'));
        if(sections && sections.length > 0) {
             // remove active class from current section
             sections[activeSectionIndex].classList.remove('active');

             // assign the next section with active class
             sections[index].classList.add('active')

            if(modalIndicators){
                modalIndicators[activeSectionIndex].classList.remove('active');
                modalIndicators[index].classList.add('active');
            }
        }
    }
}

export {initModal, toggleSection, selectSection};