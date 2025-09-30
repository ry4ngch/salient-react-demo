import React from "react";
import Banner, {BannerContent, BannerActions, BannerAction} from '../utils/Salient/UI/Banner/Banner';

const BannersDemo = () => {
    const someActions = (event) => {
        console.log(`Click ${event.target.textContent}`);
    }

    return (
        <React.Fragment>
            <Banner theme="disabled" markdownStyle={true} onBannerDismiss={() => {alert('Additional Action trigger on closed')}}>
                <BannerContent>
                    The message text to be displayed with some longer content for testing use cases. Please do not make the content this long. 
                </BannerContent>
                <BannerActions>
                    <BannerAction onClick={someActions}>Some Action</BannerAction>
                </BannerActions>
            </Banner>

            <Banner theme="active" markdownStyle={true}>
                <BannerContent>
                    The message text to be displayed with some longer content for testing use cases. Please do not make the content this long. 
                </BannerContent>
                <BannerActions>
                    <BannerAction onClick={someActions}>Action One</BannerAction>
                    <BannerAction onClick={someActions}>Action Two</BannerAction>
                </BannerActions>
            </Banner>

            <Banner theme="cancel" markdownStyle={true}>
                <BannerContent>
                    The message text to be displayed with some longer content for testing use cases. Please do not make the content this long. 
                </BannerContent>
                <BannerActions>
                    <BannerAction onClick={someActions}>Action One</BannerAction>
                    <BannerAction onClick={someActions}>Action Two</BannerAction>
                </BannerActions>
            </Banner>

            <Banner markdownStyle={true}>
                <BannerContent>
                    The message text to be displayed with some longer content for testing use cases. Please do not make the content this long. 
                </BannerContent>
                <BannerActions>
                    <BannerAction onClick={someActions}>Action 1</BannerAction>
                    <BannerAction onClick={someActions}>Action 2</BannerAction>
                </BannerActions>
            </Banner>

            <Banner theme="teal" markdownStyle={false}>
                <BannerContent>
                    The message text to be displayed with some longer content for testing use cases. Please do not make the content this long. 
                </BannerContent>
                <BannerActions>
                    <BannerAction onClick={someActions}>Some Action</BannerAction>
                </BannerActions>
            </Banner>

            <Banner theme="purple" markdownStyle={false}>
                <BannerContent>
                    The message text to be displayed with some longer content for testing use cases. Please do not make the content this long. 
                </BannerContent>
                <BannerActions>
                    <BannerAction onClick={someActions}>Some Action</BannerAction>
                </BannerActions>
            </Banner>

            <Banner theme="warn" markdownStyle={false}>
                <BannerContent>
                    The message text to be displayed with some longer content for testing use cases. Please do not make the content this long. 
                </BannerContent>
                <BannerActions>
                    <BannerAction onClick={someActions}>Some Action</BannerAction>
                </BannerActions>
            </Banner>

            <Banner theme="emergency" markdownStyle={false}>
                <BannerContent>
                    The message text to be displayed with some longer content for testing use cases. Please do not make the content this long. 
                </BannerContent>
                <BannerActions>
                    <BannerAction onClick={someActions}>Some Action</BannerAction>
                </BannerActions>
            </Banner>
        </React.Fragment>
    )
}

export default BannersDemo;