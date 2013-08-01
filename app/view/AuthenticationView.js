/**
 * Created with JetBrains WebStorm.
 * User: Lam Do
 * Date: 3/31/13
 * Time: 11:08 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('org.catapult.insight.view.AuthenticationView', {
    extend: 'Ext.container.Container',
    alias: 'widget.authentication',
    layout: {
        align: 'middle',
        pack: 'center',
        type: 'hbox'
    },
    items: [ {xtype:'panel',
        bodyPadding: 5,
        width: 275,
        height: 150,
        title:'Authentication with Facebook',
        items:[
            {text: 'Authenticating ...'}
        ]
    }],

    listeners: {
        activate: function() {
        }
    },

    init: function() {

    },

    initComponent: function() {
        this.callParent(arguments);
    }
});