import React from "react";
import Banner, {BannerContent, BannerActions, BannerAction} from '../utils/Salient/UI/Banner/Banner';

const BannersDemo = () => {
    return (
        <React.Fragment>
            <Banner theme="disabled" markdownStyle={true}>
                <BannerContent>
                The message text to be displayed with some longer content for testing use cases. Please do not make the content this long. 
                </BannerContent>
                <BannerActions>
                    <BannerAction>Some Action</BannerAction>
                </BannerActions>
            </Banner>

            <Banner theme="active" markdownStyle={true}>
                <BannerContent>
                The message text to be displayed with some longer content for testing use cases. Please do not make the content this long. 
                </BannerContent>
                <BannerActions>
                    <BannerAction>Action One</BannerAction>
                    <BannerAction>Action Two</BannerAction>
                </BannerActions>
            </Banner>

            <Banner theme="cancel" markdownStyle={true}>
                <BannerContent>
                The message text to be displayed with some longer content for testing use cases. Please do not make the content this long. 
                </BannerContent>
                <BannerActions>
                    <BannerAction>Action One</BannerAction>
                    <BannerAction>Action Two</BannerAction>
                </BannerActions>
            </Banner>

            <Banner markdownStyle={true}>
                <BannerContent>
                The message text to be displayed with some longer content for testing use cases. Please do not make the content this long. 
                </BannerContent>
                <BannerActions>
                    <BannerAction>Action 1</BannerAction>
                    <BannerAction>Action 2</BannerAction>
                </BannerActions>
            </Banner>

            <Banner theme="teal" markdownStyle={false}>
                <BannerContent>
                The message text to be displayed with some longer content for testing use cases. Please do not make the content this long. 
                </BannerContent>
                <BannerActions>
                    <BannerAction>Some Action</BannerAction>
                </BannerActions>
            </Banner>

            <Banner theme="purple" markdownStyle={false}>
                <BannerContent>
                The message text to be displayed with some longer content for testing use cases. Please do not make the content this long. 
                </BannerContent>
                <BannerActions>
                    <BannerAction>Some Action</BannerAction>
                </BannerActions>
            </Banner>

            <Banner theme="warn" markdownStyle={false}>
                <BannerContent>
                The message text to be displayed with some longer content for testing use cases. Please do not make the content this long. 
                </BannerContent>
                <BannerActions>
                    <BannerAction>Some Action</BannerAction>
                </BannerActions>
            </Banner>

            <Banner theme="emergency" markdownStyle={false}>
                <BannerContent>
                The message text to be displayed with some longer content for testing use cases. Please do not make the content this long. 
                </BannerContent>
                <BannerActions>
                    <BannerAction>Some Action</BannerAction>
                </BannerActions>
            </Banner>
        </React.Fragment>
    )
}

export default BannersDemo;