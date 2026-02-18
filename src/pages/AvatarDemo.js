import React from "react";
import Avatar from "../utils/Salient/UI/Avatar/Avatar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Card, {CardTitle, CardContent, CardInfo} from "../utils/Salient/UI/Card/Card";
import Grid, {GridRow, GridItem} from "../utils/Salient/UI/Grid/Grid";

export default function AvatarDemo() {
    return (

        <Card className='card-border'>
            <CardInfo style={{borderBottom: '1px solid #ddd'}}>
                <CardTitle>Avatar Component</CardTitle>
            </CardInfo>
            <CardContent>
                Avatar component is used to display an image or a font awesome icon. It can be customized with different sizes and shapes.
                <Grid style={{marginTop:'10px'}}>
                    <GridRow>
                        <GridItem>
                            <Avatar 
                                src="https://placehold.co/100x100" 
                                size="100px" 
                                borderGap="10px"
                                shape="rect"
                            />
                            <span style={{marginLeft: '5px'}}>Rectangular Avatar</span>
                        </GridItem>
                        <GridItem>
                            <Avatar 
                                src="https://placehold.co/100x100" 
                                size="100px" 
                                borderGap="20px"
                                borderRotation="30deg"
                                hasBorder={true}
                                hasCatchLight
                            />
                            <span style={{marginLeft: '5px'}}>Circular Avatar with Border and Catchlight</span>
                        </GridItem>
                        <GridItem>
                            <Avatar 
                                src="https://placehold.co/100x100" 
                                size="100px" 
                                borderGap="20px"
                                shape="rect"
                                hasBorder={true}
                            />
                            <span style={{marginLeft: '5px'}}>Rectangular Avatar with Border</span>
                        </GridItem>
                    </GridRow>
                    <GridRow>
                        <GridItem>
                            <Avatar 
                                    size="80px" 
                                    borderGap="10px"
                                    hasBorder={true}
                                >
                                <FontAwesomeIcon icon={['fas', 'user']} size="sm" />
                            </Avatar>
                            <span style={{marginLeft: '5px'}}>Icon Avatar</span>
                        </GridItem>
                    </GridRow>
                </Grid>
                
            </CardContent>
            
        </Card>
        
    )
}