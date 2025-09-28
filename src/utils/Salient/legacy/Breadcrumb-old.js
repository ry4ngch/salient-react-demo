import React from "react"
import classNames from "classnames";

const BreadcrumbOld = (props) => {
    const breadcrumbClasses = classNames('breadcrumb', {
        'badge': props.hasBadge,
        'center-bc': props.centerBc
    });

    return (
        <div className={`${breadcrumbClasses} ${props.className}`}>
            {props.children}
        </div>
    )
}

BreadcrumbOld.defaultProps = {
    hasBadge: false,
    centerBc: true
}

export default BreadcrumbOld;