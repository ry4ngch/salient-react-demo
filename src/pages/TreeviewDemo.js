import React from 'react'

// import Salient Library
import Card, {CardInfo, CardContent, CardTitle} from '../utils/Salient/UI/Card/Card';
import Treeview, {TreeItem} from '../utils/Salient/UI/Treeview/Treeview';

const TreeviewDemo = () => {
  return (
        <React.Fragment>
        <Card className="card-border bg-dark" style={{marginTop: '10px'}}>
          <CardInfo>
            <CardTitle>Treeview - Dark Background</CardTitle>
          </CardInfo>
          <CardContent>
            <Treeview>
              <TreeItem text='Item 1' subtext="(with levels)" expandOnLoad={true}>
                <li><span>1.1</span></li>
                <li><span>1.2</span></li>
              </TreeItem>
              <TreeItem text='Item 2' subtext="(multilevel)" expandOnLoad={true}>
                <li><span>2.1</span></li>
                <TreeItem text="2.2">
                  <li><span>2.2.1</span></li>
                  <li><span>2.2.2</span></li>
                  <TreeItem text="2.2.3" subtext="(we can continue adding levels)">
                    <li><span>2.2.3.1</span></li>
                    <li><span>2.2.3.2</span></li>
                  </TreeItem>
                </TreeItem>
              </TreeItem>
              <TreeItem text='Item 3' subtext="(No Level)"/>
            </Treeview>
          </CardContent>
        </Card>

        <Card className="card-border" style={{marginTop: '10px'}}>
            <CardInfo>
                <CardTitle>Treeview - White Background</CardTitle>
            </CardInfo>
            <CardContent>
                <Treeview>
                    <TreeItem text='Item 1' subtext="(with levels)" expandOnLoad={true}>
                      <li><span>1.1</span></li>
                      <li><span>1.2</span></li>
                    </TreeItem>
                    <TreeItem text='Item 2' subtext="(multilevel)" expandOnLoad={true}>
                    <li><span>2.1</span></li>
                    <TreeItem text="2.2">
                        <li><span>2.2.1</span></li>
                        <li><span>2.2.2</span></li>
                        <TreeItem text="2.2.3" subtext="(we can continue adding levels)">
                        <li><span>2.2.3.1</span></li>
                        <li><span>2.2.3.2</span></li>
                        </TreeItem>
                    </TreeItem>
                    </TreeItem>
                    <TreeItem text='Item 3' subtext="(No Level)"/>
                </Treeview>
            </CardContent>
        </Card>
    </React.Fragment>

  )
}

export default TreeviewDemo;