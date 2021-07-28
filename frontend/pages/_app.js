import React, { useState } from 'react';
import App from 'next/app';
import Head from 'next/head';
import { AppProvider, Frame, TopBar, Icon, VisuallyHidden, Navigation } from '@shopify/polaris';
import { Provider, Context } from "@shopify/app-bridge-react";
import { authenticatedFetch } from "@shopify/app-bridge-utils";
import '@shopify/polaris/dist/styles.css';
import translations from '@shopify/polaris/locales/en.json';
import ClientRouter from '../components/ClientRouter';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import {
  AbandonedCartMajor, QuestionMarkMajor
} from '@shopify/polaris-icons';
import '../styles.css';
const store = require('store-js');
// import '@ashvin27/react-datatable/src/index';
// import '@ashvin27/react-datatable/src/style/index';

class MyProvider extends React.Component {
  static contextType = Context;

  render() {
    const app = this.context;

    const client = new ApolloClient({
      fetch: authenticatedFetch(app),
      fetchOptions: {
        credentials: "include",
      },
    });

    return (
      <ApolloProvider client={client}>
        {this.props.children}
      </ApolloProvider>
    );
  }
}

class MyApp extends App {

  state = {
    toggleIsUserMenuOpen: false
  }

  render() {
    const { Component, pageProps, shopOrigin } = this.props;
    const { toggleIsUserMenuOpen } = this.state;

    const config = { apiKey: API_KEY, shopOrigin: shopOrigin, forceRedirect: true };


    // toggleIsUserMenuOpen = () => {
    //   this.setState(({ toggleIsUserMenuOpen }) => {
    //     return { toggleIsUserMenuOpen: !toggleIsUserMenuOpen };
    //   });
    // } 


    return (
      <React.Fragment>
        <Head>
          <title>Sample App</title>
          <meta charSet="utf-8" />
          <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" rel="stylesheet" />

          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Antonio&family=Lato&family=Lobster&family=Nunito&family=Open+Sans&family=Poppins&family=Raleway&family=Roboto:wght@300;400&display=swap" rel="stylesheet" />

            {/* <style>
              .antonio {font-family: 'Antonio', sans-serif;}
              .lato {font-family: 'Lato', sans-serif;}
              .lobster{font-family: 'Lobster', cursive; }
              .nunito{font-family: 'Nunito', sans-serif;}
              .opensans{font-family: 'Open Sans', sans-serif;}
              .poppins{font-family: 'Poppins', sans-serif;}
              .raleway{font-family: 'Raleway', sans-serif;}
              .roboto{font-family: 'Roboto', sans-serif;}
            </style> */}
        </Head>
        <Provider config={config}>
          <ClientRouter />
          <AppProvider i18n={translations}>
          {/* <AppProvider i18n={{
            Polaris: {
              Avatar: {
                label: 'Avatar',
                labelWithInitials: 'Avatar with initials {initials}',
              },
              Frame: { skipToContent: 'Skip to content' },
              TopBar: {
                toggleMenuLabel: 'Toggle menu',
                SearchField: {
                  clearButtonLabel: 'Clear',
                  // search: 'Search',
                },
              },
            },
          }}> */}
            <MyProvider>
              {/* <Frame topar={ 
                'something here'
                <TopBar
                  showNavigationToggle
                  userMenu={
                    <TopBar.UserMenu
                      actions={[
                        {
                          items: [{
                            // content: 'Back to Shopify', //icon: ArrowLeftMinor 
                          // }],
                      //   },
                      //   {
                      //     items: [{ content: 'Community forums' }],
                      //   },
                      // ]}
                      // name="Dharma"
                      // detail="Jaded Pixel"
                      // initials="D"
                      // open={false}
                      // onToggle={true}
                //     />
                //   }
                // secondaryMenu={ <TopBar.Menu
                //       activatorContent={
                //         <span>
                //           <Icon source={QuestionMarkMajor} />
                //           <VisuallyHidden>Secondary menu</VisuallyHidden>
                //         </span>
                //       }
                      // open={isSecondaryMenuOpen}
                      // onOpen={toggleIsSecondaryMenuOpen}
                      // onClose={toggleIsSecondaryMenuOpen}
                    //   actions={[
                    //     {
                    //       items: [{ content: 'Community forums' }],
                    //     },
                    //   ]}
                    // />}
                    // navigation={
                    //   <Navigation //location={location.pathname}
                    //   >
                    //     <Navigation.Section
                    //       items={[
                    //         {
                    //           url: "/",
                    //           label: "Dashboard",
                    //         },
                    //         {
                    //           url: "/products",
                    //           label: "Products",
                    //         },
                    //         {
                    //           url: "/settings",
                    //           label: "Settings",
                    //         },
                    //       ]}
                    //     />
                    //   </Navigation>
                    // }
                // searchResultsVisible={isSearchActive}

                // searchResults={searchResultsMarkup}
                // onSearchResultsDismiss={handleSearchResultsDismiss}
                // onNavigationToggle={handleNavigationToggle}
                // />
              // } />
              */}
              <Component {...pageProps} />
            </MyProvider>
          </AppProvider>
        </Provider>
      </React.Fragment>
    );
  }
}

MyApp.getInitialProps = async ({ ctx }) => {
  return {
    shopOrigin: store.get('shopOrigin'),
  }
}

export default MyApp;