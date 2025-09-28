const initTreeview = () => {
    const treeItems= document.querySelectorAll('.list-tree li');
    treeItems.forEach(function(li){
        if(li.querySelector(":scope > ul")){
            var span = li.querySelector(":scope > span:not(.comment)");
            if (span) {
                span.setAttribute("title", "Collapse this branch");
                span.addEventListener('click', function(e){
                    var children = li.querySelector(":scope > ul");
                    if (children) {
                        if (children.classList.contains('hide')) {
                            children.style.display = "block";
                            requestAnimationFrame(() => {
                                children.classList.remove('hide');
                            })
                            span.setAttribute("title", "Collapse this branch");
                        } else {
                            children.classList.add('hide');
                            setTimeout(() => {
                                children.style.display = "none";
                            }, 300);
                            span.setAttribute("title", "Expand this branch");
                        }
                    }
                });
            }
        }
    })
}

export default initTreeview;