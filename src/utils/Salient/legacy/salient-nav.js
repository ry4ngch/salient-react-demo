const initNav = () => {
  const hbmenu = document.querySelector('.hamburger');
  const toggleNav = document.querySelector('.navlinks');
  const navbar = document.querySelector('.navbar');
  const overlay = document.querySelector('#overlay');
  const toggleSearch = document.querySelector('[data-toggle="hide"]');
  const searchBar = document.querySelector('.search-box');
  const dropdowns = document.querySelectorAll('[data-dropdown]');

  const isSmallScreen = () => window.innerWidth < 768;
  const isMobile = () => Math.min(window.screen.width, window.screen.height) < 768 || navigator.userAgent.indexOf("Mobi") > -1;
  const isHidden = () => searchBar.classList.contains('hide');

  // Toggle Classes Helper
  const toggleClass = (element, className) => element.classList.toggle(className);

  // Function to check screen size and set display property for toggleNav
  const updateNavDisplay = () => {
    if (isMobile() && isSmallScreen()) {
      if (!toggleNav.classList.contains('nav-collapse')) {
        toggleNav.style.removeProperty('display') // Ensure nav is visible when not collapsed
      } else {
        toggleNav.style.display = "none"; // Hide nav if collapsed
      }
    } 
  };

  // initialize upon page load
  updateNavDisplay();

  // Hamburger menu click handler
  const handleHamburgerClick = () => {
    toggleClass(hbmenu, 'active');
    toggleClass(overlay, 'overlay');
    if (navbar.getAttribute('data-effect') === 'shift') {
      toggleClass(navbar, 'sd-shift-navbar');
    }

    if(!toggleNav.classList.contains('nav-collapse')){
      toggleNav.style.display = "none";
      toggleNav.classList.add('nav-collapse');
    } else {
      toggleNav.style.removeProperty('display');
      setTimeout(() => toggleNav.classList.remove('nav-collapse'), 0);
    }
    
  };

  // Search bar toggle handler
  //https://dev.to/tylerlwsmith/leveraging-javascript-to-implement-css-transitions-that-use-display-none-4hhb
  const handleSearchToggle = () => {
    toggleClass(toggleSearch, 'search');
    toggleClass(toggleSearch, 'arrow-left');
    
    if (isHidden()) {
      searchBar.style.removeProperty('display');
      setTimeout(() => searchBar.classList.remove('hide'), 0);
    } else {
      searchBar.classList.add('hide');
    }
  };

  const handleSearchTransitionEnd = () => {
    if (isHidden()) {
      searchBar.style.display = "none";
    }
  };

  // Handle dropdown click
  const handleDropdownClick = (event) => {
    const dropdownMenu = event.currentTarget.querySelector('.dropdown-menu');
    dropdownMenu.classList.toggle('active-dropdown')
  };

  // Handle document click to detect if user clicked outside dropdown
  const handleClickOutsideDropdown = (event) => {
    // only trigger when is large screen and not mobile
    if(!(isMobile() && isSmallScreen())){
      dropdowns.forEach(dropdown => {
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        // If the click target is not inside the dropdown or dropdown menu, trigger blur
        if (!dropdown.contains(event.target)) {
          if (dropdownMenu.classList.contains('active-dropdown')) {
            dropdownMenu.classList.remove('active-dropdown');
            
          }
        }
      });
    }
    
  };

  // This should close the navbar when the user clicks outside the navbar or overlay
  const handleClickOutsideNavbar = (event) => {
    if (isMobile() || isSmallScreen()) {
      if (overlay.contains(event.target)) {
        // Close the navbar
        if (!toggleNav.classList.contains('nav-collapse')) {
          handleHamburgerClick();
        }
      }
    }
  };

  // Window resize handler
  const handleResize = () => {
    
    // if large screen
    if (!(isMobile() && isSmallScreen())) {
      toggleNav.style.removeProperty('display');
      if (overlay.classList.contains('overlay')) {
        toggleClass(overlay, 'overlay');
      }
      if (hbmenu.classList.contains('active')) {
        handleHamburgerClick(); // Reuse existing handler
      }
      

      dropdowns.forEach(dropdown => {
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        if (!isSmallScreen() && dropdownMenu.classList.contains('active-dropdown')) {
          // Close dropdown on resize for large screens
          dropdownMenu.blur();
        }
      });
    } else {
        if (toggleNav.classList.contains('nav-collapse')) {
            toggleNav.style.display = "none"; // Ensure hidden on smaller screens
        }
    }
  };

  // Attach event listeners
  hbmenu.addEventListener('click', handleHamburgerClick);
  toggleSearch.addEventListener('click', handleSearchToggle);
  searchBar.addEventListener('transitionend', handleSearchTransitionEnd);
  document.addEventListener('click', (event) => handleClickOutsideNavbar(event));

  // Add event listeners for each dropdown
  dropdowns.forEach(dropdown => {
    dropdown.addEventListener('click', (event) => handleDropdownClick(event));
    const dropdownMenu = dropdown.querySelector('.dropdown-menu');
    
    // Make dropdown menu focusable
    dropdownMenu.setAttribute('tabindex', '-1');
    //dropdownMenu.addEventListener('transitionend', (event) => handleDropdownTransitionEnd(event));
  });

  // Listen for click events on document to handle clicks outside the dropdown
  document.addEventListener('click', handleClickOutsideDropdown);

  window.addEventListener('resize', handleResize);
};

export default initNav;

/* Helper functions -- Not used */
function collectionHas(a, b) { //helper function (see below)
  for(var i = 0, len = a.length; i < len; i ++) {
      if(a[i] == b) return true;
  }
  return false;
}
function findParentBySelector(elm, selector) {
  var all = document.querySelectorAll(selector);
  var cur = elm.parentNode;
  while(cur && !collectionHas(all, cur)) { //keep going up until you find a match
      cur = cur.parentNode; //go up
  }
  return cur; //will return null if not found
}