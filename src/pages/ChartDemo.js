import React, {useState} from "react";
import Chart, {BarChart} from "../utils/Salient/UI/Chart/BarChart";
import Card, {CardContent, CardInfo, CardTitle} from '../utils/Salient/UI/Card/Card';

const dummy_data = [
    {label: 'Jan', value: 30},
    {label: 'Feb', value: 50},
    {label: 'Mar', value: 10},
    {label: 'April', value: 40},
    {label: 'Jun', value: 60},
    {label: 'July', value: 120},
    {label: 'Aug', value: 84},
    {label: 'Sept', value: 65},
    {label: 'Oct', value: 32},
    {label: 'Nov', value: 27},
    {label: 'Dec', value: 57},
]

const ChartDemo = () => {
    const [labelSide, setLabelSide] = useState(false);
    const [isHorz, setIsHorz] = useState(true);
    const [theme, setTheme] = useState(null);

    return (
        <Card className="card-border">
            <CardInfo justify={true}>
                <CardTitle>Chart</CardTitle>
                <div style={{display: 'inline-block'}}>
                    <select value={labelSide} onChange={() => setLabelSide((prevState) => !prevState)}>
                        <option value="true">Side Label</option>
                        <option value="false">Inline Label</option>
                    </select>
                    <select value={isHorz} onChange={() => setIsHorz((prevState) => !prevState)}>
                        <option value="true">Horizontal</option>
                        <option value="false">Vertical</option>
                    </select>
                    <select value={theme} onChange={(event) => setTheme(event.target.value)}>
                        <option value="">Default</option>
                        <option value="forest">Forest</option>
                        <option value="sunset">Sunset</option>
                        <option value="indigo">Indigo</option>
                    </select>
                </div>
            </CardInfo>
            <CardContent>
                <Chart 
                    isHorz={isHorz} 
                    labelSide={labelSide} 
                    calculatePctFromTotal={false} 
                    calculatePctFromMax={false} 
                    showCalculatedValues={false} 
                    title="Number of Orders per Month" 
                    theme={theme}>
                    {dummy_data.map((item, index) => (
                        <BarChart key={index} label={item.label} value={item.value}/>           
                    ))}
                </Chart>
            </CardContent>
        </Card>
    )
}

export default ChartDemo;