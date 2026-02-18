import React from "react";
import classNames from "classnames";

const Avatar = ({
    shape='circle', 
    size, 
    src, 
    alt, 
    children, 
    hasBorder=false, 
    borderGap=0, 
    borderRotation=0,
    hasCatchLight=false,
    style, 
    className, 
    ...props
}) => {
    const avatarClasses = classNames("avatar", 
        {
            ['avatar-' + shape]: shape,
            'avatar-border': hasBorder,
            'avatar-catch-light': hasCatchLight
        }
    );
    return (
        <div {...props} className={[avatarClasses, className].join(' ').trim()} style={{...style, '--avatar-size': size, '--border-gap': borderGap, '--border-rotation': borderRotation}} >
            <div className="avatar-inner"></div>
            <div className='avatar-icon'>
                {children || <img src={src} alt={alt}/>}
            </div>
        </div>
    )
}

export default Avatar;