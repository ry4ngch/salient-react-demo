import React, {useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames'
import initNav from '../../salient-nav';

const Nav = (props) => {
	useEffect(() => {
		if(React.Children.count(props.children) > 0){
			initNav();
		}
	}, [])

    return (
		<div>
			<div id="overlay"></div>
			<nav className="navbar grayscale-scheme" {...(props.shift && !props.navSlideDown ? { 'data-effect': 'shift' } : {})}> {/* data-effect=shift */}
				<div className="hamburger">
					<div>
						{/* Middle Line */}
					</div> 
				</div>

				<a className="navbar-brand">
					{props.brandLogo}
					{props.title && <span>{props.title}</span>}
				</a>

				{/* NavMenu will be placed below */}
				{React.isValidElement(props.children) ? 
					React.cloneElement(props.children, {
						navSlideDown: props.navSlideDown
					}) 
				: props.children}

			</nav>
		</div>
    )
}

Nav.defaultProps = {
	navSlideDown: false,
	shift: true
}

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

export default Nav;
export {NavMenu};