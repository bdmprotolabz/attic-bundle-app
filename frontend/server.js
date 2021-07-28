require('isomorphic-fetch');
const dotenv = require('dotenv');
const Koa = require('koa');
const next = require('next');
const { default: createShopifyAuth } = require('@shopify/koa-shopify-auth');
const { verifyRequest } = require('@shopify/koa-shopify-auth');
const { default: Shopify, ApiVersion } = require('@shopify/shopify-api');
const Router = require('koa-router');
const mongoose = require('mongoose')
const cors = require('@koa/cors');

// var schema = require('./graphql/schema')

dotenv.config();

Shopify.Context.initialize({
    API_KEY: process.env.SHOPIFY_API_KEY,
    API_SECRET_KEY: process.env.SHOPIFY_API_SECRET,
    SCOPES: process.env.SHOPIFY_API_SCOPES.split(","),
    HOST_NAME: process.env.SHOPIFY_APP_URL.replace(/https:\/\//, ""),
    API_VERSION: ApiVersion.October20,
    IS_EMBEDDED_APP: true,
    SESSION_STORAGE: new Shopify.Session.MemorySessionStorage(),
});

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const ACTIVE_SHOPIFY_SHOPS = {};

const server = new Koa();
server.use(cors());
const router = new Router();
const axios = require('axios');

const store = require('store-js');



router.get('/scripts', async (ctx) => {
    try {
        ctx.body = {
            status: 'success'
        };
    }
    catch (error) {
        console.log(error)
    }
})

app.prepare().then(() => {

    server.keys = [Shopify.Context.API_SECRET_KEY];


    server.use(
        
        /*async (ctx, next) => {
            const got = ctx.cookies.get("shopOrigin");
            if (!got && ctx.request.query) {
                const { hmac, shop } = ctx.request.query;
                if (hmac && shop) {
                    const valid = validateHMAC(
                        hmac,
                        SHOPIFY_API_SECRET_KEY,
                        ctx.request.query
                    );
                    if (valid) {
                        ctx.cookies.set("shopOrigin", shop, {
                            httpOnly: false,
                            secure: true,
                            sign: true,
                            sameSite: "none"
                        });
                        ctx.redirect(
                            `https://${shop}/admin/apps/${SHOPIFY_API_KEY}`
                        );
                    }
                }
            }
            await next();
        },*/
        // session({ secure: true, sameSite: 'none' }, app),
        createShopifyAuth({
            async afterAuth(ctx) {
                console.log('--->after_auth--->', ctx)
                const { shop, scope, accessToken } = ctx.state.shopify;
                ACTIVE_SHOPIFY_SHOPS[shop] = scope;
                console.log('------->shop', ctx.state.shopify)
                store.set('shopOrigin', shop);
                axios.post('https://bundlesapp.com/auth-user', {
                    shopName: shop,
                    email: ctx.state.shopify.onlineAccessInfo.associated_user.email,
                    accessToken: accessToken,
                    otherInfo: ctx.state.shopify.onlineAccessInfo,
                    planId: '',
                    timezone: '',
                    isSubscription: 0,
                    status: 1,
                })
                    .then(function (response) {
                        console.log(response);
                        console.log('resp', response.data.data);
                        if (response.data.responseCode === 200) {
                            store.set('_bundledata', 'idsFromResources')
                            store.set('shopifybu', response.data.data)
                        } else {
                            store.set('_bundledata', 'idsFromResources')
                            store.set('shopifybu', 'error')
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                        store.set('shopifybu', 'error!')
                        store.set('_bundledata', 'idsFromResources')
                    });


                    // Your app should handle the APP_UNINSTALLED webhook to make sure merchants go through OAuth if they reinstall it
                     const response1 = await Shopify.Webhooks.Registry.register({
                       shop,
                       accessToken,
                       path: "/webhooks",
                       topic: "APP_UNINSTALLED",
                       webhookHandler: async (topic, shop, body) => delete ACTIVE_SHOPIFY_SHOPS[shop],
                     });

                     if (!response1.success) {
                       console.log(
                         `Failed to register APP_UNINSTALLED webhook: ${response1.result}`
                       );
                     }

                     console.log(response1)


                ctx.redirect(`/?shop=${shop}`);

            },
        }),

    );

    router.post("/graphql", verifyRequest(), async (ctx, next) => {
        await Shopify.Utils.graphqlProxy(ctx.req, ctx.res);
    });





    const handleRequest = async (ctx) => {
        await handle(ctx.req, ctx.res);
        ctx.respond = false;
        ctx.res.statusCode = 200;
        //console.log('--->handleRequest2--->', ctx.cookies.accessToken)
        //console.log('--->handleRequest3--->', ctx.cookies.shop)
    };

    router.get("/", async (ctx) => {
        const shop = ctx.query.shop;
        // console.log('--->ctx--->', ctx);
        console.log('---shop--->', shop);
        if (shop !== undefined || shop !== 'undefined') {
            store.set('shop', shop);
        }
        if (ACTIVE_SHOPIFY_SHOPS[shop] === undefined) {
            // await handleRequest(ctx);
            ctx.redirect(`/auth?shop=${shop}`);
        } else {
            await handleRequest(ctx);
        }
    });

    // router.get('/api/getAuthUser', (req,res) => {
    //     res.json({
    //         email: 'testuser@gmail.com',
    //         password: '12345',
    //         status: '1'
    //     })
    // })


router.post("/webhooks", async (ctx) => {
    const shop = store.get('shopOrigin');
    try {
        await Shopify.Webhooks.Registry.process(ctx.req, ctx.res);
            //console.log(ctx.req)
            //console.log(ctx.query.shop)
            
            axios.post('https://bundlesapp.com/uninstall-user', {
                shopName: shop,
                planId: '',
                timezone: ''
            })
            .then(function (response) {
                if (response.data.responseCode === 200) {
                    console.log("record deleted");
                } else {
                    console.log("something went wrong");
                }
            })
            .catch(function (error) {
                console.log(error);
                store.set('shopifybu', 'error!')
                store.set('_bundledata', 'idsFromResources')
            });
        console.log(`Webhook processed, returned status code 200`);
    } catch (error) {
        console.log(`Failed to process webhook: ${error}`);
    }
});


    router.get("(/_next/static/.*)", handleRequest);
    router.get("/_next/webpack-hmr", handleRequest);

    server.use(cors({ origin: "*" }));
    // router.get("(.*)", verifyRequest(), handleRequest);
    router.get('(.*)', handleRequest);

    server.use(router.allowedMethods());
    server.use(router.routes());


    server.listen(port, () => {
        console.log(`> Ready on http://localhost:${port}`);
    });

});



