import React, {Fragment} from 'react';
import Card, {CardInfo, CardTitle, CardContent} from '../utils/Salient/UI/Card/Card';    
import Grid, {GridRow, GridItem} from '../utils/Salient/UI/Grid/Grid';

const IconsDemo = () => {
  return (
    <Card>
        <CardInfo style={{borderBottom: '1px solid #ddd'}}>
            <CardTitle>Icons Demo</CardTitle>
        </CardInfo>
        <CardContent>
            <span style={{marginBottom: '20px', display: 'block'}}>This page is a demo for icons. It will showcase different icons and their usage in the application.</span>
            <p style={{fontWeight:'bold', textDecoration: 'underline', marginBottom: '5px'}}>1. Directional Icons</p>
            <Grid className="icon-preview">
                <GridRow>
                    <GridItem>
                        <span>Icon Left</span>
                        <i className="icon icon-left"></i>
                    </GridItem>
                    <GridItem>
                        <span>Icon Right</span>
                        <i className="icon icon-right"></i>
                    </GridItem>
                    <GridItem>
                        <span>Icon Up</span>
                        <i className="icon icon-up"></i>
                    </GridItem>
                    <GridItem>
                        <span>Icon Down</span>
                        <i className="icon icon-down"></i>
                    </GridItem>
                    <GridItem>
                        <span>Icon Backward</span>
                        <i className="icon icon-backward"></i>
                    </GridItem>
                    <GridItem>
                        <span>Icon Forward</span>
                        <i className="icon icon-forward"></i>
                    </GridItem>
                </GridRow>
                <GridRow>
                    <GridItem>
                        <span>Icon Step Backward</span>
                        <i className="icon icon-step-backward"></i>
                    </GridItem>
                    <GridItem>
                        <span>Icon Step Forward</span>
                        <i className="icon icon-step-forward"></i>
                    </GridItem>
                    <GridItem>
                        <span>Icon Right Arrow</span>
                        <i className="icon icon-right-arrow"></i>
                    </GridItem>
                    <GridItem>
                        <span>Icon Left Arrow</span>
                        <i className="icon icon-left-arrow"></i>
                    </GridItem>
                    <GridItem>
                        <span>Icon Top Arrow</span>
                        <i className="icon icon-top-arrow"></i>
                    </GridItem>
                    <GridItem>
                        <span>Icon Bottom Arrow</span>
                        <i className="icon icon-bottom-arrow"></i>
                    </GridItem>
                </GridRow>
                <GridRow>
                    
                    <GridItem>
                        <span>Icon Top Fill</span>
                        <i className="icon icon-top-fill"></i>
                    </GridItem>
                    <GridItem>
                        <span>Icon Bottom Fill</span>
                        <i className="icon icon-bottom-fill"></i>
                    </GridItem>
                    <GridItem/>
                    <GridItem/>
                    <GridItem/>
                    <GridItem/>
                </GridRow>
            </Grid>
        </CardContent>
        <CardContent>
            <p style={{fontWeight:'bold', textDecoration: 'underline', marginBottom: '5px'}}>2. File/Document Type Icons</p>
            <Grid className="icon-preview">
                <GridRow>
                    <GridItem>
                        <span>Icon File</span>
                        <i className="icon icon-file"></i>
                    </GridItem>
                    <GridItem>
                        <span>Icon Video</span>
                        <i className="icon icon-video"></i>
                    </GridItem>
                    <GridItem>
                        <span>Icon Photo</span>
                        <i className="icon icon-photo"></i>
                    </GridItem>
                    <GridItem>
                        <span>Icon Folder</span>
                        <i className="icon icon-folder"></i>
                    </GridItem>
                    <GridItem>
                        <span>Icon Search</span>
                        <i className="icon icon-search"></i>
                    </GridItem>
                    <GridItem>
                        <span>Icon flag</span>
                        <i className="icon icon-flag"></i>
                    </GridItem>
                </GridRow>
                <GridRow>
                    <GridItem>
                        <span>Icon Forbidden</span>
                        <i className="icon icon-forbidden"></i>
                    </GridItem>
                    <GridItem>
                        <span>Icon Gear</span>
                        <i className="icon icon-gear"></i>
                    </GridItem>
                    <GridItem>
                        <span>Icon Lock</span>
                        <i className="icon icon-lock"></i>
                    </GridItem>
                    <GridItem>
                        <span>Icon Unlock</span>
                        <i className="icon icon-unlock"></i>
                    </GridItem>
                    <GridItem>
                        <span>Icon Link</span>
                        <i className="icon icon-link"></i>
                    </GridItem>
                    <GridItem>
                        <span>Icon List</span>
                        <i className="icon icon-list"></i>
                    </GridItem>
                </GridRow>
                <GridRow>
                    <GridItem>
                        <span>Icon Filter</span>
                        <i className="icon icon-filter"></i>
                    </GridItem>
                    <GridItem>
                        <span>Icon Bookmark</span>
                        <i className="icon icon-bookmark"></i>
                    </GridItem>
                    <GridItem>
                        <span>Icon Sort By</span>
                        <i className="icon icon-sort-by"></i>
                    </GridItem>
                    <GridItem>
                        <span>Icon Sort By Fill</span>
                        <i className="icon icon-sort-by-fill"></i>
                    </GridItem>
                    <GridItem>
                        <span>Icon Wrench</span>
                        <i className="icon icon-wrench"></i>
                    </GridItem>
                    <GridItem>
                        <span>Icon Cloud</span>
                        <i className="icon icon-cloud"></i>
                    </GridItem>
                </GridRow>
                <GridRow>
                    <GridItem>
                        <span>Icon Download</span>
                        <i className="icon icon-download"></i>
                    </GridItem>
                    <GridItem>
                        <span>Icon Close</span>
                        <i className="icon icon-close"></i>
                    </GridItem>
                    <GridItem>
                        <span>Icon Drag</span>
                        <i className="icon icon-drag"></i>
                    </GridItem>
                    <GridItem>
                        <span>Icon Phone</span>
                        <i className="icon icon-phone"></i>
                    </GridItem>
                    <GridItem>
                        <span>Icon Success</span>
                        <i className="icon icon-success"></i>
                    </GridItem>
                    <GridItem>
                        <span>Icon Warning</span>
                        <i className="icon-warning"></i>
                    </GridItem>
                </GridRow>
            </Grid>
        </CardContent>
        <CardContent>
            <p style={{fontWeight:'bold', textDecoration: 'underline', marginBottom: '5px'}}>3. Social/Media Icons</p>
            <Grid className="icon-preview">
                <GridRow>
                    <GridItem>
                        <span>Icon Tag</span>
                        <i className="icon icon-tag"></i>
                    </GridItem>
                    <GridItem>
                        <span>Icon Heart</span>
                        <i className="icon icon-heart"></i>
                    </GridItem>
                    <GridItem>
                        <span>Icon Comment</span>
                        <i className="icon icon-comment"></i>
                    </GridItem>
                    <GridItem>
                        <span>Icon Profile</span>
                        <i className="icon icon-profile"></i>
                    </GridItem>
                    <GridItem>
                        <span>Icon Share</span>
                        <i className="icon icon-share"></i>
                    </GridItem>
                    <GridItem>
                        <span>Icon Location</span>
                        <i className="icon icon-location"></i>
                    </GridItem>
                </GridRow>
                <GridRow>
                    <GridItem>
                        <span>Icon Eject</span>
                        <i className="icon icon-eject"></i>
                    </GridItem>
                    <GridItem>
                        <span>Icon Pause</span>
                        <i className="icon icon-pause"></i>
                    </GridItem>
                    <GridItem>
                        <span>Icon Play</span>
                        <i className="icon icon-play"></i>
                    </GridItem>
                    <GridItem>
                        <span>Icon Sound</span>
                        <i className="icon icon-sound"></i>
                    </GridItem>
                    <GridItem>
                        <span>Icon Map Marker</span>
                        <i className="icon icon-map-marker"></i>
                    </GridItem>
                    <GridItem>
                        <span>Icon Clock</span>
                        <i className="icon icon-clock"></i>
                    </GridItem>
                </GridRow>
            </Grid>
        </CardContent>
    </Card>
  )
}

export default IconsDemo;