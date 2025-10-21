import React, {useState} from "react";
import Progress from "../utils/Salient/UI/Progress/Progress";
import Card, {CardInfo, CardContent, CardTitle} from '../utils/Salient/UI/Card/Card';
import Banner from '../utils/Salient/UI/Banner/Banner';
import Button from '../utils/Salient/UI/Buttons/Button';

const ProgressDemo = () => {
    const [progressType, setProgressType] = useState('linear');
    const [currentProgressIndex, setCurrentProgressIndex] = useState(2);
    const [showCheckmark, setShowCheckmark] = useState(false);
    const [showProgressStep, setShowProgressStep] = useState(false);

    const progressItems = ['Milestone 1', 'Milestone 2', 'Milestone 3', 'Milestone 4', 'Milestone 5', 'Milestone 6'];

    const changeProgressType = (event) => {
        setProgressType(event.target.value);
    }

    const updateProgress = (value) => {
        setCurrentProgressIndex((prevState) => {
            if((prevState + value) >= 0 && (prevState + value) < progressItems.length){
                return prevState + value;
            } else {
                return prevState;
            }
        });
    }

    const onProgressPointClick = (index) => {
        setCurrentProgressIndex(index);
    }
    return (
        <React.Fragment>
            <Banner blockquoteStyle={true} theme="cancel">
                Progress Bar is currently in development and will be release in the near future.
            </Banner>
            <br/>
            <Card className='card-border'>
                <CardInfo justify={true}>
                    <CardTitle>Interactive Progress Bar</CardTitle>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
                        <div>
                            <label>Progress Chart Type: </label>
                            <select value={progressType} onChange={changeProgressType}>
                                <option value="linear">Linear</option>
                                <option value="circular">Circular</option>
                            </select>
                        </div>
                        <div>
                            <label>Show Progress Step: </label>
                            <select value={showProgressStep} onChange={() => setShowProgressStep((prevState) => !prevState)} disabled={progressType !== 'linear'}>
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </select>
                        </div>
                        <div>
                            <label>Show Checkmark: </label>
                            <select value={showCheckmark} onChange={() => setShowCheckmark((prevState) => !prevState)} disabled={progressType !== 'linear' || !showProgressStep}>
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </select>
                        </div>
                    </div>
                </CardInfo>
                <CardContent>
                    <Progress 
                        progressItems={progressItems}
                        currentProgressIndex={currentProgressIndex}
                        type={progressType}
                        onProgressPointClick={onProgressPointClick}
                        showProgressStep={showProgressStep}
                        showCompleteStepCheckmark={showCheckmark}/>
                    <div className="progress-btn-group">
                        <Button type="button" buttonStyle="clear" inverseColor={true} onClick={() => updateProgress(-1)}>Previous</Button>
                        <Button type="button" buttonStyle="clear" inverseColor={true} onClick={() => updateProgress(+1)}>Next</Button>
                    </div>
                </CardContent>
            </Card>
        </React.Fragment>
    )
}

export default ProgressDemo;