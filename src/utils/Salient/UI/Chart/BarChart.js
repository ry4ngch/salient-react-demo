import React, {useMemo} from "react";
import classNames from "classnames";

const Chart = ({className, isHorz=true, labelSide=true,  calculatePctFromMax=false, calculatePctFromTotal=false, showCalculatedValues=false, children, title, ...rest}) => {
    const chartClasses = classNames("chart", 
        { 
          'chart--vert': !isHorz,
          'chart--horz': isHorz,
          'label--side': labelSide
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
                                isHorz,
                                labelSide,
                                showCalculatedValues,
                                chartTotal: calculatePctFromTotal ? totalValue : maxValue,
                                normalizeValues: calculatePctFromMax || calculatePctFromTotal
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

const BarChart = ({label, value=0, isHorz, labelSide, chartTotal=100, normalizeValues=false, labelUnit='', showCalculatedValues, ...rest}) => {
    
    const shouldNormalize = normalizeValues || value > 100;
    let calculatedValue = shouldNormalize ? parseFloat(((value / chartTotal)*100)) : value
    calculatedValue = Math.min(parseFloat(calculatedValue.toFixed(2)), 100);
    let chartFillStyle;
    if(isHorz) {
        chartFillStyle = {width: `${calculatedValue}%`};
    } else {
        chartFillStyle = {height: `${calculatedValue}%`};
    }


    return (
        <li {...rest}>
            <span className="chart--label">
                <span>{label}</span>
                {((isHorz && labelSide) || (!isHorz)) && <span className="chart--indicator">{`${showCalculatedValues ? calculatedValue : value}${showCalculatedValues ? '%' : labelUnit}`}</span>}
            </span>
            <span className="chart--bar">
                <div className="chart--fill" style={chartFillStyle}></div>
            </span>
            {
                isHorz && !labelSide && 
                <span className="chart--label">
                    <span className="chart--indicator">{`${showCalculatedValues ? calculatedValue : value}${showCalculatedValues ? '%' : labelUnit}`}</span>
                </span>
            }
        </li>
    )
}

export {BarChart};
export default Chart;