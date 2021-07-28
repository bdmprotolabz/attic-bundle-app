import React, { Component, useState } from 'react';
import { EmptyState, Layout, Page, Card, Stack, Heading, Badge, Banner, Icon, Button, VideoThumbnail, MediaCard, TextStyle, ProgressBar, Select, TextField, ButtonGroup, DisplayText, FormLayout, DatePicker, Checkbox, Thumbnail } from '@shopify/polaris';
import AppFooter from './appfooter';
import AppNavigation from './appnavigation';
import AddBundleNav from './add-bundle-nav';
import store from 'store-js';
import ResourceListWithProducts from '../components/ResourceList';
import AddBundleLeftSection from './add-bundle-left-section';
import { ChevronLeftMinor, ChevronRightMinor, DeleteMajor } from '@shopify/polaris-icons';
import { Context } from '@shopify/app-bridge-react';
import { Redirect } from '@shopify/app-bridge/actions';
import { baseUrl } from './baseUrl';
import Link from 'next/link';

const axios = require('axios');
const img = 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg';

const imgStyle = {
    borderWidth: '',
    borderRadius: '',
    borderColor: '',
    boxShadow: '',
    borderStyle: '',
    width: ''
}

const options = [
    { label: 'Fixed amount off', value: 'fixed_amount_off' },
    { label: 'Percentage Off', value: 'percentage_off' },
    // { label: 'Fixed Price', value: 'fixed_price' },
    { label: 'Free Shipping', value: 'free_shipping' },
];

const optionsForStandard = [
    { label: 'Fixed amount off', value: 'fixed_amount_off' },
    { label: 'Percentage Off', value: 'percentage_off' },
]

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
class AddBundleStepTwo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bundleTypeCombo: false,
            bundleTypeStandard: true,
            selected: 'fixed_amount_off',
            fixed_amount_off_textbox: '',
            percentage_off_textbox: '',
            fixed_price_textbox: '',
            fixed_amount_off_textbox_visible: true,
            percentage_off_textbox_visible: false,
            fixed_price_textbox_visible: false,
            bundle_message: '',
            success_message: '',
            active_date: '',
            deactive_date: '',
            isScheduleBundle: false,

            // for the standard-single product bundle
            standard_quantity_textbox: '',
            standard_quantity_discount: '',
            rows: [{}],
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
    }
    handleSelectChange = (e) => {
        console.log(e)
        this.setState({ selected: e })


        if (e === 'fixed_amount_off') {
            this.setState({
                fixed_amount_off_textbox_visible: true,
                percentage_off_textbox_visible: false,
                fixed_price_textbox_visible: false
            })
        }
        else if (e === 'percentage_off') {
            this.setState({
                percentage_off_textbox_visible: true,
                fixed_amount_off_textbox_visible: false,
                fixed_price_textbox_visible: false
            })
        }
        // else if (e === 'fixed_price') {
        //     this.setState({
        //         fixed_price_textbox_visible: true,
        //         fixed_amount_off_textbox_visible: false,
        //         percentage_off_textbox_visible: false,
        //     })
        // }
        else {
            this.setState({
                fixed_price_textbox_visible: false,
                fixed_amount_off_textbox_visible: false,
                percentage_off_textbox_visible: false,
            })
        }

    }

    handleChange = (field) => {
        return (value) => this.setState({ [field]: value });
    };


    handleDateChange = (e, type) => {
        console.log(e.target.value)
        console.log(type)
        if (type === 'active_date') {
            this.setState({ active_date: e.target.value })
        }
        if (type === 'deactive_date') {
            this.setState({ deactive_date: e.target.value })
        }
    }

    handleCheckboxChange = () => {
        // console.log(this.state.isScheduleBundle)
        this.setState({ isScheduleBundle: !this.state.isScheduleBundle })
    }


    saveStepTwo = () => {
        console.log('okok')

        var pricingDiscountType = '';
        var pricingDiscountAmount = '';



        // if (this.state.bundleTypeCombo) {
        if (this.state.selected === "fixed_amount_off") {
            pricingDiscountType = "fixed_amount_off";
            pricingDiscountAmount = this.state.fixed_amount_off_textbox;
        }
        else if (this.state.selected === "percentage_off") {
            pricingDiscountType = "percentage_off";
            pricingDiscountAmount = this.state.percentage_off_textbox;
        }
        else {
            pricingDiscountType = "free_shipping";
            pricingDiscountAmount = '';
        }
        // }

        // if (this.state.bundleTypeStandard) {
        //     if (this.state.selected === "fixed_amount_off") {
        //         pricingDiscountType = "fixed_amount_off";
        //         pricingDiscountAmount = this.state.rows;
        //     }
        //     if (this.state.selected === "percentage_off") {
        //         pricingDiscountType = "percentage_off";
        //         pricingDiscountAmount = this.state.rows;
        //     }
        // }


        var self = this;
        axios.post(baseUrl + '/save-step-two', {
            id: store.get('bId'),
            products: this.state.products,
            pricingDiscountType: pricingDiscountType,
            pricingDiscountAmount: pricingDiscountAmount,
            bundleMessage: this.state.bundle_message,
            bundleSuccessMessage: this.state.success_message,
            scheduleBundle: this.state.isScheduleBundle,
            activeDate: this.state.active_date,
            DeActiveDate: this.state.deactive_date,
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

    handleRowChange = (e, idx, type) => {

        // 1. Make a shallow copy of the items
        let rows = [...this.state.rows];
        // 2. Make a shallow copy of the item you want to mutate
        let row = { ...rows[idx] };
        // 3. Replace the property you're intested in
        if (type === 'st_quantity') {
            row.st_quantity = e;
        }
        if (type === 'st_discount') {
            row.st_discount = e;
        }
        // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
        rows[idx] = row;
        // 5. Set the state to our new copy
        this.setState({ rows });

    };
    handleAddRow = () => {
        const item = {
            st_quantity: "",
            st_discount: ""
        };
        this.setState({
            rows: [...this.state.rows, item]
        });
    };
    handleRemoveRow = () => {
        this.setState({
            rows: this.state.rows.slice(0, -1)
        });
    };
    handleRemoveSpecificRow = (idx) => () => {
        const rows = [...this.state.rows]
        rows.splice(idx, 1)
        this.setState({ rows })
    }

    handleProductCountChange = (e, idx) => {

        let products = [...this.state.products];

        // 2. Make a shallow copy of the item you want to mutate
        let p = { ...products[idx] };

        // 3. Replace the property you're intested in
        p.productCountByUser = e;

        // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
        products[idx] = p;
        // 5. Set the state to our new copy
        this.setState({ products });
    }


    componentDidMount() {
        // console.log(store.get('bId'))

        var self = this;
        setTimeout(function () {
            if (store.get('bId') !== undefined && store.get('bId') !== '' && store.get('bId') !== null) {
                axios.post(baseUrl + '/get-bundle-by-id/' + store.get('bId'))
                    .then(function (response) {
                        console.log(response.data);

                        if (response.data.responseCode === '200' || response.data.responseCode === 200) {
                            var products = [];
                            products = response.data.data[0].products;

                            products.map((p, i) => {
                                if (!p['productCountByUser']) {
                                    p['productCountByUser'] = '1';
                                }
                            })
                            self.setState({
                                products:products,
                                finalProducts:response.data.data[0].products
                            })
                            // if (this.state.selected === "fixed_amount_off") {
                            //     pricingDiscountType = "fixed_amount_off";
                            //     pricingDiscountAmount = this.state.fixed_amount_off_textbox;
                            // }
                            // else if (this.state.selected === "percentage_off") {
                            //     pricingDiscountType = "percentage_off";
                            //     pricingDiscountAmount = this.state.percentage_off_textbox;
                            // }
                            // else {
                            //     pricingDiscountType = "free_shipping";
                            //     pricingDiscountAmount = '';
                            // }

                            if (response.data.data[0].pricingDiscountType === 'fixed_amount_off' || response.data.data[0].pricingDiscountType === '') {
                                self.setState({
                                    fixed_amount_off_textbox_visible: true,
                                    percentage_off_textbox_visible: false,
                                    fixed_price_textbox_visible: false
                                })
                            }
                            else if (response.data.data[0].pricingDiscountType ===  'percentage_off') {
                                self.setState({
                                    percentage_off_textbox_visible: true,
                                    fixed_amount_off_textbox_visible: false,
                                    fixed_price_textbox_visible: false
                                })
                            }
                            else {
                                self.setState({
                                    fixed_price_textbox_visible: false,
                                    fixed_amount_off_textbox_visible: false,
                                    percentage_off_textbox_visible: false,
                                })
                            }

                          
                            const { alignment, fontSize, imageBorderRadius, buttonFontSize, animationGlow, animationShake, animationButtonSize, buttonColor, buttonBgColor, fontColor, FontFamily,FontType, FontWeight, imageShadowX, imageShadowY, imageShadowBlur, imageShadowSpread, imageShadowColor, imageBorderWidth, imageBorderColor, buttonBorderColor, buttonBorderRadius, buttonBorderWidth, buttonShadowX, buttonShadowY, buttonShadowBlur, buttonShadowSpread, buttonShadowColor, buttonAlignment,buttonFontType, ButtonFontWeight, isButtonItalic, isButtonUnderline } = response.data.data[0];
                            self.setState({
                                products: products,
                                selected: response.data.data[0].pricingDiscountType,
                                // selected: response.data.data[0].pricingDiscountAmount,
                                fixed_amount_off_textbox: response.data.data[0].pricingDiscountAmount,
                                percentage_off_textbox: response.data.data[0].pricingDiscountAmount,
                                bundle_message: response.data.data[0].bundleMessage,
                                success_message: response.data.data[0].bundleSuccessMessage,
                                isScheduleBundle: response.data.data[0].scheduleBundle,
                                active_date: response.data.data[0].activeDate,
                                deactive_date: response.data.data[0].DeActiveDate,
                            })


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

    render() {
        const app = this.context;

        const saveDataAndRedirect = async () => {

            await this.saveStepTwo();

            if (this.state.redirect) {
                const redirect = Redirect.create(app);
                redirect.dispatch(
                    Redirect.Action.APP,
                    '/add-bundle-step-three',
                );
            }
        };

        const emptyState = !store.get('ids');
        const { selected, bundle_message, success_message, active_date, deactive_date, isScheduleBundle, fixed_amount_off_textbox, percentage_off_textbox, fixed_price_textbox, standard_quantity_textbox, standard_quantity_discount, tierName } = this.state;
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
                <AppNavigation />

                <Page>

                    <AddBundleNav />

                    <Layout>
                        <Layout.Section secondary>
                             <Card sectioned title="Preview your bundle">
                                <div className="bundlePreview">
                                    <div className="bundleTitle mb_2" style={{fontFamily:this.state.selectedFontFamily, fontSize: this.state.fontSize+"px", fontWeight:fweight , fontStyle:fstyle, textAlign:this.state.alignment, color:'rgba('+rgbcolor+')' }}>{this.state.bundle_message} </div>
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
                                    <ProgressBar progress={100} size="small" />
                                    <TextStyle variation="positive">Choose products</TextStyle>
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







                            {/* TIER CODE START */}
                            <Card sectioned title="Adjust the quantity of your products">

                                {
                                    this.state.products.map((item, idx) => {

                                        return <div className="mb_1" key={idx}>
                                            <Stack wrap={false} distribution="fillEvenly" alignment="center">
                                                <Thumbnail
                                                    source={item.images[0].originalSrc}
                                                    alt={item.images[0].altText}
                                                />
                                                <p>{item.title}</p>
                                                <p className="text_right">Quantity</p>
                                                <TextField
                                                    label=""
                                                    type="number"
                                                    value={this.state.products[idx].productCountByUser}
                                                    onChange={(e) => this.handleProductCountChange(e, idx)}
                                                    placeholder="1"
                                                />
                                            </Stack>
                                        </div>
                                    })
                                }

                            </Card>

                            <Card sectioned title="Set Pricing/Discount">
                                {/* <div className="mb_2"><DisplayText size="small">Set Pricing/Discount</DisplayText></div> */}
                                <Stack wrap={false} distribution="fillEvenly" >
                                    <Select
                                        label=""
                                        options={options}
                                        onChange={this.handleSelectChange}
                                        value={selected}
                                    />


                                    {
                                        this.state.fixed_amount_off_textbox_visible && <TextField
                                            label=""
                                            type="number"
                                            value={fixed_amount_off_textbox}
                                            onChange={this.handleChange('fixed_amount_off_textbox')}
                                            suffix={'OFF'}
                                            id="fixed_amount_off_textbox"
                                            placeholder="60"
                                        />
                                    }
                                    {
                                        this.state.percentage_off_textbox_visible && <TextField
                                            label=""
                                            type="number"
                                            value={percentage_off_textbox}
                                            onChange={this.handleChange('percentage_off_textbox')}
                                            suffix={'% OFF'}
                                            id="percentage_off_textbox"
                                            placeholder="60"
                                        />
                                    }
                                    {/* {
                                    this.state.fixed_price_textbox_visible && <TextField
                                        label=""
                                        value={fixed_price_textbox}
                                        onChange={this.handleChange('fixed_price_textbox')}
                                        id="fixed_price_textbox"
                                        type="fixed_price_textbox"
                                        placeholder="60"
                                    />
                                } */}




                                </Stack>
                            </Card>


                            {/* <div className="hr mt_3"></div> */}

                            < br />
                            <Card sectioned>
                                <FormLayout>
                                    <TextField
                                        label="Bundle Message"
                                        value={bundle_message}
                                        onChange={this.handleChange('bundle_message')}
                                        id="bundle_message"
                                        type="bundle_message"
                                        placeholder="Buy this bundle and save"
                                    />

                                    <TextField
                                        label="Success Message"
                                        value={success_message}
                                        onChange={this.handleChange('success_message')}
                                        id="success_message"
                                        type="success_message"
                                        placeholder="Awesome, you saved by bundling"
                                        helpText={'Eg: Awesome you saved by bundling'}
                                    />


                                </FormLayout>

                            </Card>

                            <Card sectioned title="Schedule Bundle (Optional)" >
                                {/* <div className="add_bundle_add_product_section border mt_4"> */}
                                {/* <div className="header">
                                        <b>Schedule Bundle </b> {' '} (Optional)
                                </div> */}

                                <div className=" ">
                                    <FormLayout>
                                        <Checkbox
                                            label="Schedule Bundle"
                                            checked={isScheduleBundle}
                                            onChange={this.handleCheckboxChange}
                                        />
                                        <Stack wrap={false} distribution="fillEvenly" >

                                            <div>
                                                <p>Active Date</p>
                                                <input type="date" value={active_date} disabled={!this.state.isScheduleBundle} onChange={(e) => this.handleDateChange(e, 'active_date')} className="input_date" />
                                            </div>
                                            <div>
                                                <p>Deactive Date</p>
                                                <input type="date" value={deactive_date} disabled={!this.state.isScheduleBundle} onChange={(e) => this.handleDateChange(e, 'deactive_date')} className="input_date" />
                                            </div>


                                        </Stack>
                                    </FormLayout>
                                </div>
                                {/* </div> */}
                                <TextStyle variation="subdued"> The time zone used is based on your business settings </TextStyle>
                            </Card>



                            <br />
                            <div className="float_right my_2">

                                <ButtonGroup segmented>
                                    <Link href="/edit-bundle-step-one">
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
            </React.Fragment >
        );
    }
}

export default AddBundleStepTwo;