import React, {useState, useContext} from 'react';

//default context state
const NavigateContext = React.createContext({
    featuresLinks: [
        {name: 'Tables', link: '/tables'},
        {name: 'Accordian', link: '/accordian'},
        {name: 'Tabs', link: '/tabs'},
        {name: 'Buttons', link: '/buttons'},
        {name: 'Breadcrumbs', link: '/breadcrumbs'},
        {name: 'Modal', link: '/modal'},
        {name: 'Cards', link: '/cards'},
        {name: 'Treeview', link: '/treeview'},
        {name: 'Timeline', link: '/timeline'},
        {name: 'Badges', link: '/badges'},
        {name: 'Banners', link: '/banners'},
        {name: 'Sidebar', link: '/sidebar'},
        {name: 'FormUIs', link: '/formUIs'},
        {name: 'Progress', link: '/progress'},
        {name: 'Chart', link: '/chart'},
        {name: 'Grid', link: '/grid'},
        {name: 'Toolbar', link: '/toolbar'},
        {name: 'Upload', link: '/upload'},
        {name: 'Avatar', link: '/avatar'},
        {name: 'Icons', link: '/icons'},
    ],
})

const NavigateContextProvider = (props) => {
    const featuresLinks = useContext(NavigateContext).featuresLinks;
    return (
        <NavigateContext.Provider
            value={{
                pageLinks: featuresLinks
            }}>
                {props.children}
        </NavigateContext.Provider>
    )
}

export default NavigateContext;

const composeProviders = (providers) => {
    return providers.reduce((Acc, Provider) => {
        return (
            props =>
                <Provider>
                    <Acc {...props} />
                </Provider>
        );
    });
};

// add all the context providers here, to simulate redux combineReducers
export const AppProvider = composeProviders([
    NavigateContextProvider
]);