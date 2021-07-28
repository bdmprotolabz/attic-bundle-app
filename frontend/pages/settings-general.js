import React from 'react';
import { EmptyState,  Heading, Badge, Banner, DisplayText, Layout, Page, Card, Form, FormLayout, RadioButton, Icon, Button, TextStyle, TextField, Select, Stack, List, TextContainer, VideoThumbnail, MediaCard, Modal, Popover, ActionList } from '@shopify/polaris';
import AppFooter from './appfooter';
import AppNavigation from './appnavigation';
import { ResourcePicker, TitleBar } from '@shopify/app-bridge-react';
import DataTable from 'react-data-table-component';
import { ViewMajor, EditMajor, AnalyticsMajor, SearchMinor } from '@shopify/polaris-icons';
import { baseUrl } from './baseUrl';
import store from 'store-js';
import Link from 'next/link';
import { CircleInformationMajor } from '@shopify/polaris-icons';
import router from 'next/router'
import $ from 'jquery';

const axios = require('axios'); 
const img = 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg';
const paymentIcon = 'https://cdn.shopify.com/s/files/1/0558/1081/8244/files/Primary_fill.png?v=1622695201';
const generalIcon = 'https://cdn.shopify.com/s/files/1/0558/1081/8244/files/generralfill.png?v=1622695200';
const cartIcon = 'https://cdn.shopify.com/s/files/1/0558/1081/8244/files/cartfill.png?v=1622695200';
const cartTips = 'https://cdn.shopify.com/s/files/1/0558/1081/8244/files/carttips.jpg?v=1622704988';

const redirectPage = [
    { label: 'Select', value: '' },
    { label: 'Cart Page (default)', value: 'cartpage' },
];

const discountType = [
    { label: 'Select', value: '' },
    { label: 'Fixed Price', value: 'fixed' },
    { label: 'Percentage', value: 'percentage' },
];

class Index extends React.Component {

    state = {
        open: false,
        enabled: false,
        isPaymentBtn: false,
        isDiscount: false,
        isStockControl: false,
        isCartLocale: false,
        showBanner: true,
        isPaymentBtnValue: 0,
        isDiscountValue: 0,
        isStockControlValue: 0,
        isCartLocaleValue: 0,
        selectedRedirect:'cartpage',
        selectedDiscountType:'fixed',
        customCSS:'',
        search: '',
        shopName: ''
    };

    showBannerFunction = () => {
        // console.log('okok') 
        this.setState({ showBanner: false })
    }

    mediaOnClick = () => {
        console.log('hmm')
    }

    componentDidMount() {
        var self = this;
        setTimeout(function () {
            if (store.get('shopName') !== undefined && store.get('shopName') !== '' && store.get('shopName') !== null) {
                axios.post(baseUrl + '/get-shop-settings/' + store.get('shopName'))
                    .then(function (response) {
                        if (response.data.responseCode === '200' || response.data.responseCode === 200) {
                            if(response.data.data[0].createdAt!==''){
                                const { customCss, discountType, isCartLocale, isDiscount, isPaymentBtn, isStockControl, redirectPage} = response.data.data[0];

                                self.setState({
                                    isPaymentBtn: isPaymentBtn,
                                    isDiscount: isDiscount,
                                    isStockControl: isStockControl,
                                    isCartLocale: isCartLocale,
                                    selectedRedirect: redirectPage,
                                    selectedDiscountType:discountType,
                                    customCSS:customCss,
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

    bigImage = () =>{
        $(".cart-tip-image").toggleClass("cart-tip-image--big");
    }
    changemeisPaymentBtn=()=>{
        if(this.state.isPaymentBtn == false){
            this.setState({isPaymentBtn:true});
            this.setState({isPaymentBtnValue:1});
        }else{
            this.setState({isPaymentBtn:false});
            this.setState({isPaymentBtnValue:0});
        }
    }

    changemeisDiscount=()=>{
        if(this.state.isDiscount == false){
            this.setState({isDiscount:true});
            this.setState({isDiscountValue:1});
        }else{
            this.setState({isDiscount:false});
            this.setState({isDiscountValue:0});
        }
    }

    changemeisStockControl=()=>{
        if(this.state.isStockControl == false){
            this.setState({isStockControl:true});
            this.setState({isStockControlValue:1});
        }else{
            this.setState({isStockControl:false});
            this.setState({isStockControlValue:0});
        }
    }

    changemeisCartLocale=()=>{
        if(this.state.isCartLocale == false){
            this.setState({isCartLocale:true});
            this.setState({isCartLocaleValue:1});
        }else{
            this.setState({isCartLocale:false});
            this.setState({isCartLocaleValue:0});
        }
    }

    handleSelectChangeRedirectPage = (e) => {
        this.setState({ selectedRedirect: e })
    }
    
    handleSelectChangeDiscountType = (e) => {
        this.setState({ selectedDiscountType: e })
    }

    customCSS = (e) =>{
        this.setState({ customCSS: e })
    }

    saveSettings = () => {
        // console.log('okok')
        console.log("shop name is: " + store.get('shopName'));
        var self = this;

        axios.post(baseUrl + '/saveSettings', {
            shopName: store.get('shopName'),
            redirectPage: this.state.selectedRedirect,
            discountType: this.state.selectedDiscountType,
            isPaymentBtn:this.state.isPaymentBtn,
            isDiscount:this.state.isDiscount,
            isStockControl:this.state.isStockControl,
            isCartLocale:this.state.isCartLocale,
            customCss:this.state.customCSS,
        })
            .then(function (response) {
                // handle success
                // console.log(response.data);
                if (response.data.responseCode == 200) {
                    console.log("data is saved");
                    //self.setState({ redirect: true }, function () { })
                }
            })
            .catch(function (error) {
                // handle error
                console.log(error);
                // this.setState({ redirect: false }, function () { })
            })

        //self.setState({ redirect: true }, function () { })
    }

    render() {
        const emptyState = !store.get('ids');
        const {search, isChecked, checkedValue, selectedRedirect, selectedDiscountType, customCSS, isPaymentBtn, isDiscount, isStockControl, isCartLocale,  isPaymentBtnValue, isDiscountValue, isStockControlValue, isCartLocaleValue} = this.state;
            
            const saveDataAndRedirect = async () => {

                await this.saveSettings();

                console.log("i am here");
            };

        return (
            
            <React.Fragment>
                <AppNavigation />
                <Page fullWidth>
                    
                    
                    <Layout>
                        <h1 className="Polaris-Heading" id="heading-settings"> <img src={generalIcon} /> Settings</h1>
                        <Layout.Section oneHalf>
                            <div className="mb_2 label_bold">
                                <Select
                                    label="Redirect Page"
                                    options={redirectPage}
                                    onChange={this.handleSelectChangeRedirectPage}
                                    value={selectedRedirect}
                                />
                                <p>Page that customers will be redirected after add bundle products to the cart.</p>
                            </div>
                            <div className="mb_2">
                                <b className="mb_1">Disable hide payment button</b><br/>
                                <label className="switch mb_1 mt_1">
                                    <input type="checkbox" checked={isPaymentBtn} value={isPaymentBtnValue} onChange={this.changemeisPaymentBtn} />
                                    <span className="slider round"></span>
                                </label>
                                <p>BY default the bundle app hide payment buttons(Paypal/Amazon/GooglePay) at cart page, because discounts won't work with these buttons. just with regular checkout button.</p>
                            </div>
                            <div className="mb_2 label_bold">
                                <Select
                                    label="Discount Type"
                                    options={discountType}
                                    onChange={this.handleSelectChangeDiscountType}
                                    value={selectedDiscountType}
                                />
                                <p>To know more about discount, please read <a href="#">this article</a></p>
                            </div>
                        </Layout.Section>
                        <Layout.Section oneHalf>
                            <div className="mb_2">
                                <b className="mb_1">Disable discount</b><br/>
                                <label className="switch mb_1 mt_1">
                                    <input type="checkbox" checked={isDiscount} value={isDiscountValue} onChange={this.changemeisDiscount} />
                                    <span className="slider round"></span>
                                </label>
                                <p>Just shows the bundle interface, without apply the discount.<br/> 
                                Important: this option will disable completely discount feature.</p>
                            </div>
                            <div className="mb_2">
                                <b className="mb_1">Enable stock contol</b><br/>
                                <label className="switch mb_1 mt_1">
                                    <input type="checkbox" checked={isStockControl} value={isStockControlValue} onChange={this.changemeisStockControl} />
                                    <span className="slider round"></span>
                                </label>
                                <p>Disable the buy button if there is no stock for bundle product.</p>
                            </div>
                            <div className="mb_2">
                                <b className="mb_1">Disable cart Locale</b><br/>
                                <label className="switch mb_1 mt_1">
                                    <input type="checkbox" checked={isCartLocale} value={isCartLocaleValue} onChange={this.changemeisCartLocale} />
                                    <span className="slider round"></span>
                                </label>
                                <p>Disable the redirect to cart page that includes the locale in the url.<br/>
                                Example: store.com/fr/cart
                                </p>
                            </div>
                        </Layout.Section>

                        <Layout.Section>
                            <p>Write custom CSS if you want to make unique visiual customizations.</p>
                            <div className="mb_2 label_bold">
                                <TextField
                                    label="Shipping address"
                                    value={customCSS}
                                    onChange={this.customCSS}
                                    multiline={4}
                                />
                            <p>Important: Just change this if you know what you are doing.</p>
                            </div>
                        </Layout.Section>
                    </Layout>
                    <div className="mt_4 text_right">
                        <Button id="mr_1" onClick={() => { router.push('/settings'); }}>Back</Button>
                        <Button primary onClick={() => saveDataAndRedirect()}>Save</Button>
                    </div>
                </Page>
                <AppFooter />
            </React.Fragment>
        );
    }
}

export default Index;