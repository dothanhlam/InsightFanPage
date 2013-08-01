/**
 * Created with JetBrains WebStorm.
 * User: Lam Do
 * Date: 7/3/13
 * Time: 3:14 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('org.catapult.insight.view.PageInfoView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.pageinfo',
    width: 200,
    title:'Page info',
    bodyStyle:{"background-color":"#D9E5F3"},
    layout: {
        type: 'vbox'
    },
    items: [
            {
                id:'propertyGrid',
                xtype: 'propertygrid',
                width: '100%',
                source: {}
            }
        ],

    loadPageInfo: function(pageId, token) {
        FB.api('/'+pageId, {access_token: token}, function(response) {
            Ext.getCmp('propertyGrid').setSource(response);
        });
    }
});