DashboardController = AppController.extend({
  waitOn: function() {
    return [ this.subscribe('dashboardAll', Meteor.userId()) ];
  },
  data: {
    items: Items.find({})
  },
  onAfterAction: function () {
    Meta.setTitle('Dashboard');
  },
  action: function (){
    if (Groups.find().count() === 0) {
      var defaultTypes = _.without(App.GLOBALS.Groups.defaultTypes, 'custom');
      Meteor.call("createDefaultGroups", Meteor.user(), defaultTypes);
    }
    this.render();
  }
});

DashboardController.events({

});
