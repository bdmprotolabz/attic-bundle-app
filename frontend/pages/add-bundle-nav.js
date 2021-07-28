import React, { Component } from 'react';
import { Layout, Badge, TextField } from '@shopify/polaris';
import store from 'store-js';
import { baseUrl } from "./baseUrl";

const axios = require('axios');
const options = [
    { label: 'Standard', value: 'standard_bundle' },
    { label: 'Combo', value: 'combo_bundle' },
];

class AddBundleNav extends Component {

    state = {
        selected: 'standard_bundle',
        bundle_name: '',
        bundle_tag: ''
    }

    handleSelectChange = (e) => {
        console.log(e)
        this.setState({ selected: e })
    }

    handleChange = (field) => {
        return (value) => this.setState({ [field]: value });
    };

    handleNameChange = (e) => {
        console.log(e)
        // this.setState({ bundle_name: e });

        var self = this; 

        axios.post(baseUrl + '/update-bundle-name', {
            id: store.get('bId'),
            value: e,
        })
            .then(function (response) {
                // handle success
                console.log(response.data);
                if (response.data.responseCode == 200) {

                    self.setState({bundle_name: e }, function () { })
                }
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })

    };

    handleTagChange = (e) => {
        // this.setState({ bundle_tag: e });

        var self = this; 

        axios.post(baseUrl + '/update-bundle-tag', {
            id: store.get('bId'),
            value: e,
        })
            .then(function (response) {
                // handle success
                console.log(response.data);
                if (response.data.responseCode == 200) {

                    self.setState({bundle_tag: e }, function () { })
                }
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    };

    componentDidMount() {
        console.log(store.get('bId'))

        var self = this;
        setTimeout(function () {
            
            if (store.get('bId') != 'undefined' && store.get('bId') != undefined && store.get('bId') != '' && store.get('bId') != null) {

                axios.post(baseUrl + '/get-bundle-by-id/' + store.get('bId'))
                    .then(function (response) {
                        console.log(response.data);

                        if (response.data.responseCode === '200' || response.data.responseCode === 200) {
                            console.log('in')
                            self.setState({
                                selected: response.data.data[0].bundleType,
                                bundle_name: response.data.data[0].bundleName,
                                bundle_tag: response.data.data[0].bundleTag,
                            }, function(){})
                        }

                    })
                    .catch(function (error) {
                        console.log(error);
                    });

            }
        }, 2000)
    }

    render() {
        // console.log(this.state)

        const { selected, bundle_name, bundle_tag } = this.state;

        return (
            <React.Fragment>
                <div className="add_bundle_nav">
                    <Layout>
                        <ul className="flex-container wrap ">
                            <li className="flex-item text_white mt_17"><span>Choose a name for your bundle</span></li>
                            {/* <li class="flex-item">
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
                                    onChange={(e) => this.handleNameChange(e)}
                                    placeholder="Bundle Name"
                                />
                            </li>
                            <li className="flex-item">
                                <TextField
                                    label=""
                                    value={bundle_tag}
                                    onChange={(e) => this.handleTagChange(e)}
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
            </React.Fragment>
        );
    }
}

export default AddBundleNav;