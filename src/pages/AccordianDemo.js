import React, {useState} from 'react'

// import the Dummy datas
import {accordianData} from '../containers/demo_data';

// import Salient Library
import Card, {CardInfo, CardContent, CardTitle} from '../utils/Salient/UI/Card/Card';
import Accordian, {AccordianItem} from '../utils/Salient/UI/Accordian/Accordian';

const AccordianDemo = () => {
    const [accordianOption, setAccordianOption] = useState("single");

    const updateAccordianOption = (event) => {
        setAccordianOption(event.target.value);
    };
    return (
        <Card className="card-border">
            <CardInfo justify={true}>
                <CardTitle>Accordian</CardTitle>
                <select value={accordianOption} onChange={updateAccordianOption}>
                  <option value="single">single</option>
                  <option value="multiple">multiple</option>
              </select>
            </CardInfo>
            <Accordian activeToggle={accordianOption}>
                {accordianData.map((item, index) => (
                    <AccordianItem key={index} title={item.title} content={item.content} />
                ))}
            </Accordian>
        </Card>

    )
}

export default AccordianDemo;