import React from "react";
import classNames from "classnames";



const Toolbar = ({children, className, layoutHorz, isBlock=true, ...rest}) => {
    const toolbarClasses = classNames('toolbar', {
        'toolbar-vert': layoutHorz
    },  className)

    const toolbarContent = <nav {...rest} className={toolbarClasses}>
                                {children}
                            </nav>;

    return (
        isBlock ? <div>{toolbarContent}</div> : toolbarContent
    );
}

const ToolbarButton = ({children, className, tooltip, tooltipOrientation='top', ...rest}) => {
    const tooltipClass = classNames('toolbar-button__tooltip', {
        ['tooltip__'+tooltipOrientation]: tooltipOrientation
    })
    return (
        <button {...rest} className={['toolbar-button', className || ''].join(' ').trim()}>
            <span className="toolbar-button__icon" aria-hidden="true">
                {children}
            </span>
            {tooltip && <span className={tooltipClass}>{tooltip}</span>}
        </button>
    )
}

export default Toolbar;
export {ToolbarButton};
