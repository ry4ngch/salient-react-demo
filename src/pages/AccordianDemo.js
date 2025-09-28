import React from 'react'

// import the Dummy datas
import {accordianData} from '../containers/demo_data';

// import Salient Library
import Card, {CardInfo, CardContent, CardTitle} from '../utils/Salient/UI/Card/Card';
import Accordian, {AccordianItem} from '../utils/Salient/UI/Accordian/Accordian';

const AccordianDemo = () => {
    return (
        <Card className="card-border">
            <CardInfo>
                <CardTitle>Accordian</CardTitle>
            </CardInfo>
            <Accordian activeToggle="single">
                {accordianData.map((item, index) => (
                    <AccordianItem key={index} title={item.title} content={item.content} />
                ))}
            </Accordian>
        </Card>

    )
}

export default AccordianDemo;