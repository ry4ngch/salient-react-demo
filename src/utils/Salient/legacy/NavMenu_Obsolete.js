import React from "react";
import classNames from 'classnames'

const NavMenu = (props) => {
    const navListClasses = classNames( 
        'navlinks nav-collapse', {
            'sd-slide-in': !props.navSlideDown,
            'sd-slide-down': props.navSlideDown,
        }
    )

    return (
        <React.Fragment>
            {/* Change the sd-slide-in to sd-slide-down className and vice versa */}
            {/* Ensure that data-effect=shift is removed in nav tag when sd-slide-down is used */}
            <ul className={navListClasses}>
                {props.children}
            </ul>

            <div className="search pos-right" data-toggle="hide"></div>
            <div className="search-box hide">
                <i className="search"></i>
                <input type="text" placeholder="Search here..." />
            </div>
        </React.Fragment>
    )
}

NavMenu.defaultProps = {
    navSlideDown: false
}

export default NavMenu;