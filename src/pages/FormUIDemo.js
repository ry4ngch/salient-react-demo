import React, {useRef} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import Salient Library
import Card, {CardInfo, CardContent, CardTitle} from '../utils/Salient/UI/Card/Card';
import Dropdown, {DropdownItem} from '../utils/Salient/UI/Form/Dropdown';
import FormAffix from '../utils/Salient/UI/Form/FormAffix';
import NumericField from '../utils/Salient/UI/Form/NumericField';
import TextField from '../utils/Salient/UI/Form/TextField';
import RangeSlider from '../utils/Salient/UI/Form/RangeSlider';

const FormUIsDemo = () => {
  const testNumericFieldCallback = (returnVal) => {
    console.log(returnVal);
    console.log(testRef);
  }

  const testRef = useRef(null);

  const updateSliderValue = () => {
    //console.log(event.target.value);
  }

  return (
        <React.Fragment>
            <Card className="card-border">
                <CardInfo>
                    <CardTitle>Form Controls - Dropdown</CardTitle>
                </CardInfo>
                <CardContent>
                    <CardTitle>Searchable Dropdown with Form Affix</CardTitle>
                    <Dropdown placeholder="Dropdown" isSearchable={true} inputPrefix={<FormAffix icon="icon-search"/>} expandFull={true}>
                        <DropdownItem value="Test1">Test1</DropdownItem>
                        <DropdownItem value="Test2">Test2</DropdownItem>
                        <DropdownItem value="Test3">Test3</DropdownItem>
                    </Dropdown>
                </CardContent>

                <CardContent>
                    <CardTitle>Searchable Dropdown</CardTitle>
                    <Dropdown placeholder="Dropdown" isSearchable={true} expandFull={true}>
                        <DropdownItem value="Test1">Test1</DropdownItem>
                        <DropdownItem value="Test2">Test2</DropdownItem>
                        <DropdownItem value="Test3">Test3</DropdownItem>
                    </Dropdown>
                </CardContent>

                <CardContent>
                    <CardTitle>Normal Dropdowns with Form Affix</CardTitle>
                    <Dropdown placeholder="Dropdown" inputPrefix={<FormAffix icon="icon-search"/>} expandFull={true}>
                        <DropdownItem value="Test1">Test1</DropdownItem>
                        <DropdownItem value="Test2">Test2</DropdownItem>
                        <DropdownItem value="Test3">Test3</DropdownItem>
                    </Dropdown>
                </CardContent>

                <CardContent>
                    <CardTitle>Normal Dropdowns</CardTitle>
                    <Dropdown placeholder="Dropdown" expandFull={true}>
                        <DropdownItem value="Test1">Test1</DropdownItem>
                        <DropdownItem value="Test2">Test2</DropdownItem>
                        <DropdownItem value="Test3">Test3</DropdownItem>
                    </Dropdown>
                </CardContent>
            </Card>

            <Card className="card-border">
                <CardInfo>
                    <CardTitle>Form Controls - Numeric Field</CardTitle>
                </CardInfo>
                <CardContent>
                    <CardTitle>Side Placement</CardTitle>
                    <NumericField min={1} max={20} value={5} step={.01} fieldName="Items Per Page" enableSuggestion={true} suggestionLimit={5} callbackFn={testNumericFieldCallback} ref={testRef} fieldControlPlacement="side"/>
                </CardContent>
                <CardContent>
                    <CardTitle>Top Placement</CardTitle>
                    <NumericField min={1} max={20} value={5} step={.01} fieldName="Items Per Page" enableSuggestion={true} suggestionLimit={5} callbackFn={testNumericFieldCallback} ref={testRef} fieldControlPlacement="top"/>
                </CardContent>
                <CardContent>
                    <CardTitle>Bottom Placement</CardTitle>
                    <NumericField min={1} max={20} value={5} step={.01} fieldName="Items Per Page" enableSuggestion={true} suggestionLimit={5} callbackFn={testNumericFieldCallback} ref={testRef} fieldControlPlacement="bottom"/>
                </CardContent>
            </Card>

            <Card className="card-border">
                <CardInfo>
                    <CardTitle>Form Controls - Text Field</CardTitle>
                </CardInfo>
                <CardContent>
                    <TextField 
                        placeholder="Username" 
                        type="text"
                        expandFull={true} 
                        inputPrefix={<FormAffix icon="icon-search"/>}
                        inputSuffix={<FontAwesomeIcon icon="eye" style={{padding: '0 5px'}}/>}
                        label="Username:"
                    />
                </CardContent>
            </Card>

            <Card className="card-border">
                <CardInfo>
                    <CardTitle>Form Controls - Range Slider</CardTitle>
                </CardInfo>
                <CardContent>
                   <RangeSlider defaultValue={40} label="Default Theme Slider" displayMinMaxText={{min: true, max: true}} onChange={updateSliderValue}/>
                   <RangeSlider defaultValue={30} label="Gray Theme Slider" theme="gray"/>
                   <RangeSlider defaultValue={60} label="Dark Theme Slider" theme="dark"/>
                </CardContent>
            </Card>
        </React.Fragment>
  )
}

export default FormUIsDemo;