DashboardController = AppController.extend({
  waitOn: function() {
    return [ this.subscribe('dashboardAll', Meteor.userId()) ];
  },
  data: function() {
    return {
      items: Items.find(),
      groups: Groups.find()
    }
  },
  onAfterAction: function () {
    Meta.setTitle('Dashboard');
  },
  action: function (){
    this.render();
  }
});

DashboardController.events({

});
