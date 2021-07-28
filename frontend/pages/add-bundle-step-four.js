import React, { Component } from 'react';
import { EmptyState, Layout, Page, Card, Stack, Heading, Badge, Banner, Icon, Button, VideoThumbnail, MediaCard, TextStyle, ProgressBar, Select, TextField, ButtonGroup, DisplayText, FormLayout, DatePicker, Checkbox, Collapsible, TextContainer, RadioButton, Modal } from '@shopify/polaris';
import AppFooter from './appfooter';
import AppNavigation from './appnavigation';
import AddBundleNav from './add-bundle-nav';
import AddBundleLeftSection from './add-bundle-left-section';
import { baseUrl } from './baseUrl';
import { Context } from '@shopify/app-bridge-react';
import { Redirect } from '@shopify/app-bridge/actions';
import Link from 'next/link';
import store from 'store-js';
// import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import { ChevronLeftMinor, ChevronRightMinor, DeleteMajor } from '@shopify/polaris-icons';
const axios = require('axios');


const imgStyle = {
    borderWidth: '',
    borderRadius: '',
    borderColor: '',
    boxShadow: '',
    borderStyle: '',
    width: ''
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
    { label: 'Antonio', value: 'antonio', className: 'antonio mb_2' },
    { label: 'Lato', value: 'lato', className: 'lato mb_2' },
    { label: 'Lobster', value: 'lobster', className: 'lobster mb_2' },
    { label: 'Nunito', value: 'nunito', className: 'nunito mb_2' },
    { label: 'Open Sans', value: 'opensans', className: 'opensans mb_2' },
    { label: 'Poppins', value: 'poppins', className: 'poppins mb_2' },
    { label: 'Raleway', value: 'raleway', className: 'raleway mb_2' },
    { label: 'Roboto', value: 'roboto', className: 'roboto mb_2' },
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

class AddBundleStepFour extends Component {
    state = {
        value: 'disabled',
        disabled: true,
        showModal: false,
        productRedirectURL: '',
        showConfetti: false,
        // alignmentOpen: true,
        displayColorPicker: false,
        displayImageShadowPicker: false,
        displayImageBorderPicker: false,
        displayButtonShadowPicker: false,
        displayButtonBorderPicker: false,
        displayButtonColorPicker: false,
        displayButtonBgColorPicker: false,
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
        redirect: false,
        selectedFontWeight: '400',
        buttonBorderColor: { r: 34, g: 128, b: 96, a: 0.99 },
        buttonBorderRadius: '5',
        buttonBorderWidth: '0',
        buttonShadowX: '0',
        buttonShadowY: '0',
        buttonShadowBlur: '7',
        buttonShadowSpread: '4',
        buttonShadowColor: { r: 34, g: 128, b: 96, a: 0.99 },
        buttonAlignment: 'left',
        buttonFontType: 'regular',
        selectedButtonFontWeight: '400',
        isButtonItalic: false,
        isButtonUnderline: false,
        products: [],
        finalProducts: []
    }

    handleRadioChange = (e, v) => {
        console.log(e)
        console.log(v)
        if (v === 'bundle_visible') {
            this.setState({ showModal: true })
        } else {
            this.setState({ showModal: false })
        }
    }

    componentDidMount() {
        console.log(store.get('bId'))

        var self = this;
        setTimeout(function () {
            if (store.get('bId') !== undefined && store.get('bId') !== '' && store.get('bId') !== null) {
                axios.post(baseUrl + '/get-bundle-by-id/' + store.get('bId'))
                    .then(function (response) {
                        console.log("in did moount");
                        console.log(response.data.data[0].shopName);
                        if (response.data.responseCode === '200' || response.data.responseCode === 200) {
                            if (response.data.data[0].shopName !== '') {
                                const productRedirectURL = "https://" + response.data.data[0].shopName + "/products/" + response.data.data[0].products[0].handle;
                                self.setState({ productRedirectURL: productRedirectURL });
                                var products = [];
                                products = response.data.data[0];


                                // products.map((p, i) => {
                                //     if (!p['productCountByUser']) {
                                //         p['productCountByUser'] = '1';
                                //     }
                                // })
                                console.log("kkkk");
                                console.log(products);
                                self.setState({
                                    products: products,
                                    finalProducts: response.data.data[0].products,
                                    bundle_message: response.data.data[0].bundleMessage
                                })

                                const { alignment, fontSize, imageBorderRadius, buttonFontSize, animationGlow, animationShake, animationButtonSize, buttonColor, buttonBgColor, fontColor, FontFamily, FontType, FontWeight, imageShadowX, imageShadowY, imageShadowBlur, imageShadowSpread, imageShadowColor, imageBorderWidth, imageBorderColor, buttonBorderColor, buttonBorderRadius, buttonBorderWidth, buttonShadowX, buttonShadowY, buttonShadowBlur, buttonShadowSpread, buttonShadowColor, buttonAlignment, buttonFontType, ButtonFontWeight, isButtonItalic, isButtonUnderline } = response.data.data[0];

                                self.setState({
                                    alignment: alignment,
                                    fontSize: fontSize,
                                    imageBorderRadius: imageBorderRadius,
                                    buttonFontSize: buttonFontSize,
                                    selectedGlow: animationGlow,
                                    selectedShake: animationShake,
                                    selectedButtonSize: animationButtonSize,
                                    buttonColor: {
                                        r: buttonColor[0].r,
                                        g: buttonColor[0].g,
                                        b: buttonColor[0].b,
                                        a: buttonColor[0].a
                                    },
                                    buttonBgColor: {
                                        r: buttonBgColor[0].r,
                                        g: buttonBgColor[0].g,
                                        b: buttonBgColor[0].b,
                                        a: buttonBgColor[0].a
                                    },
                                    color: {
                                        r: fontColor[0].r,
                                        g: fontColor[0].g,
                                        b: fontColor[0].b,
                                        a: fontColor[0].a
                                    },

                                    selectedFontFamily: FontFamily,
                                    selectedFontWeight: FontWeight,
                                    selectedFontType: FontType,
                                    imageShadowX: imageShadowX,
                                    imageShadowY: imageShadowY,
                                    imageShadowBlur: imageShadowBlur,
                                    imageShadowSpread: imageShadowSpread,
                                    imageShadowColor: {
                                        r: imageShadowColor[0].r,
                                        g: imageShadowColor[0].g,
                                        b: imageShadowColor[0].b,
                                        a: imageShadowColor[0].a
                                    },
                                    imageBorderRadius: imageBorderRadius,
                                    imageBorderWidth: imageBorderWidth,
                                    imageBorderColor: {
                                        r: imageBorderColor[0].r,
                                        g: imageBorderColor[0].g,
                                        b: imageBorderColor[0].b,
                                        a: imageBorderColor[0].a
                                    },
                                    buttonBorderColor: {
                                        r: buttonBorderColor[0].r,
                                        g: buttonBorderColor[0].g,
                                        b: buttonBorderColor[0].b,
                                        a: buttonBorderColor[0].a
                                    },
                                    buttonBorderRadius: buttonBorderRadius,
                                    buttonBorderWidth: buttonBorderWidth,
                                    buttonShadowX: buttonShadowX,
                                    buttonShadowY: buttonShadowY,
                                    buttonShadowBlur: buttonShadowBlur,
                                    buttonShadowSpread: buttonShadowSpread,
                                    buttonShadowColor: {
                                        r: buttonShadowColor[0].r,
                                        g: buttonShadowColor[0].g,
                                        b: buttonShadowColor[0].b,
                                        a: buttonShadowColor[0].a
                                    },
                                    buttonAlignment: buttonAlignment,
                                    buttonFontSize: buttonFontSize,
                                    buttonFontType: buttonFontType,
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

    handleModalSecondary = () => {
        this.setState({ showModal: !this.state.showModal });
    }

    handleModalPrimary = () => {
        this.setState({ showModal: !this.state.showModal });
    }

    launchBundle = () => {

        var self = this;

        self.setState({
            showConfetti: true
        });

        console.log('okok')

        if (!store.get('bId')) {
            alert('Please save the bundle from prev steps first');
            return;
        }


        axios.post(baseUrl + '/launchBundle', {
            id: store.get('bId'),
        })
            .then(function (response) {
                // handle success
                console.log(response.data);
                if (response.data.responseCode === 200) {
                    console.log('ifififif')
                    // const { width, height } = useWindowSize();




                    setTimeout(() => {
                        < Confetti
                            run={false}
                        />
                        self.setState({ redirect: true }, function () { })
                    }, 5000);

                }
            })
            .catch(function (error) {
                // handle error
                console.log(error);
                // this.setState({ redirect: false }, function () { })
            })

        // self.setState({ redirect: true }, function () { })
    }

    static contextType = Context;


    render() {
        const app = this.context;
        // const launchAndRedirect = async () => {

        //     await this.launchBundle();

        if (this.state.redirect) {
            const redirect = Redirect.create(app);
            redirect.dispatch(
                Redirect.Action.APP,
                '/bundles',
            );
        }
        // };
        const { showModal } = this.state;

        console.log(this.state.showConfetti)

        console.log(this.state)
        const { finalProducts, alignmentOpen, textOpen, productImageOpen, buttonOpen, animationOpen, fontSize, color, imageBorderRadius, buttonColor, buttonBgColor, buttonFontSize, selectedGlow, selectedShake, selectedButtonSize, selectedFontWeight, imageShadowX, imageShadowY, imageShadowBlur, imageShadowSpread, imageShadowColor, imageBorderWidth, imageBorderColor, buttonBorderColor, buttonBorderRadius, buttonBorderWidth, buttonShadowX, buttonShadowY, buttonShadowBlur, buttonShadowSpread, buttonShadowColor, buttonAlignment, buttonFontType, selectedButtonFontWeight, isButtonItalic, isButtonUnderline, selectedFontFamily, selectedFontType, products } = this.state;
        console.log(this.state.products.length)

        console.log(this.state.color.length)
        var btn_animation = "";
        if (this.state.animationShake == 'shake') {
            var btn_animationshake = '-webkit-animation-name: shake; animation-name: shake; animation-duration: 5s; animation-iteration-count: infinite; animation-timing-function: ease-in;';
        }

        if (this.state.color.length != "") {
            var rgbcolor = this.state.color.r + ',' + this.state.color.g + ',' + this.state.color.b + ',' + this.state.color.a;
            console.log(rgbcolor)
        }
        if (this.state.imageBorderColor.length != "") {
            var imageBColor = this.state.imageBorderColor.r + ',' + this.state.imageBorderColor.g + ',' + this.state.imageBorderColor.b + ',' + this.state.imageBorderColor.a;
            console.log(imageBColor)
        }

        if (this.state.imageShadowColor.length != "") {
            var imageSColor = this.state.imageShadowColor.r + ',' + this.state.imageShadowColor.g + ',' + this.state.imageShadowColor.b + ',' + this.state.imageShadowColor.a;
            console.log(rgbcolor)
        }

        if (this.state.selectedFontType == "regular") {
            var fweight = 'normal';
            var fstyle = 'normal';
        }
        if (this.state.selectedFontType == "bold") {
            var fweight = 'bold';
            var fstyle = 'normal';
        }
        if (this.state.selectedFontType == "italic") {
            var fweight = 'normal';
            var fstyle = 'italic';
        }
        if (this.state.selectedFontType == "bold_italic") {
            var fweight = 'bold';
            var fstyle = 'italic';
        }


        var imageStyle = this.state.imageShadowX + 'px ' +
            this.state.imageShadowY + 'px ' +
            this.state.imageShadowBlur + 'px ' +
            this.state.imageShadowSpread + 'px ' +
            'rgba(' + imageSColor + ')';
        console.log(imageStyle);


        var btn_background = ''; var btn_color = ''; var btn_bordercolor = ''; var btn_shadowCol = '';
        //console.log(this.state.buttonBgColor)
        if (this.state.buttonBgColor != "") {
            btn_background = this.state.buttonBgColor.r + ',' + this.state.buttonBgColor.g + ',' + this.state.buttonBgColor.b + ',' + this.state.buttonBgColor.a;
        }
        //console.log(this.state.buttonColor)
        if (this.state.buttonColor != "") {
            btn_color = this.state.buttonColor.r + ',' + this.state.buttonColor.g + ',' + this.state.buttonColor.b + ',' + this.state.buttonColor.a;
        }

        if (this.state.buttonBorderColor != "") {
            btn_bordercolor = this.state.buttonBorderColor.r + ',' + this.state.buttonBorderColor.g + ',' + this.state.buttonBorderColor.b + ',' + this.state.buttonBorderColor.a;
        }
        var btn_borderRadius = this.state.buttonBorderRadius;
        var btn_borderWidth = this.state.buttonBorderWidth;
        var btn_fontSize = this.state.buttonFontSize;
        var btn_alignment = this.state.buttonAlignment;

        console.log(this.state.buttonShadowColor)
        if (this.state.buttonShadowColor != "") {
            if (this.state.buttonShadowColor.r != '') {
                console.log("if");
                console.log(this.state.buttonShadowColor.r);
                btn_shadowCol = 'rgba(' + this.state.buttonShadowColor.r + ',' + this.state.buttonShadowColor.g + ',' + this.state.buttonShadowColor.b + ',' + this.state.buttonShadowColor.a + ')';
            } else {
                console.log("else");
                btn_shadowCol = this.state.buttonShadowColor;
            }
        }
        var btn_shadow = this.state.buttonShadowX + 'px ' + this.state.buttonShadowY + 'px ' + this.state.buttonShadowBlur + 'px ' + this.state.buttonShadowSpread + 'px ' + btn_shadowCol;
        console.log(btn_shadowCol)
        var btn_animation = "";
        if (this.state.animationShake == 'shake') {
            var btn_animationshake = '-webkit-animation-name: shake; animation-name: shake; animation-duration: 5s; animation-iteration-count: infinite; animation-timing-function: ease-in;';
        }

        if (this.state.animationButtonSize == 'big_button') {
            var btn_animation = 'padding:20px 20px !important';
        } else if (this.state.animationButtonSize == 'small_button') {
            var btn_animation = 'padding:10px 10px !important';
        } else {
            var btn_animation = '-webkit-animation-name: pulse-grow-on-hover; animation-name: pulse-grow-on-hover; -webkit-animation-duration: 0.3s; animation-duration: 0.3s; -webkit-animation-timing-function: linear; animation-timing-function: linear; -webkit-animation-iteration-count: infinite; animation-iteration-count: infinite;-webkit-animation-direction: alternate; animation-direction: alternate; ';
        }
        var btn_glow = "";
        if (this.state.animationGlow == 'glow_left_right') {
            var btn_glow = 'box-shadow: 3px 2px 5px 0px rgba(' + btn_background + '); border: 0px solid rgba(' + btn_bordercolor + ' ) !important';
        } else if (this.state.animationGlow == 'glow_right_left') {
            var btn_glow = 'box-shadow: -3px 2px 5px 0px rgba(' + btn_background + '); border: 0px solid rgba(' + btn_bordercolor + ' ) !important';
        } else if (this.state.animationGlow == 'glow_right') {
            var btn_glow = 'box-shadow: 0px 3px 4px -1px rgba(' + btn_background + '); border: 0px solid rgba(' + btn_bordercolor + ' ) !important';
        } else {
            var btn_glow = 'box-shadow: 0px 0px 7px 0px rgba(' + btn_background + '); border: 1px solid rgba(' + btn_bordercolor + ' ) !important';
        }
        return (
            <React.Fragment>
                <AppNavigation />

                <Page>

                    {
                        this.state.showConfetti && <Confetti
                            width={window.innerWidth - 200}
                            height={'600'}
                        />
                    }

                    <AddBundleNav />

                    <Layout>
                        <Layout.Section oneHalf>
                            <Card sectioned title="Preview your bundle">
                                <div className="bundlePreview">
                                    <div className="bundleTitle mb_2" style={{ fontFamily: this.state.selectedFontFamily, fontSize: this.state.fontSize + "px", fontWeight: fweight, fontStyle: fstyle, textAlign: this.state.alignment, color: 'rgba(' + rgbcolor + ')' }}>{this.state.products.bundleMessage} </div>
                                    {
                                        this.state.finalProducts.length > 0 ?
                                            this.state.finalProducts.map((item, idx, arr) => {
                                                return <div className="mb_1 product-container" key={idx}>
                                                    <Stack wrap={false} distribution="" alignment="center">
                                                        <div className="imageContainer">
                                                            {
                                                                store.get('bId') !== undefined && store.get('bId') !== '' && store.get('bId') !== null
                                                                    ?
                                                                    <img style={{
                                                                        boxShadow: imageStyle, borderRadius: this.state.imageBorderRadius + "px", borderWidth: this.state.imageBorderWidth + "px", borderStyle: 'solid', borderColor: 'rgba(' + imageBColor + ')',

                                                                    }}
                                                                        src={item.images[0].originalSrc}
                                                                        alt={item.images[0].altText}
                                                                    />
                                                                    :
                                                                    <img style={imgStyle} />
                                                            }
                                                        </div>
                                                        <p>{item.title}</p>
                                                    </Stack>

                                                    {
                                                        arr.length - 1 === idx ? '' : <div className="plusSymbol"><Badge> + </Badge></div>
                                                    }
                                                </div>
                                            })
                                            : ''

                                    }
                                    <div className="cartButton">
                                        <button style={{ btn_animationshake, boxShadow: btn_shadow, padding: '15px 15px', width: 'auto', color: 'rgba(' + btn_color + ')', fontSize: btn_fontSize + 'px', textAlign: btn_alignment, background: 'rgba(' + btn_background + ')', borderColor: 'rgba(' + btn_bordercolor + ')' }}>Add to Cart</button>
                                    </div>
                                </div>
                            </Card>
                        </Layout.Section>


                        <Layout.Section oneHalf>
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
                                    <ProgressBar progress={100} size="small" />
                                    <TextStyle variation="positive">Customize & Launch</TextStyle>
                                </span>
                            </Stack>


                            <div className="mt_2 text_center">
                                <Card sectioned>
                                    <Stack vertical>
                                        <p className="py_2">
                                            <DisplayText size="small">Visit the product page to ensure the bundle is displayed on the page</DisplayText>
                                            <TextContainer>
                                                <p className="pt_2 mb_2">Use the preview on the left to confirm it is displayed accounting to your settings</p>
                                                <a href={this.state.productRedirectURL} external target='_blank' className="productLink">
                                                    <Button primary>Go to Product Page <i className="fa fa-external-link" aria-hidden="true"></i></Button>
                                                </a>

                                            </TextContainer>

                                            <TextStyle variation="subdued"><p className="my_2"> The Go to product page button above opens a new tab and once that is confirmed the button below starts to animate to click Confirm and Launch - after clicking next a frop down appears like bellow </p></TextStyle>

                                            <Button primary
                                                // onClick={() => launchAndRedirect()}
                                                onClick={() => this.launchBundle()}
                                            >Confirm & Launch </Button>

                                        </p>
                                    </Stack>

                                </Card>
                            </div>

                            <div className="mt_2 ">
                                <Card sectioned>
                                    <Stack vertical>
                                        <p className="py_2">
                                            <DisplayText size="small">Result</DisplayText>
                                            <RadioButton
                                                label={<TextStyle variation="positive">
                                                    😃 I've completed above steps and I can see the bundle</TextStyle>}
                                                value='disabled'
                                                // checked={value === 'disabled'}
                                                // id="disabled"
                                                name="bundle_v"
                                                onChange={(e) => this.handleRadioChange(e, 'bundle_visible')}
                                            />

                                            <RadioButton
                                                label={<p>😌 I've completed above steps and I still can't see the bundle</p>}
                                                // value='disabled'
                                                // checked={value === 'disabled'}
                                                // id="disabled"
                                                name="bundle_v"
                                                onChange={(e) => this.handleRadioChange(e, 'bundle_not_visible')}
                                            />
                                        </p>
                                    </Stack>
                                </Card>
                            </div>

                            <div className="float_right mt_2">
                                <ButtonGroup segmented>
                                    <Link href="/add-bundle-step-three">
                                        <Button >
                                            <Icon
                                                source={ChevronLeftMinor}
                                                color="base" />
                                        </Button>
                                    </Link>
                                </ButtonGroup>
                            </div>

                            <div style={{ height: '500px' }}>
                                <Modal
                                    // activator={<Button >Open</Button>}
                                    open={showModal}
                                    onClose={() => this.setState({ showModal: !this.state.showModal })}
                                    title="Please Leave a quick review :)"
                                    primaryAction={{
                                        content: "Sure!",
                                        onAction: this.handleModalPrimary,
                                    }}
                                    secondaryActions={[
                                        {
                                            content: "No I'm having issues",
                                            onAction: this.handleModalSecondary,
                                        },
                                    ]}
                                >
                                    <Modal.Section>
                                        <TextContainer>
                                            <p>
                                                Awesome, you are all set up. Fancy leaving a quich 10 sec review if you like the app? If you are having issues then please contact us directly istead.
                                            </p>
                                        </TextContainer>
                                    </Modal.Section>
                                </Modal>
                            </div>


                        </Layout.Section>
                    </Layout>

                </Page>

                <AppFooter />
            </React.Fragment>
        );
    }
}

export default AddBundleStepFour;