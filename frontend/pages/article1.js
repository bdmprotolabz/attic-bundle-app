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
// import Image from 'next/image'
// import bundle_img from '../public/images/bundles.png';


const img = 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg';

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
    render() {
        const emptyState = !store.get('ids');
        const {search} = this.state;
        return (
            <React.Fragment>
                <AppNavigation />
                <Page fullWidth>
                    <Layout>
                        <Layout.Section>
                            <div className="section-start">
                                    <h1 className="Polaris-Heading"> # Learn how to get started with AppAttic</h1>
                                   
                                    <p className="mt_2">
                                        <div className="section-media-inside">
                                            <MediaCard title="Turn your side-project into a business">
                                            <VideoThumbnail
                                                videoLength={120}
                                                thumbnailUrl="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1350" onClick={this.mediaOnClick} />
                                            </MediaCard>
                                
                                        </div>
                                        Lorem Ipsum
                                        "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."
                                        "There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain..."
                                    </p>

                                    <p className="mt_2">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                        Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae scelerisque enim ligula venenatis dolor. Maecenas nisl est, ultrices nec congue eget, auctor vitae massa. Fusce luctus vestibulum augue ut aliquet. Mauris ante ligula, facilisis sed ornare eu, lobortis in odio. Praesent convallis urna a lacus interdum ut hendrerit risus congue. Nunc sagittis dictum nisi, sed ullamcorper ipsum dignissim ac. In at libero sed nunc venenatis imperdiet sed ornare turpis. Donec vitae dui eget tellus gravida venenatis. Integer fringilla congue eros non fermentum. Sed dapibus pulvinar nibh tempor porta. Cras ac leo purus. Mauris quis diam velit.
                                    </p>

                                    <p className="mt_2">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus 
                                        imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae scelerisque enim ligula venenatis dolor. Maecenas nisl est, ultrices nec congue eget, auctor vitae massa. Fusce luctus vestibulum augue ut aliquet. Mauris ante ligula, facilisis sed ornare eu, lobortis in odio. Praesent convallis urna a lacus interdum ut hendrerit risus congue. Nunc sagittis dictum nisi, sed ullamcorper ipsum dignissim ac. In at libero sed nunc venenatis imperdiet sed ornare turpis. Donec vitae dui eget tellus gravida venenatis. Integer fringilla congue eros non fermentum. Sed dapibus pulvinar nibh tempor porta. Cras ac leo purus. Mauris quis diam velit.
                                    </p>
                                    
                                    <p className="mt_2">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                        Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae scelerisque enim ligula venenatis dolor. Maecenas nisl est, ultrices nec congue eget, auctor vitae massa. Fusce luctus vestibulum augue ut aliquet. Mauris ante ligula, facilisis sed ornare eu, lobortis in odio. Praesent convallis urna a lacus interdum ut hendrerit risus congue. Nunc sagittis dictum nisi, sed ullamcorper ipsum dignissim ac. In at libero sed nunc venenatis imperdiet sed ornare turpis. Donec vitae dui eget tellus gravida venenatis. Integer fringilla congue eros non fermentum. Sed dapibus pulvinar nibh tempor porta. Cras ac leo purus. Mauris quis diam velit.
                                    </p>
                            </div>
                            <div className="mt_4 text_center">
                                <Button id="mr_1" onClick={() => { router.push('/support-center'); }}>Go Back</Button>
                                <Button primary >I found what I needed</Button>
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