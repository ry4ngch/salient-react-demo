import React from "react";

const List = ({children, className, ...rest}) => {
    return (
        <ul className={`list-group ${className || ''}`.trim()} {...rest}>
           {children}
        </ul>
    )
}

const ListItem = ({children, hasHoverHighlight = false, className, ...rest}) => {
    return (
        <li className={`list-item ${hasHoverHighlight ? 'list-highlight' : ''} ${className || ''}`.trim()} {...rest}>
            {children}
        </li>
    )
}

export default List;
export {ListItem};