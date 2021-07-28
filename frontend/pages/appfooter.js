import React, { Component } from 'react';
import { Icon, DisplayText } from '@shopify/polaris';
import { CircleInformationMajor } from '@shopify/polaris-icons';

class AppFooter extends Component {
    state = {}
    render() {
        return (
            <React.Fragment>
                <br />
                <span className="text_center disp_inline footer">
                    <DisplayText size="small" > <Icon source={CircleInformationMajor} color="primary" />  Copywrith 2021. All rights reserved to [our app name here] .</DisplayText>
                </span>
                <br />
            </React.Fragment>
        );
    }
}

export default AppFooter;