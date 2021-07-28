import React from 'react';
import { EmptyState,  Heading, Badge, Banner, DisplayText, Layout, Page, Card, Form, FormLayout, RadioButton, Icon, Button, TextStyle, TextField, Select, Stack, List, TextContainer, VideoThumbnail, MediaCard, Modal, Popover, ActionList } from '@shopify/polaris';
import AppFooter from './appfooter';
import AppNavigation from './appnavigation';
import { ResourcePicker, TitleBar } from '@shopify/app-bridge-react';
import DataTable from 'react-data-table-component';
import { ViewMajor, EditMajor, AnalyticsMajor, SearchMinor } from '@shopify/polaris-icons';
import store from 'store-js';
import Link from 'next/link';
import { CircleInformationMajor } from '@shopify/polaris-icons';
import router from 'next/router'


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
                                <h1 className="Polaris-Heading"> <img src={paymentIcon} /> Monthly Plan</h1>
                                <p className="mt_4 mb_4">
                                    Here your payment method and details<br/>
                                    here and billing details as well
                                </p>  
                                                         
                                <p className="mt_4 mb_4">
                                    Display the plan availables here with all the features available in each. Have the plan available highlighted and animate the best choice plan if they don't have that plan active right now
                                </p>  

                            </div>

                            <div className="mt_4 text_right">
                                <Button id="mr_1" onClick={() => { router.push('/settings'); }}>Back</Button>
                                <Button primary >Save</Button>
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