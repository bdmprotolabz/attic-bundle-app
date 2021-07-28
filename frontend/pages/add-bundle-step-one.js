import React, { Component } from 'react';
import { EmptyState, Layout, Page, Card, Stack, Heading, Badge, Banner, Icon, Button, VideoThumbnail, MediaCard, TextStyle, ProgressBar, Select, TextField, ButtonGroup, ResourceList, Avatar, ResourceItem, Thumbnail, Toast, Frame, Popover, ActionList } from '@shopify/polaris';
import { ResourcePicker } from '@shopify/app-bridge-react';
import AppFooter from './appfooter';
import AppNavigation from './appnavigation';
import AddBundleNav from './add-bundle-nav';
//import ResourceListWithProducts from '../components/ResourceList';
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

function makeid() {
    var text = "_d";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 15; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text + "vmgtsdr";
}

const rndomStr = (makeid());

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



class AddBundleStepOne extends Component {
    state = {
        open: false,
        productPageDisplay: '',
        specific_products: false,
        specificProductsResource: false,
        embededCode: '<div class="bundleEmbeded" data-id="' + rndomStr + '" id="bundleEmbeded">',
        embededCodeSTR: rndomStr,
        selected: 'standard_bundle',
        bundle_name: '',
        bundle_tag: '',

        bundleProducts: false,
        showSpecificProducts: false,

        selectedProducts: [],
        selectedSpecificProducts: [],
        redirect: false,
        shopName: ''
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

        if (this.state.bundle_name == '') {
            alert('Please fill the Bundle name');
            return;
        }

        if (this.state.bundle_tag == '') {
            alert('Please fill the Bundle Tag');
            return;
        }

        if (this.state.selectedProducts.length == 0) {
            alert('Please select the products');
            return;
        }

        if (this.state.productPageDisplay == '') {
            alert('Please select the product page display');
            return;
        }

        axios.post(baseUrl + '/save-step-one', {
            shopName: this.state.shopName,
            // bundleType: this.state.selected,
            bundleName: this.state.bundle_name,
            bundleTag: this.state.bundle_tag,
            products: this.state.selectedProducts,
            bundleDisplay: this.state.productPageDisplay,
            bundleDisplayProducts: this.state.selectedSpecificProducts,
            embededCode: this.state.embededCode,
            embededCodeSTR: this.state.embededCodeSTR,
            // other data goes empty
            pricingDiscountType: '',
            pricingDiscountAmount: '',
            bundleMessage: '',
            bundleSuccessMessage: '',
            scheduleBundle: false,
            activeDate: '',
            DeActiveDate: '',
            alignment: '',
            fontSize: '',
            fontColor: '',
            imageBorderRadius: '',
            buttonColor: '',
            buttonBgColor: '',
            buttonFontSize: '',
            buttonBorderRadius: '',
            animation: '',
            status: 0
        })
            .then(function (response) {
                // handle success
                console.log(response.data);
                if (response.data.responseCode == 200) {
                    store.set('bId', '');
                    store.set('bId', response.data.data);
                    // cookies.set('bundleId', response.data.data);

                    self.setState({ redirect: true }, function () { })
                }
            })
            .catch(function (error) {
                // handle error
                console.log(error);
                // return 'errr';
                // this.setState({ redirect: false }, function () { })
            })
        // .then(function () {
        //     // always executed
        // });

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
            //selectMultiple="true"
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
    }


    static contextType = Context;

    static getInitialProps({ query }) {
        return { query }
    }

    render() {

        console.log(this.props.query)
        console.log(router.query)


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
        const { specific_products, embededCode, embededCodeSTR, selected, bundle_name, bundle_tag } = this.state;
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

                        <div className="add_bundle_nav">
                            <Layout>
                                <ul className="flex-container wrap ">
                                    <li className="flex-item text_white mt_17"><span>Choose a name for your bundle</span></li>
                                    {/* <li className="flex-item">
                                        <Select
                                            label=""
                                            options={options}
                                            onChange={this.handleSelectChange}
                                            value={selected}
                                        />
                                    </li> */}
                                    <li className="flex-item">
                                        <TextField
                                            label=""
                                            value={bundle_name}
                                            onChange={this.handleChange('bundle_name')}
                                            id="bundle_name"
                                            type="bundle_name"
                                            placeholder="Bundle Name"
                                        />
                                    </li>
                                    <li className="flex-item">
                                        <TextField
                                            label=""
                                            value={bundle_tag}
                                            onChange={this.handleChange('bundle_tag')}
                                            id="bundle_tag"
                                            type="bundle_tag"
                                            placeholder="Bundle Tag"
                                        />
                                    </li>
                                    <li className="flex-item mt_17">
                                        <Badge progress="complete" status="">Status</Badge>
                                    </li>
                                </ul>
                            </Layout>

                        </div>

                        <br />

                        <Layout>
                            {/* <Button onClick={() => { redirectToProduct(); }}>btn</Button> */}

                            <Layout.Section secondary>

                                {/* <AddBundleLeftSection /> */}
                                {
                                    this.state.selectedProducts.length > 0 ?
                                        this.state.selectedProducts.map((item, idx, arr) => {
                                            return <div className="mb_1 product-container" key={idx}>
                                                <Stack wrap={false} distribution="" alignment="center">
                                                    <div className="imageContainer">
                                                        {
                                                            store.get('bId') !== undefined && store.get('bId') !== '' && store.get('bId') !== null
                                                                ?
                                                                <img
                                                                    style={{
                                                                        boxShadow: "0px 0px 10px 0px #888",
                                                                        borderRadius: "5px",
                                                                        borderWidth: "0px",
                                                                        borderStyle: 'solid',
                                                                        borderColor: '#fff',

                                                                    }}
                                                                    width={80}
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
                                        :
                                        <EmptyState
                                            heading="Selects product to view the Bundles Preview!!"
                                        ></EmptyState>

                                }

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

                                        <div><input type="radio" value="products_in_bundle" id="products_in_bundle"
                                            onChange={this.handlefilterChange} name="filters" />
                                            <label for="products_in_bundle">Product(s) In Bundle (default)</label></div>

                                        <div><input type="radio" value="specific_products" id="specific_products"
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


                                        <div><input type="radio" value="none_products_page" id="none_products_page"
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

export default AddBundleStepOne;