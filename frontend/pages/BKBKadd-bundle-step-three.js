import React, { Component } from 'react';
import { EmptyState, Layout, Page, Card, Stack, Button, TextStyle, ProgressBar, Select, RadioButton, TextField, ButtonGroup, DisplayText, FormLayout, DatePicker, Checkbox, Collapsible, TextContainer, Link, Icon } from '@shopify/polaris';
import AppFooter from './appfooter';
import AppNavigation from './appnavigation';
import AddBundleNav from './add-bundle-nav';
import AddBundleLeftSection from './add-bundle-left-section';
import { ChevronLeftMinor, ChevronRightMinor, DeleteMajor } from '@shopify/polaris-icons';
import store from 'store-js';
import { baseUrl } from './baseUrl';
import { Context } from '@shopify/app-bridge-react';
import { Redirect } from '@shopify/app-bridge/actions';

const axios = require('axios');

const options = [
    { label: 'Select', value: '' },
    { label: 'Left', value: 'left' },
    { label: 'Right', value: 'right' },
    { label: 'Top', value: 'top' },
    { label: 'Bottom', value: 'bottom' },
    { label: 'Fade In', value: 'fade_in' },
];

class AddBundleStepThree extends Component {
    state = {
        alignmentOpen: true,
        textOpen: false,
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
        selected: '',
        redirect: false
    }

    handleRadioChange = (e, v) => {
        // console.log(e, v)
        this.setState({ alignment: v })
    }

    handleChange = (field) => {
        return (value) => this.setState({ [field]: value });
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
    }

    handleSelectChange = (e) => {
        console.log(e)
        this.setState({ selected: e })
    }

    saveStepThree = () => {
        console.log('okok')

        if(!store.get('bId')) {
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
            if (store.get('bId') != undefined || store.get('bId') != '' || store.get('bId') != null) {
                axios.post(baseUrl + '/get-bundle-by-id/' + store.get('bId'))
                    .then(function (response) {
                        console.log(response.data);

                        if (response.data.responseCode === '200' || response.data.responseCode === 200) {
                            
                            const { alignment, fontSize, imageBorderRadius, buttonFontSize, animation, buttonColor, buttonBgColor, fontColor } = response.data.data[0];

                            self.setState({
                                alignment: alignment,
                                fontSize: fontSize,
                                imageBorderRadius: imageBorderRadius,
                                buttonFontSize: buttonFontSize,
                                selected: animation,
                                buttonColor: buttonColor,
                                buttonBgColor: buttonBgColor,
                                color: fontColor                                
                            })

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
        const { alignmentOpen, textOpen, productImageOpen, buttonOpen, animationOpen, fontSize, color, imageBorderRadius, buttonColor, buttonBgColor, buttonFontSize, selected } = this.state;

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


                            <div className="mt_2">
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
                            </div>

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
                                                <Stack vertical>
                                                    <TextField
                                                        label="Font Size"
                                                        type="number"
                                                        value={fontSize}
                                                        onChange={this.handleChange('fontSize')}
                                                        suffix={'PX'}
                                                        id="fontSize"
                                                        placeholder="18"
                                                    />

                                                    <div>
                                                        <p>Font Color</p>
                                                        <input type="color" className="inputColor" value={color} onChange={(e) => this.handleColorChange(e, 'fontColor')} />
                                                    </div>
                                                </Stack>
                                            </TextContainer>
                                        </Collapsible>
                                    </Stack>
                                </Card>
                            </div>

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
                                                <Stack vertical>
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
                                                </Stack>
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
                                                <Stack vertical>
                                                    <div>
                                                        <p>Button Color</p>
                                                        <input type="color" className="inputColor" value={buttonColor} onChange={(e) => this.handleColorChange(e, 'buttonColor')} />
                                                    </div>

                                                    <div>
                                                        <p>Button Background Color</p>
                                                        <input type="color" className="inputColor" value={buttonBgColor} onChange={(e) => this.handleColorChange(e, 'buttonBgColor')} />
                                                    </div>

                                                    <TextField
                                                        label="Button Font Size"
                                                        type="number"
                                                        value={buttonFontSize}
                                                        onChange={this.handleChange('buttonFontSize')}
                                                        suffix={'PX'}
                                                        id="buttonFontSize"
                                                        placeholder="18"
                                                    />

                                                </Stack>
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
                                    <Button >
                                        <Icon
                                            source={ChevronLeftMinor}
                                            color="base" />
                                    </Button>
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