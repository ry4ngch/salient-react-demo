import React from "react";
import Banner, {BannerContent, BannerActions, BannerAction} from '../utils/Salient/UI/Banner/Banner';

const BannersDemo = () => {
    const someActions = (event) => {
        console.log(`Click ${event.target.textContent}`);
    }

    return (
        <React.Fragment>
            <Banner theme="disabled" blockquoteStyle={true} onBannerDismiss={() => {alert('Additional Action trigger on closed')}}>
                <BannerContent>
                    This is a typical banners with blockquote styling and the current one uses the <em style={{fontWeight: 'bold'}}>disabled</em> theme.
                </BannerContent>
                <BannerActions>
                    <BannerAction onClick={someActions}>Some Action</BannerAction>
                </BannerActions>
            </Banner>

            <Banner theme="active" blockquoteStyle={true} allowBannerDismiss={false}>
                <BannerContent>
                    This banner is a blockquote style banner that cannot be dismiss. This is set by the allowBannerDismiss props. The banner uses the <em style={{fontWeight: 'bold'}}>active</em> theme.
                </BannerContent>
                <BannerActions>
                    <BannerAction onClick={someActions}>Action One</BannerAction>
                    <BannerAction onClick={someActions}>Action Two</BannerAction>
                </BannerActions>
            </Banner>

            <Banner theme="cancel" blockquoteStyle={true}>
                <BannerContent>
                    This is a typical banners with blockquote styling using the <em style={{fontWeight: 'bold'}}>cancel</em> theme but with multiple actions.
                </BannerContent>
                <BannerActions>
                    <BannerAction onClick={someActions}>Action One</BannerAction>
                    <BannerAction onClick={someActions}>Action Two</BannerAction>
                </BannerActions>
            </Banner>

            <Banner blockquoteStyle={true}>
                <BannerContent>
                    This is a another typical banners with blockquote styling using the <em style={{fontWeight: 'bold'}}>default</em> theme but with multiple actions.
                </BannerContent>
                <BannerActions>
                    <BannerAction onClick={someActions}>Action 1</BannerAction>
                    <BannerAction onClick={someActions}>Action 2</BannerAction>
                </BannerActions>
            </Banner>

            <Banner theme="teal" blockquoteStyle={false}>
                <BannerContent>
                    This is a normal banner without blockquote styling using the <em style={{fontWeight: 'bold'}}>teal</em> theme
                </BannerContent>
                <BannerActions>
                    <BannerAction onClick={someActions}>Some Action</BannerAction>
                </BannerActions>
            </Banner>

            <Banner theme="purple" blockquoteStyle={false}>
                <BannerContent>
                    This is a normal banner without blockquote styling using the <em style={{fontWeight: 'bold'}}>purple</em> theme
                </BannerContent>
                <BannerActions>
                    <BannerAction onClick={someActions}>Some Action</BannerAction>
                </BannerActions>
            </Banner>

            <Banner theme="warn" blockquoteStyle={false}>
                <BannerContent>
                This is a normal banner without blockquote styling using the <em style={{fontWeight: 'bold'}}>warn</em> theme
                </BannerContent>
                <BannerActions>
                    <BannerAction onClick={someActions}>Some Action</BannerAction>
                </BannerActions>
            </Banner>

            <Banner theme="emergency" blockquoteStyle={false}>
                <BannerContent>
                    This is a normal banner without blockquote styling using the <em style={{fontWeight: 'bold'}}>emergency</em> theme 
                </BannerContent>
                <BannerActions>
                    <BannerAction onClick={someActions}>Some Action</BannerAction>
                </BannerActions>
            </Banner>
        </React.Fragment>
    )
}

export default BannersDemo;