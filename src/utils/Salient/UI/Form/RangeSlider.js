import React, { useState, useRef, useEffect } from "react";
import classNames from "classnames";

const RangeSlider = ({
  label="Some Label",
  min = 0,
  max = 100,
  step = 1,
  defaultValue = 50,
  onChange,
  theme,
  displayMinMaxText={min: true, max: true},
  ...rest
}) => {
    const [value, setValue] = useState(defaultValue);
    const sliderRef = useRef(null);

    useEffect(() => {
        if(sliderRef.current){
            const progress = (value / max) * 100 + '%';
            sliderRef.current.style.setProperty('--progress', progress);
        }
    }, [value]);

    const handleChange = (event) => {
        const newValue = Number(event.target.value);
        setValue(newValue);
        if (onChange) {
            onChange(newValue);
        };
    };

    const sliderClasses = classNames("slider-group", 
        { 
          [theme+"-slider"]: theme 
        }
      );

    return (
        <div className={sliderClasses}>
            <label htmlFor={label.replace(/\s+/g, "-").toLowerCase()}>{label}</label>
            <div className="slider-container">
                {displayMinMaxText.min && <span className="value-display">{min}</span>}
                <input
                id={label.replace(/\s+/g, "-").toLowerCase()}
                type="range"
                value={value}
                onChange={handleChange}
                min={min}
                max={max}
                step={step}
                ref={sliderRef}
                {...rest}
                />
                {displayMinMaxText.max && <span className="value-display">{value}</span>}
            </div>
        </div>
    );
};

export default RangeSlider;