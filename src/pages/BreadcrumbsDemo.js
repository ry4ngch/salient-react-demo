import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import Salient Library
import Card, {CardInfo, CardContent, CardTitle} from '../utils/Salient/UI/Card/Card';
import Breadcrumb from '../utils/Salient/UI/Breadcrumb/Breadcrumb';


const BreadcrumbsDemo = () => {
    return (
        <Card className="card-border">
            <CardInfo>
                <CardTitle>Breadcrumbs With Seperator</CardTitle>
            </CardInfo>
            <CardContent>
                <Breadcrumb separator="/">
                    <li><a href="#0"><FontAwesomeIcon icon="house" style={{marginRight: '.6em'}}/>Home</a></li>
                    <li><a href="#0">Gallery</a></li>
                    <li className="active"><a href="#0">Web</a></li>
                    <li><a href="#0">Project</a></li>
                </Breadcrumb>
            </CardContent>

            <CardInfo>
                <CardTitle>Breadcrumbs Dot Indicator</CardTitle>
            </CardInfo>
            <CardContent>
                <Breadcrumb bcType="dot" centerBc={true}>
                    <li><a href="#0"><FontAwesomeIcon icon="house" style={{marginRight: '.6em'}}/>Home</a></li>
                    <li><a href="#0">Gallery</a></li>
                    <li className="active"><a href="#0">Web</a></li>
                    <li><a href="#0">Project</a></li>
                </Breadcrumb>
            </CardContent>
            <CardInfo>
            <   CardTitle>Breadcrumbs Basic</CardTitle>
            </CardInfo>
            <CardContent>
            <Breadcrumb>
                <li><a href="#0"><FontAwesomeIcon icon="house" style={{marginRight: '.6em'}}/>Home</a></li>
                <li><a href="#0">Gallery</a></li>
                <li className="active"><a href="#0">Web</a></li>
                <li><a href="#0">Project</a></li>
            </Breadcrumb>
            </CardContent>
            <CardInfo>
            <CardTitle>Breadcrumbs Multi Step with Badge</CardTitle>
            </CardInfo>
            <CardContent>
            <Breadcrumb bcType="multiStep" hasBadge={true} centerBc={true}>
                <li><a href="#0">Home</a></li>
                <li><a href="#0">Gallery</a></li>
                <li className="active"><a href="#0">Web</a></li>
                <li><a href="#0">Project</a></li>
            </Breadcrumb>
            </CardContent>
            <CardInfo>
            <CardTitle>Breadcrumbs Triangle</CardTitle>
            </CardInfo>
            <CardContent>
            <Breadcrumb bcType="triangle">
                <li><a href="#0"><FontAwesomeIcon icon="house" style={{marginRight: '.6em'}}/>Home</a></li>
                <li><a href="#0">Gallery</a></li>
                <li className="active"><a href="#0">Web</a></li>
                <li><a href="#0">Project</a></li>
            </Breadcrumb>
            </CardContent>
        </Card>

    )
}

export default BreadcrumbsDemo;