import React, {useState} from 'react'

// import Salient Library
import Button from '../utils/Salient/UI/Buttons/Button';
import Card, {CardInfo, CardContent, CardTitle} from '../utils/Salient/UI/Card/Card';
import Table, {TableRow} from '../utils/Salient/UI/Table/Table';

const ButtonsDemo = () => {
    const [check, setCheck] = useState(true);
    return (
        <React.Fragment>
            <Card className="bg-dark card-flat">
                <CardInfo>
                    <CardTitle>Block Button</CardTitle>
                </CardInfo>
                <CardContent>
                    <Button type="button" buttonStyle="blueBlur" isBlock={true} expandFull={true}>Button1</Button>
                    <Button type="button" buttonStyle="blur" isBlock={true} expandFull={true}>Button2</Button>
                    <Button type="button" buttonStyle="clear" isBlock={true} expandFull={true}>Button3</Button>
                </CardContent>
            </Card>

            <Card className="card-border">
                <CardInfo>
                    <CardTitle>Checkboxes</CardTitle>
                </CardInfo>
                <CardContent>
                    <Table columns={['Checkbox Status', 'Display']}>
                        <TableRow>
                            <td data-field="Checkbox Status">Enabled (Blue)</td>
                            <td data-field="Display"><Button type="checkbox" checked></Button></td>
                        </TableRow>
                        <TableRow>
                            <td data-field="Checkbox Status">Disabled</td>
                            <td data-field="Display"><Button type="checkbox" disabled={true}></Button></td>
                        </TableRow>
                        <TableRow>
                            <td data-field="Checkbox Status">Enabled (Dark)</td>
                            <td data-field="Display"><Button type="checkbox" mode="dark" checked></Button></td>
                        </TableRow>
                        <TableRow>
                            <td data-field="Checkbox Status">Enabled (Light)</td>
                            <td data-field="Display"><Button type="checkbox" mode="light" checked></Button></td>
                        </TableRow>
                        <TableRow>
                            <td data-field="Checkbox Status">Enabled (Forest)</td>
                            <td data-field="Display"><Button type="checkbox" mode="forest" checked></Button></td>
                        </TableRow>
                        <TableRow>
                            <td data-field="Checkbox Status">Enabled (Sunset)</td>
                            <td data-field="Display"><Button type="checkbox" mode="sunset" checked></Button></td>
                        </TableRow>
                        <TableRow>
                            <td data-field="Checkbox Status">Enabled (Indigo)</td>
                            <td data-field="Display"><Button type="checkbox" mode="indigo" checked></Button></td>
                        </TableRow>
                    </Table>
                </CardContent>
            </Card>

            <Card className="card-border">
                <CardInfo>
                    <CardTitle>Toggle Switch</CardTitle>
                </CardInfo>
                <CardContent>
                    <Table columns={['Slider Mode / Status', 'Display']}>
                        <TableRow>
                            <td data-field="Slider Mode">Dark</td>
                            <td data-field="Display"><Button type="switch" mode="dark" onChange={(e) => {setCheck(!check)}} checked={check}></Button></td>
                        </TableRow>
                        <TableRow>
                            <td data-field="Slider Mode">Forest</td>
                            <td data-field="Display"><Button type="switch" mode="forest" onChange={(e) => {setCheck(!check)}} checked={check}></Button></td>
                        </TableRow>
                        <TableRow>
                            <td data-field="Slider Mode">Sunset</td>
                            <td data-field="Display"><Button type="switch" mode="sunset" onChange={(e) => {setCheck(!check)}} checked={check}></Button></td>
                        </TableRow>
                        <TableRow>
                            <td data-field="Slider Mode">Normal</td>
                            <td data-field="Display"><Button type="switch" onChange={(e) => {setCheck(!check)}} checked={check}></Button></td>
                        </TableRow>
                        <TableRow>
                            <td data-field="Slider Mode">Indigo</td>
                            <td data-field="Display"><Button type="switch" mode="indigo" onChange={(e) => {setCheck(!check)}} checked={check}></Button></td>
                        </TableRow>
                        <TableRow>
                            <td data-field="Status">Disabled</td>
                            <td data-field="Display"><Button type="switch" disabled={true}></Button></td>
                        </TableRow>
                        <TableRow>
                            <td data-field="Status">Light</td>
                            <td data-field="Display"><Button type="switch" mode="light" onChange={(e) => {setCheck(!check)}} checked={check}></Button></td>
                        </TableRow>
                    </Table>
                </CardContent>
            </Card>

            <Card className="card-border">
                <CardInfo>
                    <CardTitle>Widget Button</CardTitle>
                </CardInfo>
                <CardContent>
                    <Table columns={['Icon', 'Display']}>
                        <TableRow>
                            <td data-field="Icon">Left Arrow</td>
                            <td data-field="Display"><Button type="button" buttonType="widget" icon="icon-left-arrow"></Button></td>
                        </TableRow>
                        <TableRow>
                            <td data-field="Icon">Right Arrow</td>
                            <td data-field="Display"><Button type="button" buttonType="widget" icon="icon-right-arrow"></Button></td>
                        </TableRow>
                        <TableRow>
                            <td data-field="Icon">Top Arrow</td>
                            <td data-field="Display"><Button type="button" buttonType="widget" icon="icon-top-arrow"></Button></td>
                        </TableRow>
                        <TableRow>
                            <td data-field="Icon">Bottom Arrow</td>
                            <td data-field="Display"><Button type="button" buttonType="widget" icon="icon-bottom-arrow"></Button></td>
                        </TableRow>
                        <TableRow>
                            <td data-field="Icon">Tag</td>
                            <td data-field="Display"><Button type="button" buttonType="widget" icon="icon-tag"></Button></td>
                        </TableRow>
                    </Table>
                </CardContent>
            </Card>
                
            <Card className="card-border">
                <CardInfo>
                    <CardTitle>Inverse Buttons</CardTitle>
                </CardInfo>
                <CardContent>
                    <Button type="button" buttonStyle="blueBlur" isBlock={false} expandFull={false} inverseColor={true}>Button4</Button>
                    <Button type="button" buttonStyle="blueBlur" isBlock={false} expandFull={false}>Button5</Button>
                    <Button type="button" buttonStyle="blur" isBlock={false} expandFull={false} inverseColor={true}>Button6</Button>
                    <Button type="button" buttonStyle="blur" isBlock={false} expandFull={false}>Button7</Button>
                    <Button type="button" buttonStyle="clear" isBlock={false} expandFull={false} inverseColor={true}>Button8</Button>
                    <Button type="button" buttonStyle="clear" isBlock={false} expandFull={false}>Button9</Button>
                </CardContent>
            </Card>
        </React.Fragment>
    )
}

export default ButtonsDemo;