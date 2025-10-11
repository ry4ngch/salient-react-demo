import React, {useState, useRef} from "react";
import classNames from "classnames";

const Sidebar = ({children, className, ...rest}) => {
    return (
        <aside className={['sidebar', className].join(' ').trim()} {...rest}>
            <div>
                <ul>
                    {children}
                </ul>
            </div>
        </aside>
    )
}

const SideBarItem = ({iconPrefix, iconSuffix='icon icon-right', title, children, level=0, notification, ...rest}) => {
    const [showSubMenu, setShowSubMenu] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const subListRef = useRef();

    const expandSubMenu = () => {
        if(!showSubMenu){
            setShowSubMenu(true);
            setShowSubMenu(true);
        } else {
            setIsAnimating(true);
            setShowSubMenu(false);
        }
        
    }

    const handleAnimationEnd = () => {
        setIsAnimating(false);
    }

    const subMenuClasses = classNames('', {
        'sub-menu': React.Children.count(children) > 0,
        'active': React.Children.count(children) > 0 && showSubMenu
    });

    const base = 20;    // base padding in px
    const indent = 20;  // per-level increment in px
    const pad = base + level * indent;
  
    return (
      <li
        className={[subMenuClasses, rest.className || ''].join(' ').trim()}
        // set CSS var directly on the li (React accepts string key)
        style={{ ['--sb-pad']: `${pad}px` }}
        level={level}
        {...rest}
      >
        <a onClick={expandSubMenu}>
          {iconPrefix && <i className={iconPrefix} aria-hidden="true"></i>}
          <span>
            {title}
            {notification && <span className="notification">{notification}</span>}
        </span>
          {(iconSuffix && React.Children.count(children) > 0) && <i className={iconSuffix} aria-hidden="true"></i>}
        </a>
  
        {React.Children.count(children) > 0 && (showSubMenu || isAnimating) && (
          <ul className={`${showSubMenu ? 'expand' : 'collapse'}`} onAnimationEnd={handleAnimationEnd} ref={subListRef}>
            {React.Children.map(children, (child, index) => {

                if(!React.isValidElement(child)) return child;

                const childPad = base + (level + 1) * indent;

                return React.cloneElement(child, { 
                    ...child.props, 
                    level: level + 1,  
                    style:{ ['--sb-pad']: `${childPad}px` }, 
                    key: index
                })
            })}
          </ul>
        )}
      </li>
    );
}

export default Sidebar;
export {SideBarItem};