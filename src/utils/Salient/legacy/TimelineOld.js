import React, {useEffect, useState, useLayoutEffect, useRef} from 'react';
import {initializeSalientTimeline, recomputeTimelineLayout} from '../../salient-timeline';
import classNames from 'classnames';

const Timeline = (props) => {
    const timelineClass = classNames('timeline', {
        'timeline-horz': props.isHorz,
        'loaded': !props.isLoading && React.Children.count(props.children) > 0,
        'timeline-staggered': props.isStaggered,
        'center-events': props.centerEvents,
        'timeline-active': props.isTimelineActive && props.activeEventID
    });

    const hasInitialized = useRef(false); // Track if initialization is done

    // handle when data fetch through axios
    useLayoutEffect(() => {
        if(!props.isLoading && React.Children.count(props.children) > 0){
            initializeSalientTimeline();  
            hasInitialized.current = true;
        }
    }, [props.isLoading, props.children]);  
    
    //handle when state change
    useEffect(() => {
        if(hasInitialized.current && !props.isLoading && React.Children.count(props.children) > 0){
            recomputeTimelineLayout();
        }
    }, [props.children, props.showCount]);  

    return (
        <div className={[timelineClass, props.className || ''].join(' ').trim()} data-show-count={props.showCount} data-active-id={props.activeEventID} style={props.style}>
            {props.showControls && <button className="toggle-timeline toggle-back"></button>}
            <ul>
                {props.children}
            </ul>
            {props.showControls && <button className="toggle-timeline toggle-forward"></button>}
        </div>
    )
}

// set default props for showControls to true when showControls prop is never set as an attribute
Timeline.defaultProps = {
    showControls: true,
    isStaggered: false,
    centerEvents: false,
    isHorz: false,
    isTimelineActive: false,
    activeEventID: undefined
}

const TimelineEvent = (props) => {
    return (
        <li>
            <label className={['timeline-event-icon', props.icon || 'icon-circle'].join(' ').trim()}></label>
            <span className="timeline-event-thumbnail">{props.event}</span>
            <small>{props.text}</small>
        </li>
    )
}

export default Timeline;
export {TimelineEvent};