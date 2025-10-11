import React, {useState} from 'react';

const Progress = ({progressItems = [], className, onProgressPointClick, initialProgressIndex = 0, ...rest}) => {
    const [progressPoint, setProgressPoint] = useState(initialProgressIndex);
    const segmentLength = 100/(progressItems.length-1);
    const [progressBarFill, setProgressBarFill] = useState(initialProgressIndex*segmentLength);

    const clickHandler = (index) => {
        setProgressPoint(index);
        setProgressBarFill(index*segmentLength);

        if(onProgressPointClick){
            onProgressPointClick();
        }
    }

    return (
        <div className="progress-wrapper">
             <div className={`progress ${className || ''}`} {...rest}>
                <div className="bar">
                    <div className="bar__fill" style={{width: progressBarFill+'%'}}></div>
                </div>
                {progressItems.map((item, index) => (
                    <div key={index} className={`point ${progressPoint == index ? 'point--active' : (index < progressPoint ? 'point--complete' : '')}`}  onClick={() => clickHandler(index)}>
                        <div className="bullet"></div>
                        <label className="label">{item}</label>
                    </div>
                ))}
                
            </div>
        </div>

    )
}

export default Progress;