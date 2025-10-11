import React from "react";
import Sidebar, {SideBarItem} from "../utils/Salient/UI/Sidebar/Sidebar";

const SideBarDemo = () => {
    return (
        <Sidebar>
            <SideBarItem title="Menu Item 1"/>
            <SideBarItem title="Menu Item 2" iconPrefix="icon icon-file">
                <li><a>Sub Item 1</a></li>
                <li><a>Sub Item 2</a></li>
            </SideBarItem>
            <SideBarItem title="Menu Item 3" iconPrefix="icon icon-heart" notification={2}>
                <li><a>Sub Item 1</a></li>
                <li><a>Sub Item 2</a></li>
            </SideBarItem>
            <SideBarItem title="Menu Item 4">
                <li><a>Sub Item 1</a></li>
                <li><a>Sub Item 2</a></li>
            </SideBarItem>
            <SideBarItem title="Menu Item 5">
                <li><a>Sub Item 1</a></li>
                <li><a>Sub Item 2</a></li>
            </SideBarItem>
            <SideBarItem title="Menu Item 6">
                <li><a>Sub Item 1</a></li>
                <li><a>Sub Item 2</a></li>
            </SideBarItem>
            <SideBarItem title="Menu Item 7">
                <li><a>Sub Item 1</a></li>
                <li><a>Sub Item 2</a></li>
                <SideBarItem title="Menu Item 7.1">
                    <li><a>Sub Item 1-1</a></li>
                    <li><a>Sub Item 2-1</a></li>
                </SideBarItem>
                <SideBarItem title="Menu Item 7.2" notification={4}>
                    <li><a>Sub Item 1-2</a></li>
                    <li><a>Sub Item 2-2</a></li>
                    <SideBarItem title="Menu Item 7.2.1" notification={3}>
                        <li><a>Sub Item 1-2-1</a></li>
                        <li><a>Sub Item 2-2-1</a></li>
                        <SideBarItem title="Menu Item 7.2.1.1">
                            <li><a>Sub Item 1-2-1-1</a></li>
                            <li><a>Sub Item 2-2-1-1</a></li>
                        </SideBarItem>
                    </SideBarItem>
                </SideBarItem>
            </SideBarItem>
        </Sidebar>
    )
}

export default SideBarDemo;

