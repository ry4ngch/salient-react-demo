import React from "react"
import classNames from "classnames";

const Breadcrumb = (props) => {
    const breadcrumbClasses = classNames('sl-breadcrumb', {
        'custom-separator': props.separator && !props.bcType,
        'triangle': props.bcType === 'triangle',
        'sl-multi-steps': ['multiStep', 'dot'].indexOf(props.bcType) !== -1,
        'text-top': props.bcType === 'dot',
        'text-center': props.bcType === 'multiStep',
        'count': props.hasBadge,
        'bc-center': props.centerBc
    });

    const {separator, children, bcType, hasBadge, className, centerBc, ...rest}  = props;

    return (
        <nav>
            <ol className={[breadcrumbClasses, className || ''].join(' ').trim()} {...rest}>
            {React.Children.map(children, (child, index) =>
                React.isValidElement(child) ? React.cloneElement(
                    child, 
                    {
                        ...(index < React.Children.count(children) - 1 && !bcType && { 'data-separator': separator || ''}),
                        className: `${child.props.className || ''} ${
                            ['multiStep', 'dot'].includes(bcType) && 
                            index < React.Children.toArray(children).findIndex((el) => el.props.className?.includes('active'))
                              ? 'visited'
                              : ''
                          }`.trim()
                    }
                ) : child
            )}
            </ol>
        </nav>
    )
}

Breadcrumb.defaultProps = {
    hasBadge: false,
    centerBc: false
}

export default Breadcrumb;