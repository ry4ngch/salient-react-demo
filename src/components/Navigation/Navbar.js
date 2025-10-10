import React, {useContext} from 'react';
import Nav, {NavMenu} from '../../utils/Salient/UI/Navigation/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import NavigateContext from '../../store/navigate-context';

const Navbar = () => {
    const ctx = useContext(NavigateContext);
    return (
        <Nav title="Salient" theme="navy" shift={true} navSlideDown={false} brandLogo={<FontAwesomeIcon icon="circle-notch" size="2x" className="brand-icon"></FontAwesomeIcon>}>
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
                        {ctx.pageLinks.map((page, index) => (
                             <li key={index}><Link className="dropdown-item" to={page.link}>{page.name}</Link></li>
                        ))}
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

