import React, {useEffect, useState, useRef} from "react";

const Treeview = (props) => {
    return (
        <section className="list-tree">
            <ul>
                {props.children}    
            </ul>
      </section>
    )
}

const TreeItem = ({ children, text, subtext }) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (!isExpanded) {
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 300); // Delay hiding after animation
            return () => clearTimeout(timer);
        } else {
            setIsVisible(true);
        }
    }, [isExpanded]);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <li>
            <span 
                onClick={toggleExpand} 
                title={children ? (isExpanded ? 'Collapse this branch' : 'Expand this branch') : undefined}
                style={{ cursor: children ? 'pointer' : 'default' }}
            >
                {text}
            </span>
            {subtext && <span className='comment'>{subtext}</span>}
            {children && isVisible && (
                <ul className={isExpanded ? '' : 'hide'}>
                    {React.Children.map(children, (child) =>
                        React.isValidElement(child) ? React.cloneElement(child) : child
                    )}
                </ul>
            )}
        </li>
    );
};

export default Treeview;
export {TreeItem};