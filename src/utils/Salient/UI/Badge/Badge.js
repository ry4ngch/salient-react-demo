import React from "react";

const Badge = ({text, status, className, hasIndicator = false, ...rest}) => {
    return (
        <span className={`badge ${status} ${hasIndicator ? 'has-indicator' : ''} ${className || ''}`} {...rest}>{text}</span>
    )
}

export default Badge;