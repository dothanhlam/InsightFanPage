/**
 * Created with JetBrains WebStorm.
 * User: Lam Do
 * Date: 7/2/13
 * Time: 8:02 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('org.catapult.insight.view.InsightView',{
    extend: 'Ext.panel.Panel',
    alias: 'widget.insight',
    layout: {type: 'border', split:true},
    dockedItems: {
        itemId: 'toolbar',
        xtype: 'toolbar',
        enableKeyEvents: true,
        items: [
            {
                text: 'InSight'
            },
            {
                xtype: 'splitbutton',
                text : 'Pages',
                id: 'splitButtonMenu',
                menu: new Ext.menu.Menu({
                    id: 'fanpagesMenu'
                })
            },
            {
                xtype: 'tbfill'
            },
            {
                text: 'Settings ...'
            },
            {
                xtype: 'tbspacer',
                width: 20 },
            {
                text: 'Sign out',
                action: 'signout'
            }
        ]
    },

        items: [{
            id: 'loggerView',
            title: 'Logger',
            region: 'south',     // position for region
            xtype: 'panel',
            height: 100,
            collapsible: true,
            split: true,         // enable resizing
            margins: '0 5 5 5'
        },{
            id:'pageInfoView',
            region:'west',
            xtype: 'pageinfo',
            margins: '5 0 0 5',
            width: 300,
            collapsible: true  // make collapsible

        },{
            id:'analysisView',
            title: 'Analysis',
            region: 'center',     // center region is required, no width/height specified
            xtype: 'treepanel',
            collapsible: true,
            useArrows: true,
            rootVisible: false,
            multiSelect: true,
            singleExpand: true,
            layout: 'fit',
            margins: '5 5 0 0',
            defaults: {
                bodyPadding: 10,
                autoScroll: true
            },
            store:  Ext.data.JsonStore({
                id: 'analysisStore',
                name: 'analysisStore',
                root: 'users',
                fields: [ 'id', 'message'],
                data:[]
            }),
            columns: [{
                xtype: 'treecolumn', //this is so we know which column will show the tree
                text: 'id',
                flex: 2,
                sortable: true,
                dataIndex: 'id'
            },
                {
                    xtype: 'treecolumn', //this is so we know which column will show the tree
                    text: 'message',
                    flex: 2,
                    sortable: true,
                    dataIndex: 'message'
                }
            ]
        }],

    listeners: {
        activate: function() {
            this.getAllFanPagesThatUserManaged(function(response) {
                var pages = response.data;
                var menu = Ext.getCmp('fanpagesMenu');
                for (item in pages) {
                    menu.add({  text:  pages[item].name + " - " + pages[item].category,
                                pageId:  pages[item].id,
                                token: pages[item].access_token});
                }
            });
        }
    },

    initComponent: function() {
        this.callParent(arguments);
    },

    loadFanPage:function(title, pageId, accessToken) {
        Ext.getCmp('splitButtonMenu').setText(title);
        Ext.getCmp('analysisView').setTitle(title);
        Ext.getCmp('pageInfoView').loadPageInfo(pageId, accessToken);

        this.getAllPostsByFanPage(pageId, accessToken);
        this.log("loadFanPage", pageId)

    },

    log: function(tag, message) {
        var logMessage = tag + ": " + message;
        Ext.getCmp('loggerView').update(logMessage);
        console.log(logMessage);
    },
    // all functions that using facebook APIs
    getAllFanPagesThatUserManaged: function(callback) {
        FB.api('/me/accounts', function(response) {
            callback(response);
        });
    },

    getAllPostsByFanPage: function(pageId, token) {
        var view = Ext.getCmp('analysisView');
        FB.api('/'+pageId + "/posts", {access_token: token}, function(response) {
           var store = new Ext.data.TreeStore ({
                root: 'users',
                fields: [ 'id', 'message'],
                data:response.data
            });

            view.getView().refresh();
        //    view.getStore().loadData (response.data);
            console.log(  view.getStore());


        });
    }
});