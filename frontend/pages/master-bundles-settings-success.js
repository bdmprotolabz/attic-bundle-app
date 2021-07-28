import React, { Component } from 'react';
import { EmptyState, Layout, Page, Card, Stack, Heading, Badge, Banner, Icon, Button, VideoThumbnail, MediaCard, TextStyle, ProgressBar, Select, TextField, ButtonGroup, DisplayText, FormLayout, DatePicker, Checkbox, Collapsible, TextContainer, RadioButton, Modal } from '@shopify/polaris';
import AppFooter from './appfooter';
import AppNavigation from './appnavigation';
import AddBundleNav from './add-bundle-nav';
import AddBundleLeftSection from './add-bundle-left-section';
import { Context } from '@shopify/app-bridge-react';
import { Redirect } from '@shopify/app-bridge/actions';
import Link from 'next/link';
import store from 'store-js';



    if(store.get('selectedDatais') === undefined || store.get('selectedDatais') === '' || store.get('selectedDatais') === null) {
        console.log("00000");
        var idArray = [];
        var selectedBundles = [
            { label: 'Bundle-one', value: 'Bundle-one', className:"p_3"},
            { label: 'Bundle-two', value: 'Bundle-two', className:"p_3" },
            { label: 'Bundle-three', value: 'Bundle-three', className:"p_3" },
        ];
    }else{
        console.log("yesyes" + store.get('selectedDatais'));
        var str = store.get('selectedDatais');
        var strarray= str.split('|');
        console.log("strarray is: " + strarray);
        var idArray = [];
        var nameArray =[];
        for(var i=0;i<strarray.length-1;i++){
            var newarr = strarray[i].split('##');
            console.log("id"+ newarr[0]+" ----- " + newarr[1]);
            idArray.push(newarr[0]);
            nameArray.push(newarr[1]);
        }
        //console.log("Name array is: " + nameArray);
        var selectedBundles=[];
        for(var j=0; j<nameArray.length;j++){
            selectedBundles[j] ={
                label: nameArray[j],
                value: nameArray[j],
                className:"p_3"
            };
        }
        console.log(selectedBundles);
    }
class masterBundlesSettingsSuccess extends Component {
    state = {
        value: 'disabled',
        disabled: true,
        showModal: false,
        selectedBundle: "select"
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

    handleChange = (field) => {
        return (value) => this.setState({ [field]: value });
    };
    static contextType = Context;
    render() {
        const app = this.context;

        const redirectBack = async () => {
            const redirect = Redirect.create(app);
            console.log("redirect is " + redirect);
            redirect.dispatch(
                Redirect.Action.APP,
                '/bundle-design',
            );
        }
        const { showModal } = this.state;
        const { selectedBundle } = this.state;
        return (
            <React.Fragment>
                <AppNavigation />

                <Page>

                    <div className="add_bundle_nav mb_3">
                        <div className="ContentSection text_white">
                            <span>The deisgn options you are about to edit will apply to the following bundles</span>
                        </div>
                        <div className="ContentSection2">
                            <Select 
                                readOnly 
                                options={selectedBundles} 
                                value={selectedBundle} 
                                onChange={this.handleChange('selectedbundle')}
                            />
                        </div>
                    </div>

                    <Layout>
                        <Layout.Section oneHalf>
                            <AddBundleLeftSection />
                        </Layout.Section>


                        <Layout.Section oneHalf>
                            


                            <div className="mt_2 text_center">
                                <Card sectioned>
                                    <Stack vertical>
                                        <p className="py_2">
                                            <DisplayText size="small">Visit the product page to ensure the bundle is displayed on the page</DisplayText>
                                            <TextContainer>
                                                <p className="pt_2">Use the preview on the left to confirm it is displayed accounting to your settings</p>
                                                     <Button primary>Go to Product Page <i className="fa fa-external-link" aria-hidden="true"></i></Button>
                                                
                                            </TextContainer>
                                        </p>
                                        <p>
                                            <Button primary>Confirm & Launch </Button>
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

                            <div style={{ height: '100px' }}>
                                <Modal
                                    // activator={<Button >Open</Button>}
                                    open={showModal}
                                    onClose={() => this.setState({ showModal: !this.state.showModal })}
                                    title="Please Leave a quick review :)"
                                    primaryAction={{
                                        content: "Sure!",
                                        // onAction: handleChange,
                                    }}
                                    secondaryActions={[
                                        {
                                            content: "No I'm having issues",
                                            // onAction: handleChange,
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
                    <div className="my_2">
                        <span>
                            <Button primary onClick={() => redirectBack()}>
                                Back to bundle list
                            </Button>
                        </span>
                        <span className="float_right">
                            <button className="Polaris-Button danger mr_1"> Delete </button>
                            <Button primary onClick={() => saveDataAndRedirect()}>
                                Save
                            </Button>
                        </span>
                    </div>
                </Page>

                <AppFooter />
            </React.Fragment>
        );
    }
}

export default masterBundlesSettingsSuccess;