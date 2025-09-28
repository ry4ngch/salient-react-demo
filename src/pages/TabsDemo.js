import React, {useState} from 'react'

// import Salient Library
import Card, {CardInfo, CardTitle} from '../utils/Salient/UI/Card/Card';
import Tab, {TabContent, TabItems} from '../utils/Salient/UI/Tab/Tab';

const TabsDemo = () => {
    const [isSideTab, setTabType] = useState(false);
    const [tabStyle, setTabStyle] = useState("underline");
    return (
        <Card className="card-border">
            <CardInfo justify={true}>
                <CardTitle>Tabs</CardTitle>
                <div>
                <select onChange={(e) => setTabType(e.target.value==='true')} defaultValue={false}>
                    <option value={true}>Side Tab</option>
                    <option value={false}>Vertical Tab</option>
                </select>
                <select onChange={(e) => setTabStyle(e.target.value)}>
                    <option value="underline">Underline</option>
                    <option value="box">Box</option>
                </select>
                </div>
            </CardInfo>

            <Tab sideTabs={isSideTab} activeTabIndex={1}>
            <TabItems tabStyleActive={tabStyle}>
                <li><a>Tab 1</a></li>
                <li><a>Tab 2</a></li>
                <li><a>Tab 3</a></li>
            </TabItems>
            <TabContent>  
                <section className="item" data-title="Tab 1">
                    <div className="item-content">
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut dicta neque deleniti dignissimos doloribus asperiores vel velit recusandae quasi? Fugit?</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo doloribus quibusdam ratione aliquid ut, dolorem illum velit ad sunt dolorum!</p>
                    </div>
                </section>
                <section className="item" data-title="Tab 2">
                    <div className="item-content">
                        Tab 2 content. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.
                    </div>
                </section>
                <section className="item" data-title="Tab 3">
                    <div className="item-content">
                        Tab 3 content. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.
                    </div>
                </section>
            </TabContent>
            </Tab>
        </Card>
    )
}

export default TabsDemo;