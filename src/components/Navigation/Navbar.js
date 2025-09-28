import React from 'react';
import Nav, {NavMenu} from '../../utils/Salient/UI/Navigation/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <Nav title="Salient" className="grayscale-scheme" shift={true} navSlideDown={false} brandLogo={<FontAwesomeIcon icon="circle-notch" size="2x" className="brand-icon"></FontAwesomeIcon>}>
            <NavMenu>
                <li data-tooltip="Home">
                    <Link to="/">
                        <FontAwesomeIcon className="navlink-icon" icon="home"></FontAwesomeIcon>
                        <span className="navlink-text">Home</span>
                    </Link>
                </li>
                <li data-tooltip="UI" data-dropdown>
                    <a>
                        <FontAwesomeIcon className="navlink-icon" icon="caret-down"></FontAwesomeIcon>
                        <span className="navlink-text">Features</span>
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <li><Link className="dropdown-item" to="/tables">Tables</Link></li>
                        <li><Link className="dropdown-item" to="/accordian">Accordian</Link></li>
                        <li><Link className="dropdown-item" to="/tabs">Tabs</Link></li>
                        <li><Link className="dropdown-item" to="/buttons">Buttons</Link></li>
                        <li><Link className="dropdown-item" to="/breadcrumbs">Breadcrumbs</Link></li>
                        <li><Link className="dropdown-item" to="/modal">Modal</Link></li>
                        <li><Link className="dropdown-item" to="/cards">Card</Link></li>
                        <li><Link className="dropdown-item" to="/treeview">Treeview</Link></li>
                        <li><Link className="dropdown-item" to="/timeline">Timeline</Link></li>
                        <li><Link className="dropdown-item" to="/badges">Badges</Link></li>
                        <li><Link className="dropdown-item" to="/banners">Banners</Link></li>
                    </ul>
                </li>
                <li data-tooltip="Dropdown" data-dropdown>
                    <a>
                        <FontAwesomeIcon className="navlink-icon" icon="caret-down"></FontAwesomeIcon>
                        <span className="navlink-text">Dropdown</span>
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <li><Link className="dropdown-item" to="#">Action</Link></li>
                        <li><Link className="dropdown-item" to="#">Another action</Link></li>
                        <li><Link className="dropdown-item" to="#">Something else here</Link></li>
                    </ul>
                </li>
            </NavMenu>
        </Nav>
    )
}

export default Navbar;

