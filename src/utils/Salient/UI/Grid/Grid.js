import React from "react";
import classNames from "classnames";

const Grid = ({children, className, ...rest}) => {
    return (
        <div {...rest} className={classNames('grid', className)}>
            {children}
        </div>
    )
}

const GridRow = ({children, className, ...rest}) => {
    return (
        <div {...rest} className={classNames('grid-row', className)}>
            {children}
        </div>
    )
}

const GridItem = ({children, className, ...rest}) => {
    return (
        <div {...rest} className={classNames('item', className)}>
            {children}
        </div>
    )
}

export {GridRow, GridItem};
export default Grid;