import React from "react";
import Progress from "../utils/Salient/UI/Progress/Progress";
import Card, {CardInfo, CardContent} from '../utils/Salient/UI/Card/Card';
import Banner from '../utils/Salient/UI/Banner/Banner';

const ProgressDemo = () => {
    return (
        <React.Fragment>
            <Banner blockquoteStyle={true} theme="cancel">
                Progress Bar is currently in development and will be release in the near future.
            </Banner>
            <br/>
            <Card className='card-border'>
                <CardInfo>Interactive Progress Bar</CardInfo>
                <CardContent>
                    <Progress progressItems={['Milestone 1', 'Milestone 2', 'Milestone 3', 'Milestone 4', 'Milestone 5']}/>
                </CardContent>
            </Card>
        </React.Fragment>
    )
}

export default ProgressDemo;