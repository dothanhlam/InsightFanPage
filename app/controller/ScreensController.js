/**
 * Created with JetBrains WebStorm.
 * User: Lam Do
 * Date: 3/31/13
 * Time: 11:03 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('org.catapult.insight.controller.ScreensController', {
    extend: 'Ext.app.Controller',
    views:['AuthenticationView', 'InsightView', 'PageInfoView'],
    refs: [
        { ref: 'authentication',  selector: 'authentication'},
        { ref: 'insight',  selector: 'insight'},
        { ref: 'pageinfo',  selector: 'pageinfo'}
    ],

    init: function() {
        this.control({
            'insight menu[id=fanpagesMenu]': {
                click: function( menu, item, e, eOpts) {
                    if (item != undefined) {
                       console.log(item.text);
                        var view = this.getInsight();
                        view.loadFanPage(item.text, item.pageId, item.token);
                    }
                }
            }
        });
    }
});