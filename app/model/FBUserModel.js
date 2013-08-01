/**
 * Created with JetBrains WebStorm.
 * User: Lam Do
 * Date: 7/2/13
 * Time: 7:47 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('org.catapult.insight.model.FBUserModel',{extend: 'Ext.data.Model',
    fields:[
        { name:"id"},
        { name:"name"},
        { name:"first_name"},
        { name:"middle_name"},
        { name:"last_name"},
        { name:"link"},
        { name:"username"},
        { name:"birthday"}
]});

