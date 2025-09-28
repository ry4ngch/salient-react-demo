import React, {useState, useEffect} from "react";
import classNames from "classnames";

const Card = (props) => {
    const cardClasses = classNames('card', {
        'card_tilt': props.animation == 'tilt',
        'card_flipX': props.animation == 'flip-x',
        'card_flipY': props.animation == 'flip-y',
        'card_scale': props.animation == 'scale'
    })

    const [gridState, setGridState] = useState(false);
    const rows = 10;
    const cols = 10;
  
    const cells = Array.from({ length: rows * cols });

    useEffect(() => {
        setGridState(props.animation == 'tilt');
    }, [props.animation])
  
    return (
        <div className={[cardClasses, props.className || ''].join(' ').trim()} style={props.animation === 'tilt' ? {'--rows': rows, '--cols': cols, ...props.style} : {...props.style}}>
            {gridState && (
                <div className="tracker__cells" aria-hidden="true">
                    {cells.map((_, index) => (
                    <div key={index} className="cell"></div>
                    ))}
                </div>
            )}
            {gridState ? <div className="card-grid">{props.children}</div> : props.children}
      </div>
    );
  
}

const CardInfo = (props) => {
    const { justify, children, ...rest } = props;
    return(
        <div {...rest} className={['card-info', props.className || ''].join(' ').trim()}>
            {justify ? (<div className="card-justify">{children}</div>) : (children)}
        </div>
    )
}

CardInfo.defaultProps = {
    justify: false
}

const CardContent = (props) => {
    return(
        <div {...props} className={['card-content', props.className || ''].join(' ').trim()}>
            {props.children}
        </div>
    )
}

const CardTitle = (props) => {
    return(
        <div className={['card__title', props.className || ''].join(' ').trim()}>
            {props.children}
        </div>
    )
}

export default Card;
export {CardInfo, CardContent, CardTitle};