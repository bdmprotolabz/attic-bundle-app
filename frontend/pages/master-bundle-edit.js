import React, { Component } from 'react';
import { Layout, Page, Card, Form, FormLayout, RadioButton, Icon, Button, TextStyle, TextField, Select, Stack, List, TextContainer, VideoThumbnail, MediaCard,Modal } from '@shopify/polaris';
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

var isSelected = false;

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
    //setCookie('selecteddd', state.selectedRows);

};

const handleChange1 = (state) => {
    const abc = this;
    // You can use setState or dispatch with something like Redux so we can use the retrieved data
    console.log('Selected Rows5: ', state.selectedRows);
    const array = state.selectedRows;
    const length = array.length;
    //setCookie('selecteddd', state.selectedRows);

    const stringData = array.reduce((result,item)=>{
        return `${result}${item.id}|`
    },"");
    console.log("str is " + stringData);
    store.set('selectedDatais', stringData);
    isSelected = stringData;
    //showContinueButton();
    //this.setState({ isSelected: true })
};

const handleCancel = () =>{
    //this.setState({ showModal: false })
    console.log("Let's cancel...");
}

const handleContinue = () =>{
    console.log("Let's continue...");
    //self.setState({ redirect: true }
}


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



class MasterBundleEdit extends Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {isSelected: false};

    //     // This binding is necessary to make `this` work in the callback
    //     this.handleChange1 = this.handleChange1.bind(this);
    // }
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
        typeOptions: [
            { label: 'Type', value: '' },
            { label: 'Standard', value: 'Standard' },
            { label: 'Combo', value: 'Combo' },
        ],
        SelectedType: '',
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
        data: [],
        showModal: false,
        redirect: false
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

    handleCancel = () =>{
        this.setState({showModal: false })
        console.log("Let's cancel...");
    }


    handlefilterChange = (e) => {
        // console.log(e)
        this.setState({ filter: e.target.value });
    };

    componentDidMount() {
    }

    getBundlesByShop = () => {
        var self = this;

        console.log(store.get('shopName'))
        console.log(this.state.shopName)

        let shopName = '';

        if (this.state.shopName === '' && store.get('shopName') !== undefined) {
            console.log('store')
            shopName = store.get('shopName');
        }

        if (store.get('shopName') === undefined && this.state.shopName !== '') {
            console.log('shop')
            shopName = this.state.shopName;
        }


        console.log('shopName', shopName)

        if (shopName !== '') {
            axios.post(baseUrl + '/get-bundles-by-shop/' + shopName)
                .then(function (response) {
                    // handle success
                    console.log(response.data);
                    if (response.data.responseCode == 200) {

                        var data = [];
                        var ddd = [];
                        data = response.data.data;

                        data.map((d, i) => {
                            console.log(d._id)
                            ddd[i] = {
                                "id": d._id + '##'+ d.bundleName,
                                "view": <Icon source={ViewMajor} color="decorative" color="base" />,
                                "bundle_detail": d.bundleName + ' - ' + d.bundleTag + ' - ' + d.createdAt,
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

    
    handleModal = (e, v) => {
        console.log(e)
        console.log(v)
        if(v === 'bundle_visible') {
            this.setState({ showModal: true })
        } else {
            this.setState({ showModal: false })
        }
    }

    handleChange1 = (state)=>{
        console.log("hii");
    }

    showContinueButton(){
        console.log("my value is: " + isSelected);
        if (isSelected != "") {
            return <Button primary onClick={(e) => this.handleModal(e, 'bundle_visible')}>Master edit Confirmation</Button>
        }else{
            return <Button danger>Master edit Confirmation</Button>
        }
    }

    render() {
        const app = this.context;
        const Redirectme = () => {
            console.log("I am clicked");
            const redirect = Redirect.create(app);
            redirect.dispatch(
                Redirect.Action.APP,
                '/master-bundles-settings',
            );
        }
        // if (store.get('selectedDatais') !== undefined) {
        //     console.log('store')
        //     isSelected = store.get('selectedDatais');
        // }
        console.log("all states" + this.state.isSelected)
        const { search, filter, SelectedTag, SelectedType, SelectedName, SelectedDate, showModal } = this.state;
        return (
            <React.Fragment>
                <AppNavigation />

                {/* DontHaveBundles */}

                <Page>

                    <Query query={GET_SHOP_NAME} >
                        {({ data, loading, error }) => {
                            if (loading) return <div>Loading…</div>;
                            if (error) return <div>{error.message}</div>;
                            console.log(error);
                            console.log(data);
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
                                <div className="bundlelist">
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
                                        onSelectedRowsChange={handleChange1}
                                        clearSelectedRows={this.state.toggledClearRows}
                                        pagination={true}
                                        responsive={true}
                                    />
                                </div>

                                <div className="text_right mt_3">
                                    <Button primary onClick={(e) => this.handleModal(e, 'bundle_visible')}>Master edit Confirmation</Button>
                                </div>
                            </Card>
                            
                            <div style={{ height: '500px' }}>
                                <Modal
                                    // activator={<Button >Open</Button>}
                                    open={showModal}
                                    onClose={() => this.setState({ showModal: !this.state.showModal })}
                                    title="Confirm Bundles"
                                    
                                >
                                    <Modal.Section>
                                        { isSelected ?
                                        <Stack vertical>
                                            <Stack.Item>
                                              <TextContainer>
                                                <p>
                                                    Please click on "continue" button to edit selected bundles.
                                                </p>
                                              </TextContainer>
                                            </Stack.Item>
                                            <Stack.Item fill>
                                                
                                            <Link href="/master-bundles-settings">
                                                <Button primary> Continue</Button>                          
                                            </Link>
                                            </Stack.Item>
                                        </Stack>
                                        :
                                        <Stack vertical>
                                            <Stack.Item>
                                              <TextContainer>
                                                <p>
                                                    Please select atleast one bundle to continue.
                                                </p>
                                              </TextContainer>
                                            </Stack.Item>
                                            <Stack.Item fill>
                                            </Stack.Item>
                                        </Stack>
                                        }
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

export default MasterBundleEdit;