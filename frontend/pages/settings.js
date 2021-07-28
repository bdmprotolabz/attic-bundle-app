import React from 'react';
import { EmptyState,  Heading, Badge, Banner, DisplayText, Layout, Page, Card, Form, FormLayout, RadioButton, Icon, Button, TextStyle, TextField, Select, Stack, List, TextContainer, VideoThumbnail, MediaCard, Modal, Popover, ActionList } from '@shopify/polaris';
import AppFooter from './appfooter';
import AppNavigation from './appnavigation';
import { ResourcePicker, TitleBar } from '@shopify/app-bridge-react';
import DataTable from 'react-data-table-component';
import { ViewMajor, EditMajor, AnalyticsMajor, SearchMinor } from '@shopify/polaris-icons';
import { CircleInformationMajor } from '@shopify/polaris-icons';
import router from 'next/router'
import store from 'store-js';
import { baseUrl } from './baseUrl';
import Link from 'next/link';


const img = 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg';
const paymentIcon = 'https://cdn.shopify.com/s/files/1/0558/1081/8244/files/Primary_fill.png?v=1622695201';
const generalIcon = 'https://cdn.shopify.com/s/files/1/0558/1081/8244/files/generralfill.png?v=1622695200';
const cartIcon = 'https://cdn.shopify.com/s/files/1/0558/1081/8244/files/cartfill.png?v=1622695200';

class Index extends React.Component {

    state = {
        open: false,
        enabled: false,
        showBanner: true,
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
        console.log(store.get('shop'))
    }
    render() {
        const emptyState = !store.get('ids');
        const {search} = this.state;

        return (
            <React.Fragment>
                <AppNavigation />
                <Page fullWidth>
                    <Layout>
                        <Layout.Section>
                            <div className="settings-section-start">
                                <div className="paymentSettings">
                                    <div className="settingsIcon">
                                        <img src={paymentIcon} />
                                    </div>
                                    <div className="settingsHeading">
                                        <Link href="/settings-payment"><a>
                                            <b>
                                                You are currently on a Premium Membership
                                                <span className="chargesdetail">next charge 7th june</span>
                                            </b>
                                            <br/>
                                            <p>you enhoy the maximum amount of features availabe</p>
                                        </a></Link>
                                    </div>
                                    <div className="settingsEdit">
                                        <Link href="/settings-payment"><a>
                                            plan cost $14,75
                                        </a></Link>
                                    </div>
                                </div>                                    
                                <div className="generalSettings">
                                    <div className="settingsIcon">
                                        <img src={generalIcon} />
                                    </div>
                                    <div className="settingsHeading">
                                        <b>General Settings</b><br/>
                                        <p>options for discounts, stocks, redirect pages, payment buttons</p>
                                    </div>
                                    <div className="settingsEdit">
                                        <Link href="/settings-general"><a>
                                            Edit
                                        </a></Link>
                                    </div>
                                </div>                                    
                                
                                <div className="cartSettings">
                                    <div className="settingsIcon">
                                        <img src={cartIcon} />
                                    </div>
                                    <div className="settingsHeading">
                                        <b>Cart Tips</b><br/>
                                        <p>Improve your sales with bundle tips at checkout</p>
                                    </div>
                                    <div className="settingsEdit">
                                        <Link href="/settings-cart"><a>
                                            Edit
                                        </a></Link>
                                    </div>
                                </div>                                    
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