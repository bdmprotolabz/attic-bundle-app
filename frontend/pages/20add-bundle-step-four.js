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
const axios = require('axios');
const imgStyle = {
    borderWidth: '',
    borderRadius: '',
    borderColor: '',
    boxShadow: '',
    borderStyle: '',
    width: ''
}
class AddBundleStepFour extends Component {
    state = {
        value: 'disabled',
        disabled: true,
        showModal: false,
        productRedirectURL:'',
        products:[],
        finalProducts:[],
    }

    handleRadioChange = (e, v) => {
        console.log(e)
        console.log(v)
        if(v === 'bundle_visible') {
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
                        console.log(response.data.data[0]);
                        if (response.data.responseCode === '200' || response.data.responseCode === 200) {
                            var products = [];
                            products = response.data.data[0];

                            self.setState({
                                products:products,
                                finalProducts:response.data.data[0].products
                             })
                            if (response.data.data[0].shopName !== '') {
                                const productRedirectURL = "https://"+response.data.data[0].shopName + "/products/" + response.data.data[0].products[0].handle;
                                self.setState({productRedirectURL: productRedirectURL });
                            }
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

            }
        }, 2000)
    }

    handleModalSecondary =() =>{
        this.setState({ showModal: !this.state.showModal });
    }
    
    handleModalPrimary =() =>{
        this.setState({ showModal: !this.state.showModal });
    }

    launchBundle = () => {
        // console.log('okok')

        if (!store.get('bId')) {
            alert('Please save the bundle from prev steps first');
            return;
        }

        var self = this;

        axios.post(baseUrl + '/launchBundle', {
            id: store.get('bId'),
        })
            .then(function (response) {
                // handle success
                // console.log(response.data);
                if (response.data.responseCode == 200) {

                    self.setState({ redirect: true }, function () { })
                }
            })
            .catch(function (error) {
                // handle error
                // console.log(error);
                // this.setState({ redirect: false }, function () { })
            })

        self.setState({ redirect: true }, function () { })
    }
    
    static contextType = Context;
  
    render() {
        const app = this.context;
        const launchAndRedirect = async () => {

            await this.launchBundle();

            if (this.state.redirect) {
                const redirect = Redirect.create(app);
                redirect.dispatch(
                    Redirect.Action.APP,
                    '/bundles',
                );
            }
        };
        const { finalProducts,products, showModal} = this.state;
        //const productRedirectURL= this.state.redirecShop + "/products/" + redirecthandle;
        console.log("redirect url is: ")
        console.log(this.state.products)
        return (
            <React.Fragment>
                <AppNavigation />

                <Page>

                    <AddBundleNav />

                    <Layout>
                        <Layout.Section oneHalf>
                            <Card sectioned title="Preview your bundle">
                                <div className="bundlePreview">
                                    <div className="bundleTitle mb_2"> {this.state.products.bundleMessage}</div>
                                    {
                                        this.state.finalProducts.length > 0 ?
                                        this.state.finalProducts.map((item, idx, arr) => {
                                            return <div className="mb_1 product-container" key={idx}>
                                                <Stack wrap={false} distribution="" alignment="center">
                                                    <div className="imageContainer">
                                                        <img style={imgStyle}
                                                            src={item.images[0].originalSrc}
                                                            alt={item.images[0].altText}
                                                        />
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
                                            <button>Add to Cart</button>
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

                                            <Button primary onClick={() => launchAndRedirect()}>Confirm & Launch </Button>

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