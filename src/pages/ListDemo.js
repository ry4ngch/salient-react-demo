import React from 'react'

// import Salient Library
import Card, {CardInfo, CardContent, CardTitle} from '../utils/Salient/UI/Card/Card';
import List, {ListItem} from '../utils/Salient/UI/List/List';

const ListDemo = () => {
  return (
    <Card className="card-border">
        <CardInfo>
          <CardTitle>List</CardTitle>
        </CardInfo>
        <List>
          <ListItem hasHoverHighlight={true}>List Item 1</ListItem>
          <ListItem hasHoverHighlight={true}>List Item 2</ListItem>
          <ListItem hasHoverHighlight={true}>List Item 3</ListItem>
        </List>
    </Card>
  )
}

export default ListDemo;