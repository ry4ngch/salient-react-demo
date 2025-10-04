import React, {useState, useContext} from "react";
import List, {ListItem} from '../utils/Salient/UI/List/List';
import Card, {CardContent} from '../utils/Salient/UI/Card/Card';
import { useNavigate } from "react-router-dom";
import PageContent from "../components/pageContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavigateContext from '../store/navigate-context';
import Banner, {BannerContent} from "../utils/Salient/UI/Banner/Banner";

const Dashboard = () => {
    const navigate = useNavigate();
    const ctx = useContext(NavigateContext);

    const [isHovered, setIsHovered] = useState(null);

    const navigateToPage = (pageLink) => {
        navigate(pageLink);
    }

    return (
        <Card className="bg-dark">
            <CardContent>
                <PageContent title="Welcome">
                    <h3>This demo site was created to showcase the features of Salient Library capabilities integrated with react-router-dom</h3>
                </PageContent>
            </CardContent>
        
            <CardContent>
                <Banner theme="disabled" blockquoteStyle={true} allowBannerDismiss={false}>
                    <BannerContent>
                        The Salient library was developed with a core goal: to simplify the development process by eliminating the need to manually define custom states for controlling UI animations, styles, and effects. By leveraging Salient, developers can focus on building robust applications without worrying about intricate UI configurations.
                        <br/><br/>
                        <ul style={{listStyle: 'none'}}>
                            <li><FontAwesomeIcon icon="fa-check" style={{marginRight: '10px'}}></FontAwesomeIcon>Predefined animations and styles that integrate seamlessly into React projects.</li>
                            <li><FontAwesomeIcon icon="fa-check" style={{marginRight: '10px'}}></FontAwesomeIcon>An easy-to-use structure for dynamic UI effects without the overhead of managing custom state logic.</li>
                            <li><FontAwesomeIcon icon="fa-check" style={{marginRight: '10px'}}></FontAwesomeIcon>A faster development workflow, reducing boilerplate code while maintaining flexibility for customization.</li>
                            <li><FontAwesomeIcon icon="fa-check" style={{marginRight: '10px'}}></FontAwesomeIcon>Reusable components that are flexible to accept other attributes that are available on common HTML elements.</li>
                        </ul>
                    </BannerContent>
                </Banner>
                
                <br/>
                <hr/>
                <br/>
                <p>You can navigate and view the individual components by going to <em style={{textTransform: 'uppercase', fontWeight: 'bold'}}>Features</em> Link in the navbar or by clicking one of the link below </p>
            </CardContent>
            <List theme="dark">
                {ctx.pageLinks.map((page, index) => (
                    <ListItem key={index} hasHoverHighlight={isHovered === index} onClick={() => navigateToPage(page.link)} style={{cursor:'pointer'}} onMouseEnter={() => setIsHovered(index)}>{page.name}</ListItem>
                ))}
            </List>
        </Card>
    )
}

export default Dashboard;