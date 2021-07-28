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
import $ from 'jquery';
// import Image from 'next/image'
// import bundle_img from '../public/images/bundles.png';


const img = 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg';

const data = [
    {
        bundle_detail: <Link href="/article1"><a><b>Learn how to get started with AppAttic, Click here get know more about us</b></a></Link>,
        bundle_date: <p>31-05-2021</p>
    },
    {
        bundle_detail: <Link href="/article1"><a><b>Check how to get started with AppAttic, Click here get know more about us</b></a></Link>,
        bundle_date: <p>29-05-2021</p>
    },
    {
        bundle_detail: <Link href="/article1"><a><b>Learn how to get started with AppAttic, Click here get know more about us</b></a></Link>,
        bundle_date: <p>27-05-2021</p>
    },
];

const columns = [
    { name: 'Article title', selector: 'bundle_detail', sortable: true, grow: 450, width: "85%"},
    { name: 'Date', selector: 'bundle_date', sortable: true, grow: 450 },
];
class Index extends React.Component {

    state = {
        data: data,
        open: false,
        enabled: false,
        showBanner: true,
        showBOT: false,
        isMerchantMessage: false,
        isBotReply: false,
        disableme: false,
        search: ''
    };

    showBannerFunction = () => {
        // console.log('okok') 
        this.setState({ showBanner: false })
    }

    mediaOnClick = () => {
        console.log('hmm')
    }
    handleSubmit = () => {
        if (this.state.search == '') {
            console.log('if')
            return;
        } else {
            this.setState({
                search: this.state.search,
            });
            console.log('submission', this.state);
        }

    }

    handleChange = (field) => {
        return (value) => this.setState({ [field]: value });
    }

    componentDidMount() {
        console.log(store.get('shop'))
    }
    showbot = () =>{
        var self = this;
        console.log("i still need help");
        setTimeout(function(){  
            self.setState({showBOT:true});
        }, 1000);
    }
    sendMsg = () =>{
        var self = this;
        var newmsg = $("#messageInput").val();
        this.setState({isMerchantMessage:true});
        setTimeout(function(){  
            document.getElementById("merchantMessage").innerHTML=newmsg;
        }, 100);
        
        setTimeout(function(){  
            self.setState({isBotReply:true});
            self.setState({disableme:true});
            $("#messageInput").val("");
        }, 2000);
    }

    render() {
        const emptyState = !store.get('ids');
        const {search, showBOT, isMerchantMessage, isBotReply, disableme} = this.state;
        return (
            <React.Fragment>
                <AppNavigation />
                <Page fullWidth>
                    <Layout>
                        <Layout.Section>
                            <div className="section-start">
                                <Card sectioned>
                                    <h2 className="Polaris-Heading proto">Welcome to pur Help Center <Badge progress="complete">Chat is not live</Badge></h2>
                                    <p className="sub-heading">Please check out videos and articles below to find out more about [our app]</p>
                                    <p className="mt_2">If you couldn't find what you need from the videos and articles below please check the "I still need help" button to contact our support team directly. We aim to response and solve any problem you have within 24 to 48 hours. Thank you for your patience!</p>
                                </Card>
                            </div>

                            <div className="text_center mt_3 mb_3">
                                <Button primary onClick={this.showbot}>I still need help</Button>
                            </div>

                            
                            { !showBOT?
                                <div className="articlelist">
                                    <Form onSubmit={this.handleSubmit}>
                                        <FormLayout>
                                            <Stack spacing="extraTight">
                                                <Stack.Item fill>
                                                    <TextField
                                                        label=""
                                                        value={search}
                                                        onChange={this.handleChange('search')}
                                                        prefix={<Icon source={SearchMinor} color="base" />}
                                                        id="search"
                                                        type="search"
                                                        placeholder="Search"
                                                    />
                                                </Stack.Item>
                                            </Stack>
                                        </FormLayout>
                                    </Form>
                                    <DataTable
                                        title=""
                                        striped
                                        columns={columns}
                                        data={this.state.data}
                                        pagination={true}
                                        responsive={true}
                                    />
                                </div>
                            :
                                <div className="chatbox">
                                    <Card sectioned>
                                        <div className="messagesSection">
                                            <div className="preMessage">Sorry but we are not live at the moment, Please send us a message below and we will get back to you within the next 24 hours.
                                            </div>    
                                            { isMerchantMessage?
                                                <div className="merchantMessage">
                                                    <p id="merchantMessage"></p>
                                                </div>
                                            : null }
                                            { isBotReply?
                                                <div className="botMessage">Thank you for the message - your request has been received, you will hear from us within the next 24 hours.
                                                </div>
                                            :null}
                                            
                                        </div>
                                        <div className="newMessageSection">
                                            <input type="text" id="messageInput" placeholder="I need help with..."/>
                                            <Button primary disabled={disableme} onClick={this.sendMsg} id="sendMsgBtn">Send message</Button>
                                        </div>

                                    </Card>
                                </div>
                            }

                        </Layout.Section>
                        
                        <Layout.Section secondary>
                            <div className="section-media">
                                <MediaCard
                                    title="Turn your side-project into a business"
                                    primaryAction={{
                                    content: 'Learn more',
                                    // onAction: () => { this.mediaOnClick },
                                    // onClick: () => { this.mediaOnClick },
                                    }}
                                    description={`In this course, you’ll learn how the Kular family turned their mom’s recipe book into a global business.`}
                                >
                                    <VideoThumbnail
                                        videoLength={120}
                                        thumbnailUrl="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1350"
                                        onClick={this.mediaOnClick}
                                    />

                                </MediaCard>
                                <MediaCard
                                    title="Turn your side-project into a business"
                                >
                                    <VideoThumbnail
                                        videoLength={120}
                                        thumbnailUrl="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1350"
                                        onClick={this.mediaOnClick}
                                    />

                                </MediaCard>
                                <MediaCard
                                    title="Turn your side-project into a business"
                                >
                                    <VideoThumbnail
                                        videoLength={120}
                                        thumbnailUrl="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1350"
                                        onClick={this.mediaOnClick}
                                    />

                                </MediaCard>

                                <MediaCard
                                    title="Turn your side-project into a business"
                                >
                                    <VideoThumbnail
                                        videoLength={120}
                                        thumbnailUrl="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1350"
                                        onClick={this.mediaOnClick}
                                    />

                                </MediaCard>
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