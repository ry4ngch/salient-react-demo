import React, {useMemo} from "react";
import classNames from "classnames";

const Chart = ({className, isHorz=true, labelSide=true,  calculatePctFromMax=false, calculatePctFromTotal=false, showCalculatedValues=false, children, theme, title, ...rest}) => {
    const chartClasses = classNames("chart", 
        { 
          'chart--vert': !isHorz,
          'chart--horz': isHorz,
          'label--side': labelSide,
          ['chart-fill--'+theme]: theme,
        }
    );
  
    const childArray = React.Children.toArray(children);
    
    const { totalValue, maxValue } = useMemo(() => {
        const values = childArray
        .filter(React.isValidElement)
        .map(child => child.props.value);
        return {
        totalValue: values.reduce((a, b) => a + b, 0),
        maxValue: values.length ? Math.max(...values) : 0
        };
    }, [childArray]);


    return (
        <div className={classNames(chartClasses, className)} {...rest}>
            {title && <h4 className="chart--title">{title}</h4>}
            <ul>
                {
                    React.Children.map(children, (child) => {
                        if(React.isValidElement(child)){
                            
                            return React.cloneElement(child, {
                                ...child.props,
                                _isHorz: isHorz,
                                _labelSide: labelSide,
                                _showCalculatedValues: showCalculatedValues,
                                _chartTotal: calculatePctFromTotal ? totalValue : maxValue,
                                _normalizeValues: calculatePctFromMax || calculatePctFromTotal
                            })
                        } else {
                            return child;
                        }
                    })
                }
            </ul>
        </div>
    )
}

const BarChart = ({label, value=0, labelUnit='', _isHorz, _labelSide, _chartTotal=100, _normalizeValues=false, _showCalculatedValues, ...rest}) => {
    
    const shouldNormalize = _normalizeValues || value > 100;
    let calculatedValue = shouldNormalize ? parseFloat(((value / _chartTotal)*100)) : value
    calculatedValue = Math.min(parseFloat(calculatedValue.toFixed(2)), 100);
    let chartFillStyle;
    if(_isHorz) {
        chartFillStyle = {width: `${calculatedValue}%`};
    } else {
        chartFillStyle = {height: `${calculatedValue}%`};
    }


    return (
        <li {...rest}>
            <span className="chart--label">
                <span>{label}</span>
                {((_isHorz && _labelSide) || (!_isHorz)) && <span className="chart--indicator">{`${_showCalculatedValues ? calculatedValue : value}${_showCalculatedValues ? '%' : labelUnit}`}</span>}
            </span>
            <span className="chart--bar">
                <div className="chart--fill" style={chartFillStyle}></div>
            </span>
            {
                _isHorz && !_labelSide && 
                <span className="chart--label">
                    <span className="chart--indicator">{`${_showCalculatedValues ? calculatedValue : value}${_showCalculatedValues ? '%' : labelUnit}`}</span>
                </span>
            }
        </li>
    )
}

export {BarChart};
export default Chart;