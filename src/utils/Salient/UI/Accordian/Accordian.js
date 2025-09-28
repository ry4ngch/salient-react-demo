import React, {useEffect, useState, useRef, useMemo} from "react";

const Accordian = (props) => {
    const initialAccordianState = useMemo(() => {
        return Object.fromEntries((props.children || []).map((_, index) => [index, false]));
      }, [props.children]);
      
      const [_accordianItemsState, _setAccordianItemsState] = useState(initialAccordianState);
      
      useEffect(() => {
        _setAccordianItemsState((prevState) => {
          const updatedState = Object.fromEntries(
            (props.children || []).map((_, index) => [index, prevState[index] ?? false])
          );
          return updatedState;
        });
      }, [props.children]);
    
    return (
        <div className={['accordian', props.className || ''].join(' ').trim()} data-active-toggle={props.activeToggle}>
            {React.Children.map(props.children, (child, _refIndex) => 
                React.isValidElement(child) ? React.cloneElement(child, { _accordianItemsState, _setAccordianItemsState, _refIndex, activeToggle: props.activeToggle }) : child
            )}
        </div>
    )
}

Accordian.defaultProps = {
    activeToggle: 'multiple'
}

const AccordianItem = (props) => {
    const [delayedClass, setDelayedClass] = useState(false);
    const isFirstRender = useRef(true);
    useEffect(() => {
        // make sure that the below codes does not run on first render
        if(isFirstRender.current){
            isFirstRender.current = false;
            return; // skip the initial render
        }

        // codes for subsequent update
        let frameId;

        if (props._accordianItemsState[props._refIndex]) {
            frameId = requestAnimationFrame(() => setDelayedClass(true));
        } else {
            setDelayedClass(false); // instantly remove class
        }
    
        return () => cancelAnimationFrame(frameId); // clean up
    }, [props._accordianItemsState[props._refIndex]]);

    return (
        <div className={['accordian-card', delayedClass ? 'open' : ''].join(' ').trim()} ref={isFirstRender}>
            <div className="accordian-heading" onClick={() => props._setAccordianItemsState((prevState) => {
               if (props.activeToggle === 'single') {
                    // Set all to false, then toggle the clicked one
                    const newState = Object.fromEntries(
                        Object.keys(prevState).map((key) => [key, false])
                    );
                    return { ...newState, [props._refIndex]: !prevState[props._refIndex] };
                } else {
                    // Toggle only the clicked item
                    return { ...prevState, [props._refIndex]: !prevState[props._refIndex] };
                }})
            }>
                <a>{props.title}</a>
            </div>
            {props._accordianItemsState[props._refIndex] && <div className="accordian-body" style={{display: props._accordianItemsState[props._refIndex] ? 'block' : ''}}>
                <p>{props.content}</p>
            </div>}
        </div>
    )
}

export default Accordian;
export {AccordianItem};