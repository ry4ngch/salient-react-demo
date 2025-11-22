import React, {useState, useEffect} from "react";
import classNames from "classnames";

const Card = ({children, className, animation, ...rest}) => {
    const cardClasses = classNames('card', {
        'card_tilt': animation == 'tilt',
        'card_flipX': animation == 'flip-x',
        'card_flipY': animation == 'flip-y',
        'card_scale': animation == 'scale',
    }, className)

    const [gridState, setGridState] = useState(false);
    const rows = 10;
    const cols = 10;
  
    const cells = Array.from({ length: rows * cols });

    useEffect(() => {
        setGridState(animation == 'tilt');
    }, [animation])
  
    return (
        <div {...rest} className={cardClasses} style={animation === 'tilt' ? {'--rows': rows, '--cols': cols, ...rest.style} : {...rest.style}}>
            {gridState && (
                <div className="tracker__cells" aria-hidden="true">
                    {cells.map((_, index) => (
                    <div key={index} className="cell"></div>
                    ))}
                </div>
            )}
            {gridState ? <div className="card-grid">{children}</div> : children}
      </div>
    );
  
}

const CardInfo = ({justify=false, className, children, ...rest}) => {
    return(
        <div {...rest} className={['card-info', className || ''].join(' ').trim()}>
            {justify ? (<div className="card-justify">{children}</div>) : (children)}
        </div>
    )
}

const CardContent = ({className, children, ...rest}) => {
    return(
        <div {...rest} className={['card-content', className || ''].join(' ').trim()}>
            {children}
        </div>
    )
}

const CardTitle = ({className, children, ...rest}) => {
    return(
        <div {...rest} className={['card__title', className || ''].join(' ').trim()}>
            {children}
        </div>
    )
}

export default Card;
export {CardInfo, CardContent, CardTitle};