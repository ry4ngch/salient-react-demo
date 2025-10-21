import React, {useState, useEffect, useRef} from 'react';
import classNames from 'classnames';

const Progress = ({progressItems = [], className, onProgressPointClick, currentProgressIndex = 0, type='linear', showProgressStep=false, showCompleteStepCheckmark=false, ...rest}) => {
    const [progressPoint, setProgressPoint] = useState(currentProgressIndex);
    const segmentLength = 100/(progressItems.length-1);
    const [progressBarFill, setProgressBarFill] = useState(currentProgressIndex*segmentLength);
    const totalBarLength = (100/progressItems.length)*(progressItems.length-1);
    const circularRadius = 90;
    const circumference = 2 * Math.PI * circularRadius;
    const offset = circumference - (progressBarFill / 100) * circumference;
    const progressRef = useRef(null);

    const clickHandler = (index) => {
        setProgressPoint(index);
        setProgressBarFill(index*segmentLength);

        if(onProgressPointClick){
            onProgressPointClick(index);
        }
    }

    useEffect(() => {
        if(progressRef.current){
            clickHandler(currentProgressIndex);
        }
    }, [currentProgressIndex])

    const progressBarClasses = classNames('progress', {
        'progress-step': showProgressStep,
        'step-complete-checkmark': showCompleteStepCheckmark,
        className,
    })

    return (
        <div className="progress-wrapper" ref={progressRef}>
            {
                type === 'linear' &&
                <div className={progressBarClasses} {...rest}>
                    <div className="bar" style={{width: `${totalBarLength}%`}}>
                        <div className="bar__fill" style={{width: progressBarFill+'%'}}></div>
                    </div>
                    {progressItems.map((item, index) => (
                        <div key={index} className={`point ${progressPoint == index ? 'point--active' : (index < progressPoint ? 'point--complete' : '')}`}  onClick={() => clickHandler(index)} style={{width: `${segmentLength}%`}}>
                            <label className="label">{item}</label>
                            <div className="bullet"></div>
                        </div>
                    ))}
                    
                </div>
            }

            {
                type === 'circular' &&
                <div className="progress circular" {...rest}>
                    <svg className="progress-ring" width="200" height="200">
                        <circle className="progress-ring-circle-bg" cx="100" cy="100" r={circularRadius}/>
                        <circle className="progress-ring-circle" cx="100" cy="100" r={circularRadius} strokeDasharray={`${circumference} ${circumference}`} strokeDashoffset={offset}/>
                    </svg>
                    <div className="progress-content">
                        <div className="progress-percentage">{progressBarFill}%</div>
                        <div className="progress-label">
                            Complete
                            <p>{progressItems[progressPoint]}</p>
                        </div>
                    </div>
                </div>
            }

        </div>

    )
}

export default Progress;