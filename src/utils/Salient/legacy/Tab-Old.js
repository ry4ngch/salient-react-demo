import React, {useEffect} from "react";
import classNames from "classnames";
import tabControl from "../../salient-tabs";

const Tab = (props) => {
    const tabClass = classNames('tabbed-content', {
        'tabs-side': props.sideTabs,
    });

    useEffect(() => {
        tabControl();
    }, [])
    

    return (
        <article className={tabClass}>
            {props.children}
        </article>
    );
}

Tab.defaultProps = {
    sideTabs: false
}

const TabContent = (props) => {
    return (
        <div className="tab-content-wrapper">
            {props.children}
        </div>
    )
}

const TabItems = (props) => {
    const tabItemsClass = classNames('tabs', {
        'tabs-underline': props.tabStyleActive == 'underline',
    });

    return (
        <nav className={tabItemsClass}>
            <ul>
               {props.children}
            </ul>
        </nav>
    )
}

TabItems.defaultProps = {
    tabStyleActive: 'box'
}


export default Tab;
export {TabContent, TabItems};