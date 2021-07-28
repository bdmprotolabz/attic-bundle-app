import React, { Component, useState } from 'react';
import { EmptyState, Layout, Page, Card, Stack, Heading, Badge, Banner, Icon, Button, VideoThumbnail, MediaCard, TextStyle, ProgressBar, Select, TextField, ButtonGroup, DisplayText, FormLayout, DatePicker, Checkbox } from '@shopify/polaris';
import AppFooter from './appfooter';
import AppNavigation from './appnavigation';
import AddBundleNav from './add-bundle-nav';
import store from 'store-js';
import ResourceListWithProducts from '../components/ResourceList';
import AddBundleLeftSection from './add-bundle-left-section';
import { ChevronLeftMinor, ChevronRightMinor, DeleteMajor } from '@shopify/polaris-icons';
import { Context } from '@shopify/app-bridge-react';
import { Redirect } from '@shopify/app-bridge/actions';
import { baseUrl } from './baseUrl';

const axios = require('axios');
const img = 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg';

const options = [
    { label: 'Fixed amount off', value: 'fixed_amount_off' },
    { label: 'Percentage Off', value: 'percentage_off' },
    // { label: 'Fixed Price', value: 'fixed_price' },
    { label: 'Free Shipping', value: 'free_shipping' },
];

const optionsForStandard = [
    { label: 'Fixed amount off', value: 'fixed_amount_off' },
    { label: 'Percentage Off', value: 'percentage_off' },
]

class AddBundleStepTwo extends Component {

    state = {
        bundleTypeCombo: false,
        bundleTypeStandard: true,
        selected: '',
        fixed_amount_off_textbox: '',
        percentage_off_textbox: '',
        fixed_price_textbox: '',
        fixed_amount_off_textbox_visible: true,
        percentage_off_textbox_visible: false,
        fixed_price_textbox_visible: false,
        bundle_message: '',
        success_message: '',
        active_date: '',
        deactive_date: '',
        isScheduleBundle: false,

        // for the standard-single product bundle
        standard_quantity_textbox: '',
        standard_quantity_discount: '',
        rows: [{}]
    }

    handleSelectChange = (e) => {
        console.log(e)
        this.setState({ selected: e })


        if (e === 'fixed_amount_off') {
            this.setState({
                fixed_amount_off_textbox_visible: true,
                percentage_off_textbox_visible: false,
                fixed_price_textbox_visible: false
            })
        }
        else if (e === 'percentage_off') {
            this.setState({
                percentage_off_textbox_visible: true,
                fixed_amount_off_textbox_visible: false,
                fixed_price_textbox_visible: false
            })
        }
        // else if (e === 'fixed_price') {
        //     this.setState({
        //         fixed_price_textbox_visible: true,
        //         fixed_amount_off_textbox_visible: false,
        //         percentage_off_textbox_visible: false,
        //     })
        // }
        else {
            this.setState({
                fixed_price_textbox_visible: false,
                fixed_amount_off_textbox_visible: false,
                percentage_off_textbox_visible: false,
            })
        }

    }

    handleChange = (field) => {
        return (value) => this.setState({ [field]: value });
    };


    handleDateChange = (e, type) => {
        // console.log(e.target.value)
        console.log(type)
        if (type === 'active_date') {
            this.setState({ active_date: e.target.value })
        }
        if (type === 'deactive_date') {
            this.setState({ deactive_date: e.target.value })
        }
    }

    handleCheckboxChange = () => {
        // console.log(this.state.isScheduleBundle)
        this.setState({ isScheduleBundle: !this.state.isScheduleBundle })
    }


    saveStepTwo = () => {
        console.log('okok')

        var pricingDiscountType = '';
        var pricingDiscountAmount = [];



        if (this.state.bundleTypeCombo) {
            if (this.state.selected === "fixed_amount_off") {
                pricingDiscountType = "fixed_amount_off";
                pricingDiscountAmount = this.state.fixed_amount_off_textbox;
            }
            else if (this.state.selected === "percentage_off") {
                pricingDiscountType = "percentage_off";
                pricingDiscountAmount = this.state.percentage_off_textbox;
            }
            else {
                pricingDiscountType = "free_shipping";
                pricingDiscountAmount = '';
            }
        }

        if (this.state.bundleTypeStandard) {
            if (this.state.selected === "fixed_amount_off") {
                pricingDiscountType = "fixed_amount_off";
                pricingDiscountAmount = this.state.rows;
            }
            if (this.state.selected === "percentage_off") {
                pricingDiscountType = "percentage_off";
                pricingDiscountAmount = this.state.rows;
            }
        }


        var self = this;
        axios.post(baseUrl + '/save-step-two', {
            id: store.get('bId'),
            pricingDiscountType: pricingDiscountType,
            pricingDiscountAmount: pricingDiscountAmount,
            bundleMessage: this.state.bundle_message,
            bundleSuccessMessage: this.state.success_message,
            scheduleBundle: this.state.isScheduleBundle,
            activeDate: this.state.active_date,
            DeActiveDate: this.state.deactive_date,
        })
            .then(function (response) {
                // handle success
                console.log(response.data);
                if (response.data.responseCode == 200) {

                    self.setState({ redirect: true }, function () { })
                }
            })
            .catch(function (error) {
                // handle error
                console.log(error);
                // this.setState({ redirect: false }, function () { })
            })

        self.setState({ redirect: true }, function () { })
    }

    handleRowChange = (e, idx, type) => {

        // 1. Make a shallow copy of the items
        let rows = [...this.state.rows];
        // 2. Make a shallow copy of the item you want to mutate
        let row = { ...rows[idx] };
        // 3. Replace the property you're intested in
        if (type === 'st_quantity') {
            row.st_quantity = e;
        }
        if (type === 'st_discount') {
            row.st_discount = e;
        }
        // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
        rows[idx] = row;
        // 5. Set the state to our new copy
        this.setState({ rows });

    };
    handleAddRow = () => {
        const item = {
            st_quantity: "",
            st_discount: ""
        };
        this.setState({
            rows: [...this.state.rows, item]
        });
    };
    handleRemoveRow = () => {
        this.setState({
            rows: this.state.rows.slice(0, -1)
        });
    };
    handleRemoveSpecificRow = (idx) => () => {
        const rows = [...this.state.rows]
        rows.splice(idx, 1)
        this.setState({ rows })
    }


    componentDidMount() {
        console.log(store.get('bId'))
        if (store.get('bId') != undefined || store.get('bId') != '' || store.get('bId') != null) {

            var self = this;
            axios.post(baseUrl + '/get-bundle-by-id/' + store.get('bId'))
                .then(function (response) {
                    console.log(response.data);

                    if (response.data.responseCode === '200' || response.data.responseCode === 200) {

                        if (response.data.data[0].bundleType === 'combo_bundle') {
                            self.setState({
                                bundleTypeCombo: true,
                                bundleTypeStandard: false,
                            })
                        }
                        if (response.data.data[0].bundleType === 'standard_bundle') {
                            self.setState({
                                bundleTypeStandard: true,
                                bundleTypeCombo: false
                            })
                        }
                    }

                })
                .catch(function (error) {
                    console.log(error);
                });

        }
    }

    static contextType = Context;

    render() {
        const app = this.context;

        const saveDataAndRedirect = async () => {

            await this.saveStepTwo();

            if (this.state.redirect) {
                const redirect = Redirect.create(app);
                redirect.dispatch(
                    Redirect.Action.APP,
                    '/add-bundle-step-three',
                );
            }
        };

        const emptyState = !store.get('ids');
        const { selected, bundle_message, success_message, active_date, deactive_date, isScheduleBundle, fixed_amount_off_textbox, percentage_off_textbox, fixed_price_textbox, standard_quantity_textbox, standard_quantity_discount } = this.state;

        console.log(this.state)
        return (
            <React.Fragment>
                <AppNavigation />

                <Page>

                    <AddBundleNav />

                    <Layout>
                        <Layout.Section secondary>
                            <AddBundleLeftSection />
                        </Layout.Section>


                        <Layout.Section >
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
                                    <ProgressBar progress={0} size="small" />
                                    <TextStyle variation="subdued">Build offer &nbsp;   &nbsp;  &nbsp; </TextStyle>
                                </span>

                                <span>
                                    <ProgressBar progress={0} size="small" />
                                    <TextStyle variation="subdued">Customize & Launch</TextStyle>
                                </span>
                            </Stack>

                            <br />

                            {
                                this.state.bundleTypeCombo && <Card sectioned title="Set Pricing/Discount">
                                    {/* <div className="mb_2"><DisplayText size="small">Set Pricing/Discount</DisplayText></div> */}
                                    <Stack wrap={false} distribution="fillEvenly" >
                                        <Select
                                            label=""
                                            options={options}
                                            onChange={this.handleSelectChange}
                                            value={selected}
                                        />


                                        {
                                            this.state.fixed_amount_off_textbox_visible && <TextField
                                                label=""
                                                type="number"
                                                value={fixed_amount_off_textbox}
                                                onChange={this.handleChange('fixed_amount_off_textbox')}
                                                suffix={'OFF'}
                                                id="fixed_amount_off_textbox"
                                                type="fixed_amount_off_textbox"
                                                placeholder="60"
                                            />
                                        }
                                        {
                                            this.state.percentage_off_textbox_visible && <TextField
                                                label=""
                                                type="number"
                                                value={percentage_off_textbox}
                                                onChange={this.handleChange('percentage_off_textbox')}
                                                suffix={'% OFF'}
                                                id="percentage_off_textbox"
                                                type="percentage_off_textbox"
                                                placeholder="60"
                                            />
                                        }
                                        {/* {
                                    this.state.fixed_price_textbox_visible && <TextField
                                        label=""
                                        value={fixed_price_textbox}
                                        onChange={this.handleChange('fixed_price_textbox')}
                                        id="fixed_price_textbox"
                                        type="fixed_price_textbox"
                                        placeholder="60"
                                    />
                                } */}




                                    </Stack>
                                </Card>


                            }


                            {/* For the standard bundle */}
                            {
                                this.state.bundleTypeStandard && <Card sectioned title="Set Pricing/Discount">
                                    {/* <div className="mb_2"><DisplayText size="small">Set Pricing/Discount</DisplayText></div> */}
                                    <Stack distribution="fill" >
                                        <Select
                                            label=""
                                            options={optionsForStandard}
                                            onChange={this.handleSelectChange}
                                            value={selected}
                                        />
                                    </Stack>

                                    <br />

                                    {/* <Stack wrap={false} distribution="fill" alignment="center">
                                    <TextField
                                        label="Quantity"
                                        type="number"
                                        value={standard_quantity_textbox}
                                        onChange={this.handleChange('standard_quantity_textbox')}
                                        id="standard_quantity_textbox"
                                        type="standard_quantity_textbox"
                                        placeholder="60"
                                    />
                                    <TextField
                                        label="Discount"
                                        type="number"
                                        value={standard_quantity_discount}
                                        onChange={this.handleChange('standard_quantity_discount')}
                                        suffix={'OFF'}
                                        id="standard_quantity_discount"
                                        type="standard_quantity_discount"
                                        placeholder="60"
                                    />
                                    <div className="step_two_del_btn">
                                        <Button destructive><Icon
                                            source={DeleteMajor}
                                            color="base" /></Button>
                                    </div>

                                </Stack> */}


                                    {this.state.rows.map((item, idx) => (
                                        // <tr id="addr0" key={idx}>
                                        <Stack wrap={false} distribution="fill" alignment="center" key={idx}>

                                            {/* <input
                                                type="text"
                                                name="name"
                                                value={this.state.rows[idx].name}
                                                onChange={this.handleRowChange(idx)}
                                                className="form-control"
                                            /> */}
                                            <TextField
                                                label="Quantity"
                                                type="number"
                                                value={this.state.rows[idx].st_quantity}
                                                onChange={(e) => this.handleRowChange(e, idx, 'st_quantity')}
                                                id="st_quantity"
                                                placeholder="1"
                                            />

                                            {/* <input
                                                type="text"
                                                name="st_discount"
                                                value={this.state.rows[idx].st_discount}
                                                onChange={this.handleRowChange(idx)}
                                                className="form-control"
                                            /> */}
                                            <TextField
                                                label="Discount"
                                                type="number"
                                                value={this.state.rows[idx].st_discount}
                                                onChange={(e) => this.handleRowChange(e, idx, 'st_discount')}
                                                id="st_discount"
                                                placeholder="10"
                                            />

                                            <div className="step_two_del_btn">
                                                <Button destructive onClick={this.handleRemoveSpecificRow(idx)}><Icon
                                                    source={DeleteMajor}
                                                    color="base" /></Button>
                                            </div>
                                            {/* <button
                                                className="btn btn-outline-danger btn-sm"
                                                onClick={this.handleRemoveSpecificRow(idx)}
                                            >
                                                Remove
                                            </button> */}
                                        </Stack>
                                    ))}

                                    {/* <button onClick={this.handleAddRow} className="btn btn-primary">
                                    Add Row
              </button> */}

                                    <br />
                                    <Button fullWidth outline onClick={this.handleAddRow}>Add more quantity and Discount</Button>

                                </Card>
                            }


                            {/* <div className="hr mt_3"></div> */}

                            < br />
                            <Card sectioned>
                                <FormLayout>
                                    <TextField
                                        label="Bundle Message"
                                        value={bundle_message}
                                        onChange={this.handleChange('bundle_message')}
                                        id="bundle_message"
                                        type="bundle_message"
                                        placeholder="Buy this bundle and save"
                                    />

                                    <TextField
                                        label="Success Message"
                                        value={success_message}
                                        onChange={this.handleChange('success_message')}
                                        id="success_message"
                                        type="success_message"
                                        placeholder="Awesome, you saved by bundling"
                                        helpText={'Eg: Awesome you saved by bundling'}
                                    />


                                </FormLayout>

                            </Card>

                            <Card sectioned title="Schedule Bundle (Optional)" >
                                {/* <div className="add_bundle_add_product_section border mt_4"> */}
                                {/* <div className="header">
                                        <b>Schedule Bundle </b> {' '} (Optional)
                                </div> */}

                                <div className=" ">
                                    <FormLayout>
                                        <Checkbox
                                            label="Schedule Bundle"
                                            checked={isScheduleBundle}
                                            onChange={this.handleCheckboxChange}
                                        />
                                        <Stack wrap={false} distribution="fillEvenly" >

                                            <div>
                                                <p>Active Date</p>
                                                <input type="date" onChange={(e) => this.handleDateChange(e, 'active_date')} className="input_date" />
                                            </div>
                                            <div>
                                                <p>Deactive Date</p>
                                                <input type="date" onChange={(e) => this.handleDateChange(e, 'deactive_date')} className="input_date" />
                                            </div>


                                        </Stack>
                                    </FormLayout>
                                </div>
                                {/* </div> */}
                                <TextStyle variation="subdued"> The time zone used is based on your business settings </TextStyle>
                            </Card>



                            <br />
                            <div className="float_right my_2">
                                <ButtonGroup segmented>
                                    <Button >
                                        <Icon
                                            source={ChevronLeftMinor}
                                            color="base" />
                                    </Button>
                                    <Button onClick={() => saveDataAndRedirect()}>
                                        <Icon
                                            source={ChevronRightMinor}
                                            color="base" /></Button>
                                </ButtonGroup>
                            </div>

                        </Layout.Section>
                    </Layout>

                </Page>

                <AppFooter />
            </React.Fragment>
        );
    }
}

export default AddBundleStepTwo;