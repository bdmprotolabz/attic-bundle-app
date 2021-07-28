import React, { Component } from 'react';
import { EmptyState, Layout, Page, Card, Stack, Button, TextStyle, ProgressBar, Select, RadioButton, TextField, ButtonGroup, DisplayText, FormLayout, DatePicker, Checkbox, Collapsible, TextContainer, Icon } from '@shopify/polaris';
import AppFooter from './appfooter';
import AppNavigation from './appnavigation';
import AddBundleNav from './add-bundle-nav';
import AddBundleLeftSection from './add-bundle-left-section';
import { ChevronLeftMinor, ChevronRightMinor, DeleteMajor, TextAlignmentLeftMajor, TextAlignmentCenterMajor, TextAlignmentRightMajor } from '@shopify/polaris-icons';
import store from 'store-js';
import { baseUrl } from './baseUrl';
import { Context } from '@shopify/app-bridge-react';
import { Redirect } from '@shopify/app-bridge/actions';
import Link from 'next/link';
import { ChromePicker, SketchPicker } from 'react-color';

const axios = require('axios');

const options = [
    { label: 'Select', value: '' },
    { label: 'Glow from Left', value: 'glow_left' },
    { label: 'Glow from Right', value: 'glow_right' },
    { label: 'Glow from Top', value: 'glow_top' },
    { label: 'Glow from Bottom', value: 'glow_bottom' },
    { label: 'Shake', value: 'shake' },
    { label: 'Make button Bigger', value: 'big_button' },
    { label: 'Make button Smaller', value: 'small_button' },
];

const fontWeightOptions = [
    { label: 'Select', value: '' },
    { label: '100', value: '100' },
    { label: '200', value: '200' },
    { label: '300', value: '300' },
    { label: '400', value: '400' },
    { label: '500', value: '500' },
    { label: '600', value: '600' },
    { label: '700', value: '700' },
    { label: '800', value: '800' },
    { label: '900', value: '900' },
];

const fontFamilyOptions = [
    { label: 'Select', value: '' },
    { label: 'Raleway', value: 'Raleway' },
    { label: 'Roboto', value: 'Roboto' },
    { label: 'Nunito', value: 'Nunito' },
    { label: 'Poppins', value: 'Poppins' },
    { label: 'Lato', value: 'Lato' },
];

class AddBundleStepThree extends Component {
    state = {
        // alignmentOpen: true,
        textOpen: true,
        productImageOpen: false,
        buttonOpen: false,
        animationOpen: false,
        alignment: 'left',
        fontSize: '18',
        color: '#000000',
        imageBorderRadius: '5',
        buttonColor: '#ffffff',
        buttonBgColor: '#228060',
        buttonFontSize: '14',
        fontColor: '',
        selected: 'big_button',      // ----ANIMATION
        redirect: false,
        selectedFontWeight: '400',
        isItalic: false,
        isUnderline: false,
        imageShadowX: '0',
        imageShadowY: '0',
        imageShadowBlur: '7',
        imageShadowSpread: '4',
        imageShadowColor: '#4e4e4e',
        imageBorderWidth: '0',
        imageBorderColor: '#ffffff',
        buttonBorderColor: '#228060',
        buttonBorderRadius: '5',
        buttonBorderWidth: '0',
        buttonShadowX: '0',
        buttonShadowY: '0',
        buttonShadowBlur: '7',
        buttonShadowSpread: '4',
        buttonShadowColor: '#4e4e4e',
        buttonAlignment: 'left',
        selectedButtonFontWeight: '400',
        isButtonItalic: false,
        isButtonUnderline: false,
        selectedFontFamily: 'Raleway'
    }

    handleRadioChange = (e, v) => {
        // console.log(e, v)
        this.setState({ alignment: v })
    }

    handleButtonRadioChange = (e, v) => {
        console.log(e, v)
        this.setState({ buttonAlignment: v })
    }

    handleChange = (field) => {
        return (value) => this.setState({ [field]: value });
    };

    handleChangeComplete = (color) => {
        console.log(color)
        this.setState({ color: color.hex });
    };

    handleColorChange = (e, type) => {
        console.log(e.target.value)
        var t = '';
        if (type === 'fontColor') {
            // t = 'color';
            this.setState({ color: e.target.value })
        }
        if (type === 'buttonColor') {
            this.setState({ buttonColor: e.target.value })
        }
        if (type === 'buttonBgColor') {
            this.setState({ buttonBgColor: e.target.value })
        }
        if (type === 'imageShadowColor') {
            this.setState({ imageShadowColor: e.target.value })
        }
        if (type === 'imageBorderColor') {
            this.setState({ imageBorderColor: e.target.value })
        }
        if (type === 'buttonBorderColor') {
            this.setState({ buttonBorderColor: e.target.value })
        }
        if (type === 'buttonShadowColor') {
            this.setState({ buttonShadowColor: e.target.value })
        }
    }

    handleSelectChange = (e) => {
        console.log(e)
        this.setState({ selected: e })
    }

    handlefontWeightChange = (field) => {
        // console.log(e)
        return (value) => this.setState({ [field]: value });
    }
    handleButtonfontWeightChange = (field) => {
        // console.log(e)
        return (value) => this.setState({ [field]: value });
    }

    handleItalicChange = () => {
        this.setState({ isItalic: !this.state.isItalic })
    }

    handleUnderlineChange = () => {
        this.setState({ isUnderline: !this.state.isUnderline })
    }

    handleButtonItalicChange = () => {
        this.setState({ isButtonItalic: !this.state.isButtonItalic })
    }

    handleButtonUnderlineChange = () => {
        this.setState({ isButtonUnderline: !this.state.isButtonUnderline })
    }

    saveStepThree = () => {
        console.log('okok')

        if (!store.get('bId')) {
            alert('Please save the bundle from prev steps first');
            return;
        }

        var self = this;

        axios.post(baseUrl + '/save-step-three', {
            id: store.get('bId'),
            alignment: this.state.alignment,
            fontSize: this.state.fontSize,
            fontColor: this.state.color,
            imageBorderRadius: this.state.imageBorderRadius,
            buttonColor: this.state.buttonColor,
            buttonBgColor: this.state.buttonBgColor,
            buttonFontSize: this.state.buttonFontSize,
            animation: this.state.selected,

            FontFamily: this.state.selectedFontFamily,
            FontWeight: this.state.selectedFontWeight,
            isUnderline: this.state.isUnderline,
            isItalic: this.state.isItalic,
            imageShadowX: this.state.imageShadowX,
            imageShadowY: this.state.imageShadowY,
            imageShadowBlur: this.state.imageShadowBlur,
            imageShadowSpread: this.state.imageShadowSpread,
            imageShadowColor: this.state.imageShadowColor,
            imageBorderRadius: this.state.imageBorderRadius,
            imageBorderWidth: this.state.imageBorderWidth,
            imageBorderColor: this.state.imageBorderColor,
            buttonBorderColor: this.state.buttonBorderColor,
            buttonBorderRadius: this.state.buttonBorderRadius,
            buttonBorderWidth: this.state.buttonBorderWidth,
            buttonShadowX: this.state.buttonShadowX,
            buttonShadowY: this.state.buttonShadowY,
            buttonShadowBlur: this.state.buttonShadowBlur,
            buttonShadowSpread: this.state.buttonShadowSpread,
            buttonShadowColor: this.state.buttonShadowColor,
            buttonAlignment: this.state.buttonAlignment,
            buttonFontSize: this.state.buttonFontSize,
            ButtonFontWeight: this.state.selectedButtonFontWeight,
            isButtonItalic: this.state.isButtonItalic,
            isButtonUnderline: this.state.isButtonUnderline,

        })
            .then(function (response) {
                // handle success
                console.log(response.data);
                if (response.data.responseCode == 200) {

                    self.setState({ redirect: true }, function () { })
                }
            })
            .catch(function (error) {
                // handle error
                console.log(error);
                // this.setState({ redirect: false }, function () { })
            })

        self.setState({ redirect: true }, function () { })
    }

    componentDidMount() {
        console.log(store.get('bId'))

        var self = this;
        setTimeout(function () {
            if (store.get('bId') !== undefined && store.get('bId') !== '' && store.get('bId') !== null) {
                axios.post(baseUrl + '/get-bundle-by-id/' + store.get('bId'))
                    .then(function (response) {
                        console.log(response.data);

                        if (response.data.responseCode === '200' || response.data.responseCode === 200) {

                            if (response.data.data[0].alignment !== '') {
                                const { alignment, fontSize, imageBorderRadius, buttonFontSize, animation, buttonColor, buttonBgColor, fontColor, FontFamily, FontWeight, isUnderline, isItalic, imageShadowX, imageShadowY, imageShadowBlur, imageShadowSpread, imageShadowColor, imageBorderWidth, imageBorderColor, buttonBorderColor, buttonBorderRadius, buttonBorderWidth, buttonShadowX, buttonShadowY, buttonShadowBlur, buttonShadowSpread, buttonShadowColor, buttonAlignment,  ButtonFontWeight, isButtonItalic, isButtonUnderline } = response.data.data[0];

                                self.setState({
                                    alignment: alignment,
                                    fontSize: fontSize,
                                    imageBorderRadius: imageBorderRadius,
                                    buttonFontSize: buttonFontSize,
                                    selected: animation,
                                    buttonColor: buttonColor,
                                    buttonBgColor: buttonBgColor,
                                    color: fontColor,

                                    selectedFontFamily: FontFamily,
                                    selectedFontWeight: FontWeight,
                                    isUnderline: isUnderline,
                                    isItalic: isItalic,
                                    imageShadowX: imageShadowX,
                                    imageShadowY: imageShadowY,
                                    imageShadowBlur: imageShadowBlur,
                                    imageShadowSpread: imageShadowSpread,
                                    imageShadowColor: imageShadowColor,
                                    imageBorderRadius: imageBorderRadius,
                                    imageBorderWidth: imageBorderWidth,
                                    imageBorderColor: imageBorderColor,
                                    buttonBorderColor: buttonBorderColor,
                                    buttonBorderRadius: buttonBorderRadius,
                                    buttonBorderWidth: buttonBorderWidth,
                                    buttonShadowX: buttonShadowX,
                                    buttonShadowY: buttonShadowY,
                                    buttonShadowBlur: buttonShadowBlur,
                                    buttonShadowSpread: buttonShadowSpread,
                                    buttonShadowColor: buttonShadowColor,
                                    buttonAlignment: buttonAlignment,
                                    buttonFontSize: buttonFontSize,
                                    selectedButtonFontWeight: ButtonFontWeight,
                                    isButtonItalic: isButtonItalic,
                                    isButtonUnderline: isButtonUnderline,

                                })

                            }
                        }

                    })
                    .catch(function (error) {
                        console.log(error);
                    });

            }
        }, 2000)

    }

    static contextType = Context;

    render() {

        const app = this.context;

        const saveDataAndRedirect = async () => {

            await this.saveStepThree();

            if (this.state.redirect) {
                const redirect = Redirect.create(app);
                redirect.dispatch(
                    Redirect.Action.APP,
                    '/add-bundle-step-four',
                );
            }
        };

        console.log(this.state)
        const { alignmentOpen, textOpen, productImageOpen, buttonOpen, animationOpen, fontSize, color, imageBorderRadius, buttonColor, buttonBgColor, buttonFontSize, selected, selectedFontWeight, isItalic, isUnderline, imageShadowX, imageShadowY, imageShadowBlur, imageShadowSpread, imageShadowColor, imageBorderWidth, imageBorderColor, buttonBorderColor, buttonBorderRadius, buttonBorderWidth, buttonShadowX, buttonShadowY, buttonShadowBlur, buttonShadowSpread, buttonShadowColor, buttonAlignment, selectedButtonFontWeight, isButtonItalic, isButtonUnderline, selectedFontFamily } = this.state;

        return (
            <React.Fragment>
                <AppNavigation />

                <Page>

                    <AddBundleNav />

                    <Layout>
                        <Layout.Section secondary>
                            <AddBundleLeftSection />
                        </Layout.Section>


                        <Layout.Section >
                            <Stack wrap={false} distribution="fill" spacing="extraTight">
                                <span>
                                    <ProgressBar progress={100} size="small" />
                                    <TextStyle variation="positive">Create bundle</TextStyle>
                                </span>

                                <span>
                                    <ProgressBar progress={100} size="small" />
                                    <TextStyle variation="positive">Choose products</TextStyle>
                                </span>

                                <span>
                                    <ProgressBar progress={100} size="small" />
                                    <TextStyle variation="positive">Build offer &nbsp;   &nbsp;  &nbsp; </TextStyle>
                                </span>

                                <span>
                                    <ProgressBar progress={0} size="small" />
                                    <TextStyle variation="subdued">Customize & Launch</TextStyle>
                                </span>
                            </Stack>


                            {/* <div className="mt_2">
                                <Card sectioned>
                                    <Button
                                        onClick={() => this.setState({ alignmentOpen: !this.state.alignmentOpen })}
                                        ariaExpanded={alignmentOpen}
                                        ariaControls="basic-collapsible"
                                        fullWidth
                                        pressed={alignmentOpen}
                                    >
                                        Alignment & Position
                                    </Button>
                                    <Stack vertical>
                                        <Collapsible
                                            open={alignmentOpen}
                                            id="basic-collapsible"
                                            transition={{ duration: '500ms', timingFunction: 'ease-in-out' }}
                                            expandOnPrint
                                        >
                                            <br />
                                            <TextContainer>
                                                <Stack vertical>
                                                    <RadioButton
                                                        label="Left"
                                                        value='left'
                                                        checked={this.state.alignment === 'left'}
                                                        // id="disabled"
                                                        name="alignment"
                                                        onChange={(e) => this.handleRadioChange(e, 'left')}
                                                    />
                                                    <RadioButton
                                                        label="Center"
                                                        value='center'
                                                        checked={this.state.alignment === 'center'}
                                                        // id="disabled"
                                                        name="alignment"
                                                        onChange={(e) => this.handleRadioChange(e, 'center')}
                                                    />
                                                    <RadioButton
                                                        label="Right"
                                                        value='right'
                                                        checked={this.state.alignment === 'right'}
                                                        // id="disabled"
                                                        name="alignment"
                                                        onChange={(e) => this.handleRadioChange(e, 'right')}
                                                    />
                                                </Stack>
                                            </TextContainer>
                                        </Collapsible>
                                    </Stack>
                                </Card>
                            </div> */}


                            {/* 
                                Text settings
                            */}
                            <div className="mt_2">
                                <Card sectioned>
                                    <Button
                                        onClick={() => this.setState({ textOpen: !this.state.textOpen })}
                                        ariaExpanded={textOpen}
                                        ariaControls="basic-collapsible"
                                        fullWidth
                                        pressed={textOpen}
                                    >
                                        Text
                                    </Button>
                                    <br />
                                    <Stack vertical>
                                        <Collapsible
                                            open={textOpen}
                                            id="basic-collapsible"
                                            transition={{ duration: '500ms', timingFunction: 'ease-in-out' }}
                                            expandOnPrint
                                        >
                                            <TextContainer>
                                                <Card.Section>
                                                    <Stack distribution="fillEvenly">
                                                        <Select
                                                            label="Font Family"
                                                            options={fontFamilyOptions}
                                                            onChange={this.handlefontWeightChange('selectedFontFamily')}
                                                            value={selectedFontFamily}
                                                        />

                                                        <TextField
                                                            label="Font Size"
                                                            type="number"
                                                            value={fontSize}
                                                            onChange={this.handleChange('fontSize')}
                                                            suffix={'PX'}
                                                            id="fontSize"
                                                            placeholder="18"
                                                        />

                                                    </Stack>
                                                    
                                                </Card.Section>
                                                <Card.Section>
                                                    <TextStyle>Alignment & Position</TextStyle>
                                                    <Stack distribution="fill">
                                                        <div>
                                                            <RadioButton
                                                                label={"Left "}
                                                                value='left'
                                                                checked={this.state.alignment === 'left'}
                                                                // id="disabled"
                                                                name="alignment"
                                                                onChange={(e) => this.handleRadioChange(e, 'left')}
                                                            /> &nbsp; &nbsp;
                                                            <i class="fa fa-align-left"></i>
                                                        </div>
                                                      
                                                        <div>
                                                        <RadioButton
                                                            label="Center"
                                                            value='center'
                                                            checked={this.state.alignment === 'center'}
                                                            // id="disabled"
                                                            name="alignment"
                                                            onChange={(e) => this.handleRadioChange(e, 'center')}
                                                        />
                                                        &nbsp; &nbsp;
                                                            <i class="fa fa-align-center"></i>
                                                        </div>

                                                        <div>
                                                        <RadioButton
                                                            label="Right"
                                                            value='right'
                                                            checked={this.state.alignment === 'right'}
                                                            // id="disabled"
                                                            name="alignment"
                                                            onChange={(e) => this.handleRadioChange(e, 'right')}
                                                        />
                                                        &nbsp; &nbsp;
                                                            <i class="fa fa-align-right"></i>
                                                        </div>
                                                    </Stack>
                                                </Card.Section>

                                                <Card.Section>
                                                    <Stack vertical>
                                                        <div>
                                                            <p>Font Color</p>
                                                        {/* <ChromePicker 
                                                            color={ this.state.color }
                                                            onChangeComplete={ this.handleChangeComplete }
                                                            disableAlpha={false}
                                                        />  */}
                                                        <ChromePicker
                                                         color={ this.state.color }
                                                         onChangeComplete={ this.handleChangeComplete } />
                                                            {/* <input type="color" className="inputColor" value={color} onChange={(e) => this.handleColorChange(e, 'fontColor')} /> */}
                                                        </div>
                                                    </Stack>
                                                </Card.Section>

                                                {/* <Card.Section>
                                                    
                                                </Card.Section> */}

                                                <Card.Section>
                                                    <Select
                                                        label="Font Weight"
                                                        options={fontWeightOptions}
                                                        onChange={this.handlefontWeightChange('selectedFontWeight')}
                                                        value={selectedFontWeight}
                                                    />
                                                </Card.Section>

                                                <Card.Section title="">
                                                    <Stack distribution="fill">

                                                        <Checkbox
                                                            label="Italic"
                                                            checked={isItalic}
                                                            onChange={this.handleItalicChange}
                                                        />

                                                        <Checkbox
                                                            label="Underline"
                                                            checked={isUnderline}
                                                            onChange={this.handleUnderlineChange}
                                                        />
                                                    </Stack>
                                                </Card.Section>
                                            </TextContainer>
                                        </Collapsible>
                                    </Stack>
                                </Card>
                            </div>


                            {/* 
                                Image settings
                            */}
                            <div className="mt_2">
                                <Card sectioned>
                                    <Button
                                        onClick={() => this.setState({ productImageOpen: !this.state.productImageOpen })}
                                        ariaExpanded={productImageOpen}
                                        ariaControls="basic-collapsible"
                                        fullWidth
                                        pressed={productImageOpen}
                                    >
                                        Product Image
                                    </Button>
                                    <Stack vertical>
                                        <Collapsible
                                            open={productImageOpen}
                                            id="basic-collapsible"
                                            transition={{ duration: '500ms', timingFunction: 'ease-in-out' }}
                                            expandOnPrint
                                        >
                                            <br />
                                            <TextContainer>
                                                <Card.Section>
                                                    <p><b>Image Shadow</b></p>
                                                    <Stack wrap={false} distribution="fill">
                                                        <TextField
                                                            label="X offset"
                                                            type="number"
                                                            value={imageShadowX}
                                                            onChange={this.handleChange('imageShadowX')}
                                                            suffix={'PX'}
                                                            id="imageShadowX"
                                                            placeholder="0"
                                                            helpText="Horizontal shadow"
                                                        />
                                                        <TextField
                                                            label="Y offset"
                                                            type="number"
                                                            value={imageShadowY}
                                                            onChange={this.handleChange('imageShadowY')}
                                                            suffix={'PX'}
                                                            id="imageShadowY"
                                                            placeholder="0"
                                                            helpText="Vertical shadow"
                                                        />
                                                        <TextField
                                                            label="Blur"
                                                            type="number"
                                                            value={imageShadowBlur}
                                                            onChange={this.handleChange('imageShadowBlur')}
                                                            suffix={'PX'}
                                                            id="imageShadowBlur"
                                                            placeholder="7"
                                                        />
                                                        <TextField
                                                            label="Spread"
                                                            type="number"
                                                            value={imageShadowSpread}
                                                            onChange={this.handleChange('imageShadowSpread')}
                                                            suffix={'PX'}
                                                            id="imageShadowSpread"
                                                            placeholder="4"
                                                        />

                                                    </Stack>
                                                    <br />
                                                    <Stack distribution="fillEvenly">
                                                        <div>
                                                            <p>Shadow Color</p>
                                                            <input type="color" className="inputColor" value={imageShadowColor} onChange={(e) => this.handleColorChange(e, 'imageShadowColor')} /></div>
                                                    </Stack>
                                                </Card.Section>

                                                <Card.Section>
                                                    <TextField
                                                        label="Image Border Radius"
                                                        type="number"
                                                        value={imageBorderRadius}
                                                        onChange={this.handleChange('imageBorderRadius')}
                                                        suffix={'PX'}
                                                        id="imageBorderRadius"
                                                        placeholder="18"
                                                        helpText="More radius will make image more rounded"
                                                    />
                                                </Card.Section>

                                                <Card.Section>
                                                    <TextField
                                                        label="Border Width"
                                                        type="number"
                                                        value={imageBorderWidth}
                                                        onChange={this.handleChange('imageBorderWidth')}
                                                        suffix={'PX'}
                                                        id="imageBorderWidth"
                                                        placeholder="18"
                                                        helpText="More radius will make image more rounded"
                                                    />
                                                </Card.Section>
                                               
                                                <Card.Section>
                                                    <div>
                                                        <p>Border Color</p>
                                                        <input type="color" className="inputColor" value={imageBorderColor} onChange={(e) => this.handleColorChange(e, 'imageBorderColor')} /></div>
                                                </Card.Section>

                                            </TextContainer>
                                        </Collapsible>
                                    </Stack>
                                </Card>
                            </div>

                            <div className="mt_2">
                                <Card sectioned>
                                    <Button
                                        onClick={() => this.setState({ buttonOpen: !this.state.buttonOpen })}
                                        ariaExpanded={buttonOpen}
                                        ariaControls="basic-collapsible"
                                        fullWidth
                                        pressed={buttonOpen}
                                    >
                                        Button
                                    </Button>
                                    <Stack vertical>
                                        <Collapsible
                                            open={buttonOpen}
                                            id="basic-collapsible"
                                            transition={{ duration: '500ms', timingFunction: 'ease-in-out' }}
                                            expandOnPrint
                                        >
                                            <TextContainer>
                                                <Card.Section>
                                                    <div className="mt_2">
                                                        <Stack distribution="fillEvenly">
                                                            <div>
                                                                <p>Button Color</p>
                                                                <input type="color" className="inputColor" value={buttonColor} onChange={(e) => this.handleColorChange(e, 'buttonColor')} />
                                                            </div>

                                                            <div>
                                                                <p>Button Background Color</p>
                                                                <input type="color" className="inputColor" value={buttonBgColor} onChange={(e) => this.handleColorChange(e, 'buttonBgColor')} />
                                                            </div>

                                                            <div>
                                                                <p>Button Border Color</p>
                                                                <input type="color" className="inputColor" value={buttonBorderColor} onChange={(e) => this.handleColorChange(e, 'buttonBorderColor')} />
                                                            </div>
                                                        </Stack>
                                                    </div>
                                                </Card.Section>

                                                <Card.Section>
                                                    <Stack distribution="fillEvenly">
                                                        <TextField
                                                            label="Button Border Radius"
                                                            type="number"
                                                            value={buttonBorderRadius}
                                                            onChange={this.handleChange('buttonBorderRadius')}
                                                            suffix={'PX'}
                                                            id="buttonBorderRadius"
                                                            placeholder="5"
                                                        />
                                                        <TextField
                                                            label="Button Border Width"
                                                            type="number"
                                                            value={buttonBorderWidth}
                                                            onChange={this.handleChange('buttonBorderWidth')}
                                                            suffix={'PX'}
                                                            id="buttonBorderWidth"
                                                            placeholder="0"
                                                        />
                                                    </Stack>
                                                </Card.Section>

                                                <Card.Section>
                                                    <p>Button Shadow</p>
                                                    <Stack wrap={false} distribution="fill">
                                                        <TextField
                                                            label="X offset"
                                                            type="number"
                                                            value={buttonShadowX}
                                                            onChange={this.handleChange('buttonShadowX')}
                                                            suffix={'PX'}
                                                            id="buttonShadowX"
                                                            placeholder="0"
                                                            helpText="Horizontal shadow"
                                                        />
                                                        <TextField
                                                            label="Y offset"
                                                            type="number"
                                                            value={buttonShadowY}
                                                            onChange={this.handleChange('buttonShadowY')}
                                                            suffix={'PX'}
                                                            id="buttonShadowY"
                                                            placeholder="0"
                                                            helpText="Vertical shadow"
                                                        />
                                                        <TextField
                                                            label="Blur"
                                                            type="number"
                                                            value={buttonShadowBlur}
                                                            onChange={this.handleChange('buttonShadowBlur')}
                                                            suffix={'PX'}
                                                            id="buttonShadowBlur"
                                                            placeholder="7"
                                                        />
                                                        <TextField
                                                            label="Spread"
                                                            type="number"
                                                            value={buttonShadowSpread}
                                                            onChange={this.handleChange('buttonShadowSpread')}
                                                            suffix={'PX'}
                                                            id="buttonShadowSpread"
                                                            placeholder="4"
                                                        />

                                                    </Stack>
                                                    <br />
                                                    <Stack distribution="fillEvenly">
                                                        <div>
                                                            <p>Shadow Color</p>
                                                            <input type="color" className="inputColor" value={buttonShadowColor} onChange={(e) => this.handleColorChange(e, 'buttonShadowColor')} /></div>
                                                    </Stack>
                                                </Card.Section>

                                                <Card.Section>
                                                    <TextStyle>Alignment & Position</TextStyle>
                                                    <Stack distribution="fill">
                                                        <RadioButton
                                                            label="Left"
                                                            value='left'
                                                            checked={buttonAlignment === 'left'}
                                                            // id="disabled"
                                                            name="buttonAlignment"
                                                            onChange={(e) => this.handleButtonRadioChange(e, 'left')}
                                                        />
                                                        <RadioButton
                                                            label="Center"
                                                            value='center'
                                                            checked={buttonAlignment === 'center'}
                                                            // id="disabled"
                                                            name="buttonAlignment"
                                                            onChange={(e) => this.handleButtonRadioChange(e, 'center')}
                                                        />
                                                        <RadioButton
                                                            label="Right"
                                                            value='right'
                                                            checked={buttonAlignment === 'right'}
                                                            // id="disabled"
                                                            name="buttonAlignment"
                                                            onChange={(e) => this.handleButtonRadioChange(e, 'right')}
                                                        />
                                                    </Stack>
                                                </Card.Section>

                                                <Card.Section>
                                                    <TextField
                                                        label="Button Font Size"
                                                        type="number"
                                                        value={buttonFontSize}
                                                        onChange={this.handleChange('buttonFontSize')}
                                                        suffix={'PX'}
                                                        id="buttonFontSize"
                                                        placeholder="18"
                                                    />
                                                </Card.Section>
                                                <Card.Section>
                                                    <Select
                                                        label="Font Weight"
                                                        options={fontWeightOptions}
                                                        onChange={this.handlefontWeightChange('selectedButtonFontWeight')}
                                                        value={selectedButtonFontWeight}
                                                    />

                                                </Card.Section>

                                                <Card.Section title="">
                                                    <Stack distribution="fill">
                                                        <Checkbox
                                                            label="Italic"
                                                            checked={isButtonItalic}
                                                            onChange={this.handleButtonItalicChange}
                                                        />

                                                        <Checkbox
                                                            label="Underline"
                                                            checked={isButtonUnderline}
                                                            onChange={this.handleButtonUnderlineChange}
                                                        />
                                                    </Stack>
                                                </Card.Section>

                                            </TextContainer>

                                        </Collapsible>
                                    </Stack>
                                </Card>
                            </div>

                            <div className="mt_1">
                                <Card sectioned>
                                    <Button
                                        onClick={() => this.setState({ animationOpen: !this.state.animationOpen })}
                                        ariaExpanded={animationOpen}
                                        ariaControls="basic-collapsible"
                                        fullWidth
                                        pressed={animationOpen}
                                    >
                                        Animation
                                    </Button>
                                    <Stack vertical>
                                        <Collapsible
                                            open={animationOpen}
                                            id="basic-collapsible"
                                            transition={{ duration: '500ms', timingFunction: 'ease-in-out' }}
                                            expandOnPrint
                                        >
                                            <br />
                                            <TextContainer>
                                                <Stack vertical>
                                                    <Select
                                                        label=""
                                                        options={options}
                                                        onChange={this.handleSelectChange}
                                                        value={selected}
                                                    />
                                                </Stack>
                                            </TextContainer>
                                        </Collapsible>
                                    </Stack>
                                </Card>
                            </div>

                            <br />
                            <div className="float_right my_2">
                                <ButtonGroup segmented>
                                    <Link href="/add-bundle-step-two">
                                        <Button >
                                            <Icon
                                                source={ChevronLeftMinor}
                                                color="base" />
                                        </Button>
                                    </Link>
                                    <Button onClick={() => saveDataAndRedirect()}>
                                        <Icon
                                            source={ChevronRightMinor}
                                            color="base" /></Button>
                                </ButtonGroup>
                            </div>

                        </Layout.Section>
                    </Layout>

                </Page>

                <AppFooter />
            </React.Fragment>
        );
    }
}

export default AddBundleStepThree;