/**
 * Created with JetBrains WebStorm.
 * User: Lam Do
 * Date: 3/31/13
 * Time: 10:15 AM
 * To change this template use File | Settings | File Templates.
 */

const APP_ID = '196975840457787';
window.fbAsyncInit = function() {
    // init the FB JS SDK
    FB.init({
        appId      : APP_ID,                        // App ID from the app dashboard
        frictionlessRequests : false,
        channelUrl : 'http://localhost:8000/', // Channel file for x-domain comms
        status     : true,                                 // Check Facebook Login status
        xfbml      : true,                                  // Look for social plugins on the page
        oauth: false
    });
};
// Load the SDK asynchronously
(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/all.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

Ext.Loader.setConfig({enabled:true});

Ext.application({
    requires: ['Ext.container.Viewport'],
    name: 'org.catapult.insight',
    appFolder: 'app',
    controllers: ['ScreensController'],
    launch: function() {
        var viewport = Ext.create('Ext.container.Viewport', {
            layout: 'card',
            items: [
                {
                    xtype: 'authentication'
                },
                {
                    xtype: 'insight'
                }
            ]
        });

        // check for authentication
        FB.Event.subscribe('auth.authResponseChange', function(response) {
            if (response.status === 'connected') {
                // has connected -> redirect to main working screen
                console.log("connected")
                viewport.getLayout().setActiveItem(1);
            }
            else if (response.status === 'not_authorized') {
                FB.login(function(response) {
                    console.log("login complete")
                    viewport.getLayout().setActiveItem(1);
                });
            }
        });
    },

    testAPI:function() {

    }
});