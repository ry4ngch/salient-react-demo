import React from 'react'

// import Salient Library
import Card, {CardInfo, CardContent, CardTitle} from '../utils/Salient/UI/Card/Card';
import Badge from '../utils/Salient/UI/Badge/Badge';

const BadgesDemo = () => {
    return (
        <Card className="card-border">
            <CardInfo>
                <CardTitle>Badge</CardTitle>
            </CardInfo>
            <CardContent>
                <Badge text="Active" status="active" hasIndicator={true}/>
                <Badge text="Disabled" status="disabled" hasIndicator={true}/>
                <Badge text="Awaiting" status="awaiting" hasIndicator={true}/>
                <Badge text="Pending" status="pending" hasIndicator={true}/>
                <Badge text="Loading" status="loading" hasIndicator={true}/>
                <Badge text="Cancel" status="cancel" hasIndicator={true}/>
                <Badge text="Stall" status="stall" hasIndicator={true}/>
                <Badge text="Idle" status="idle" hasIndicator={true}/>
            </CardContent>
        </Card>
    )
}

export default BadgesDemo;