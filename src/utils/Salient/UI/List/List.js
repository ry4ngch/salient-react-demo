import React from "react";
import classNames from "classnames";

const List = ({children, className, theme, ...rest}) => {
    const listClasses = classNames('list-group', {
        ['list--'+theme]: theme
    })
    return (
        <ul className={`${listClasses} ${className || ''}`.trim()} {...rest}>
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