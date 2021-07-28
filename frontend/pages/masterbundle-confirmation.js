import React, { Component } from 'react';
import { Layout, Page, Card, Form, FormLayout, RadioButton, Icon, Button, TextStyle, TextField, Select, Stack, List, TextContainer, VideoThumbnail, MediaCard } from '@shopify/polaris';
import AppFooter from './appfooter';
import AppNavigation from './appnavigation';
import DataTable from 'react-data-table-component';
import { ViewMajor, EditMajor, AnalyticsMajor, SearchMinor } from '@shopify/polaris-icons';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Context } from '@shopify/app-bridge-react';
import { Redirect } from '@shopify/app-bridge/actions';
import { baseUrl } from './baseUrl';
import Link from 'next/link';
import router from 'next/router'

const axios = require('axios');
const store = require('store-js');


const data = [
    {
        id: 1,
        view: <Icon source={ViewMajor} color="base" />,
        bundle_detail: <p>Bundle name, bundle type - one bold one not for easy reading <br /> Date created</p>,
        edit: <Icon source={EditMajor} color="primary" />,
        stats: <Icon source={AnalyticsMajor} color="decorative" />
    },
    {
        id: 2,
        view: <Icon source={ViewMajor} color="base" />,
        bundle_detail: <p>Bundle name, bundle type - one bold one not for easy reading <br /> Date created</p>,
        edit: <Icon source={EditMajor} color="primary" />,
        stats: <Icon source={AnalyticsMajor} color="decorative" />
    },

];

const columns = [
    {
        name: 'View',
        selector: 'view',
        sortable: false,

        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
    },
    {
        name: 'Bundle detail',
        selector: 'bundle_detail',
        sortable: true,
        grow: 450
        // right: true,
    },
    {
        name: 'Edit',
        selector: 'edit',
        // sortable: true,
        // right: true,
    },
    {
        name: 'Stats',
        selector: 'stats',
        // sortable: true,
        // right: true,
    },
];

const handleChange = (state) => {
    // You can use setState or dispatch with something like Redux so we can use the retrieved data
    console.log('Selected Rows: ', state.selectedRows);
};

// Toggle the state so React Table Table changes to `clearSelectedRows` are triggered
const handleClearRows = () => {
    this.setState({ toggledClearRows: !this.state.toggledClearRows })
}

// const handleEmailChange = useCallback((value) => setEmail(value), []);


const GET_SHOP_NAME = gql`
    query {
        shop {
            name
            myshopifyDomain
        }
    }
`;



class BundleDesign extends Component {

    state = {
        toggledClearRows: false,
        search: '',
        filter: '',
        tagOptions: [
            { label: 'Tag', value: '' },
            { label: 'Tag 1', value: '1' },
            { label: 'Tag 2', value: '2' },
        ],
        SelectedTag: '',
        nameOptions: [
            { label: 'Name', value: '' },
            { label: 'Name 1', value: '1' },
            { label: 'Name 2', value: '2' },
        ],
        SelectedName: '',
        dateOptions: [
            { label: 'Date', value: '' },
            { label: 'This Week', value: '1' },
            { label: 'This Month', value: '2' },
            { label: 'This Year', value: '3' },
        ],
        SelectedDate: '',
        shopName: '',
        data: []
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

    };

    handleChange = (field) => {
        return (value) => this.setState({ [field]: value });
    };

    handlefilterChange = (e) => {
        // console.log(e)
        this.setState({ filter: e.target.value });
    };

    // TagOptions = [
    //     { label: 'Tag 1', value: '1' },
    //     { label: 'Tag 2', value: '2' },
    // ];


    componentDidMount() {
        // if(!store.get('bId')) {
        //     alert('Please save the bundle from prev steps first');
        //     return;
        // }
        // console.log(store.get('shopName'))


    }

    getBundlesByShop = () => {
        var self = this;

        //console.log(store.get('shopName'))
        //console.log(this.state.shopName)

        let shopName = '';

        if (this.state.shopName === '' && store.get('shopName') !== undefined) {
            console.log('store')
            shopName = store.get('shopName');
        }

        if (store.get('shopName') === undefined && this.state.shopName !== '') {
            console.log('shop')
            shopName = this.state.shopName;
        }


        //console.log('shopName', shopName)

        if (shopName !== '') {
            axios.post(baseUrl + '/get-bundles-by-shop/' + shopName)
                .then(function (response) {
                    // handle success
                    //console.log(response.data);
                    if (response.data.responseCode == 200) {

                        var data = [];
                        var ddd = [];
                        data = response.data.data;

                        data.map((d, i) => {
                            console.log(d._id)
                            ddd[i] = {
                                "id": d._id,
                                "view": <Icon source={ViewMajor} color="decorative" color="base" />,
                                "bundle_detail": d.bundleName + ' - ' + d.createdAt,
                                "edit": <Button primary onClick={() => { store.set('bId', d._id); router.push('/edit-bundle-step-one'); }} ><Icon source={EditMajor} color="primary" /></Button>,
                                "stats": <Button><Icon source={AnalyticsMajor} color="primary" /></Button>
                            }
                        })

                        // onClick={() => store.set('bId', d._id)}

                        self.setState({ data: ddd }, function () { })

                    }
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                    // this.setState({ redirect: false }, function () { })
                })
        }
    }


    render() {

        const redirectToEditPage = () => {

        }

        console.log(this.state)
        const { search, filter, SelectedTag, SelectedName, SelectedDate } = this.state;

        return (
            <React.Fragment>
                <AppNavigation />
                <Page>

                    <Query query={GET_SHOP_NAME} >
                        {({ data, loading, error }) => {
                            if (loading) return <div>Loading…</div>;
                            if (error) return <div>{error.message}</div>;
                            //console.log(error);
                            //console.log(data);
                            if (data) {
                                if (this.state.shopName == '') {
                                    store.set('shopName', data.shop.myshopifyDomain)
                                    this.setState({ shopName: data.shop.myshopifyDomain }, function () { })
                                    this.getBundlesByShop();
                                }
                            }
                            return null;

                        }}
                    </Query>
                    
                    <Layout>
                        <Layout.Section>
                            <Card sectioned>

                                <Form onSubmit={this.handleSubmit}>

                                    <FormLayout>
                                        {/* <FormLayout.Group condensed> */}
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
                                            <Stack.Item>
                                                <Select
                                                    label=""
                                                    options={this.state.tagOptions}
                                                    onChange={this.handleChange('SelectedTag')}
                                                    value={SelectedTag}
                                                />
                                            </Stack.Item>
                                            
                                            <Stack.Item>
                                                <Select
                                                    label=""
                                                    options={this.state.nameOptions}
                                                    onChange={this.handleChange('SelectedName')}
                                                    value={SelectedName}
                                                />
                                            </Stack.Item>
                                            <Stack.Item>
                                                <Select
                                                    label=""
                                                    options={this.state.dateOptions}
                                                    onChange={this.handleChange('SelectedDate')}
                                                    value={SelectedDate}
                                                />
                                            </Stack.Item>
                                        </Stack>
                                    </FormLayout>

                                </Form>

                                <DataTable
                                    title=""
                                    columns={columns}
                                    data={this.state.data}
                                    selectableRows
                                    onSelectedRowsChange={handleChange}
                                    clearSelectedRows={this.state.toggledClearRows}
                                    pagination={true}
                                    responsive={true}
                                />

                                <div className="text_right mt_3">
                                    <Link href="/masterbundle-confirmation">
                                        <Button primary>Master edit bundles</Button>
                                    </Link>
                                </div>
                            </Card>
                        </Layout.Section>
                    </Layout>
                </Page>
                <AppFooter />
            </React.Fragment>
        );
    }
}

export default BundleDesign;