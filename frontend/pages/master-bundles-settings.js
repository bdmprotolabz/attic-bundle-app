import React, { Component } from 'react';
import { EmptyState, Layout, Page, Card, Stack, Button, TextStyle, ProgressBar, Select, RadioButton, TextField, ButtonGroup, DisplayText, FormLayout, DatePicker, Checkbox, Collapsible, TextContainer, Icon } from '@shopify/polaris';
import AppFooter from './appfooter';
import AppNavigation from './appnavigation';
import { ChromePicker, SketchPicker } from 'react-color';
import AddBundleNav from './add-bundle-nav';
import AddBundleLeftSection from './add-bundle-left-section';
import { ChevronLeftMinor, ChevronRightMinor, DeleteMajor, TextAlignmentLeftMajor, TextAlignmentCenterMajor, TextAlignmentRightMajor } from '@shopify/polaris-icons';
import store from 'store-js';
import { baseUrl } from './baseUrl';
import { Context } from '@shopify/app-bridge-react';
import { Redirect } from '@shopify/app-bridge/actions';
import Link from 'next/link';
import reactCSS from 'reactcss'

    const axios = require('axios');
    if(store.get('selectedDatais') === undefined || store.get('selectedDatais') === '' || store.get('selectedDatais') === null) {
        console.log("00000");
        var idArray = [];
        var selectedBundles = [
            { label: 'Bundle-one', value: 'Bundle-one', className:"p_3"},
            { label: 'Bundle-two', value: 'Bundle-two', className:"p_3" },
            { label: 'Bundle-three', value: 'Bundle-three', className:"p_3" },
        ];
    }else{
        console.log("yesyes" + store.get('selectedDatais'));
        var str = store.get('selectedDatais');
        var strarray= str.split('|');
        console.log("strarray is: " + strarray);
        var idArray = [];
        var nameArray =[];
        for(var i=0;i<strarray.length-1;i++){
            var newarr = strarray[i].split('##');
            console.log("id"+ newarr[0]+" ----- " + newarr[1]);
            idArray.push(newarr[0]);
            nameArray.push(newarr[1]);
        }
        //console.log("Name array is: " + nameArray);
        var selectedBundles=[];
        for(var j=0; j<nameArray.length;j++){
            selectedBundles[j] ={
                label: nameArray[j],
                value: nameArray[j],
                className:"p_3"
            };
        }
        console.log(selectedBundles);
    }

    const animationGlowOptions = [
        { label: 'Select', value: '' },
        { label: 'Glow from Left to right', value: 'glow_left_right' },
        { label: 'Glow from right to left', value: 'glow_right_left' },
        { label: 'Glow from top to bottom', value: 'glow_right' },
        { label: 'Borders glowing', value: 'border_glow' },
    ];
    const animationShakeOptions = [
        { label: 'Select', value: '' },
        { label: 'Shake', value: 'shake' },
    ];
    const animationSizeOptions = [
        { label: 'Select', value: '' },
        { label: 'Make button Bigger', value: 'big_button' },
        { label: 'Make button Smaller', value: 'small_button' },
        { label: 'Pulsatinng', value: 'pulse' },
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
        { label: 'Default', value: '' },
        { label: 'Antonio', value: 'antonio', className:'antonio mb_2' },
        { label: 'Lato', value: 'lato', className:'lato mb_2' },
        { label: 'Lobster', value: 'lobster', className:'lobster mb_2' },
        { label: 'Nunito', value: 'nunito', className:'nunito mb_2' },
        { label: 'Open Sans', value: 'opensans', className:'opensans mb_2' },
        { label: 'Poppins', value: 'poppins', className:'poppins mb_2' },
        { label: 'Raleway', value: 'raleway', className:'raleway mb_2' },
        { label: 'Roboto', value: 'roboto', className:'roboto mb_2' },
    ];
    const fontTypeOptions = [
        { label: 'Select', value: '' },
        { label: 'Regular', value: 'regular' },
        { label: 'Bold', value: 'bold' },
        { label: 'Italic', value: 'italic' },
        { label: 'Bold italic', value: 'bold_italic' },
    ];
    const buttonFontTypeOptions = [
        { label: 'Select', value: '' },
        { label: 'Regular', value: 'regular' },
        { label: 'Bold', value: 'bold' },
        { label: 'Italic', value: 'italic' },
        { label: 'Bold italic', value: 'bold_italic' },
    ];
   

class MasterBundleSettings extends Component {
    state = {
        // alignmentOpen: true,
        selectedFontFamily: 'raleway',
        fontSize: '18',
        selectedFontType: 'regular',
        alignment: 'left',
        color: { r: 18, g: 18, b: 18, a: 0.99 },
        imageShadowX: '0',
        imageShadowY: '0',
        imageShadowBlur: '7',
        imageShadowSpread: '4',
        imageShadowColor: { r: 78, g: 78, b: 78, a: 0.99 },
        imageBorderColor: { r: 78, g: 78, b: 78, a: 0.99 },
        imageBorderRadius: '5',
        imageBorderWidth: '0',
        textOpen: true,
        productImageOpen: false,
        buttonOpen: false,
        animationOpen: false,
        buttonColor: { r: 255, g: 255, b: 255, a: 0.99 },
        buttonBgColor: { r: 34, g: 128, b: 96, a: 0.99 },
        buttonFontSize: '14',
        fontColor: '',
        selectedGlow: 'glow_left_right',      // ----ANIMATION GLOW
        selectedShake: 'shake',               // ----ANIMATION Shake
        selectedButtonSize: 'big_button',     // ----ANIMATION Button Size
        selectedFontWeight: '400',
        buttonBorderColor: { r: 34, g: 128, b: 96, a: 0.99 },
        buttonBorderRadius: '5',
        buttonBorderWidth: '0',
        buttonShadowX: '0',
        buttonShadowY: '0',
        buttonShadowBlur: '7',
        buttonShadowSpread: '4',
        buttonShadowColor: '#4e4e4e',
        buttonAlignment: 'left',
        buttonFontType:'regular',
        selectedButtonFontWeight: '400',
        isButtonItalic: false,
        isButtonUnderline: false,
        selectedBundle: "select",
    }
    
    handleRadioChange = (e, v) => {
        this.setState({ alignment: v })
    }

    handleButtonRadioChange = (e, v) => {
        this.setState({ buttonAlignment: v })
    }

    handleChange = (field) => {
        return (value) => this.setState({ [field]: value });
    };

    handleFontColorChange = (color) => {
        this.setState({ color: color.rgb });
    };

    handleImageShadowColor = (color) => {
        this.setState({ imageShadowColor: color.rgb });
    };

    handleImageBorderColor = (color) => {
        this.setState({ imageBorderColor: color.rgb });
    };

    handleButtonColor = (color) => {
        this.setState({ buttonColor: color.rgb });
    };

    handleButtonBgColor = (color) => {
        this.setState({ buttonBgColor: color.rgb });
    };

    handleButtonBorderColor = (color) => {
        this.setState({ buttonBorderColor: color.rgb });
    };

    handleButtonShadowColor = (color) => {
        this.setState({ buttonShadowColor: color.rgb });
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

    handleSelectChangeGlow = (e) => {
        // console.log("here" + e)
        this.setState({ selectedGlow: e })
    }
    handleSelectChangeShake = (e) => {
        console.log("here" + e)
        this.setState({ selectedShake: e })
    }
    handleSelectChangeButtonSize = (e) => {
        this.setState({ selectedButtonSize: e })
    }

    handlefontWeightChange = (field) => {
        return (value) => this.setState({ [field]: value });
    }

    handlefontTypeChange = (field) => {
        return (value) => this.setState({ [field]: value });
    }

    handlebuttonfontTypeChange = (field) => {
        return (value) => this.setState({ [field]: value });
    }

    handleButtonfontWeightChange = (field) => {
        return (value) => this.setState({ [field]: value });
    }

    handleButtonItalicChange = () => {
        this.setState({ isButtonItalic: !this.state.isButtonItalic })
    }

    handleButtonUnderlineChange = () => {
        this.setState({ isButtonUnderline: !this.state.isButtonUnderline })
    }
    
    saveStepThree = () => {

        if (!idArray) {
            alert('Please save the bundle from prev steps first');
            return;
        }

        var self = this;

        axios.post(baseUrl + '/saveMasterEditSettings', {
            id: idArray,
            alignment: this.state.alignment,
            fontSize: this.state.fontSize,
            fontColor: this.state.color,
            imageBorderRadius: this.state.imageBorderRadius,
            buttonColor: this.state.buttonColor,
            buttonBgColor: this.state.buttonBgColor,
            buttonFontSize: this.state.buttonFontSize,
            animationGlow: this.state.selectedGlow,
            animationShake: this.state.selectedShake,
            animationButtonSize: this.state.selectedButtonSize,

            FontFamily: this.state.selectedFontFamily,
            FontWeight: this.state.selectedFontWeight,
            FontType: this.state.selectedFontType,
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
            buttonFontType: this.state.buttonFontType,
        })
        .then(function (response) {
            // handle success
            // console.log(response.data);
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

    handleClick = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    };

    handleClose = () => {
        this.setState({ displayColorPicker: false })
    };

    handleImageShadowClick = () => {
        this.setState({ displayImageShadowPicker: !this.state.displayImageShadowPicker })
    };

    handleImageShadowClose = () => {
        this.setState({ displayImageShadowPicker: false })
    };

    handleImageBorderClick = () => {
        this.setState({ displayImageBorderPicker: !this.state.displayImageBorderPicker })
    };

    handleImageBorderClose = () => {
        this.setState({ displayImageBorderPicker: false })
    };

    handleButtonShadowClick = () => {
        this.setState({ displayButtonShadowPicker: !this.state.displayButtonShadowPicker })
    };

    handleButtonShadowClose = () => {
        this.setState({ displayButtonShadowPicker: false })
    };

    handleButtonBorderClick = () => {
        this.setState({ displayButtonBorderPicker: !this.state.displayButtonBorderPicker })
    };

    handleButtonBorderClose = () => {
        this.setState({ displayButtonBorderPicker: false })
    };

    handleButtonColorClick = () => {
        this.setState({ displayButtonColorPicker: !this.state.displayButtonColorPicker })
    };

    handleButtonColorClose = () => {
        this.setState({ displayButtonColorPicker: false })
    };

    handleButtonBgColorClick = () => {
        this.setState({ displayButtonBgColorPicker: !this.state.displayButtonBgColorPicker })
    };

    handleButtonBgColorClose = () => {
        this.setState({ displayButtonBgColorPicker: false })
    };

    static contextType = Context;

    render(){
        const app = this.context;

        const saveDataAndRedirect = async () => {

            await this.saveStepThree();

            if (this.state.redirect) {
                const redirect = Redirect.create(app);
                console.log("redirect is " + redirect);
                redirect.dispatch(
                    Redirect.Action.APP,
                    '/master-bundles-settings-success',
                );
            }
        };

        const redirectBack = async () => {
            const redirect = Redirect.create(app);
            console.log("redirect is " + redirect);
            redirect.dispatch(
                Redirect.Action.APP,
                '/bundle-design',
            );
        }

        console.log(this.state)
        const { alignmentOpen, textOpen, productImageOpen, buttonOpen, animationOpen, fontSize, color, imageBorderRadius, buttonColor, buttonBgColor, buttonFontSize, selectedGlow,selectedShake,selectedButtonSize, selectedFontWeight, imageShadowX, imageShadowY, imageShadowBlur, imageShadowSpread, imageShadowColor, imageBorderWidth, imageBorderColor, buttonBorderColor, buttonBorderRadius, buttonBorderWidth, buttonShadowX, buttonShadowY, buttonShadowBlur, buttonShadowSpread, buttonShadowColor, buttonAlignment, buttonFontType, selectedButtonFontWeight, isButtonItalic, isButtonUnderline, selectedFontFamily, selectedFontType,selectedBundle } = this.state;

        const styles = reactCSS({
          'default': {
            color: {
              width: '210px',
              height: '16px',
              borderRadius: '2px',
              background: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`,
            },
            Shadowcolor: {
              width: '210px',
              height: '16px',
              borderRadius: '2px',
              background: `rgba(${ this.state.imageShadowColor.r }, ${ this.state.imageShadowColor.g }, ${ this.state.imageShadowColor.b }, ${ this.state.imageShadowColor.a })`,
            },
            Bordercolor: {
              width: '210px',
              height: '16px',
              borderRadius: '2px',
              background: `rgba(${ this.state.imageBorderColor.r }, ${ this.state.imageBorderColor.g }, ${ this.state.imageBorderColor.b }, ${ this.state.imageBorderColor.a })`,
            },
            ButtonShadowColor: {
              width: '210px',
              height: '16px',
              borderRadius: '2px',
              background: `rgba(${ this.state.buttonShadowColor.r }, ${ this.state.buttonShadowColor.g }, ${ this.state.buttonShadowColor.b }, ${ this.state.buttonShadowColor.a })`,
            },
            ButtonBorderColor: {
              width: '210px',
              height: '16px',
              borderRadius: '2px',
              background: `rgba(${ this.state.buttonBorderColor.r }, ${ this.state.buttonBorderColor.g }, ${ this.state.buttonBorderColor.b }, ${ this.state.buttonBorderColor.a })`,
            },
            ButtonColor: {
              width: '210px',
              height: '16px',
              borderRadius: '2px',
              background: `rgba(${ this.state.buttonColor.r }, ${ this.state.buttonColor.g }, ${ this.state.buttonColor.b }, ${ this.state.buttonColor.a })`,
            },
            ButtonBgColor: {
              width: '210px',
              height: '16px',
              borderRadius: '2px',
              background: `rgba(${ this.state.buttonBgColor.r }, ${ this.state.buttonBgColor.g }, ${ this.state.buttonBgColor.b }, ${ this.state.buttonBgColor.a })`,
            },
            swatch: {
              padding: '5px',
              background: '#fff',
              borderRadius: '1px',
              boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
              display: 'inline-block',
              cursor: 'pointer',
            },
            popover: {
              position: 'absolute',
              zIndex: '99999',
            },
            cover: {
              position: 'fixed',
              top: '0px',
              right: '0px',
              bottom: '0px',
              left: '0px',
            },
            outerdiv: {
              margin:"0px",
            },
          },
        });
        return (
            <React.Fragment>
                <AppNavigation />
                <Page>
                    <div className="add_bundle_nav mb_3">
                        <div className="ContentSection text_white">
                            <span>The deisgn options you are about to edit will apply to the following bundles</span>
                        </div>
                        <div className="ContentSection2">
                            <Select 
                                readOnly 
                                options={selectedBundles} 
                                value={selectedBundle} 
                                onChange={this.handleChange('selectedbundle')}
                            />
                        </div>
                    </div>

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

                            <div className="mt_2">
                                <Card sectioned>
                                    <Card.Section spacing="none">
                                        <button
                                            className={textOpen ? 'primary_polaris ' : 'primary_polaris light_green'}
                                            onClick={() => this.setState({ textOpen: !this.state.textOpen })}
                                            ariaExpanded={textOpen}
                                            ariaControls="basic-collapsible"
                                            fullWidth
                                        // pressed={textOpen}
                                        // outline={!textOpen}
                                        // primary={textOpen}
                                        >Text</button>
                                        {/* <br /> */}
                                        <Stack vertical>
                                            <Collapsible
                                                open={textOpen}
                                                id="basic-collapsible"
                                                transition={{ duration: '500ms', timingFunction: 'ease-in-out' }}
                                                expandOnPrint
                                            >
                                                <TextContainer>
                                                    <Card.Section>
                                                        {/*<p style={{ 'fontSize': '18px' }} className={'mb_1  ' + selectedFontFamily}>
                                                            <TextStyle variation="positive">Quick Brown Fox Jumps Over The Lazy Dog</TextStyle>
                                                        </p>*/}

                                                        <Stack distribution="fillEvenly" wrap={false}>
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

                                                            <Select
                                                                label="Font Type"
                                                                options={fontTypeOptions}
                                                                onChange={this.handlefontTypeChange('selectedFontType')}
                                                                value={selectedFontType}
                                                            />
                                                        </Stack>
                                                    </Card.Section>

                                                    <Card.Section spacing="extra-tight">

                                                        <Stack horizontal distribution="fillEvenly">
                                                            <div>
                                                                <TextStyle>Alignment & Position</TextStyle>
                                                                <Stack horizontal distribution="fillEvenly">
                                                                    <Stack.Item fill>
                                                                        <div>
                                                                            <RadioButton
                                                                                label={"Left "}
                                                                                value='left'
                                                                                checked={this.state.alignment === 'left'}
                                                                                // id="disabled"
                                                                                name="alignment"
                                                                                onChange={(e) => this.handleRadioChange(e, 'left')}
                                                                            /> &nbsp; &nbsp;
                                                                            <i className="fa fa-align-left"></i>
                                                                        </div>
                                                                    </Stack.Item>
                                                                    <Stack.Item>
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
                                                                            <i className="fa fa-align-center"></i>
                                                                        </div>
                                                                    </Stack.Item>
                                                                    <Stack.Item>
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
                                                                            <i className="fa fa-align-right"></i>
                                                                        </div>
                                                                    </Stack.Item>
                                                                </Stack>
                                                            </div>
                                                            <div>
                                                                <p className="mb_1">Font Color</p>
                                                                <div style={ styles.outerdiv }>
                                                                    <div style={ styles.swatch } onClick={ this.handleClick }>
                                                                      <div style={ styles.color } />
                                                                    </div>
                                                                    { this.state.displayColorPicker ? <div style={ styles.popover }>
                                                                      <div style={ styles.cover } onClick={ this.handleClose }/>
                                                                      <SketchPicker color={ this.state.color } onChange={ this.handleFontColorChange } />
                                                                    </div> : null }
                                                                </div>
                                                            </div>
                                                        </Stack>
                                                    </Card.Section>
                                                </TextContainer>
                                            </Collapsible>
                                        </Stack>
                                    </Card.Section>

                                    <Card.Section>
                                        <div className="mt_1">
                                            {/* <Card sectioned> */}
                                            <button
                                                className={productImageOpen ? 'primary_polaris ' : 'primary_polaris light_green'}
                                                onClick={() => this.setState({ productImageOpen: !this.state.productImageOpen })}
                                                ariaExpanded={productImageOpen}
                                                ariaControls="basic-collapsible"
                                                fullWidth
                                            // pressed={productImageOpen}
                                            // primary={productImageOpen}
                                            >
                                                Product Image
                                            </button>
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
                                                                    <div style={ styles.outerdiv }>
                                                                        <div style={ styles.swatch } onClick={ this.handleImageShadowClick }>
                                                                          <div style={ styles.Shadowcolor } />
                                                                        </div>
                                                                        { this.state.displayImageShadowPicker ? <div style={ styles.popover }>
                                                                          <div style={ styles.cover } onClick={ this.handleImageShadowClose }/>
                                                                          <SketchPicker color={ imageShadowColor } onChange={ this.handleImageShadowColor } />
                                                                        </div> : null }
                                                                    </div>
                                                                </div>

                                                                <div>
                                                                    <p>Border Color</p>
                                                                    <div style={ styles.outerdiv }>
                                                                        <div style={ styles.swatch } onClick={ this.handleImageBorderClick }>
                                                                          <div style={ styles.Bordercolor } />
                                                                        </div>
                                                                        { this.state.displayImageBorderPicker ? <div style={ styles.popover }>
                                                                          <div style={ styles.cover } onClick={ this.handleImageBorderClose }/>
                                                                          <SketchPicker color={ imageBorderColor } onChange={ this.handleImageBorderColor } />
                                                                        </div> : null }
                                                                    </div>
                                                                </div>
                                                            </Stack>
                                                        </Card.Section>

                                                        <Card.Section>
                                                            <Stack distribution="fillEvenly" wrap={false}>
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
                                                                <TextField
                                                                    label="Border Width"
                                                                    type="number"
                                                                    value={imageBorderWidth}
                                                                    onChange={this.handleChange('imageBorderWidth')}
                                                                    suffix={'PX'}
                                                                    id="imageBorderWidth"
                                                                    placeholder="18"
                                                                />
                                                            </Stack>
                                                        </Card.Section>
                                                    </TextContainer>
                                                </Collapsible>
                                            </Stack>
                                            {/* </Card> */}
                                        </div>
                                    </Card.Section>
                                    {/* <Card sectioned> */}
                                    <Card.Section>
                                        <div className="mt_1">
                                            
                                            <button
                                                className={buttonOpen ? 'primary_polaris ' : 'primary_polaris light_green'}
                                                onClick={() => this.setState({ buttonOpen: !this.state.buttonOpen })}
                                                ariaExpanded={buttonOpen}
                                                ariaControls="basic-collapsible"
                                                fullWidth
                                            // pressed={buttonOpen}
                                            // primary={buttonOpen}
                                            >
                                                Button
                                            </button>
                                            <Stack vertical>
                                                <Collapsible
                                                    open={buttonOpen}
                                                    id="basic-collapsible"
                                                    transition={{ duration: '500ms', timingFunction: 'ease-in-out' }}
                                                    expandOnPrint
                                                >
                                                    <TextContainer>

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
                                                                    <div style={ styles.outerdiv }>
                                                                        <div style={ styles.swatch } onClick={ this.handleButtonShadowClick }>
                                                                          <div style={ styles.ButtonShadowColor } />
                                                                        </div>
                                                                        { this.state.displayButtonShadowPicker ? <div style={ styles.popover }>
                                                                          <div style={ styles.cover } onClick={ this.handleButtonShadowClose }/>
                                                                          <SketchPicker color={ buttonShadowColor } onChange={ this.handleButtonShadowColor } />
                                                                        </div> : null }
                                                                    </div>
                                                                    
                                                                </div>

                                                                <div>
                                                                    <p>Button Border Color</p>
                                                                    <div style={ styles.outerdiv }>
                                                                        <div style={ styles.swatch } onClick={ this.handleButtonBorderClick }>
                                                                          <div style={ styles.ButtonBorderColor } />
                                                                        </div>
                                                                        { this.state.displayButtonBorderPicker ? <div style={ styles.popover }>
                                                                          <div style={ styles.cover } onClick={ this.handleButtonBorderClose }/>
                                                                          <SketchPicker color={ buttonBorderColor } onChange={ this.handleButtonBorderColor } />
                                                                        </div> : null }
                                                                    </div>
                                                                </div>
                                                            </Stack>
                                                        </Card.Section>


                                                        <Card.Section>
                                                            <div className="mt_2">
                                                                <Stack distribution="fillEvenly">
                                                                    <div>
                                                                        <p>Button Color</p>
                                                                        <div style={ styles.outerdiv }>
                                                                            <div style={ styles.swatch } onClick={ this.handleButtonColorClick }>
                                                                              <div style={ styles.ButtonColor } />
                                                                            </div>
                                                                            { this.state.displayButtonColorPicker ? <div style={ styles.popover }>
                                                                              <div style={ styles.cover } onClick={ this.handleButtonColorClose }/>
                                                                              <SketchPicker color={ buttonColor } onChange={ this.handleButtonColor } />
                                                                            </div> : null }
                                                                        </div>
                                                                    </div>

                                                                    <div>
                                                                        <p>Button Background Color</p>
                                                                        <div style={ styles.outerdiv }>
                                                                            <div style={ styles.swatch } onClick={ this.handleButtonBgColorClick }>
                                                                              <div style={ styles.ButtonBgColor } />
                                                                            </div>
                                                                            { this.state.displayButtonBgColorPicker ? <div style={ styles.popover }>
                                                                              <div style={ styles.cover } onClick={ this.handleButtonBgColorClose }/>
                                                                              <SketchPicker color={ buttonBgColor } onChange={ this.handleButtonBgColor } />
                                                                            </div> : null }
                                                                        </div>
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
                                                            <Stack distribution="fillEvenly">
                                                                <TextField
                                                                    label="Button Font Size"
                                                                    type="number"
                                                                    value={buttonFontSize}
                                                                    onChange={this.handleChange('buttonFontSize')}
                                                                    suffix={'PX'}
                                                                    id="buttonFontSize"
                                                                    placeholder="18"
                                                                />
                                                                <Select
                                                                    label="Font Type"
                                                                    options={buttonFontTypeOptions}
                                                                    onChange={this.handlebuttonfontTypeChange('buttonFontType')}
                                                                    value={buttonFontType}
                                                                />
                                                                
                                                            </Stack>
                                                        </Card.Section>

                                                        <Card.Section>
                                                            <Stack horizontal distribution="fillEvenly">
                                                                <div>
                                                                    <TextStyle>Alignment & Position</TextStyle>
                                                                    <Stack horizontal distribution="fillEvenly">
                                                                        <Stack.Item fill>
                                                                            <div>
                                                                                <RadioButton
                                                                                    label="Left"
                                                                                    value='left'
                                                                                    checked={buttonAlignment === 'left'}
                                                                                    // id="disabled"
                                                                                    name="buttonAlignment"
                                                                                    onChange={(e) => this.handleButtonRadioChange(e, 'left')}
                                                                                /> &nbsp;&nbsp;
                                                                                <i className="fa fa-align-left"></i>
                                                                            </div>
                                                                        </Stack.Item>
                                                                        <Stack.Item>
                                                                            <div>
                                                                                <RadioButton
                                                                                    label="Center"
                                                                                    value='center'
                                                                                    checked={buttonAlignment === 'center'}
                                                                                    // id="disabled"
                                                                                    name="buttonAlignment"
                                                                                    onChange={(e) => this.handleButtonRadioChange(e, 'center')}
                                                                                /> &nbsp;&nbsp;
                                                                                <i className="fa fa-align-center"></i>
                                                                            </div>
                                                                        </Stack.Item>
                                                                        <Stack.Item>
                                                                            <div>
                                                                                <RadioButton
                                                                                    label="Right"
                                                                                    value='right'
                                                                                    checked={buttonAlignment === 'right'}
                                                                                    // id="disabled"
                                                                                    name="buttonAlignment"
                                                                                    onChange={(e) => this.handleButtonRadioChange(e, 'right')}
                                                                                /> &nbsp;&nbsp;
                                                                            <i className="fa fa-align-right"></i>
                                                                            </div>
                                                                        </Stack.Item>
                                                                    </Stack>
                                                                </div>

                                                                    
                                                            </Stack>
                                                        </Card.Section>

                                                    </TextContainer>

                                                </Collapsible>
                                            </Stack>
                                            {/* </Card> */}
                                        </div>
                                    </Card.Section>

                                    <Card.Section>
                                        <div className="mt_1">
                                            {/* <Card sectioned> */}
                                            <button
                                                className={animationOpen ? 'primary_polaris ' : 'primary_polaris light_green'}
                                                onClick={() => this.setState({ animationOpen: !this.state.animationOpen })}
                                                ariaExpanded={animationOpen}
                                                ariaControls="basic-collapsible"
                                                fullWidth
                                            // pressed={animationOpen}
                                            // primary={animationOpen}
                                            >
                                                Animation
                                            </button>
                                            <Stack vertical>
                                                <Collapsible
                                                    open={animationOpen}
                                                    id="basic-collapsible"
                                                    transition={{ duration: '500ms', timingFunction: 'ease-in-out' }}
                                                    expandOnPrint
                                                >
                                                    <br />
                                                    <TextContainer>
                                                        <Card.Section title="Glow">
                                                            <Select
                                                                label=""
                                                                options={animationGlowOptions}
                                                                onChange={this.handleSelectChangeGlow}
                                                                value={selectedGlow}
                                                            />
                                                        </Card.Section>

                                                        <Card.Section title="Shake">
                                                            <Select
                                                                label=""
                                                                options={animationShakeOptions}
                                                                onChange={this.handleSelectChangeShake}
                                                                value={selectedShake}
                                                            />
                                                        </Card.Section>

                                                        <Card.Section title="Size">
                                                            <Select
                                                                label=""
                                                                options={animationSizeOptions}
                                                                onChange={this.handleSelectChangeButtonSize}
                                                                value={selectedButtonSize}
                                                            />
                                                        </Card.Section>

                                                    </TextContainer>
                                                </Collapsible>
                                            </Stack>
                                            {/* </Card> */}
                                        </div>
                                    </Card.Section>
                                </Card>
                            </div>
                        </Layout.Section>
                    </Layout>
                    <div className="my_2">
                        <span>
                            <Button primary onClick={() => redirectBack()}>
                                Back to bundle list
                            </Button>
                        </span>
                        <span className="float_right">
                            <button className="Polaris-Button danger mr_1"> Delete </button>
                            <Button primary onClick={() => saveDataAndRedirect()}>
                                Save
                            </Button>
                        </span>
                    </div>
                </Page>
                <AppFooter />
            </React.Fragment>
        );
    }
}

export default MasterBundleSettings;