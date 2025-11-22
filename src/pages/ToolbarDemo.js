import React from "react";
import Toolbar, {ToolbarButton} from "../utils/Salient/UI/Toolbar/Toolbar";
import Grid, {GridRow, GridItem} from '../utils/Salient/UI/Grid/Grid'

const ToolbarDemo = () => {
    return (
            <Grid>
                <GridRow>
                    <GridItem>
                        <Toolbar layoutHorz={false}>
                            <ToolbarButton tooltip="Tag" tooltipOrientation="bottom">
                                <i className="icon icon-tag"></i>
                            </ToolbarButton>
                            <ToolbarButton tooltip="Search" tooltipOrientation="bottom">
                                <i className="icon icon-search"></i>
                            </ToolbarButton>
                            <ToolbarButton tooltip="Up" tooltipOrientation="bottom">
                                <i className="icon icon-up"></i>
                            </ToolbarButton>
                            <ToolbarButton tooltip="Heart" tooltipOrientation="bottom">
                                <i className='icon icon-heart'></i>
                            </ToolbarButton>
                            <ToolbarButton tooltip="One" tooltipOrientation="bottom">
                                <span>One</span>
                            </ToolbarButton>
                            <ToolbarButton tooltip="Two" tooltipOrientation="bottom">
                                <span>Two</span>
                            </ToolbarButton>
                            <ToolbarButton tooltip="Three" tooltipOrientation="bottom">
                                <span>Three</span>
                            </ToolbarButton>
                        </Toolbar>
                    </GridItem>
                    <GridItem>
                        <Toolbar layoutHorz={true}>
                            <ToolbarButton tooltip="Tag">
                                <i className="icon icon-tag"></i>
                            </ToolbarButton>
                            <ToolbarButton tooltip="Search">
                                <i className="icon icon-search"></i>
                            </ToolbarButton>
                            <ToolbarButton tooltip="Up">
                                <i className="icon icon-up"></i>
                            </ToolbarButton>
                            <ToolbarButton tooltip="Heart">
                                <i className='icon icon-heart'></i>
                            </ToolbarButton>
                            <ToolbarButton tooltip="Top" tooltipOrientation='top'>
                                <span>Tooltip Top</span>
                            </ToolbarButton>
                            <ToolbarButton tooltip="Right" tooltipOrientation="right">
                                <span>Tooltip Right</span>
                            </ToolbarButton>
                            <ToolbarButton tooltip="Bottom" tooltipOrientation='bottom'>
                                <span>Tooltip Bottom</span>
                            </ToolbarButton>
                            <ToolbarButton tooltip="Left" tooltipOrientation='left'>
                                <span>Tooltip Left</span>
                            </ToolbarButton>
                        </Toolbar>
                    </GridItem>
                </GridRow>
            </Grid>
    )
}

export default ToolbarDemo;