import React, {useState, useRef, useEffect} from "react";
import classNames from "classnames";

const Tab = (props) => {
    const tabClass = classNames('tabbed-content', {
        'tabs-side': props.sideTabs,
    });

    const [_isActiveIndex, _setIsActiveIndex] = useState(props.activeTabIndex || 0);
    const [_isTabItemsHidden, _setIsTabItemsHidden] = useState(false);
    const tabRef = useRef();

    useEffect(() => {
        const observer = new ResizeObserver(() => {
          if (tabRef.current) {
            const isVisible = Array.from(tabRef.current.querySelectorAll('.tabs')).some(
                (el) => el.offsetParent === null
            );
            _setIsTabItemsHidden(!isVisible);
          }
        });
    
        observer.observe(tabRef.current);
    
        return () => observer.disconnect();
      }, []);

    return (
        <article className={tabClass} ref={tabRef}>
            {React.Children.map(props.children, (child, index) => 
                React.isValidElement(child) ? React.cloneElement(child, {
                    ...child.props,
                    _isActiveIndex,
                    _setIsActiveIndex,
                    _isTabItemsHidden
                }) : child
            )}
        </article>
    );
}

Tab.defaultProps = {
    sideTabs: false
}

const TabContent = (props) => {
    const handleClick = (index, event) => {
        event.preventDefault(); // Prevent anchor tags or button default behavior
        props._setIsActiveIndex(index); // Update state without causing page scroll
    }

    return (
        <div className="tab-content-wrapper">
            {React.Children.map(props.children, (child, index) => 
                React.isValidElement(child) ? React.cloneElement(child, {
                    ...child.props, 
                    className: [child.props.className, props._isActiveIndex === index ? 'active' : ''].join(' ').trim(),
                    onClick: props._isTabItemsHidden ? undefined : (e) => handleClick(index, e)
                }) : child
            )}
        </div>
    )
}

const TabItems = (props) => {
    const tabItemsClass = classNames('tabs', {
        'tabs-underline': props.tabStyleActive == 'underline',
    });

    const handleClick = (index, event) => {
        event.preventDefault(); // Prevent anchor tags or button default behavior
        props._setIsActiveIndex(index); // Update state without causing page scroll
    }

    return (
        <nav className={tabItemsClass}>
            <ul>
                {React.Children.map(props.children, (child, index) => 
                    React.isValidElement(child) ? React.cloneElement(child, {
                        ...child.props,
                        children: React.Children.map(child.props.children, (grandChild) =>
                            React.isValidElement(grandChild) ? React.cloneElement(grandChild, {
                                ...grandChild.props,
                                onClick: (e) => handleClick(index, e), 
                                className: props._isActiveIndex === index ? 'active' : ''  
                            }) : grandChild 
                        )
                    }) : child
                )}
            </ul>
        </nav>
    )
}

TabItems.defaultProps = {
    tabStyleActive: 'box'
}


export default Tab;
export {TabContent, TabItems};