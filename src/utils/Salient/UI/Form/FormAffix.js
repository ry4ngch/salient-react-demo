import React from "react";

const FormAffix = ({className, icon, ...rest}) => {
    return (
        <span className={['form-prefix', className || ''].join(" ").trim()} {...rest}>
            <i className={["icon", icon || ''].join(" ").trim()}></i>
        </span>
    )
}

export default FormAffix;