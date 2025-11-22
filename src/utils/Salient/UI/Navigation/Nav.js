import React, { useEffect, useState, useRef, useCallback } from 'react';
import classNames from 'classnames';

const Nav = ({shift=true, navSlideDown=false, brandLogo, title, children, theme, className, ...rest}) => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const overlayRef = useRef(null);
  const navLinksRef = useRef(null);

  const isSmallScreen = () => window.innerWidth < 768;
  const isMobile = () => Math.min(window.screen.width, window.screen.height) < 768 || navigator.userAgent.indexOf("Mobi") > -1;

  const handleClickOutside = useCallback((event) => {
    if (overlayRef.current?.contains(event.target)) {
      setIsNavCollapsed(true);
    }

    if(activeDropdown !== null){
      // if click target is not inside the dropdown or dropdown menu, trigger blur
      if (navLinksRef.current && !navLinksRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    }
    
  }, [activeDropdown]);

  const handleResize = useCallback(() => {
    if (!isMobile() && !isSmallScreen()) {
      setIsNavCollapsed(true);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    window.addEventListener('resize', handleResize);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('resize', handleResize);
    };
  }, [handleClickOutside, handleResize]);

  const handleHamburgerClick = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  const handleSearchToggle = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const handleDropdownClick = (index) => {
    setActiveDropdown((prev) => (prev === index ? null : index));
  };

  const navClasses = classNames("navbar", 
    { 
      "sd-shift-navbar": shift && !navSlideDown && !isNavCollapsed,
      [theme+"-scheme"]: theme 
    },
    className,
  );

  return (
    <div>
      <div id="overlay" ref={overlayRef} className={isNavCollapsed ? '' : 'overlay'}></div>
      <nav 
        {...rest} 
        className={navClasses} 
        {...(shift && !navSlideDown ? { 'data-effect': 'shift' } : {})}>
        <div className={classNames("hamburger", { "active": !isNavCollapsed })} onClick={handleHamburgerClick}>
          <div></div>
        </div>
        <a className="navbar-brand">
          {brandLogo}
          {title && <span>{title}</span>}
        </a>
        {React.isValidElement(children) ?
          React.cloneElement(children, {
            navSlideDown: navSlideDown,
            isNavCollapsed,
            handleDropdownClick,
            activeDropdown,
            handleSearchToggle,
            isSearchVisible,
            ref: navLinksRef
          })
          : children}
      </nav>
    </div>
  );
};

// Note: All the props in NavMenu is passed down from Nav
const NavMenu = ({isNavCollapsed, navSlideDown = false, children, handleDropdownClick, handleSearchToggle, activeDropdown, isSearchVisible, className, ...rest}) => {
    const navListClasses = classNames(
      'navlinks',
      { 'nav-collapse': isNavCollapsed },
      { 'sd-slide-in': !navSlideDown },
      { 'sd-slide-down': navSlideDown },
      className,
    );
  
    return (
      <div className={navListClasses}>
        <ul {...rest} className="navCollections" ref={rest.ref}>
          {React.Children.map(children, (child, index) => (
            React.isValidElement(child) && child.props['data-dropdown'] !== undefined ? (
              React.cloneElement(child, {
                ...child.props,
                onClick: () => handleDropdownClick(index),
                tabIndex: 0,
                children: React.Children.map(child.props.children, (grandChild) => {
                  if (React.isValidElement(grandChild)) {
                    const isDropdownMenu = grandChild.props.className?.includes('dropdown-menu');
                    return React.cloneElement(grandChild, {
                      ...grandChild.props,
                      className: [grandChild.props.className, isDropdownMenu && activeDropdown === index ? 'active-dropdown' : ''].join(' ').trim()
                    });
                  }
                  return grandChild;
                })
              })
            ) : child
          ))}
        </ul>
        <div
          className={classNames('search pos-right', { search: isSearchVisible })}
          data-toggle="hide"
          onClick={handleSearchToggle}
        ></div>
        <div className={classNames('search-box', { hide: !isSearchVisible })}>
          <i className="search" onClick={handleSearchToggle}></i>
          <input type="text" placeholder="Search here..." />
        </div>
      </div>
    );
  };

export default Nav;
export { NavMenu };