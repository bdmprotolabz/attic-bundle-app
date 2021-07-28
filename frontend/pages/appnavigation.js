import React, { Component } from 'react';
import Link from 'next/link';

const bundle_img = 'https://cdn.shopify.com/s/files/1/0558/1081/8244/files/home.png?v=1621689163';
const bundle_design = 'https://cdn.shopify.com/s/files/1/0558/1081/8244/files/settings.png?v=1621689163';
const settings = 'https://cdn.shopify.com/s/files/1/0558/1081/8244/files/masteredit.png?v=1621689163';
const more_apps = 'https://cdn.shopify.com/s/files/1/0558/1081/8244/files/morelink.png?v=1621689164';
const support = 'https://cdn.shopify.com/s/files/1/0558/1081/8244/files/chat.png?v=1621689163';


class AppNavigation extends Component {
    state = {}
    render() {
        return (
            <React.Fragment>
                <div className="main_navigation">

                    <div className="display_inline">
                        <Link href="/"><a><img src={bundle_img} />&nbsp;Welcome</a></Link>
                    </div>
                    <div className="display_inline">
                        <Link href="/bundles"><a><img src={bundle_img} />&nbsp;Bundles</a></Link>
                    </div>
                    <div className="display_inline">
                        <Link href="/bundle-design"><a href="/bundle-design">
                            <img src={bundle_design} />
                            &nbsp;  Bundle Design
                        </a></Link>
                    </div>
                    <div className="display_inline">
                    <Link href="/settings"><a href="/settings">
                        <img src={settings} />
                            &nbsp;  Settings
                            </a>
                            </Link>
                    </div>
                    <div className="display_inline">
                    <Link href="/script-page"><a href="/script-page">
                            Script Tag
                            </a>
                            </Link>
                    </div>


                    <div className="display_inline float_right">
                        <Link href="/support-center"><a href="/support-center">
                            <img src={support} />
                            &nbsp; Support Center
                            </a>
                        </Link>
                    </div>
                    <div className="display_inline float_right">
                        <img src={more_apps} />
                        &nbsp; More Apps from AppAttic
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default AppNavigation;