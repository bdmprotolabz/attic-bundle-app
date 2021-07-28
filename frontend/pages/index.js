import React from 'react';
import { EmptyState, Layout, Page, Card, Stack, Heading, Badge, Banner, Icon, Button, VideoThumbnail, MediaCard, TextContainer, DisplayText } from '@shopify/polaris';
import { ResourcePicker, TitleBar } from '@shopify/app-bridge-react';
import store from 'store-js';
import Link from 'next/link';
import ResourceListWithProducts from '../components/ResourceList';
import { CircleInformationMajor } from '@shopify/polaris-icons';
// import Image from 'next/image'
// import bundle_img from '../public/images/bundles.png';

import AppNavigation from './appnavigation';
import AppFooter from './appfooter';

const img = 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg';


class Index extends React.Component {

  state = {
    open: false,
    enabled: false,
    showBanner: true
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



    return (
      <React.Fragment>

        <AppNavigation />

        {/* <TitleBar
            title="Home"
            primaryAction={{
              content: 'Select products',
              onAction: () => this.setState({ open: true }),
            }}
          /> */}

        {/* <ResourcePicker
            resourceType="Product"
            showVariants={false}
            open={this.state.open}
            onSelection={(resources) => this.handleSelection(resources)}
            onCancel={() => this.setState({ open: false })}
          /> */}

        <Page >
          <Layout>
            <Layout.Section>

              <Stack >
                <Stack.Item fill>
                  <Heading>Welcome. [Store name here]! </Heading>
                </Stack.Item>
                <Stack.Item>
                  <Heading>Your current plan is <Badge progress="complete" status="success">Premium</Badge> </Heading>
                </Stack.Item>
              </Stack>

              <br />
              <br />
              {
                this.state.showBanner && <Banner onDismiss={this.showBannerFunction} status="success" className="custom" id="customname" style={{ 'background': 'white' }}>
                  <b>Thank you for using [app name here]</b>
                  <p>
                    Whenever you need any help please don’t hesitate to check the documentation in the Support center or contact us anytime.
                  <Link href=""> Link</Link>
                  </p>
                </Banner>
              }

              <br />
              <br />

              <Card title="Get started with your first bundle " sectioned>
                <p className="mb_25">Our app can create any type of product bundle no matter the quantify or number of products</p>
                {/* <hr /> */}
                <div className="text_right">
                  <Link href="/add-bundle-step-one">
                    <Button primary>Build my first bundle</Button>
                  </Link>
                </div>
              </Card>

              <Card title="Active Bundles" sectioned>
                <p className="mb_25">List here with the active bundles the customers have </p>
                <Stack distribution="fill">
                  <Link href="/bundles">
                    <Button primary>Browse bundle list</Button>
                  </Link>
                  <div className="text_right">
                    <Link href="/add-bundle-step-one">
                      <Button primary>Build new bundle</Button>
                    </Link>
                  </div>
                </Stack>
              </Card>

            </Layout.Section>

            <Layout.Section secondary>

              <MediaCard
                title="Turn your side-project into a business"
                primaryAction={{
                  content: 'Learn more',
                  // onAction: () => { this.mediaOnClick },
                  // onClick: () => { this.mediaOnClick },
                }}
                description={`In this course, you’ll learn how the Kular family turned their mom’s recipe book into a global business.`}
                popoverActions={[{ content: 'Dismiss', onAction: () => { } }]}
                sdsd
              >
                <VideoThumbnail
                  videoLength={120}
                  thumbnailUrl="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1350"
                  onClick={this.mediaOnClick}
                />

              </MediaCard>
            </Layout.Section>
          </Layout>
        </Page>

        <AppFooter />


        {/* {emptyState ? (
            <Layout>
              <EmptyState
                heading="Select products to start"
                action={{
                  content: 'Select products',
                  onAction: () => this.setState({ open: true }),
                }}
                image={img}
              >
                <p>Select products and change their price temporarily</p>
              </EmptyState>
            </Layout>
          ) : (
            <ResourceListWithProducts />
          )} */}

      </React.Fragment>

    );
  }
  handleSelection = (resources) => {
    const idsFromResources = resources.selection.map((product) => product.id);
    this.setState({ open: false });
    store.set('ids', idsFromResources);
  };
}

export default Index;