import React, {useState} from "react";
import classNames from "classnames";

const Banner = ({icon, className, theme, children, blockquoteStyle, onBannerDismiss, allowBannerDismiss = true, ...rest}) => {
    const bannerStyle = classNames('banner', {
            ['banner--'+theme]: theme,
            'banner--blockquote': blockquoteStyle
        }
    )

    const [dismissBanner, setDismissBanner] = useState(false);

    const onCloseBanner = () => {
        if(onBannerDismiss){
            onBannerDismiss();
        }
        setDismissBanner(true);
    }
    
    return (
        <React.Fragment>
            {!dismissBanner && 
                (<div className={[bannerStyle, className || ''].join(' ').trim()} {...rest}>
                    <div className="banner__inner">
                        {
                            icon && 
                            <span className="banner__icon">
                                {icon}
                            </span>
                        }
                        <span className='banner__body'>
                            {children}
                        </span>
                        
                    </div>
                    {allowBannerDismiss && 
                        <button className="banner__dismiss" title="Close this banner" aria-label="Close this banner" onClick={onCloseBanner}></button>
                    }
                </div>)
            }
        </React.Fragment>
    )
}

const BannerContent = ({children, className, ...rest}) => {
    return (
        <span className={['banner__content', className || ''].join(' ').trim()} {...rest}>
            {children}
        </span>
    )
}

const BannerActions = ({children, className, ...rest}) => {
    return (
        <span className={['banner__actions', className || ''].join(' ').trim()} {...rest}>
            {children}
        </span>
    )
}

const BannerAction = ({children, className, ...rest}) => {
    return (
        <span className={['banner__action', className || ''].join(' ').trim()} {...rest}>
            {children}
        </span>
    )
}

export default Banner;
export {BannerContent, BannerActions, BannerAction};