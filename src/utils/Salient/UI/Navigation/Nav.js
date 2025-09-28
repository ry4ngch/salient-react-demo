import React, { useEffect, useState, useRef, useCallback } from 'react';
import classNames from 'classnames';

const Nav = (props) => {
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

  return (
    <div>
      <div id="overlay" ref={overlayRef} className={isNavCollapsed ? '' : 'overlay'}></div>
      <nav className={`${classNames("navbar", { "sd-shift-navbar": props.shift && !props.navSlideDown && !isNavCollapsed })} ${props.className}`} {...(props.shift && !props.navSlideDown ? { 'data-effect': 'shift' } : {})}>
        <div className={classNames("hamburger", { "active": !isNavCollapsed })} onClick={handleHamburgerClick}>
          <div></div>
        </div>
        <a className="navbar-brand">
          {props.brandLogo}
          {props.title && <span>{props.title}</span>}
        </a>
        {React.isValidElement(props.children) ?
          React.cloneElement(props.children, {
            navSlideDown: props.navSlideDown,
            isNavCollapsed,
            handleDropdownClick,
            activeDropdown,
            handleSearchToggle,
            isSearchVisible,
            ref: navLinksRef
          })
          : props.children}
      </nav>
    </div>
  );
};

Nav.defaultProps = {
  navSlideDown: false,
  shift: true
};

const NavMenu = (props) => {
    const navListClasses = classNames(
      'navlinks',
      { 'nav-collapse': props.isNavCollapsed },
      { 'sd-slide-in': !props.navSlideDown },
      { 'sd-slide-down': props.navSlideDown }
    );
  
    return (
      <>
        <ul className={navListClasses} ref={props.ref}>
          {React.Children.map(props.children, (child, index) => (
            React.isValidElement(child) && child.props['data-dropdown'] !== undefined ? (
              React.cloneElement(child, {
                ...child.props,
                onClick: () => props.handleDropdownClick(index),
                tabIndex: 0,
                children: React.Children.map(child.props.children, (grandChild) => {
                  if (React.isValidElement(grandChild)) {
                    const isDropdownMenu = grandChild.props.className?.includes('dropdown-menu');
                    return React.cloneElement(grandChild, {
                      ...grandChild.props,
                      className: [grandChild.props.className, isDropdownMenu && props.activeDropdown === index ? 'active-dropdown' : ''].join(' ').trim()
                    });
                  }
                  return grandChild;
                })
              })
            ) : child
          ))}
        </ul>
        <div
          className={classNames('search pos-right', { search: props.isSearchVisible })}
          data-toggle="hide"
          onClick={props.handleSearchToggle}
        ></div>
        <div className={classNames('search-box', { hide: !props.isSearchVisible })}>
          <i className="search"></i>
          <input type="text" placeholder="Search here..." />
        </div>
      </>
    );
  };

NavMenu.defaultProps = {
  navSlideDown: false
};

export default Nav;
export { NavMenu };