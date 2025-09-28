import React from 'react';

const Header = (props) => {
    return (
        <div className='header'>
            <div className='container'>
                {props.children}
            </div>
        </div>
    )
}

export default Header;