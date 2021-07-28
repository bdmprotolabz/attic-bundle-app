import React, { Component } from 'react';
import { EmptyState, Layout, Page, Card, Stack, Heading, Badge, Banner, Icon, Button, VideoThumbnail, MediaCard, TextStyle, ProgressBar, Select, TextField, ButtonGroup, ResourceList, Avatar, ResourceItem, Thumbnail, Toast, Frame, Popover, ActionList } from '@shopify/polaris';
import { ResourcePicker } from '@shopify/app-bridge-react';
import AppFooter from './appfooter';
import AppNavigation from './appnavigation';
import AddBundleNav from './add-bundle-nav';
import ResourceListWithProducts from '../components/ResourceList';
import AddBundleLeftSection from './add-bundle-left-section';
import { ChevronLeftMinor, ChevronRightMinor } from '@shopify/polaris-icons';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Context } from '@shopify/app-bridge-react';
import { Redirect } from '@shopify/app-bridge/actions';
import { baseUrl } from './baseUrl';
import router from 'next/router'


const axios = require('axios');
const store = require('store-js');

// var Cookies = require('universal-cookie');

// const cookies = new Cookies();



const img = 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg';

const options = [
    { label: 'Standard', value: 'standard_bundle' },
    { label: 'Combo', value: 'combo_bundle' },
];


const GET_PRODUCTS_BY_ID = gql`
    query {
        shop {
            name
            description
            url
            timezoneOffset
            myshopifyDomain
            timezoneAbbreviation
        }
    }
`;

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

class EditBundleStepOne extends Component {
    state = {
        open: false,
        productPageDisplay: '',
        specific_products: false,
        specificProductsResource: false,
        embededCode: 'Some Code Here',
        selected: 'standard_bundle',
        bundle_name: '',
        bundle_tag: '',

        bundleProducts: false,
        showSpecificProducts: false,

        selectedProducts: [],
        selectedSpecificProducts: [],
        redirect: false,
        shopName: '',
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
        buttonFontType:'regular',
        selectedButtonFontWeight: '400',
        isButtonItalic: false,
        isButtonUnderline: false,
        products: [],
        finalProducts: []
    }

    handleSelection = (resources) => {
        console.log(resources);
        this.setState({ selectedProducts: resources.selection })
        // const idsFromResources = resources.selection.map((product) => product.id);
        // store.set('ids', idsFromResources);
        this.setState({
            bundleProducts: false,
            showSelectedProducts: true
        });

    };

    handleSpecificProductSelection = (resources) => {
        console.log(resources);
        this.setState({
            selectedSpecificProducts: resources.selection,
            showSpecificProducts: false
        })
        // const idsFromResources = resources.selection.map((product) => product.id);
        // store.set('ids', idsFromResources);
        // this.setState({ specificProductsResource: false });
    };

    handlefilterChange = (e) => {
        console.log(e.target.value)
        if (e.target.value === 'specific_products') {
            console.log('okok')
            this.setState({ specific_products: true })
        } else {
            this.setState({
                specific_products: false,
                specificProductsResource: false
            })
        }
        this.setState({ productPageDisplay: e.target.value });
        // console.log(this.state.productPageDisplay)
    };

    copyEmbededCode = () => {
        var copyText = this.state.embededCode;

        /* Select the text field */
        // copyText.select();
        copyText.setSelectionRange(0, 99999); /* For mobile devices */

        /* Copy the text inside the text field */
        document.execCommand("copy");

        /* Alert the copied text */
        console.log("Copied the text: " + copyText.value);
    }

    handleSelectChange = (e) => {
        console.log(e)
        this.setState({
            selected: e,
            selectedProducts: [],
            selectedSpecificProducts: []
        })
    }

    handleChange = (field) => {
        return (value) => this.setState({ [field]: value });
    };


    saveStepOne = () => {

        var self = this;

        var bundleDisplayProductss = [];

        if(this.state.productPageDisplay === 'specific_products') {
            bundleDisplayProductss = this.state.selectedSpecificProducts;
        }

        axios.post(baseUrl + '/update-step-one', {
            id: store.get('bId'),
            products: this.state.selectedProducts,
            bundleDisplay: this.state.productPageDisplay,
            bundleDisplayProducts: bundleDisplayProductss,
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
                // return 'errr';
                // this.setState({ redirect: false }, function () { })
            })
      
        self.setState({ redirect: true }, function () { })

    }


    showResource = (val) => {
        console.log('val---->>', val)

        if (val === 'bundleProducts') {
            this.setState({ bundleProducts: true });
        }
        if (val === 'showSpecificProducts') {
            this.setState({ showSpecificProducts: true });
        }
    }

    showBundleProducts() {
        // var selectMultiples = false;
        // if (this.state.selected === 'standard_bundle') {
        //     selectMultiples = false;
        // }
        // if (this.state.selected === 'combo_bundle') {
        //     selectMultiples = true;
        // }
        return <ResourcePicker
            resourceType="Product"
            showVariants={false}
            open={open}
            // selectMultiple={selectMultiples}
            onSelection={(resources) => this.handleSelection(resources)}
            onCancel={() => this.setState({ bundleProducts: false })}
        />;
    }

    showSpecificProducts() {
        return <ResourcePicker
            resourceType="Product"
            showVariants={false}
            open={open}
            onSelection={(resources) => this.handleSpecificProductSelection(resources)}
            onCancel={() => this.setState({ showSpecificProducts: false })}
        />;
    }

    componentDidMount() {
        console.log(store.get('bId'))

        var self = this;
        setTimeout(function () {
            if (store.get('bId') !== undefined && store.get('bId') !== '' && store.get('bId') !== null) {
                axios.post(baseUrl + '/get-bundle-by-id/' + store.get('bId'))
                    .then(function (response) {
                        console.log(response.data.data[0]);

                        if (response.data.responseCode === '200' || response.data.responseCode === 200) {

                            var products = [];
                            products = response.data.data[0];

                            self.setState({
                                selectedProducts: response.data.data[0].products,
                                productPageDisplay: response.data.data[0].bundleDisplay,
                                selectedSpecificProducts: response.data.data[0].bundleDisplayProducts,
                                embededCode: response.data.data[0].embededCode,
                                bundle_message: response.data.data[0].bundleMessage,
                            })

                            if(response.data.data[0].bundleDisplay === 'specific_products') {
                                self.setState({ specific_products: true })
                            }

                            console.log(products);
                            self.setState({
                                products:products,
                                finalProducts:response.data.data[0].products
                            })
                            
                            const { alignment, fontSize, imageBorderRadius, buttonFontSize, animationGlow, animationShake, animationButtonSize, buttonColor, buttonBgColor, fontColor, FontFamily,FontType, FontWeight, imageShadowX, imageShadowY, imageShadowBlur, imageShadowSpread, imageShadowColor, imageBorderWidth, imageBorderColor, buttonBorderColor, buttonBorderRadius, buttonBorderWidth, buttonShadowX, buttonShadowY, buttonShadowBlur, buttonShadowSpread, buttonShadowColor, buttonAlignment,buttonFontType, ButtonFontWeight, isButtonItalic, isButtonUnderline } = response.data.data[0];

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

                    })
                    .catch(function (error) {
                        console.log(error);
                    });

            }
        }, 2000)
    }


    static contextType = Context;

    static getInitialProps({query}) {
        return {query}
      }

    render() {

        const app = this.context;

        const redirectToProduct = async () => {

            await this.saveStepOne();

            if (this.state.redirect) {
                const redirect = Redirect.create(app);
                redirect.dispatch(
                    Redirect.Action.APP,
                    '/add-bundle-step-two',
                );
            }

        };


        console.log(this.state)
        const emptyState = !store.get('ids');
        const { specific_products, embededCode, selected, bundle_name, bundle_tag } = this.state;
        const { finalProducts, alignmentOpen, textOpen, productImageOpen, buttonOpen, animationOpen, fontSize, color, imageBorderRadius, buttonColor, buttonBgColor, buttonFontSize, selectedGlow,selectedShake,selectedButtonSize, selectedFontWeight, imageShadowX, imageShadowY, imageShadowBlur, imageShadowSpread, imageShadowColor, imageBorderWidth, imageBorderColor, buttonBorderColor, buttonBorderRadius, buttonBorderWidth, buttonShadowX, buttonShadowY, buttonShadowBlur, buttonShadowSpread, buttonShadowColor, buttonAlignment, buttonFontType, selectedButtonFontWeight, isButtonItalic, isButtonUnderline, selectedFontFamily, selectedFontType, products } = this.state;
        console.log(this.state.color.length)
        var btn_animation ="";
        if(this.state.animationShake=='shake'){
            var btn_animationshake= '-webkit-animation-name: shake; animation-name: shake; animation-duration: 5s; animation-iteration-count: infinite; animation-timing-function: ease-in;';
        }

        if(this.state.color.length!=""){
            var rgbcolor = this.state.color.r+','+this.state.color.g+','+this.state.color.b+','+this.state.color.a; 
            console.log(rgbcolor)
        }
        if(this.state.imageBorderColor.length!=""){
            var imageBColor = this.state.imageBorderColor.r+','+this.state.imageBorderColor.g+','+this.state.imageBorderColor.b+','+this.state.imageBorderColor.a; 
            console.log(imageBColor)
        }
        
        if(this.state.imageShadowColor.length!=""){
            var imageSColor = this.state.imageShadowColor.r+','+this.state.imageShadowColor.g+','+this.state.imageShadowColor.b+','+this.state.imageShadowColor.a; 
            console.log(rgbcolor)
        }

        if(this.state.selectedFontType=="regular"){
            var fweight = 'normal';
            var fstyle = 'normal';
        }
        if(this.state.selectedFontType=="bold"){
            var fweight = 'bold';
            var fstyle = 'normal';
        }
        if(this.state.selectedFontType=="italic"){
            var fweight = 'normal';
            var fstyle = 'italic';
        }
        if(this.state.selectedFontType=="bold_italic"){
            var fweight = 'bold';
            var fstyle = 'italic';
        }   
        

        var imageStyle= this.state.imageShadowX + 'px ' +
                        this.state.imageShadowY + 'px ' +
                        this.state.imageShadowBlur + 'px ' +
                        this.state.imageShadowSpread + 'px ' +
                        'rgba('+imageSColor+')';
        console.log(imageStyle);


        var btn_background=''; var btn_color=''; var btn_bordercolor=''; var btn_shadowCol='';
        //console.log(this.state.buttonBgColor)
        if(this.state.buttonBgColor!=""){
            btn_background = this.state.buttonBgColor.r+','+this.state.buttonBgColor.g+','+this.state.buttonBgColor.b+','+this.state.buttonBgColor.a;
        }
        //console.log(this.state.buttonColor)
        if(this.state.buttonColor!=""){
            btn_color = this.state.buttonColor.r+','+this.state.buttonColor.g+','+this.state.buttonColor.b+','+this.state.buttonColor.a;
        }
        
        if(this.state.buttonBorderColor!=""){
            btn_bordercolor = this.state.buttonBorderColor.r+','+this.state.buttonBorderColor.g+','+this.state.buttonBorderColor.b+','+this.state.buttonBorderColor.a;
        }
        var btn_borderRadius = this.state.buttonBorderRadius;
        var btn_borderWidth = this.state.buttonBorderWidth;
        var btn_fontSize = this.state.buttonFontSize;
        var btn_alignment = this.state.buttonAlignment;
        
        console.log(this.state.buttonShadowColor)
        if(this.state.buttonShadowColor!=""){
            if(this.state.buttonShadowColor.r!=''){
                console.log("if");
                console.log(this.state.buttonShadowColor.r);
                btn_shadowCol = 'rgba('+this.state.buttonShadowColor.r+','+this.state.buttonShadowColor.g+','+this.state.buttonShadowColor.b+','+this.state.buttonShadowColor.a +')';
            }else{
                console.log("else");
                btn_shadowCol = this.state.buttonShadowColor;
            }
        }
        var btn_shadow= this.state.buttonShadowX +'px '+this.state.buttonShadowY +'px '+this.state.buttonShadowBlur +'px '+this.state.buttonShadowSpread+'px '+btn_shadowCol;
        console.log(btn_shadowCol)
        var btn_animation ="";
        if(this.state.animationShake=='shake'){
            var btn_animationshake= '-webkit-animation-name: shake; animation-name: shake; animation-duration: 5s; animation-iteration-count: infinite; animation-timing-function: ease-in;';
        }
        
        if(this.state.animationButtonSize=='big_button'){
            var btn_animation = 'padding:20px 20px !important';
        }else if(this.state.animationButtonSize=='small_button'){
            var btn_animation = 'padding:10px 10px !important';
        }else{
            var btn_animation = '-webkit-animation-name: pulse-grow-on-hover; animation-name: pulse-grow-on-hover; -webkit-animation-duration: 0.3s; animation-duration: 0.3s; -webkit-animation-timing-function: linear; animation-timing-function: linear; -webkit-animation-iteration-count: infinite; animation-iteration-count: infinite;-webkit-animation-direction: alternate; animation-direction: alternate; ';
        }
        var btn_glow="";
        if(this.state.animationGlow=='glow_left_right'){
            var btn_glow = 'box-shadow: 3px 2px 5px 0px rgba('+btn_background+'); border: 0px solid rgba('+btn_bordercolor+' ) !important';
        }else if(this.state.animationGlow=='glow_right_left'){
            var btn_glow = 'box-shadow: -3px 2px 5px 0px rgba('+btn_background+'); border: 0px solid rgba('+btn_bordercolor+' ) !important';
        }else if(this.state.animationGlow=='glow_right'){
            var btn_glow = 'box-shadow: 0px 3px 4px -1px rgba('+btn_background+'); border: 0px solid rgba('+btn_bordercolor+' ) !important';
        }else{
            var btn_glow = 'box-shadow: 0px 0px 7px 0px rgba('+btn_background+'); border: 1px solid rgba('+btn_bordercolor+' ) !important';
        }
        return (
            <React.Fragment>
                <Frame>
                    <AppNavigation />

                    <Page>

                        <Query query={GET_PRODUCTS_BY_ID} >
                            {({ data, loading, error }) => {
                                if (loading) return <div>Loading…</div>;
                                if (error) return <div>{error.message}</div>;
                                console.log(error);
                                console.log(data);
                                if (data) {
                                    if (this.state.shopName == '') {
                                        this.setState({ shopName: data.shop.myshopifyDomain })
                                        store.set('shopName', data.shop.myshopifyDomain)
                                    }
                                }
                                return null;

                            }}
                        </Query>

                        {this.state.bundleProducts && this.showBundleProducts()}
                        {this.state.showSpecificProducts && this.showSpecificProducts()}

                        <AddBundleNav />

                        <br />

                        <Layout>
                            {/* <Button onClick={() => { redirectToProduct(); }}>btn</Button> */}

                            <Layout.Section secondary>
                                <Card sectioned title="Preview your bundle">
                                <div className="bundlePreview">
                                    <div className="bundleTitle mb_2" style={{fontFamily:this.state.selectedFontFamily, fontSize: this.state.fontSize+"px", fontWeight:fweight , fontStyle:fstyle, textAlign:this.state.alignment, color:'rgba('+rgbcolor+')' }}>{this.state.products.bundleMessage} </div>
                                    {
                                        this.state.finalProducts.length > 0 ?
                                        this.state.finalProducts.map((item, idx, arr) => {
                                            return <div className="mb_1 product-container" key={idx}>
                                                <Stack wrap={false} distribution="" alignment="center">
                                                    <div className="imageContainer">
                                                        {
                                                            store.get('bId') !== undefined && store.get('bId') !== '' && store.get('bId') !== null
                                                                ?
                                                                <img style={{ boxShadow: imageStyle,  borderRadius: this.state.imageBorderRadius + "px", borderWidth: this.state.imageBorderWidth + "px", borderStyle:'solid', borderColor:'rgba('+imageBColor+')',

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
                                            <button style={{btn_animationshake, boxShadow: btn_shadow, padding: '15px 15px', width: 'auto', color:'rgba('+btn_color+')', fontSize:btn_fontSize+'px', textAlign:btn_alignment, background:'rgba('+btn_background+')', borderColor:'rgba('+btn_bordercolor+')'}}>Add to Cart</button>
                                        </div>
                                    </div>
                            </Card>
                            </Layout.Section>


                            <Layout.Section >
                                <Stack wrap={false} distribution="fill" spacing="extraTight">
                                    <span>
                                        <ProgressBar progress={100} size="small" />
                                        <TextStyle variation="positive">Create bundle</TextStyle>
                                    </span>

                                    <span>
                                        <ProgressBar progress={0} size="small" />
                                        <TextStyle variation="subdued">Choose products</TextStyle>
                                    </span>

                                    <span>
                                        <ProgressBar progress={0} size="small" />
                                        <TextStyle variation="subdued">Build offer &nbsp;   &nbsp;  &nbsp; </TextStyle>
                                    </span>

                                    <span>
                                        <ProgressBar progress={0} size="small" />
                                        <TextStyle variation="subdued">Customize & Launch</TextStyle>
                                    </span>
                                </Stack>



                                <br />

                                {/* <Card sectioned title={'Bundle Products (' + this.state.selectedProducts.length + ' selected)'}>
                                    <Card.Header
                                        actions={[
                                            {
                                                content: 'Add products',
                                                onAction: () => this.showResource('bundleProducts'),
                                            },
                                        ]}
                                        title={'Bundle Products (' + this.state.selectedProducts.length + ' selected)'}
                                    >
                                        <Popover
                                            active={false}
                                            activator={
                                                <Button disclosure plain>
                                                    View Sales
                                            </Button>
                                            }
                                            onClose={() => { }}
                                        >
                                            <ActionList items={[{ content: 'Gross Sales' }, { content: 'Net Sales' }]} />
                                        </Popover>
                                    </Card.Header>
                                </Card> */}
                                <div className="add_bundle_add_product_section border">
                                    <div className="header">
                                        <b>Bundle Products ({this.state.selectedProducts.length} selected) </b> {' '}
                                        <span className="">
                                            <Button onClick={() => this.setState({ selectedProducts: [] })} >Clear All</Button>
                                            <Button primary onClick={() => this.showResource('bundleProducts')}>Add Products </Button>
                                        </span>
                                    </div>

                                    <div className="body padding_10">

                                        {
                                            this.state.selectedProducts.length == 0 ? <EmptyState
                                                heading="Add products to make a bundle"
                                                action={{
                                                    content: 'Add products',
                                                    onAction: () => this.showResource('bundleProducts'),
                                                }}
                                            >
                                            </EmptyState> : <Card>
                                                <ResourceList
                                                    resourceName={{ singular: 'product', plural: 'products' }}
                                                    items={this.state.selectedProducts}
                                                    renderItem={(item) => {
                                                        const media = (
                                                            <Thumbnail
                                                                source={
                                                                    item.images[0]
                                                                        ? item.images[0].originalSrc
                                                                        : ''
                                                                }
                                                                alt={
                                                                    item.images[0]
                                                                        ? item.images[0].altText
                                                                        : ''
                                                                }
                                                            />
                                                        );

                                                        return (
                                                            <ResourceItem
                                                                id={item.id}
                                                                // url={url}
                                                                media={media}
                                                                accessibilityLabel={`View details for ${item.title}`}
                                                            >
                                                                <h3>
                                                                    <TextStyle variation="strong"> {item.title}</TextStyle>
                                                                </h3>
                                                                <div>Product Count: {item.totalInventory}</div>
                                                            </ResourceItem>
                                                        );
                                                    }}
                                                />
                                            </Card>
                                        }

                                    </div>
                                </div>

                                <br />

                                <div className="add_bundle_add_product_section border">
                                    <div className="header">
                                        <b>Product Page display </b>
                                    </div>
                                    <div className="my_2 padding_10">
                                        <div><p><b>Control which product pages the the bundle will automatically dislayed</b></p></div>

                                        <div><input type="radio" checked={this.state.productPageDisplay === 'products_in_bundle'} value="products_in_bundle" id="products_in_bundle"
                                            onChange={this.handlefilterChange} name="filters" />
                                            <label for="products_in_bundle">Product(s) In Bundle (default)</label></div>

                                        <div><input checked={this.state.productPageDisplay === 'specific_products'}  type="radio" value="specific_products" id="specific_products"
                                            onChange={this.handlefilterChange} name="filters" />
                                            <label for="specific_products">Specific Product(s)</label>
                                        </div>

                                        {
                                            specific_products && this.state.selectedSpecificProducts.length == 0 && <div className="border padding_10 my_2">
                                                <EmptyState
                                                    heading="Select Products where you want to show the bundle"
                                                    action={{
                                                        content: 'Add products',
                                                        onAction: () => this.showResource('showSpecificProducts'),
                                                    }}
                                                // image={img}
                                                >
                                                </EmptyState>
                                            </div>
                                        }

                                        {
                                            specific_products && this.state.selectedSpecificProducts.length > 0 && <div className="my_2"> <Card>

                                                <ResourceList
                                                    resourceName={{ singular: 'product', plural: 'products' }}
                                                    items={this.state.selectedSpecificProducts}
                                                    renderItem={(item) => {
                                                        const media = (
                                                            <Thumbnail
                                                                source={
                                                                    item.images[0]
                                                                        ? item.images[0].originalSrc
                                                                        : ''
                                                                }
                                                                alt={
                                                                    item.images[0]
                                                                        ? item.images[0].altText
                                                                        : ''
                                                                }
                                                            />
                                                        );

                                                        return (
                                                            <ResourceItem
                                                                id={item.id}
                                                                // url={url}
                                                                media={media}
                                                                accessibilityLabel={`View details for ${item.title}`}
                                                            >
                                                                <h3>
                                                                    <TextStyle variation="strong"> {item.title}</TextStyle>
                                                                </h3>
                                                                <div>Product Count: {item.totalInventory}</div>
                                                            </ResourceItem>
                                                        );
                                                    }}
                                                />
                                            </Card>


                                            </div>
                                        }

                                        {/* <Toast content="Message sent" /> */}


                                        <div><input checked={this.state.productPageDisplay === 'none_products_page'} type="radio" value="none_products_page" id="none_products_page"
                                            onChange={this.handlefilterChange} name="filters" />
                                            <label for="none_products_page">None product page (just if installed embeed code)</label>
                                        </div>


                                    </div>
                                </div>

                                <br />
                                <div className="add_bundle_add_product_section border">
                                    <div className="header">
                                        <b>Embed bundle in any page (optional)</b>
                                    </div>

                                    <div className="p_2 text_center">
                                        <TextField
                                            label=""
                                            value={embededCode}
                                            // onChange={this.handleChange('bundle_name')}
                                            id="embededCode"
                                            type="embededCode"
                                            placeholder="Embeded Code"
                                            readonly
                                            disabled
                                        />
                                        <br />
                                        {/* <Button primary onClick={() => {navigator.clipboard.writeText(this.state.embededCode)}}>Copy text</Button> */}
                                        <Button primary >Copy text</Button>

                                    </div>

                                </div>

                                <div className="float_right my_2">
                                    <ButtonGroup segmented>
                                        <Button >
                                            <Icon
                                                source={ChevronLeftMinor}
                                                color="base" />
                                        </Button>
                                        <Button onClick={() => redirectToProduct()}>
                                            <Icon
                                                source={ChevronRightMinor}
                                                color="base" /></Button>
                                    </ButtonGroup>
                                </div>


                            </Layout.Section>
                        </Layout>

                    </Page>

                    <AppFooter />
                </Frame>
            </React.Fragment>
        );
    }
}

export default EditBundleStepOne;