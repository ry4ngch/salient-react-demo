import React, {useEffect} from "react";
import initAccordian from "../../utils/Salient/salient-accordian";

const Accordian = (props) => {
    useEffect(() => {
        initAccordian();
    }, []);

    return (
        <div className={`accordian ${props.className || ''}`} data-active-toggle={props.activeToggle}>
            {props.children}
        </div>
    )
}

Accordian.defaultProps = {
    activeToggle: 'multiple'
}

const AccordianItem = (props) => {
    return (
        <div className="accordian-card">
            <div className="accordian-heading">
                <a>{props.title}</a>
            </div>
            <div className="accordian-body">
                <p>{props.content}</p>
            </div>
        </div>
    )
}

export default Accordian;
export {AccordianItem};