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

class Index extends React.Component {

    state = {
        open: false,
        enabled: false,
        isChecked: false,
        showBanner: true,
        checkedValue: 0,
        search: ''
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
                                const isChecked = response.data.data[0].cartTips;

                                self.setState({
                                    isChecked: isChecked,
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
    changeme=()=>{
        if(this.state.isChecked == false){
            this.setState({isChecked:true});
            this.setState({checkedValue:1});
        }else{
            this.setState({isChecked:false});
            this.setState({checkedValue:0});
        }
    }

    saveSettings = () => {
        // console.log('okok')
        console.log("shop name is: " + store.get('shopName'));
        var self = this;

        axios.post(baseUrl + '/saveCartSettings', {
            shopName: store.get('shopName'),
            cartTips:this.state.isChecked,
        })
        .then(function (response) {
            if (response.data.responseCode == 200) {
                console.log("data is saved");
            }
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    render() {
        const emptyState = !store.get('ids');
        const {search,isChecked,checkedValue} = this.state;
            const saveDataAndRedirect = async () => {
                await this.saveSettings();
                console.log("i am here cart page");
            };
        return (
            <React.Fragment>
                <AppNavigation />
                <Page fullWidth>
                    <Layout>
                        <Layout.Section>
                            <div className="settings-section-start">
                                <h1 className="Polaris-Heading"> <img src={cartIcon} /> Cart Tips</h1>
                                <p className="mt_4 mb_4">
                                    Cart Tips are small text(s) that display on the cart page when none Bundles matches and if a product in the cart belongs to a Quantity Bundle and has not quantity engough yet to match the Bundle. <br/><br/>
                                    illustration of Cart Tip showing in the cart page(click to expand):<br/>
                                </p>  
                                <img src={cartTips} alt="cart tip illustration" title="Click to expand/reduce" className="cart-tip-image" onClick={this.bigImage}/>

                                <p>
                                    <b className="mb_1">Enabled</b><br/>
                                    <label className="switch">
                                        <input type="checkbox" checked={isChecked} value={checkedValue} onChange={this.changeme} />
                                        <span className="slider round"></span>
                                    </label>
                                </p>
                                <p className="mt_4 mb_4">
                                    To customize the visual of Cart Tips:<br/>
                                    <ul>
                                        <li>To change text go to Settings › Text › Cart Tips Tab</li>
                                        <li> To change the color go to Settings › Design › Colors Tab › Cart Tips </li>
                                    </ul>
                                        To know more about Cart Tips, please read this article.
                                </p>  

                            </div>

                            <div className="mt_4 text_right">
                                <Button id="mr_1" onClick={() => { router.push('/settings'); }}>Back</Button>
                                <Button primary onClick={() => saveDataAndRedirect()}>Save</Button>
                            </div>
                        </Layout.Section>
                    </Layout>
                </Page>
                <AppFooter />
            </React.Fragment>
        );
    }
}

export default Index;